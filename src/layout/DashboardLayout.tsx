import React from 'react';
import { Outlet } from 'react-router-dom';
import '../styles/global.scss';
import { SideBar } from './SideBar';

export const DashboardLayout: React.FC = () => (
  <div className="app">
    <SideBar />
    <Outlet />
  </div>
);
