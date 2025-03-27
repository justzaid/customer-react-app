import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Import the assignTicket service function
import { assignTicket } from '../../services/ticketService';


const AllTickets = ({ tickets, loading, error, onTicketAssigned }) => {
  const [statusFilter, setStatusFilter] = useState('All');
  const [assigningTicketId, setAssigningTicketId] = useState(null);


  const handleFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const navigate = useNavigate();

  const handleViewClick = (ticketId) => {
    navigate(`/tickets/${ticketId}`);
  };

  // Function to handle the "Manage" button click
  const handleManageClick = async (ticketId) => {
    setAssigningTicketId(ticketId);
    try {
      const updatedTicket = await assignTicket(ticketId);
      console.log('Ticket assigned:', updatedTicket);
      if (onTicketAssigned) {
        onTicketAssigned(updatedTicket);
      }
    } catch (error) {
    } finally {
      setAssigningTicketId(null); // Reset loading state
    }
  };

  const displayUserInfo = (user) => {
    if (!user) return 'No user available';
    return user.username || user.email || user._id;
  }

  // Updated function to display assigned agent or Manage button
  const displayAssignedTo = (ticket) => {
      if (!ticket.assignedTo) {
          return (
              <button
                  onClick={() => handleManageClick(ticket._id)}
                  disabled={assigningTicketId === ticket._id}
                  className={`px-3 py-1 text-xs font-semibold rounded focus:outline-none focus:ring-2 focus:ring-green-300 ${
                      assigningTicketId === ticket._id
                          ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                          : 'bg-green-500 text-white hover:bg-green-600'
                  }`}
              >
                  {assigningTicketId === ticket._id ? 'Assigning...' : 'Manage'}
              </button>
          );
      }
      // If assigned, display the agent's info
      const agent = ticket.assignedTo;
      return agent.username || agent.email || agent._id;
  }

  const filteredTickets = tickets.filter(ticket => {
    if (statusFilter === 'All') {
      return true;
    }
    return ticket.status === statusFilter;
  });

  if (loading) {
    return <div className="p-4">Loading all tickets...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-600">Error fetching tickets: {error}</div>;
  }

  const statuses = ['All', 'Open', 'In progress', 'Resolved', 'Closed'];

  return (
    <div className="all-tickets-container p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">All User Tickets</h2>
        <div className="relative">
          <select
            value={statusFilter}
            onChange={handleFilterChange}
            className="appearance-none bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          >
            {statuses.map(status => (
              <option key={status} value={status}>
                {status === 'All' ? 'Filter by Status' : status}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>
      </div>

      {filteredTickets.length === 0 ? (
        <p>{statusFilter === 'All' ? 'There are no tickets in the system.' : `There are no ${statusFilter.toLowerCase()} tickets.`}</p>
      ) : (
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Subject</th>
                <th className="py-3 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Description</th>
                <th className="py-3 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Category</th>
                <th className="py-3 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Created By</th>
                <th className="py-3 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Date Posted</th>
                <th className="py-3 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                <th className="py-3 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Assigned To</th>
                <th className="py-3 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredTickets.map((ticket) => (
                <tr key={ticket._id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 border-b border-gray-200 text-sm">{ticket.subject}</td>
                  <td className="py-3 px-4 border-b border-gray-200 text-sm max-w-xs truncate" title={ticket.description}>{ticket.description}</td>
                  <td className="py-3 px-4 border-b border-gray-200 text-sm">{ticket.category}</td>
                  <td className="py-3 px-4 border-b border-gray-200 text-sm">{displayUserInfo(ticket.user)}</td>
                  <td className="py-3 px-4 border-b border-gray-200 text-sm whitespace-nowrap">{new Date(ticket.createdAt).toLocaleDateString()}</td>
                  <td className="py-3 px-4 border-b border-gray-200 text-sm">
                     <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                         ticket.status === 'Open' ? 'bg-green-100 text-green-800' :
                         ticket.status === 'In progress' ? 'bg-yellow-100 text-yellow-800' :
                         ticket.status === 'Resolved' ? 'bg-blue-100 text-blue-800' :
                         ticket.status === 'Closed' ? 'bg-red-100 text-red-800' :
                         'bg-gray-100 text-gray-800'
                     }`}>
                         {ticket.status}
                     </span>
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200 text-sm">{displayAssignedTo(ticket)}</td>
                  <td className="py-3 px-4 border-b border-gray-200 text-sm whitespace-nowrap">
                    <button
                      onClick={() => handleViewClick(ticket._id)}
                      className="px-3 py-1 bg-blue-500 text-white text-xs font-semibold rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    >
                      View
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

export default AllTickets;
