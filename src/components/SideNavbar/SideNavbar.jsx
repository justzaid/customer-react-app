import React from "react";
import { FaHome, FaClipboardList, FaFileAlt, FaCogs, FaUsers, FaFileAlt as FaKnowledgeBase } from "react-icons/fa";

const SideNavbar = () => {
    return (
        <div className="w-64 bg-gray-900 text-white min-h-screen p-4">
            <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
                <ul>
                    <li className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded"><FaHome /> Home</li>
                    <li className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded"><FaClipboardList /> Support Tickets</li>
                    <li className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded"><FaKnowledgeBase /> Knowledge Base</li>
                    <li className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded"><FaFileAlt /> Website</li>
                    <li className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded"><FaCogs /> Settings</li>
                    <li className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded"><FaUsers /> Support Agents</li>
                </ul>
        </div>
  );
};

export default SideNavbar;

