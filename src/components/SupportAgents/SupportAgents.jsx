import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import SideNavbar from '../SideNavbar/SideNavbar';
import { getAllUsers } from '../../services/userService';

const SupportAgents = () => {
  const [adminUsers, setAdminUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdminUsers = async () => {
      try {
        setLoading(true);
        const users = await getAllUsers();
        const admins = users.filter(user => user.role === 'admin');
        setAdminUsers(admins);
        setError(null);
      } catch (error) {
        setError('Failed to load support agents.');
        setAdminUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminUsers();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <SideNavbar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-6">
          <div className="container mx-auto">
            <h1 className="text-2xl font-bold mt-5 mb-5">Support Agents</h1>

            {loading && <p>Loading support agents...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {!loading && !error && (
              <div className="bg-white shadow-md rounded my-6">
                <table className="min-w-max w-full table-auto">
                  <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                      <th className="py-3 px-6 text-left">Username</th>
                      <th className="py-3 px-6 text-left">Email</th>
                      <th className="py-3 px-6 text-left">Role</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 text-sm font-light">
                    {adminUsers.length > 0 ? (
                      adminUsers.map((user) => (
                        <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-100">
                          <td className="py-3 px-6 text-left whitespace-nowrap">
                            <div className="flex items-center">
                              <span className="font-medium">{user.username}</span>
                            </div>
                          </td>
                          <td className="py-3 px-6 text-left">
                            <div className="flex items-center">
                              <span>{user.email}</span>
                            </div>
                          </td>
                          <td className="py-3 px-6 text-left">
                            <div className="flex items-center">
                              <span>{user.role}</span>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" className="py-3 px-6 text-center">No support agents found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SupportAgents;
