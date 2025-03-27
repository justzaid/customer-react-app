import React, { useContext } from "react"
import { Link } from "react-router-dom"; 
import { FaHome, FaClipboardList, FaCogs, FaUsers, FaHeadset, FaUserAlt, FaTicketAlt, FaPlusCircle } from "react-icons/fa";
import { MdLiveHelp } from "react-icons/md";
import { AuthedUserContext } from "../../App";

const SideNavbar = () => {
    const user = useContext(AuthedUserContext);

    // Determine links based on user role
    const navLinks = user?.role === 'admin' ? (
        <>
            <li className="p-2 hover:bg-gray-700 rounded">
                <Link to="/my-assigned-tickets" className="flex items-center gap-2">
                    <FaTicketAlt /> My Assigned Tickets
                </Link>
            </li>
            <li className="p-2 hover:bg-gray-700 rounded">
                <span className="flex items-center gap-2 text-gray-500 cursor-not-allowed">
                    <FaHeadset /> Live Support
                </span>
            </li>
             <li className="p-2 hover:bg-gray-700 rounded">
                <Link to="/support-agents" className="flex items-center gap-2">
                    <FaUsers /> Support Agents
                </Link>
            </li>
            <li className="p-2 hover:bg-gray-700 rounded">
                <Link to="/quick-tips" className="flex items-center gap-2">
                    <MdLiveHelp /> Quick Tips
                </Link>
            </li>
        </>
    ) : (
        <>
            <li className="p-2 hover:bg-gray-700 rounded">
                <Link to="/dashboard" className="flex items-center gap-2">
                    <FaClipboardList /> My Tickets
                </Link>
            </li>
            <li className="p-2 hover:bg-gray-700 rounded">
                 <span className="flex items-center gap-2 text-gray-500 cursor-not-allowed">
                    <FaPlusCircle /> Submit a new Ticket
                 </span>
            </li>
            <li className="p-2 hover:bg-gray-700 rounded">
                <span className="flex items-center gap-2 text-gray-500 cursor-not-allowed">
                    <FaHeadset /> Live Support
                </span>
            </li>
        </>
    );

    return (
        <div className="fixed top-0 left-0 w-64 bg-gray-900 text-white h-screen p-4 z-20">
            <h2 className="text-xl font-bold mb-6">{user?.role === 'admin' ? 'Admin Panel' : 'Customer Portal'}</h2> 
                <ul>
                    <li className="p-2 hover:bg-gray-700 rounded">
                        <Link to="/dashboard" className="flex items-center gap-2">
                            <FaHome /> Dashboard
                        </Link>
                    </li>
                    
                    {navLinks} 

                    <li className="p-2 hover:bg-gray-700 rounded">
                        <span className="flex items-center gap-2 text-gray-500 cursor-not-allowed">
                            <FaUserAlt /> My Profile
                        </span>
                    </li>
                    {user?.role === 'admin' && (
                         <li className="p-2 hover:bg-gray-700 rounded">
                            <span className="flex items-center gap-2 text-gray-500 cursor-not-allowed">
                                <FaCogs /> Settings
                            </span>
                        </li>
                    )}
                </ul>
        </div>
  );
};

export default SideNavbar;
