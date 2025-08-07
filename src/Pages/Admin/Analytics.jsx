import React from 'react';
import { Container, Row, Col, Card, ProgressBar, Table } from 'react-bootstrap';
import { Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LineElement, PointElement, LinearScale, CategoryScale } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, LineElement, PointElement, LinearScale, CategoryScale);

const Analytics = () => {
const pieData = {
    labels: ['Women', 'Men', 'Electronics'],
    datasets: [
      {
        label: 'Category Distribution',
        data: [85, 10, 5],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        borderWidth: 1,
      },
    ],
  };

  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Orders',
        data: [50, 75, 60, 90, 120, 140, 170],
        fill: false,
        borderColor: '#4bc0c0',
        tension: 0.4,
      },
    ],
  };

  return (
    <Container className="mt-4">
      <h2 className="fw-bold mb-4 "style={{ color: 'rgb(101, 18, 20)'}}>Analytics Dashboard</h2>

      {/* Stat Cards */}
      <Row className="mb-4 g-4">
        <Col md={3}><Card><Card.Body><h6 style={{ color: 'rgb(101, 18, 20)'}}>Total Products</h6><h4>124</h4></Card.Body></Card></Col>
        <Col md={3}><Card><Card.Body><h6 style={{ color: 'rgb(101, 18, 20)'}}>Total Customers</h6><h4>89</h4></Card.Body></Card></Col>
        <Col md={3}><Card><Card.Body><h6 style={{ color: 'rgb(101, 18, 20)'}}>Products In Stock</h6><h4>4500 pcs</h4></Card.Body></Card></Col>
        <Col md={3}><Card><Card.Body><h6 style={{ color: 'rgb(101, 18, 20)'}}>Inactive Products</h6><h4>9</h4></Card.Body></Card></Col>
      </Row>

      {/* Charts */}
      <Row className="mb-4 g-4">
        <Col md={6}>
          <Card className="p-3 shadow-sm">
            <h5 className="text-center mb-3" style={{ color: 'rgb(101, 18, 20)'}}>Product Categories</h5>
            <Pie data={pieData} />
          </Card>
        </Col>
        <Col md={6}>
          <Card className="p-3 shadow-sm">
            <h5 className="text-center mb-3" style={{ color: 'rgb(101, 18, 20)'}}>Monthly Orders</h5>
            <Line data={lineData} />
          </Card>
        </Col>
      </Row>

      {/* ProgressBar Breakdown */}
      <Row className="mb-4">
        <Col>
          <Card className="shadow-sm">
            <Card.Body>
              <h5 className="mb-3" style={{ color: 'rgb(101, 18, 20)'}}>Category Progress</h5>
              <p>Women's Fashion</p>
              <ProgressBar now={85} label="85%" className="mb-3" />
              <p>Men's Fashion</p>
              <ProgressBar variant="info" now={10} label="10%" className="mb-3" />
              <p>Electronics</p>
              <ProgressBar variant="warning" now={5} label="5%" />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Top Products Table */}
      <Row className="mb-4">
        <Col>
          <Card className="shadow-sm">
            <Card.Body>
              <h5 className="mb-3" style={{ color: 'rgb(101, 18, 20)'}}>Top Products</h5>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th style={{ color: 'rgb(101, 18, 20)'}}>#</th>
                    <th style={{ color: 'rgb(101, 18, 20)'}}>Product</th>
                    <th style={{ color: 'rgb(101, 18, 20)'}}>Sold</th>
                    <th style={{ color: 'rgb(101, 18, 20)'}}>Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>1</td><td>Woman Shawl</td><td>320</td><td>EGP 47,680</td></tr>
                  <tr><td>2</td><td>Woman Brown</td><td>270</td><td>EGP 41,580</td></tr>
                  <tr><td>3</td><td>Relaxed Fit</td><td>215</td><td>EGP 38,885</td></tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Activity Log */}
      <Row className="mb-5">
        <Col>
          <Card className="shadow-sm">
            <Card.Body>
              <h5 className="mb-3" style={{ color: 'rgb(101, 18, 20)'}}>Recent Activity</h5>
              <ul className="list-group">
                <li className="list-group-item">[12:03 PM] Added new product "Woman Karma"</li>
                <li className="list-group-item">[11:50 AM] Updated stock for "Woman Shawl"</li>
                <li className="list-group-item">[10:22 AM] Deleted product "Old Jacket"</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Analytics;