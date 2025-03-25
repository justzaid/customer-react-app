import React from "react";
import './Navbar.css'

const Navbar = () => {
  return (
    <header className="bg-[#00A4E8] text-white p-3 flex justify-between items-center fixed top-0 left-64 right-0 z-10">
      <h1><a href="#">Home</a></h1>
      <div className="nav-container flex gap-4">
        <a href="#" className="navbar-a">Messages</a>
        <a href="#" className="navbar-a">Profile</a>
        <a href="/signin" className="navbar-a">Sign Out</a>
      </div>
    </header>
  );
};

export default Navbar;
