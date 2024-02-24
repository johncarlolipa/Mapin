import { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login({ storage, setUser }) {
  const [loading, setLoading] = useState(false); // Add loading state
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const nameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username: nameRef.current.value,
      password: passwordRef.current.value,
    };

    setLoading(true); // Set loading state to true when submitting the form

    try {
      const res = await axios.post(
        "https://mapin-backend.vercel.app/api/users/login",
        user
      );
      storage.setItem("user", res.data.username);
      setUser(res.data.username);
      setError(false);
      setSuccess(true);
      navigate("/");
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false); // Set loading state back to false after request completes
    }
  };

  return (
    <main>
      <div className="flex justify-center items-center h-screen">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-200 shadow-md rounded px-10 py-10 pt-6 pb-8 mb-4 border border-black"
        >
          <div className="mb-4">
            <div className="mb-10 flex justify-center font-bold text-2xl">
              <h1>Log in here</h1>
            </div>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Username"
              ref={nameRef}
            />
          </div>
          <div className="mb-6">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              placeholder="Password"
              ref={passwordRef}
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
          {success && <p className="text-green-500">Successfully signed up!</p>}
          {error && <p className="text-red-500">Something went wrong!</p>}
        </form>
      </div>
    </main>
  );
}
