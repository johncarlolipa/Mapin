import { useRef, useState } from "react";
import axios from "axios";

export default function Signup() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      username: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      await axios.post("/users/register", newUser);
      setError(false);
      setSuccess(true);
    } catch (error) {
      setError(true);
    }
  };
  return (
    <div>
      <div></div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="username" ref={nameRef} />
        <input type="email" placeholder="email" ref={emailRef} />
        <input type="password" placeholder="password" ref={passwordRef} />
        <button>Sign Up</button>
        {success && <p>Successfully signed up!</p>}
        {error && <span>Something went wrong!</span>}
      </form>
    </div>
  );
}
