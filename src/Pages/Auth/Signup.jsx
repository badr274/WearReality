import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import "./Auth.css";
import signupSchema from "../../validation/SignupShema";
import { useState } from "react";
import LoadingSpinner from "../../components/LoadingSpinner";

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        data
      );

      toast.success("Account created successfully! Redirecting to login...");
      navigate("/login");
    } catch (error) {
      const errMsg =
        error.response?.data?.message || "Something went wrong. Try again.";
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5 position-relative">
      <h1 className="text-center mb-4 fw-bold fst-italic">Sign Up</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto"
        style={{ maxWidth: "50%" }}
      >
        <div className="mb-3">
          <label className="form-label fw-bold" htmlFor="name">
            Name
          </label>
          <input id="name" className="form-control" {...register("name")} />
          {errors.name && <p className="text-danger">{errors.name.message}</p>}
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold" htmlFor="email">
            Email
          </label>
          <input
            type="text"
            id="email"
            className="form-control"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-danger">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold" htmlFor="password">
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

        <div className="mb-3">
          <label className="form-label fw-bold" htmlFor="rePassword">
            Re-Enter Password
          </label>
          <input
            type="password"
            id="rePassword"
            className="form-control"
            {...register("rePassword")}
          />
          {errors.rePassword && (
            <p className="text-danger">{errors.rePassword.message}</p>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold" htmlFor="phone">
            Phone
          </label>
          <input
            type="text"
            id="phone"
            className="form-control"
            {...register("phone")}
          />
          {errors.phone && (
            <p className="text-danger">{errors.phone.message}</p>
          )}
        </div>

        <button type="submit" className="btn w-100 fw-bold submit-btn">
          {loading ? <LoadingSpinner /> : "Signup"}
        </button>
      </form>

      <p className="mt-3 text-center">
        Already have an account?
        <Link to="/login" style={{ color: "var(--main-color)" }}>
          Login
        </Link>
      </p>
    </div>
  );
};

export default Signup;
