const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/tickets`;

const index = async () => {
  try {
    const res = await fetch(BASE_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};


const getMyTickets = async () => {
  try {

    const res = await fetch(`${BASE_URL}/my-tickets`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    if (!res.ok) {

      const errorData = await res.json();
      throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching user's tickets:", error);
    throw error;
  }
};

// Function specifically for admins to get all tickets
const getAllTickets = async () => {
  try {
    const res = await fetch(`${BASE_URL}/all`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching all tickets:", error);
    throw error;
  }
};

const create = async (ticketFormData) => {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ticketFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const createReview = async (ticketId, reviewFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/${ticketId}/reviews`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const deleteTicket = async (ticketId) => {
  try {
    const res = await fetch(`${BASE_URL}/${ticketId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const update = async (ticketId, ticketFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/${ticketId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ticketFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const deleteReview = async (ticketId, reviewId) => {
  try {
    const res = await fetch(`${BASE_URL}/${ticketId}/reviews/${reviewId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (res.ok) {
      return true;
    } else {
      throw new Error('Failed to delete review');
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

const updateReview = async (ticketId, reviewId, reviewFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/${ticketId}/reviews/${reviewId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const getTickets = async () => {
  try {
    const res = await fetch(BASE_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return res.json();
  } catch (error) {
    console.error('Error fetching tickets:', error);
    throw error;
  }
};

const getTicketById = async (ticketId) => {
  try {
    const res = await fetch(`${BASE_URL}/my-tickets/${ticketId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching ticket:", error);
    throw error;
  }
};

// Function for an admin to assign a ticket to themselves
const assignTicket = async (ticketId) => {
  try {
    const res = await fetch(`${BASE_URL}/${ticketId}/assign`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error("Error assigning ticket:", error);
    throw error;
  }
};

// Function for an admin to get tickets assigned to them
const getMyAssignedTickets = async () => {
  try {
    const res = await fetch(`${BASE_URL}/assigned-to-me`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching assigned tickets:", error);
    throw error;
  }
};

// Function for an admin to get ticket statistics
const getTicketStats = async (groupBy = 'day') => {
  try {
    const url = new URL(`${BASE_URL}/stats`);
    url.searchParams.append('groupBy', groupBy);

    const res = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching ticket stats:", error);
    throw error;
  }
};


export {
  index,
  create,
  createReview,
  deleteTicket,
  update,
  deleteReview,
  updateReview,
  getMyTickets,
  getTickets,
  getTicketById,
  getAllTickets,
  assignTicket,
  getMyAssignedTickets,
  getTicketStats
};
