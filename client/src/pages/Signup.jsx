import { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      username: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      await axios.post(
        "https://mapin-backend.vercel.app/api/users/register",
        newUser
      );
      setError(false);
      setSuccess(true);
      navigate("/login");
    } catch (error) {
      setError(true);
    }
  };

  return (
    <main style={{ backgroundImage: `url("https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`, backgroundSize: "cover", backgroundPosition: "center" }}>
      <div className="flex justify-center items-center min-h-screen">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-200 shadow-md rounded px-10 pt-6 pb-8 border border-black"
          style={{ maxWidth: "400px", width: "90%", minWidth: "280px" }}
        >
          <div className="mb-4">
            <div className="mb-6 flex justify-center font-bold text-2xl text-gray-800">
              <h1>Register</h1>
            </div>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
              type="text"
              placeholder="Username"
              ref={nameRef}
            />
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
              type="email"
              placeholder="Email"
              ref={emailRef}
            />
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              placeholder="Password"
              ref={passwordRef}
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign Up
            </button>
          </div>
          {success && <p className="text-green-500 text-center mt-4">Successfully signed up!</p>}
          {error && <p className="text-red-500 text-center mt-4">Something went wrong!</p>}
        </form>
      </div>
    </main>
  );
}
