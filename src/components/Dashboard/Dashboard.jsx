import React from "react";
import Navbar from "../Navbar/Navbar";
import SideNavbar from "../SideNavbar/SideNavbar";
import DashboardCard from "../../DashboardCard/DashboardCard";

const Dashboard = () => {
  return (
    <div className="flex">
        <SideNavbar />
              
        <div className="p-6 bg-gray-100 min-h-screen flex-1">
            <Navbar />

            <h2 className="text-2xl font-bold mt-20 mb-4">Dashboard</h2>

            <DashboardCard />

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
