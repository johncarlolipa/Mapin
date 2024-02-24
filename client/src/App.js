import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";

export default function App() {
  const user = "jc";
  return (
    <div>
      <Router>
      <Navbar />
        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/login" />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          {/* <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          /> */}
        </Routes>
      </Router>
    </div>
  );
}
