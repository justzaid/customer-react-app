import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as ticketService from '../../services/ticketService';

const TicketForm = ({ onTicketCreated }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

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
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      const fetchTicketData = async () => {
        setIsFetching(true);
        setError(null);
        try {
          const ticketData = await ticketService.getTicketById(id);
          setFormData({
            subject: ticketData.subject || '',
            category: categories.includes(ticketData.category) ? ticketData.category : categories[0],
            description: ticketData.description || '',
          });
        } catch (error) {
          setError(err.message || 'Failed to load ticket data.');
        } finally {
          setIsFetching(false);
        }
      };
      fetchTicketData();
    } else {
      setFormData({
        subject: '',
        category: categories[0],
        description: '',
      });
    }
  }, [id, isEditMode]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    setError(null);
    setSuccessMessage('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccessMessage('');
    setIsLoading(true);

    try {
      let result;
      if (isEditMode) {
        result = await ticketService.update(id, formData);
        if (result && result._id) {
          setSuccessMessage(`Ticket "${result.subject}" updated successfully!`);
          setTimeout(() => navigate(`/tickets/${id}`), 1000);
        } else {
          setError('Failed to update ticket. Response was unexpected.');
        }
      } else {
        result = await ticketService.create(formData);
        if (result && result.subject) {
          setSuccessMessage(`Ticket "${result.subject}" created successfully!`);
          if (onTicketCreated) {
            onTicketCreated();
          }
          setFormData({
            subject: '',
            category: categories[0],
            description: '',
          });
        } else {
          setError('Failed to create ticket. Response was unexpected.');
        }
      }
    } catch (error) {
      setError(error.message || `Failed to ${isEditMode ? 'update' : 'submit'} ticket. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return <div className="p-4">Loading ticket data...</div>;
  }

  return (
    <div className="ticket-form-container p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-semibold mb-5">
        {isEditMode ? 'Edit Ticket' : 'Submit a New Ticket'}
      </h2>
      <form onSubmit={handleSubmit} className="max-w-2xl">
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
            disabled={isLoading}
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
            disabled={isLoading}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-5">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="5"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Please provide details about your issue..."
            disabled={isLoading}
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

        <div className="flex justify-start gap-3">
          {isEditMode && (
             <button
                type="button"
                onClick={() => navigate(`/tickets/${id}`)}
                disabled={isLoading}
                className="px-4 py-2 bg-gray-500 text-white font-semibold rounded-md shadow hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 disabled:opacity-50"
              >
                Cancel
              </button>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className={`px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 ${isLoading ? 'cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Saving...' : (isEditMode ? 'Update Ticket' : 'Submit Ticket')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TicketForm;
