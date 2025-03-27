import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaHome } from 'react-icons/fa';

const Navbar = ({ handleSignout }) => {
    return (
        <header className="bg-[#FF981F] text-white p-3 flex justify-between items-center fixed top-0 left-64 right-0 z-10">
        <Link to="/dashboard" className="text-2xl"> 
            <FaHome />
        </Link>
        <div className="nav-container flex gap-4 items-center">
            <Link to="/profile" className="navbar-a text-xl">
                <FaUser />
            </Link>
            <button className="navbar-a" onClick={handleSignout}>Sign Out</button>
        </div>
    </header>
    )
}

export default Navbar
