import React from "react";
import "./Contact.css";
import { FaEnvelope, FaUser } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="contact-container" id="Contact">
      <div className="contact-box">
        <h2 className="contact-title">Get in touch</h2>
        <p className="contact-subtitle">
          Need assistance? Our team is just a message away.
        </p>

        <form className="contact-form">
          <label className="contact-label"> EMAIL *</label>
          <div className="input-wrapper">
            <FaEnvelope className="icon" />
            <input
              type="email"
              placeholder="Ex. yourname@gmail.com"
              required
            />
          </div>

          <label className="contact-label">YOUR NAME</label>
          <div className="input-wrapper">
            <FaUser className="icon" />
            <input type="text" placeholder="First Name" required />
          </div>

          <div className="input-wrapper">
            <FaUser className="icon" />
            <input type="text" placeholder="Last Name" required />
          </div>

          <button type="submit" className="next-button">
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
