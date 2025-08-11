import React, { useState } from "react";
import "./Contact.css";
import { FaEnvelope, FaUser } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.firstName) {
      newErrors.firstName = "First name is required";
    } else if (!/^[A-Za-z]+$/.test(formData.firstName)) {
      newErrors.firstName = "First name should contain letters only";
    }

    if (!formData.lastName) {
      newErrors.lastName = "Last name is required";
    } else if (!/^[A-Za-z]+$/.test(formData.lastName)) {
      newErrors.lastName = "Last name should contain letters only";
    }

    if (!formData.message) {
      newErrors.message = "Message is required";
    } else if (formData.message.length < 30) {
      newErrors.message = "Message must be at least 30 characters";
    } else if (formData.message.length > 200) {
      newErrors.message = "Message must be less than 200 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Form submitted successfully!");
    }
  };

  return (
    <div className="contact-container" id="Contact">
      <div className="contact-box">
        <h2 className="contact-title">Get in touch</h2>
        <p className="contact-subtitle">
          Need assistance? Our team is just a message away.
        </p>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label className="contact-label"> EMAIL *</label>
          <div className="input-wrapper">
            <FaEnvelope className="icon" />
            <input
              type="email"
              name="email"
              placeholder="Ex. yourname@gmail.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          {errors.email && <p className="error-text">{errors.email}</p>}

          <label className="contact-label">YOUR NAME</label>
          <div className="input-wrapper">
            <FaUser className="icon" />
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          {errors.firstName && <p className="error-text">{errors.firstName}</p>}

          <div className="input-wrapper">
            <FaUser className="icon" />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          {errors.lastName && <p className="error-text">{errors.lastName}</p>}

          <label className="contact-label">MESSAGE</label>
          <textarea
            name="message"
            placeholder="Write your message here..."
            value={formData.message}
            onChange={handleChange}
            rows="5"
            className="contact-textarea"
          />
          {errors.message && <p className="error-text">{errors.message}</p>}

          <button type="submit" className="next-button">
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
