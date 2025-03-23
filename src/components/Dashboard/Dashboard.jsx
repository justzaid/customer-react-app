import React from "react";
import Navbar from "../Navbar/Navbar";
import SideNavbar from "../SideNavbar/SideNavbar";
import DashboardCard from "../../DashboardCard/DashboardCard";
import TicketList from "../TicketList/TicketList";

const Dashboard = () => {
  return (
    <div className="flex">
        <SideNavbar />
              
        <div className="p-6 bg-gray-100 min-h-screen flex-1">
            <Navbar />

            <h2 className="text-2xl font-semibold mt-20 mb-4">Dashboard</h2>

            <DashboardCard />

            <TicketList />            
        </div>
    </div>
  );
};

export default Dashboard;
