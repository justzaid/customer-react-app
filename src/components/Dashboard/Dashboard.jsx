import React, { useContext, useState, useEffect } from "react";
import { AuthedUserContext } from "../../App";
import { getMyTickets, getAllTickets } from '../../services/ticketService'; 

// Components
import AdminDashboardCard from "../AdminDashboardCard/AdminDashboardCard";
import UserDashboardCard from "../UserDashboardCard/UserDashboardCard";
import MyTickets from "../MyTickets/MyTickets";
import AllTickets from "../AllTickets/AllTickets";
import TicketForm from "../TicketForm/TicketForm";
import MyAssignedTickets from "../MyAssignedTickets/MyAssignedTickets";

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

    // Function to fetch appropriate tickets based on role
    const fetchTickets = async () => {
        if (!user) return; // Exit if user is not defined

        setLoadingTickets(true);
        setTicketError(null);

        try {
            let fetchedTickets;
            if (user.role === 'admin') {
                fetchedTickets = await getAllTickets(); 
            } else {
                fetchedTickets = await getMyTickets();
            }
            setTickets(fetchedTickets);
        } catch (error) {
            console.error("Dashboard fetchTickets error:", error);
            setTicketError(`Failed to fetch tickets: ${error.message || error}`);
        } finally {
            setLoadingTickets(false);
        }
    };

    // Fetch tickets when component mounts or user changes
    useEffect(() => {
        fetchTickets();
    }, [user]); // Re-fetch if user context changes


    const handleTicketCreated = () => {
        fetchTickets();
        toggleTab(2);
    };

    // Handler for when a ticket is assigned in the AllTickets component
    const handleTicketAssigned = (updatedTicket) => {
        setTickets(prevTickets => 
            prevTickets.map(ticket => 
                ticket._id === updatedTicket._id ? updatedTicket : ticket
            )
        );
    };

    // Calculate counts based on the current tickets state
    const openTicketsCount = tickets.filter(ticket => ticket.status === 'Open').length;
    const repliedTicketsCount = tickets.filter(ticket => ticket.status === 'In progress').length;
    const closedTicketsCount = tickets.filter(ticket => ticket.status === 'Closed').length;
    const resolvedTicketsCount = tickets.filter(ticket => ticket.status === 'Resolved').length;

    // Function to switch to the My Tickets tab (index 2)
    const switchToMyTicketsTab = () => {
        toggleTab(2);
    };


    return (
        <div className="p-6 bg-gray-100 min-h-screen flex-1"> 
            <h2 className="text-2xl font-semibold mt-10 mb-5">Welcome back, {user?.username || 'User'}</h2>
                
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
                        <button 
                            className={`tab-button ${toggleState === 4 ? "active" : ""}`}
                            onClick={() => toggleTab(4)}>
                            Live support
                        </button>
                    </div>

                    <div className="p-6">
                        {toggleState === 1 && (
                            user.role === "admin" ? (
                                <div>
                                    <AdminDashboardCard 
                                        openTicketsCount={openTicketsCount} 
                                        repliedTicketsCount={repliedTicketsCount}
                                        closedTicketsCount={closedTicketsCount}
                                        resolvedTicketsCount={resolvedTicketsCount}
                                    />
                                </div>
                            ) : (
                                <div>
                                    <UserDashboardCard 
                                        openTicketsCount={openTicketsCount} 
                                        viewOpenTickets={switchToMyTicketsTab}
                                        closedTicketsCount={closedTicketsCount}
                                        resolvedTicketsCount={resolvedTicketsCount}
                                        repliedTicketsCount={repliedTicketsCount}
                                    />
                                </div>
                            )
                        )}

                        {toggleState === 2 && (
                            user.role === "admin" ? (
                                <AllTickets 
                                    tickets={tickets} 
                                    loading={loadingTickets} 
                                    error={ticketError} 
                                    onTicketAssigned={handleTicketAssigned}
                                />
                            ) : (
                                <MyTickets 
                                    tickets={tickets} 
                                    loading={loadingTickets} 
                                    error={ticketError} 
                                /> 
                            )
                        )}

                        {toggleState === 3 && (
                            user.role === "admin" ? (
                                // Render the MyAssignedTickets component
                                <MyAssignedTickets /> 
                            ) : (
                                <TicketForm onTicketCreated={handleTicketCreated} /> 
                            )
                        )}

                        {toggleState === 4 && (
                            user.role === "admin" ? (
                                <div>
                                    <h2 className="text-xl font-bold">Live support</h2>
                                    <hr className="my-2" />
                                    <p>Feature coming soon...</p>
                                </div>
                            ) : (
                                <div>
                                    <h2 className="text-xl font-bold">Live support</h2>
                                    <hr className="my-2" />
                                    <p>Feature coming soon...</p>
                                </div>
                            )
                        )}
                    </div>
                </div>
        </div>
    );
};

export default Dashboard;
