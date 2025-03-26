import React, { useContext, useState, useEffect } from "react";
import { AuthedUserContext } from "../../App";
// Import specific functions needed
import { getMyTickets, getAllTickets } from '../../services/ticketService'; 

// Components
// SideNavbar is rendered in App.jsx, remove from here
import AdminDashboardCard from "../AdminDashboardCard/AdminDashboardCard";
import UserDashboardCard from "../UserDashboardCard/UserDashboardCard";
import MyTickets from "../MyTickets/MyTickets";
import AllTickets from "../AllTickets/AllTickets"; // Import AllTickets
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

    // Renamed function to fetch appropriate tickets based on role
    const fetchTickets = async () => {
        if (!user) return; // Exit if user is not defined

        setLoadingTickets(true);
        setTicketError(null);
        setTickets([]); // Clear previous tickets

        try {
            let fetchedTickets;
            if (user.role === 'admin') {
                // Fetch all tickets for admin
                fetchedTickets = await getAllTickets(); 
            } else {
                // Fetch only user's tickets
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
        toggleTab(2); // Switch to My Tickets / All Tickets tab
    };

    // decided to dynamically render the number of opened tickets and then pass it as a prop to use rdashboard
    const openTicketsCount = tickets.filter(ticket => ticket.status === 'Open').length;
    const repliedTicketsCount = tickets.filter(ticket => ticket.status === 'In progress').length;
    const closedTicketsCount = tickets.filter(ticket => ticket.status === 'Closed').length;
    const resolvedTicketsCount = tickets.filter(ticket => ticket.status === 'Resolved').length;

    // Function to switch to the My Tickets tab (index 2)
    const switchToMyTicketsTab = () => {
        toggleTab(2);
    };


    return (
        // Remove the outer flex container and SideNavbar rendering
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
                                />
                            ) : (
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
        </div> // Closing div for the main content area
    );
};

export default Dashboard;
