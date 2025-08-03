import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  });

  const [errors, setErrors] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors("");
    setSuccessMessage("");

    // Get existing users from localStorage
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Check if email already exists
    const userExists = existingUsers.some(
      (user) => user.email === formData.email
    );

    if (userExists) {
      setErrors("Account with this email already exists!");
      return;
    }

    if (formData.password !== formData.rePassword) {
      setErrors("Passwords do not match!");
      return;
    }

    // Save new user to localStorage
    const updatedUsers = [
      ...existingUsers,
      { email: formData.email, password: formData.password },
    ];
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    setSuccessMessage("Account created successfully! Redirecting to Login...");

    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <div className="container mt-5">
      <h2
        className="text-center mb-4 fw-bold fst-italic"
        style={{ color: "#651214ff" }}
      >
        Sign Up
      </h2>

      {errors && <div className="alert alert-danger">{errors}</div>}
      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}

      <form
        onSubmit={handleSubmit}
        className="mx-auto"
        style={{ maxWidth: "50%" }}
      >
        <div className="mb-3">
          <label className="form-label fw-bold" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold" htmlFor="rePassword">
            Re-Enter Password
          </label>
          <input
            type="password"
            id="rePassword"
            name="rePassword"
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold" htmlFor="phone">
            Phone
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <button
          type="submit"
          className="btn w-100 fw-bold"
          style={{ backgroundColor: "#651214ff", color: "white" }}
        >
          Signup
        </button>
      </form>

      <p className="mt-3 text-center">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
