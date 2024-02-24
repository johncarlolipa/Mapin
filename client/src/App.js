import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";

export default function App() {

  const storage = window.localStorage;
  const [currentUser, setCurrentUser] = useState(storage.getItem("user"));

  const handleLogout = () => {
    storage.removeItem("user");
    setCurrentUser(null);
  };

  return (
    <div>
      <Router>
        <Navbar currentUser={currentUser} handleLogout={handleLogout} />
        <Routes>
          <Route
            path="/"
            element={currentUser ? <Home currentUser={currentUser} /> : <Navigate to="/login" />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/login"
            element={<Login storage={storage} setUser={setCurrentUser} />}
          />
        </Routes>
      </Router>
    </div>
  );
}
