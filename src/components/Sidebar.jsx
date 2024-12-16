import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/img/logo.svg';
import lightlogo from '../assets/img/lightlogo.svg';

const Sidebar = ({ isDarkMode }) => {
  return (
    <div className="sidebar pe-4 pb-3">
      <nav className="navbar navbar-dark">
        <NavLink to="/" className="navbar-brand mx-4 mb-3">
          <img
            src={isDarkMode ? logo : lightlogo}
            alt=""
            style={{ width: '120px', height: 'auto', margin: '12px 0' }}
          />
          <br />
        </NavLink>
        <div className="navbar-nav w-100">
          <NavLink
            to="/dashboard"
            className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''}`}
          >
            <i className="fa-solid fa-house me-2"></i>Dashboard
          </NavLink>
          <NavLink
            to="/log"
            className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''}`}
          >
            <i className="fa fa-laptop me-2"></i>Chats
          </NavLink>
          <NavLink
            to="/analytics"
            className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''}`}
          >
            <i className="fa-solid fa-chart-line"></i>Analytics
          </NavLink>
          {/* <NavLink
            to="/appointment"
            className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''}`}
          >
            <i className="fa-solid fa-calendar-check"></i>Appointment
          </NavLink> */}
          <NavLink
            to="/reports"
            className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''}`}
          >
            <i className="fa-regular fa-clock me-2"></i>Reports
          </NavLink>
          <NavLink   to="/settings"
            className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''}`}
          >
            <i className="fa-solid fa-gear me-2"></i>Settings
          </NavLink>
          {/* <NavLink to="#" className={({ isActive }) => `nav-item nav-link ${isActive ? '' : ''}`} onClick={handleLogout}>
            <i className="fa-solid fa-arrow-right-from-bracket me-2"></i>Logout
          </NavLink> */}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
