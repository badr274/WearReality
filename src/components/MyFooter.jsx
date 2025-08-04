import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const MyFooter = () => {
  return (
    <footer className="text-dark py-4 mt-auto" style={{ backgroundColor: "#f6f2f2ff" }}>
      <Container>

        {/* Section 1: Left + Right aligned titles and texts */}
        <Row className="mb-4">
  {/* Left side */}
  <Col xs={12}>
    <h5>Get the Wear Reality</h5>
    <p style={{ color: "#4d4d4dff" }}>
      We are a modern company focused on delivering top-tier solutions for our clients.
    </p>
  </Col>

 
  <Col xs={12}>
    <h5>Subscribe with your email</h5>
    <p style={{ color: "#4d4d4dff" }}>
      Stay updated with our latest offers and news.
    </p>
    <div className="d-flex">
      <input
        type="email"
        className="form-control rounded-3 me-2"
        placeholder="Enter your email"
      />
      <button
        type="button"
        className="btn text-white"
        style={{ backgroundColor: "#651214", borderColor: "#651214" }}
      >
        Submit
      </button>
    </div>
  </Col>
</Row>


        <hr />

       
     <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-3 mb-3 mb-md-0">
            <span className="fw-bold">Payment Partners:</span>
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" width="40" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png" alt="Mastercard" width="40" />            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" width="50" />
          </div>

          <p className="mb-0">© {new Date().getFullYear()} Wear Reality. All Rights Reserved.</p>
        </div>
      
   


        

      </Container>
    </footer>
  );
};

export default MyFooter;
