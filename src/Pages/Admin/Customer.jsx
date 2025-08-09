import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Spinner } from "react-bootstrap";

const Customers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://ecommerce.routemisr.com/api/v1/users"
        );
        const fetchedUsers = response.data.users.slice(0, 40);
        setUsers(fetchedUsers);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <Container className="mt-4 " style={{ padding: "30px" }}>
      <h2 className="fw-bold mb-4" style={{ color: "rgb(101, 18, 20)" }}>
        Customers
      </h2>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <>
          <Row className="fw-bold d-none d-md-flex text-dark mb-3">
            <Col md={4}>Name</Col>
            <Col md={4}>Email</Col>
            <Col md={4}>Registered</Col>
          </Row>

          {users.map((user) => (
            <Row
              key={user._id}
              className="align-items-center mb-3 border rounded p-2 mx-0"
            >
              <Col xs={12} md={4}>
                <strong className="d-md-none">Name: </strong>
                {user.name}
              </Col>
              <Col xs={12} md={4}>
                <strong className="d-md-none">Email: </strong>
                {user.email}
              </Col>
              <Col xs={12} md={4}>
                <strong className="d-md-none">Registered: </strong>
                {new Date(user.createdAt).toLocaleDateString()}
              </Col>
            </Row>
          ))}
        </>
      )}
    </Container>
  );
};

export default Customers;
