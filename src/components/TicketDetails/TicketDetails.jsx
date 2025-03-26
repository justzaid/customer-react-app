import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthedUserContext } from '../../App';
import * as ticketService from '../../services/ticketService';

const TicketDetails = () => {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useContext(AuthedUserContext);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        setLoading(true);
        const ticketData = await ticketService.getTicketById(id);
        setTicket(ticketData);
        setError(null);
      } catch (err) {
        setError('Failed to fetch ticket details');
        setTicket(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [id]);

  if (loading) return <div className="p-4">Loading ticket details...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;
  if (!ticket) return <div className="p-4">Ticket not found</div>;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const ticketFields = [
    { label: 'Status', value: ticket.status },
    { label: 'Assigned To', value: ticket.assignedTo?.username || 'Unassigned' },
    { label: 'Subject', value: ticket.subject },
    { label: 'Description', value: ticket.description },
    { label: 'Category', value: ticket.category },
    { label: 'Date Created', value: formatDate(ticket.createdAt) },
    { label: 'Last Updated', value: formatDate(ticket.updatedAt) },
  ];

  return (
    <div className="ticket-details p-6">
      <h2 className="text-2xl font-bold mt-10 mb-3">Ticket Details</h2>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
          <div>
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
              Assigned To
            </h3>
            <p className="mt-1 text-sm text-gray-900">
              {ticket.assignedTo?.username || 'Unassigned'}
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
              <span className={`px-3 py-1 inline-flex text-sm leading-6 font-semibold rounded-full ${
                ticket.status === 'Open' ? 'bg-green-100 text-green-800' :
                ticket.status === 'In progress' ? 'bg-yellow-100 text-yellow-800' :
                ticket.status === 'Closed' ? 'bg-red-100 text-red-800' :
                ticket.status === 'Resolved' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
              }`}>

              </span>
            </div>
          </div>
        </div>
        {ticketFields
          .filter(field => !['Assigned To', 'Date Created'].includes(field.label))
          .map((field) => (
            <div key={field.label} className="mb-4">
              <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                {field.label}
              </h3>
              {field.label === 'Status' ? (
                <span className={`mt-1 px-3 py-1 inline-flex text-sm leading-6 font-semibold rounded-full ${
                  field.value === 'Open' ? 'bg-green-100 text-green-800' :
                  field.value === 'In progress' ? 'bg-yellow-100 text-yellow-800' :
                  field.value === 'Resolved' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {field.value}
                </span>
              ) : (
                <p className="mt-1 text-sm text-gray-900">
                  {field.value}
                </p>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default TicketDetails;
