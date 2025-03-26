import React, { useState } from 'react';

const ReviewForm = ({ onSubmit }) => {
  const [description, setDescription] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!description.trim()) {
      return;
    }
    onSubmit({ description });
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <h3 className="text-lg font-semibold mb-3">Add a Review</h3>
      <div className="mb-4">
        <label htmlFor="reviewDescription" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          id="reviewDescription"
          name="description"
          rows="4"
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          required
        ></textarea>
      </div>
      <button
        type="submit"
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
