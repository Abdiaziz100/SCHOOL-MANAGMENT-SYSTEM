import React from 'react';
import './Navbar.css';

export default function Navbar({ user, onLogout, activeTab, setActiveTab }) {
  const navItems = [
    { id: 'students', label: 'Students', icon: '👥' },
    { id: 'teachers', label: 'Teachers', icon: '👨‍🏫' },
    { id: 'classes', label: 'Classes', icon: '🏫' },
    { id: 'attendance', label: 'Attendance', icon: '📋' },
    { id: 'grades', label: 'Grades', icon: '📊' }
  ];

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <div className="logo">🎓</div>
        <h1>SchoolMS</h1>
      </div>
      
      <div className="navbar-nav">
        {navItems.map(item => (
          <button
            key={item.id}
            className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </div>

      <div className="navbar-user">
        <span className="user-info">
          <span className="user-icon">👤</span>
          {user.username}
        </span>
        <button className="logout-btn" onClick={onLogout}>
          <span>🚪</span> Logout
        </button>
      </div>
    </nav>
  );
}