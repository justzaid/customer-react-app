import React, { useState, useEffect, useContext } from 'react';
import { AuthedUserContext } from '../../App';
import * as ticketService from '../../services/ticketService';

const AdminPersonalStats = () => {
  const user = useContext(AuthedUserContext);
  const [assignedCount, setAssignedCount] = useState(0);
  const [replyCount, setReplyCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      if (!user || user.role !== 'admin') {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Fetch assigned tickets count
        const assignedTickets = await ticketService.getMyAssignedTickets();
        setAssignedCount(assignedTickets.length);

        // Fetch all tickets to calculate reply count
        // Note: This could be optimized if the Dashboard component could pass
        // the already fetched 'tickets' array down as a prop.
        const allTickets = await ticketService.getAllTickets();
        let totalReplies = 0;
        allTickets.forEach(ticket => {
          ticket.reviews.forEach(review => {
            // Ensure comparison is done correctly (e.g., comparing IDs)
            // Assuming review.author contains the user ID directly or as an object {_id: ...}
            const authorId = typeof review.author === 'object' && review.author !== null ? review.author._id : review.author;
            if (authorId === user._id) {
              totalReplies++;
            }
          });
        });
        setReplyCount(totalReplies);

      } catch (err) {
        console.error("Error fetching admin stats:", err);
        setError(err.message || 'Failed to fetch stats');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user]); // Re-run if user changes

  if (loading) {
    return <div className="p-4 text-center">Loading stats...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  // Don't render if not admin
  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">My Contributions</h2>
      <hr className="my-4 border-gray-300" /> {/* Updated HR color */}
      <div className="mb-4">
        <h3 className="text-md font-semibold text-gray-700 mb-1">My Assigned Tickets</h3>
        <p className="text-2xl font-bold text-blue-600">{assignedCount}</p>
      </div>
      <div>
        <h3 className="text-md font-semibold text-gray-700 mb-1">My Total Replies</h3>
        <p className="text-2xl font-bold text-purple-600">{replyCount}</p>
      </div>
    </div>
  );
};

export default AdminPersonalStats;
