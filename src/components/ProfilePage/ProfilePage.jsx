import React, { useContext } from 'react';
import { AuthedUserContext } from '../../App';

const ProfilePage = () => {
  const user = useContext(AuthedUserContext); 

  if (!user) {
    return <div className="p-6">User data not found. Please log in again.</div>;
  }

  return (
    <div className="container mx-auto p-6 max-w-lg bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-700">Profile Information</h1>

      <div className="flex justify-center mb-6">
        <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
          Username
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
          id="username"
          type="text"
          value={user.username || 'N/A'}
          readOnly
          disabled
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
          Email
        </label>
        <div className="flex items-center">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100 mr-2"
            id="email"
            type="email"
            value={user.email || 'N/A'}
            readOnly
            disabled
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline whitespace-nowrap  cursor-not-allowed"
            type="button"
          >
            Change Email
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-1">Email field is currently disabled.</p>
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
          Password
        </label>
        <div className="flex items-center">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100 mr-2"
            id="password"
            type="password"
            value="********"
            readOnly
            disabled
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline whitespace-nowrap cursor-not-allowed"
            type="button"
          >
            Change Password
          </button>
        </div>
         <p className="text-xs text-gray-500 mt-1">Password field is currently disabled.</p>
      </div>

    </div>
  );
};

export default ProfilePage;
