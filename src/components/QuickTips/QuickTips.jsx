import React from 'react';

const QuickTips = () => {
    const tips = [
    { id: 1, title: "🗂️ Dashboard Cards", description: "Dashboard cards display open, replied, and closed tickets, providing a quick overview of the ticket statuses for efficient management." },
    { id: 2, title: "🎫 Ticket Assignment", description: "To assign yourself to a user ticket, simply click on the 'Manage' button in the 'Assigned To' column to take ownership and manage the ticket effectively." },
    { id: 3, title: "👨🏻‍💻 How to Manage User Tickets", description: "Click on the 'View' button in the 'Actions' column to access detailed information about the ticket. From there, you can edit, delete, or send reviews as needed." },
    { id: 4, title: "📥 Selecting Ticket Status", description: "Choose the appropriate status from the dropdown to update the ticket status. This change will reflect across all user pages for consistency." },
    { id: 5, title: "📝 Sending Ticket Reviews", description: "Send ticket reviews as forum posts to keep users informed about the status of their tickets and actions taken by the admin team." }
    ];

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mt-3 mb-5">Ticket management tips</h2>
      <div className="space-y-4">
        <div className="p-4 border rounded shadow-sm">
          {tips.map((tip, index) => (
            <React.Fragment key={tip.id}>
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">{tip.title}</h3>
                <p>{tip.description}</p>
              </div>
              {index < tips.length - 1 && <hr className="my-4 border-gray-300" />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickTips;
