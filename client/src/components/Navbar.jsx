import React from "react";

export default function Navbar() {
  const currentUser = "jc low";
  return (
    <div>
      {currentUser ? (
        <button className="absolute top-10 right-10 px-4 py-1 cursor-pointer bg-red-500">
          Log out
        </button>
      ) : (
        <div className="absolute top-10 right-10 flex space-x-2">
          <button className="bg-red">Login</button>
          <button className="bg-red">Register</button>
        </div>
      )}
    </div>
  );
}
