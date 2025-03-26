const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/users`;

const getAllUsers = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication token not found.');
    }

    const res = await fetch(BASE_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      let errorMsg = `HTTP error! status: ${res.status}`;
      try {
        const errorData = await res.json();
        errorMsg = errorData.message || errorMsg;
      } catch (parseError) {
      }
      throw new Error(errorMsg);
    }

    return res.json();
  } catch (error) {
    throw error;
  }
};

export { getAllUsers };
