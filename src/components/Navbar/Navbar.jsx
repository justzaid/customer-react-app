import React from "react";

const Navbar = () => {
  return (
    <header className="bg-blue-500 text-white p-4 flex justify-between items-center fixed top-0 left-64 right-0 z-10">
      <h1 className="text-lg"><a href="#">Home</a></h1>
      <div className="flex gap-4">
        <a href="#" className="text-white">Messages</a>
        <a href="#" className="text-white">Profile</a>
        <a href="#" className="text-white">Sign Out</a>
      </div>
    </header>
  );
};

export default Navbar;
