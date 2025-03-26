import React, { useState } from 'react';
import * as ticketService from '../../services/ticketService';

// Accept onTicketCreated prop from Dashboard
const TicketForm = ({ onTicketCreated }) => {
  const categories = [
    'Delayed Flight', 'Canceled Flight', 'Missed Connection', 'Lost Baggage',
    'Damaged Baggage', 'Delayed Baggage', 'Incorrect Booking Details',
    'Refund & Compensation', 'Seat Assignment Issue', 'Uncomfortable Seats',
    'Food & Catering Issue', 'Restroom & Cleanliness', 'Rude Staff',
    'Customer Service Complaint', 'Online Check-in Problem', 'App or Website Issue',
    'Disability Assistance', 'Infant & Child Services', 'Other'
  ];

  const [formData, setFormData] = useState({
    subject: '',
    category: categories[0],
    description: '',
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
    setSuccessMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage('');
    setIsSubmitting(true);

    try {
      const newTicket = await ticketService.create(formData);
      if (newTicket && newTicket.subject) {
        setSuccessMessage(`Ticket "${newTicket.subject}" created successfully!`);
        // Call the callback function passed from Dashboard
        if (onTicketCreated) {
          onTicketCreated();
        }
      } else {
        setSuccessMessage('Ticket submitted successfully!');
        console.warn('Ticket creation response might be missing details:', newTicket);
        // Still call the callback even if details are missing, as the list might need refreshing
        if (onTicketCreated) {
          onTicketCreated();
        }
      }
      setFormData({
        subject: '',
        category: categories[0],
        description: '',
      });
    } catch (err) {
      console.error("Error submitting ticket:", error);
      setError(err.message || 'Failed to submit ticket. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="ticket-form-container p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Submit a New Ticket</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="e.g., Flight Delay Compensation"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Please provide details about your issue..."
          ></textarea>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            <strong>Error:</strong> {error}
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            {successMessage}
          </div>
        )}

        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 ${isSubmitting ? 'cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Ticket'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TicketForm;
