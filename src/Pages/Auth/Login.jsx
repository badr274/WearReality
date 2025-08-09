import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Auth.css";
import loginSchema from "../../validation/loginShcema";
import toast from "react-hot-toast";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    if (data.email === "admin1234@admin.com" && data.password === "admin1234") {
      localStorage.setItem("role", "admin");
    }
    try {
      const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        data
      );

      const token = res.data.token;
      const username = res.data.user.name;
      if (token && username) {
        login(token, username);
      }

      toast.success("Login successful! Redirecting to home...");
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      const errMsg =
        error.response?.data?.message || "Something went wrong. Try again.";
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center flex-column vh-100">
      <h1 className="fst-italic mt-5 text-center">Welcome to the Login Page</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-5 w-50">
        <div className="mb-3">
          <label htmlFor="email" className="form-label fw-bold">
            Email address
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-danger">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label fw-bold">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-danger">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="btn w-100 fw-bold submit-btn"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="mt-3">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
};

export default Login;
