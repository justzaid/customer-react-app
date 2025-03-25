import React, { useContext, useState } from "react";
// import Navbar from "../Navbar/Navbar";
import SideNavbar from "../SideNavbar/SideNavbar";
import DashboardCard from "../../DashboardCard/DashboardCard";
import TicketList from "../TicketList/TicketList";
import { AuthedUserContext } from "../../App";

import "./Dashboard.css";

const Dashboard = ({ handleSignout }) => {
    const [toggleState, setToggleState] = useState(1);
    const user = useContext(AuthedUserContext);

    const toggleTab = (index) => {
        setToggleState(index);
    };

    return (
        <div className="flex">
            <SideNavbar />
            
            <div className="p-6 bg-gray-100 min-h-screen flex-1">

                <header className="bg-[#00A4E8] text-white p-3 flex justify-between items-center fixed top-0 left-64 right-0 z-10">
                    <h1><a href="#">Home</a></h1>
                    <div className="nav-container flex gap-4">
                        <a href="#" className="navbar-a">Messages</a>
                        <a href="#" className="navbar-a">Profile</a>
                        <button className="navbar-a" onClick={handleSignout}>Sign Out</button>
                    </div>
                </header>

                <h2 className="text-2xl font-semibold mt-20 mb-5">Welcome back, Admin</h2>

                <div className="bg-white rounded-lg shadow-md">
                    <div className="tabs-container">
                        <button 
                            className={`tab-button ${toggleState === 1 ? "active" : ""}`}
                            onClick={() => toggleTab(1)}>
                            Dashboard
                        </button>

                        <button 
                            className={`tab-button ${toggleState === 2 ? "active" : ""}`}
                            onClick={() => toggleTab(2)}>
                            All Tickets
                        </button>

                        <button 
                            className={`tab-button ${toggleState === 3 ? "active" : ""}`}
                            onClick={() => toggleTab(3)}>
                            My Assigned Tickets
                        </button>

                        <button 
                            className={`tab-button ${toggleState === 4 ? "active" : ""}`}
                            onClick={() => toggleTab(4)}>
                            Live Support
                        </button>
                    </div>

                    <div className="p-6">
                        {toggleState === 1 && (
                            <div>
                                <DashboardCard />
                                <TicketList />
                            </div>
                        )}

                        {toggleState === 2 && (
                            <div>
                                <h2 className="text-xl font-bold">All Tickets</h2>
                                <hr className="my-2" />
                                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit...</p>
                            </div>
                        )}

                        {toggleState === 3 && (
                            <div>
                                <h2 className="text-xl font-bold">My Assigned Tickets</h2>
                                <hr className="my-2" />
                                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit...</p>
                            </div>
                        )}

                        {toggleState === 4 && (
                            <div>
                                <h2 className="text-xl font-bold">Live support</h2>
                                <hr className="my-2" />
                                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit...</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
