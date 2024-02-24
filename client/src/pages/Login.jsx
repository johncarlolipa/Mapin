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
      setLoading(false);
    }
  };

  return (
    <main
      style={{
        backgroundImage: `url("https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-gray-200 shadow-md rounded px-8 pt-8 pb-6 border border-black"
        style={{ width: "90%", maxWidth: "400px" }}
      >
        <div className="mb-8">
          <h1 className="text-center font-bold text-2xl mb-4">Log in</h1>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
            type="text"
            placeholder="Username"
            ref={nameRef}
          />
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            placeholder="Password"
            ref={passwordRef}
          />
        </div>
        <div className="flex justify-center">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
        {success && (
          <p className="text-green-500 text-center mt-4">
            Successfully logged in!
          </p>
        )}
        {error && (
          <p className="text-red-500 text-center mt-4">Something went wrong!</p>
        )}
      </form>
    </main>
  );
}
