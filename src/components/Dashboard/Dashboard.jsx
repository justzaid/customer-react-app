import React from "react";
import Navbar from "../Navbar/Navbar";
import SideNavbar from "../SideNavbar/SideNavbar";
import { Card, CardContent } from '../Card/Card';
import { FaBell, FaClipboardList, FaFileAlt, FaHome, FaCogs, FaUsers, FaFileAlt as FaKnowledgeBase } from "react-icons/fa";

const Dashboard = () => {
  return (
    <div className="flex">
      <SideNavbar /> {/* Use the component here */}
      
      <div className="p-6 bg-gray-100 min-h-screen flex-1">
        <Navbar />

        {/* Dashboard Title */}
        <h2 className="text-2xl font-bold mt-20 mb-4">Dashboard</h2>

        {/* Cards Section */}
        <div className="grid grid-cols-4 gap-4">
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

        {/* New Tickets Section */}
        <section className="mt-6 bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-bold mb-2">New Tickets</h2>
          <div className="border-t pt-2 text-gray-500">No new tickets available.</div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
