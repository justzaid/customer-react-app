import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AuthedUserContext } from '../../App';
import * as ticketService from '../../services/ticketService';
import ReviewForm from '../ReviewForm/ReviewForm';

const TicketDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('');
  const user = useContext(AuthedUserContext);

  const statusOptions = ['Open', 'In progress', 'Resolved', 'Closed'];

  const fetchTicket = async () => {
    try {
      setLoading(true);
      const ticketData = await ticketService.getTicketById(id);
      if (ticketData.reviews) {
        ticketData.reviews.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      }
      setTicket(ticketData);
      setSelectedStatus(ticketData.status);
      setError(null);
    } catch (error) {
      setError(`Failed to fetch ticket details: ${error.message}`);
      setTicket(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTicket();
  }, [id]);

  const handleAddReview = async (reviewFormData) => {
    try {
      const newReview = await ticketService.createReview(id, reviewFormData);
      setTicket(prevTicket => {
        const updatedReviews = Array.isArray(prevTicket.reviews) 
          ? [...prevTicket.reviews, newReview] 
          : [newReview];
        
        updatedReviews.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

        return {
          ...prevTicket,
          reviews: updatedReviews,
        };
      });
      setError(null);
    } catch (error) {
      setError(`Failed to submit review: ${error.message}. Please try again.`);
    }
  };

  const handleStatusChange = async (event) => {
    const newStatus = event.target.value;
    setSelectedStatus(newStatus);

    try {
      const updatedTicketData = await ticketService.update(id, { status: newStatus });
      setTicket(prevTicket => ({
        ...prevTicket,
        status: updatedTicketData.status,
        updatedAt: updatedTicketData.updatedAt
      }));
      setError(null);
    } catch (error) {
      setError(`Failed to update status: ${error.message}. Please try again.`);
    }
  };

  const handleDelete = async () => {
    try {
      await ticketService.deleteTicket(id);
      navigate('/dashboard');
    } catch (error) {
      setError(`Failed to delete ticket: ${error.message}`);
    }
  };

  if (loading) return <div className="p-4">Loading ticket details...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;
  if (!ticket) return <div className="p-4">Ticket not found</div>;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const isOwner = user?._id === ticket?.customerId?._id;

  const assignedToDisplay = ticket.assignedTo?.username || ticket.managingAdmin?.username || 'Unassigned';

  const ticketFields = [
    { label: 'Status', value: ticket.status },
    { label: 'Subject', value: ticket.subject },
    { label: 'Category', value: ticket.category },
    { label: 'Description', value: ticket.description },
    { label: 'Last Updated', value: formatDate(ticket.updatedAt) },
  ];

  return (
    <div className="ticket-details p-6 mt-1">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          &larr; Back to List
        </button>
        <div className="flex gap-2">
          {isOwner && (
            <Link
              to={`/tickets/${id}/edit`}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              Edit
            </Link>
          )}
          {(isOwner || user?.role === 'admin') && (
            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              Delete
            </button>
          )}
        </div>
      </div>
      <h2 className="text-2xl font-bold mt-10 mb-3">Ticket Details</h2>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
          <div>
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
              Assigned To
            </h3>
            <p className="mt-1 text-sm text-gray-900">
              {assignedToDisplay}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Date Created
              </h3>
              <p className="mt-1 text-sm text-gray-900">
                {formatDate(ticket.createdAt)}
              </p>
            </div>
            <div>
            </div>
          </div>
        </div>
        {ticketFields.map((field) => (
            <div key={field.label} className="mb-4">
              {field.label === 'Status' ? (
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                      {field.label}
                    </h3>
                    <span className={`mt-1 px-3 py-1 inline-flex text-sm leading-6 font-semibold rounded-full ${
                      ticket.status === 'Open' ? 'bg-green-100 text-green-800' :
                      ticket.status === 'In progress' ? 'bg-yellow-100 text-yellow-800' :
                      ticket.status === 'Resolved' ? 'bg-blue-100 text-blue-800' :
                      ticket.status === 'Closed' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {ticket.status}
                    </span>
                  </div>
                  {user?.role === 'admin' && (
                    <select
                      value={selectedStatus}
                      onChange={handleStatusChange}
                      className="p-1 border border-gray-300 rounded text-sm" 
                    >
                      {statusOptions.map(option => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              ) : (
                <>
                  <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    {field.label}
                  </h3>
                  <p className="mt-1 text-sm text-gray-900">
                    {field.value}
                  </p>
                </>
              )}
            </div>
          ))}
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Reviews</h3>
        {ticket.reviews && ticket.reviews.length > 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            {ticket.reviews.map((review, index) => (
              <div key={review._id}>
                <div className="mb-2">
                  <p className="text-xs text-gray-600 font-semibold">
                    By: {review.author?.username || 'Unknown User'}
                    <span className="text-gray-400 font-normal"> - {formatDate(review.createdAt)}</span>
                  </p>
                </div>
                <p className="text-sm text-gray-800 mb-4">{review.description}</p>
                {index < ticket.reviews.length - 1 && (
                  <hr className="my-4 border-grey-200" />
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No reviews yet.</p>
        )}
      </div>
      <div className="mt-8">
        <ReviewForm onSubmit={handleAddReview} />
      </div>

    </div>
  );
};

export default TicketDetails;
