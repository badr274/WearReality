import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    const user = existingUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      navigate("/home");
    } else {
      setError("Invalid Email or Password!");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center flex-column vh-100">
      <h1 className="fst-italic mt-5 text-center">Welcome to the Login Page</h1>
      {error && <div className="alert alert-danger mt-3">{error}</div>}
      <form onSubmit={handleSubmit} className="mt-5 w-50">
        <div className="mb-3">
          <label htmlFor="email" className="form-label fw-bold">
            Email address
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label fw-bold">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn w-100 fw-bold submit-btn">
          Login
        </button>
      </form>
      <p className="mt-3">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
}
