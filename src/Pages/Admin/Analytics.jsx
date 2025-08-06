import React from 'react';
import { Container, Row, Col, Card, ProgressBar, Table } from 'react-bootstrap';
import { Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LineElement, PointElement, LinearScale, CategoryScale } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, LineElement, PointElement, LinearScale, CategoryScale);

const Analytics = () => {

};

export default Analytics;