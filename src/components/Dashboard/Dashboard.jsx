import React from "react";
import { Card, CardContent } from '../Card/Card'
import { FaBell, FaClipboardList, FaFileAlt, FaHome, FaCogs, FaUsers, FaFileAlt as FaKnowledgeBase } from "react-icons/fa";

const Dashboard = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white min-h-screen p-4">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <ul>
          <li className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded"><FaHome /> Home</li>
          <li className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded"><FaClipboardList /> Support Tickets</li>
          <li className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded"><FaKnowledgeBase /> Knowledge Base</li>
          <li className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded"><FaFileAlt /> Website</li>
          <li className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded"><FaCogs /> Settings</li>
          <li className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded"><FaUsers /> Support Agents</li>
        </ul>
      </div>
      
      <div className="p-6 bg-gray-100 min-h-screen flex-1">
        <header className="bg-blue-500 text-white p-4 flex justify-between items-center fixed top-0 left-64 right-0 z-10">
          <h1 className="text-lg"><a href="#">Dashboard</a></h1>
          <div className="flex gap-4">
            <a href="#" className="text-white">Messages</a>
            <a href="#" className="text-white">Profile</a>
            <a href="#" className="text-white">Sign Out</a>
          </div>
        </header>
        <div className="grid grid-cols-4 gap-4 mt-20">
          <Card className="p-4 bg-blue-100">
            <CardContent className="flex items-center justify-between">
              <FaFileAlt size={40} className="text-blue-500" />
              <div className="text-right">
                <h2 className="text-2xl font-bold">4</h2>
                <p>Help Articles</p>
              </div>
            </CardContent>
          </Card>
          <Card className="p-4 bg-green-100">
            <CardContent className="flex items-center justify-between">
              <FaBell size={40} className="text-green-500" />
              <div className="text-right">
                <h2 className="text-2xl font-bold">0</h2>
                <p>New Tickets</p>
              </div>
            </CardContent>
          </Card>
          <Card className="p-4 bg-orange-100">
            <CardContent className="flex items-center justify-between">
              <FaClipboardList size={40} className="text-orange-500" />
              <div className="text-right">
                <h2 className="text-2xl font-bold">2</h2>
                <p>Replied Tickets</p>
              </div>
            </CardContent>
          </Card>
          <Card className="p-4 bg-red-100">
            <CardContent className="flex items-center justify-between">
              <FaFileAlt size={40} className="text-red-500" />
              <div className="text-right">
                <h2 className="text-2xl font-bold">2</h2>
                <p>Closed Tickets</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <section className="mt-6 bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-bold mb-2">New Tickets</h2>
          <div className="border-t pt-2 text-gray-500">No new tickets available.</div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
