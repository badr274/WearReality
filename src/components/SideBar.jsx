import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div style={{ width: '280px', background: '#f0f1f3ff', boxShadow: '3px 0 10px rgba(73, 73, 73, 0.1)', padding: '20px', position: 'fixed', height: '100%' }}>
      <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '40px', color: 'rgb(101, 18, 20)' }}>Wear Reality</div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <Link to="/dashboard" style={{ textDecoration: 'none' }}>
          <li style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px',
            cursor: 'pointer',
            fontWeight: '500',
            color: isActive('/dashboard') ? 'rgb(101, 18, 20)' : '#595c5f',
            backgroundColor: isActive('/dashboard') ? '#4f4d4d7b' : 'transparent',
            borderRadius: '8px',
            padding: '8px'
          }}>
            <i className="bi bi-box-fill me-2" style={{ fontSize: '18px' }}></i> Product
          </li>
        </Link>

        <Link to="/dashboard/analytics" style={{ textDecoration: 'none' }}>
          <li style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px',
            cursor: 'pointer',
            fontWeight: '500',
            color: isActive('/dashboard/analytics') ? 'rgb(101, 18, 20)' : '#595c5f',
            backgroundColor: isActive('/dashboard/analytics') ? '#4f4d4d7b' : 'transparent',
            borderRadius: '8px',
            padding: '8px'
          }}>
            <i className="bi bi-bar-chart-fill me-2" style={{ fontSize: '18px' }}></i> Analytics
          </li>
        </Link>

        <Link to="/dashboard/customer" style={{ textDecoration: 'none' }}>
          <li style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px',
            cursor: 'pointer',
            fontWeight: '500',
            color: isActive('/dashboard/customer') ? 'rgb(101, 18, 20)' : '#595c5f',
            backgroundColor: isActive('/dashboard/customer') ? '#4f4d4d7b' : 'transparent',
            borderRadius: '8px',
            padding: '8px'
          }}>
            <i className="bi bi-person-fill me-2" style={{ fontSize: '18px' }}></i> Customer
          </li>
        </Link>
      </ul>
    </div>
  );
}
