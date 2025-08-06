import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Spinner, Badge } from 'react-bootstrap';

const Customers = () => {
 const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://ecommerce.routemisr.com/api/v1/users');
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
    <Container className="mt-4">
      <h2 className="fw-bold  mb-4" style={{ color: 'rgb(101, 18, 20)' }}>Customers</h2>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <>
          {/* Table Headers */}
          <Row className="mb-3 fw-bold ms-5" style={{ color: 'rgb(101, 18, 20)' }}>
            <Col md={4}>Name</Col>
            <Col md={4}>Email</Col>
            <Col md={4}>Registered</Col>
          </Row>

          {/* Customer Data */}
          {users.map(user => (
            <Row key={user._id} className="align-items-center mb-3 ms-5">
              <Col md={4}>{user.name}</Col>
              <Col md={4}>{user.email}</Col>
              <Col md={4}>{new Date(user.createdAt).toLocaleDateString()}</Col>
            </Row>
          ))}
        </>
      )}
    </Container>
  );
};

export default Customers;
