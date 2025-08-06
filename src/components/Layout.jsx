import React from 'react';
import SideBar from './SideBar'
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f5f6fa' }}>
      <SideBar />
      <div style={{ marginLeft: '250px', padding: '40px', width: '100%' }}>
        <Outlet />
      </div>
    </div>
  )
}
