import React from 'react'

const Navbar = ({ handleSignout }) => {
    return (
        <header className="bg-[#00A4E8] text-white p-3 flex justify-between items-center fixed top-0 left-64 right-0 z-10">
        <h1><a href="#">Home</a></h1>
        <div className="nav-container flex gap-4">
            <a href="#" className="navbar-a">Messages</a>
            <a href="#" className="navbar-a">Profile</a>
            <button className="navbar-a" onClick={handleSignout}>Sign Out</button>
        </div>
    </header>
    )
}

export default Navbar