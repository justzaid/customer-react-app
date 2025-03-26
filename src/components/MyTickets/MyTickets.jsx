import React, { useState, useEffect } from 'react';
import * as ticketService from '../../services/ticketService';


const MyTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      setLoading(true);

      const userTickets = await ticketService.getMyTickets(); 
      setTickets(userTickets);
      setError(null);
    } catch (err) {
      console.error("Error fetching tickets:", err);
      setError(err.message || 'Failed to fetch tickets.');
      setTickets([]);
    } finally {
      setLoading(false);
    }
  };

  // dummy view button for now
  const handleViewClick = (ticketId) => {
    console.log("View ticket:", ticketId);
  };


  const displayCustomer = (customer) => {
    if (!customer) return 'N/A';
    return customer.username || customer.email || customer._id;
  };
  

  const displayAssignedTo = (agent) => {
      if (!agent) return 'TBA';
      return agent.username || agent.email || agent._id;
  }

  if (loading) {
    return <div className="p-4">Loading tickets...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="my-tickets-container p-4">
      <h2 className="text-2xl font-semibold mb-4">My Tickets</h2>
      {tickets.length === 0 ? (
        <p>You have no tickets.</p>
      ) : (
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Customer</th>
                <th className="py-3 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Subject</th>
                <th className="py-3 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Description</th>
                <th className="py-3 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Category</th>
                <th className="py-3 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                <th className="py-3 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Assigned To</th>
                <th className="py-3 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {tickets.map((ticket) => (
                <tr key={ticket._id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 border-b border-gray-200 text-sm">{displayCustomer(ticket.customerId)}</td>
                  <td className="py-3 px-4 border-b border-gray-200 text-sm">{ticket.subject}</td>
                  <td className="py-3 px-4 border-b border-gray-200 text-sm max-w-xs truncate" title={ticket.description}>{ticket.description}</td> 
                  <td className="py-3 px-4 border-b border-gray-200 text-sm">{ticket.category}</td>
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
                  <td className="py-3 px-4 border-b border-gray-200 text-sm">{displayAssignedTo(ticket.assignedTo)}</td>
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

export default MyTickets;
