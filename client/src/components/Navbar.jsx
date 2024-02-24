import React from "react";
import { Link } from "react-router-dom";
import PlaceIcon from '@mui/icons-material/Place';

export default function Navbar({ currentUser, handleLogout }) {
  return (
    <div className="sticky top-0 z-10 bg-yellow-100 shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link to="/" className="text-xl font-bold text-gray-800">
          Map<PlaceIcon />n
        </Link>

        <div>
          {currentUser ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-md mr-4 focus:outline-none hover:bg-red-600"
            >
              Log out
            </button>
          ) : (
            <div className="flex space-x-4">
              <Link to="/login">
                <button className="px-4 py-2 bg-green-500 text-white rounded-md focus:outline-none hover:bg-green-600">
                  Login
                </button>
              </Link>

              <Link to="/signup">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-600">
                  Sign Up
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
