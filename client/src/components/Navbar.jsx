import React from "react";
import { Link } from "react-router-dom";

export default function Navbar({ currentUser, handleLogout }) {
  return (
    <div className="top-0 sticky z-10 bg-white w-full">
      {currentUser ? (
        <button
          onClick={handleLogout}
          className="absolute top-10 right-10 px-4 py-1 cursor-pointer bg-red-500 z-10"
        >
          Log out
        </button>
      ) : (
        <div className="absolute top-10 right-10 flex space-x-2">
          <Link to="/login">
            <button className="px-4 py-1 bg-green-500">Login</button>
          </Link>

          <Link to="/signup">
            <button className="px-4 py-1 bg-blue-500">Sign Up</button>
          </Link>
        </div>
      )}
    </div>
  );
}
