import React from 'react';
import { useTheme } from '../context/ThemeContext';
import './Sidebar.css';

export default function Sidebar({ activeTab, setActiveTab, user, onLogout }) {
  const { isDark, toggleTheme } = useTheme();
  const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'students', label: 'Students' },
    { id: 'attendance', label: 'Student Attendance' },
    { id: 'teacher-attendance', label: 'Teacher Attendance' },
    { id: 'teachers', label: 'Teachers' },
    { id: 'assignments', label: 'Student Assignments' },
    { id: 'subjects', label: 'Subjects' },
    { id: 'classes', label: 'Classes & Sections' },
    { id: 'fees', label: 'Fees Management' },
    { id: 'salary', label: 'Salary Payment' },
    { id: 'exams', label: 'Exams' },
    { id: 'grades', label: 'Grades' }
  ];

  return (
    <aside className="sidebar">
      <div className="logo">
        <div className="logo-icon">🎓</div>
        <h3>SchoolFlow</h3>
        <span>SchoolFlow Solutions</span>
      </div>

      <nav className="nav">
        {navItems.map(item => (
          <a
            key={item.id}
            className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="theme-toggle" onClick={toggleTheme}>
          {isDark ? '☀️' : '🌙'} {isDark ? 'Light' : 'Dark'}
        </button>
        <div className="user-info">
          <span>👤 {user.username}</span>
        </div>
        <button className="logout-btn" onClick={onLogout}>
          🚪 Logout
        </button>
      </div>
    </aside>
  );
}