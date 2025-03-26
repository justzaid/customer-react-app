import React, { useContext, useState, useEffect } from "react";
import { AuthedUserContext } from "../../App";
import * as ticketService from '../../services/ticketService';

// Components
import SideNavbar from "../SideNavbar/SideNavbar";
import AdminDashboardCard from "../AdminDashboardCard/AdminDashboardCard";
import UserDashboardCard from "../UserDashboardCard/UserDashboardCard";
import Navbar from "../Navbar/Navbar";
import MyTickets from "../MyTickets/MyTickets";
import TicketForm from "../TicketForm/TicketForm";

// CSS
import "./Dashboard.css";

const Dashboard = () => {
    const [toggleState, setToggleState] = useState(1);
    const user = useContext(AuthedUserContext);

    const [tickets, setTickets] = useState([]);
    const [loadingTickets, setLoadingTickets] = useState(true);
    const [ticketError, setTicketError] = useState(null);

    const toggleTab = (index) => {
        setToggleState(index);
    };

    const fetchUserTickets = async () => {
        if (user && user.role !== 'admin') { 
            try {
                setLoadingTickets(true);
                const userTickets = await ticketService.getMyTickets();
                setTickets(userTickets);
                setTicketError(null);
            } catch (error) {
                setTicketError('Failed to fetch tickets.');
                setTickets([]);
            } finally {
                setLoadingTickets(false);
            }
        } else {
            setTickets([]); 
            setLoadingTickets(false);
        }
    };

    // fetching tickets when component mounts to be able to display them as tables
    useEffect(() => {
        fetchUserTickets();
    }, [user]);


    const handleTicketCreated = () => {
        fetchUserTickets();
        toggleTab(2);
    };

    // decided to dynamically render the number of opened tickets and then pass it as a prop to use rdashboard
    const openTicketsCount = tickets.filter(ticket => ticket.status === 'Open').length;

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
                            <AdminDashboardCard />
                            
                            </div>
                        )
                    ) : (
                        toggleState === 1 && (
                            <div>
                                <UserDashboardCard openTicketsCount={openTicketsCount} />
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

                            <MyTickets 
                                tickets={tickets} 
                                loading={loadingTickets} 
                                error={ticketError} 
                            /> 
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
                            // Pass callback down to TicketForm
                            <TicketForm onTicketCreated={handleTicketCreated} /> 
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
