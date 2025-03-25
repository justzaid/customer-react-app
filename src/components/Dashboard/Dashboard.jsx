import React, { useContext, useState } from "react";
import { AuthedUserContext } from "../../App";

// Components
import SideNavbar from "../SideNavbar/SideNavbar";
import DashboardCard from "../../DashboardCard/DashboardCard";
import TicketList from "../TicketList/TicketList";
import Navbar from "../Navbar/Navbar";

// CSS
import "./Dashboard.css";

const Dashboard = () => {
    const [toggleState, setToggleState] = useState(1);
    const user = useContext(AuthedUserContext);

    const toggleTab = (index) => {
        setToggleState(index);
    };

    return (
        <div className="flex">
            <SideNavbar />
            
            <div className="p-6 bg-gray-100 min-h-screen flex-1">

                <Navbar />

                <h2 className="text-2xl font-semibold mt-20 mb-5">Welcome back, {user.username}</h2>
                
                <div className="bg-white rounded-lg shadow-md">
                    <div className="tabs-container">

                        <button 
                            className={`tab-button ${toggleState === 1 ? "active" : ""}`}
                            onClick={() => toggleTab(1)}>
                            Dashboard
                        </button> 



                        {user.role === "admin" ? 
                        <button 
                            className={`tab-button ${toggleState === 2 ? "active" : ""}`}
                            onClick={() => toggleTab(2)}>
                            All Tickets
                        </button>
                        : 
                        <button 
                            className={`tab-button ${toggleState === 2 ? "active" : ""}`}
                            onClick={() => toggleTab(2)}>
                            My Tickets
                        </button>
                        }




                        {user.role === "admin" ? 
                        <button 
                            className={`tab-button ${toggleState === 3 ? "active" : ""}`}
                            onClick={() => toggleTab(3)}>
                            My Assigned Tickets
                        </button>
                        : 
                        <button 
                            className={`tab-button ${toggleState === 3 ? "active" : ""}`}
                            onClick={() => toggleTab(3)}>
                            Submit a new Ticket
                        </button>
                        }




                        {user.role === "admin" ? 
                        <button 
                            className={`tab-button ${toggleState === 4 ? "active" : ""}`}
                            onClick={() => toggleTab(4)}>
                            Live support
                        </button>
                        : 
                        <button 
                            className={`tab-button ${toggleState === 4 ? "active" : ""}`}
                            onClick={() => toggleTab(4)}>
                            Live support
                        </button>
                        }    
                    </div>

                    <div className="p-6">
                        {user.role === "admin" ? (
                        toggleState === 1 && (
                            <div>
                            <DashboardCard />
                            <TicketList />
                            </div>
                        )
                        ) : (
                        toggleState === 1 && (
                            <div>
                            Content will be added soon
                            </div>
                        )
                        )}



                        {user.role === "admin" ? (
                        toggleState === 2 && (
                            <div>
                                <h2 className="text-xl font-bold">All Tickets</h2>
                                <hr className="my-2" />
                                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit...</p>
                            </div>
                        )
                        ) : (
                        toggleState === 2 && (
                            <div>
                            Content will be added soon
                            </div>
                        )
                        )}



                        {user.role === "admin" ? (
                        toggleState === 3 && (
                            <div>
                                <h2 className="text-xl font-bold">My Assigned Tickets</h2>
                                <hr className="my-2" />
                                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit...</p>
                            </div>
                        )
                        ) : (
                        toggleState === 3 && (
                            <div>
                            Content will be added soon
                            </div>
                        )
                        )}



                        {user.role === "admin" ? (
                        toggleState === 4 && (
                            <div>
                                <h2 className="text-xl font-bold">Live support</h2>
                                <hr className="my-2" />
                                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit...</p>
                            </div>
                        )
                        ) : (
                        toggleState === 4 && (
                            <div>
                            Content will be added soon
                            </div>
                        )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
