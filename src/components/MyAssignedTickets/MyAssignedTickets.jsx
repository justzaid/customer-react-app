import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as ticketService from '../../services/ticketService';

const MyAssignedTickets = () => {
  const [assignedTickets, setAssignedTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssignedTickets = async () => {
      try {
        setLoading(true);
        const data = await ticketService.getMyAssignedTickets();
        setAssignedTickets(data);
        setError(null);
      } catch (error) {
        setError(error.message || 'Failed to fetch assigned tickets.');
      } finally {
        setLoading(false);
      }
    };

    fetchAssignedTickets();
  }, []);

  const handleViewClick = (ticketId) => {
    navigate(`/tickets/${ticketId}`);
  };

  const displayUserInfo = (user) => {
    if (!user) return 'N/A';
    return user.username || user.email || user._id;
  };

  if (loading) {
    return <div className="p-4">Loading your assigned tickets...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="my-assigned-tickets-container p-4">
      <h2 className="text-2xl font-semibold mb-4">My Assigned Tickets</h2>
      {assignedTickets.length === 0 ? (
        <p>You have no tickets assigned to you.</p>
      ) : (
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Subject</th>
                <th className="py-3 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Category</th>
                <th className="py-3 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Created By</th>
                <th className="py-3 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Date Posted</th>
                <th className="py-3 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                <th className="py-3 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {assignedTickets.map((ticket) => (
                <tr key={ticket._id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 border-b border-gray-200 text-sm">{ticket.subject}</td>
                  <td className="py-3 px-4 border-b border-gray-200 text-sm">{ticket.category}</td>
                  <td className="py-3 px-4 border-b border-gray-200 text-sm">{displayUserInfo(ticket.user)}</td>
                  <td className="py-3 px-4 border-b border-gray-200 text-sm whitespace-nowrap">{new Date(ticket.createdAt).toLocaleDateString()}</td>
                  <td className="py-3 px-4 border-b border-gray-200 text-sm">
                     <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                         ticket.status === 'Open' ? 'bg-green-100 text-green-800' :
                         ticket.status === 'In progress' ? 'bg-yellow-100 text-yellow-800' :
                         ticket.status === 'Resolved' ? 'bg-blue-100 text-blue-800' :
                         'bg-gray-100 text-gray-800'
                     }`}>
                         {ticket.status}
                     </span>
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200 text-sm whitespace-nowrap">
                    <button
                      onClick={() => handleViewClick(ticket._id)}
                      className="px-3 py-1 bg-blue-500 text-white text-xs font-semibold rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyAssignedTickets;
