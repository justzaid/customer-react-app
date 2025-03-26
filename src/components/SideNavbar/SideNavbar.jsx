import React from "react";
import { Link } from "react-router-dom"; // Import Link
import { FaHome, FaClipboardList, FaFileAlt, FaCogs, FaUsers, FaFileAlt as FaKnowledgeBase, FaUserAlt } from "react-icons/fa";

const SideNavbar = () => {
    return (
        <div className="fixed top-0 left-0 w-64 bg-gray-900 text-white h-screen p-4 z-20">
            <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
                <ul>
                    <li className="p-2 hover:bg-gray-700 rounded">
                    <Link to="/dashboard" className="flex items-center gap-2">
                        <FaHome /> Home
                    </Link>
                    </li>
                    <li className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded"><FaClipboardList /> Support Tickets</li>
                    <li className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded"><FaKnowledgeBase /> Knowledge Base</li>
                    <li className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded"><FaFileAlt /> Website</li>
                    <li className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded"><FaCogs /> Settings</li>
                    <li className="p-2 hover:bg-gray-700 rounded">
                        <Link to="/support-agents" className="flex items-center gap-2">
                            <FaUsers /> Support Agents
                        </Link>
                    </li>
                    <li className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded"><FaUserAlt /> My profile</li>
                </ul>
        </div>
  );
};

export default SideNavbar;
