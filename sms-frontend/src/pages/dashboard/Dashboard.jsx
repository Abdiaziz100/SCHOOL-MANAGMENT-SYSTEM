import React, { useEffect, useState } from 'react';
import { getJSON } from '../../api';

export default function Dashboard() {
  const [stats, setStats] = useState({
    students: 0,
    teachers: 0,
    classes: 0,
    attendance: 0,
    exams: 0,
    assignments: 0
  });

  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    async function loadStats() {
      try {
        const [students, teachers, classes, attendance, exams, assignments] = await Promise.all([
          getJSON('/students'),
          getJSON('/teachers'),
          getJSON('/classes'),
          getJSON('/attendance'),
          getJSON('/exams'),
          getJSON('/assignments')
        ]);
        setStats({
          students: students.length,
          teachers: teachers.length,
          classes: classes.length,
          attendance: attendance.length,
          exams: exams.length,
          assignments: assignments.length
        });
        
        // Mock recent activity
        setRecentActivity([
          { id: 1, type: 'student', action: 'New student enrolled', time: '2 hours ago', icon: '👥' },
          { id: 2, type: 'exam', action: 'Math exam scheduled', time: '4 hours ago', icon: '📝' },
          { id: 3, type: 'attendance', action: 'Attendance marked for Class A', time: '6 hours ago', icon: '📋' },
          { id: 4, type: 'teacher', action: 'New teacher added', time: '1 day ago', icon: '👨🏫' }
        ]);
      } catch (error) {
        console.error('Error loading stats:', error);
      }
    }
    loadStats();
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>📊 School Dashboard</h1>
        <p className="dashboard-subtitle">Welcome back! Here's what's happening at your school today.</p>
      </div>
      
      <div className="stats-grid">
        <div className="stat-card students">
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <h3>{stats.students}</h3>
            <p>Total Students</p>
            <div className="stat-trend">+12% this month</div>
          </div>
          <div className="stat-chart">📈</div>
        </div>
        
        <div className="stat-card teachers">
          <div className="stat-icon">👨🏫</div>
          <div className="stat-info">
            <h3>{stats.teachers}</h3>
            <p>Total Teachers</p>
            <div className="stat-trend">+5% this month</div>
          </div>
          <div className="stat-chart">📊</div>
        </div>
        
        <div className="stat-card classes">
          <div className="stat-icon">🏫</div>
          <div className="stat-info">
            <h3>{stats.classes}</h3>
            <p>Active Classes</p>
            <div className="stat-trend">+2 new classes</div>
          </div>
          <div className="stat-chart">📋</div>
        </div>
        
        <div className="stat-card attendance">
          <div className="stat-icon">📋</div>
          <div className="stat-info">
            <h3>{stats.attendance}</h3>
            <p>Attendance Records</p>
            <div className="stat-trend">95% avg attendance</div>
          </div>
          <div className="stat-chart">✅</div>
        </div>
        
        <div className="stat-card exams">
          <div className="stat-icon">📝</div>
          <div className="stat-info">
            <h3>{stats.exams}</h3>
            <p>Scheduled Exams</p>
            <div className="stat-trend">3 upcoming</div>
          </div>
          <div className="stat-chart">📅</div>
        </div>
        
        <div className="stat-card assignments">
          <div className="stat-icon">📚</div>
          <div className="stat-info">
            <h3>{stats.assignments}</h3>
            <p>Active Assignments</p>
            <div className="stat-trend">85% completion</div>
          </div>
          <div className="stat-chart">📊</div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="quick-actions">
          <h3>🚀 Quick Actions</h3>
          <div className="action-buttons">
            <button className="action-button primary">
              <span className="action-icon">👥</span>
              <span>Add Student</span>
            </button>
            <button className="action-button secondary">
              <span className="action-icon">👨🏫</span>
              <span>Add Teacher</span>
            </button>
            <button className="action-button accent">
              <span className="action-icon">📝</span>
              <span>Create Exam</span>
            </button>
            <button className="action-button success">
              <span className="action-icon">📋</span>
              <span>Mark Attendance</span>
            </button>
          </div>
        </div>

        <div className="recent-activity">
          <h3>🕒 Recent Activity</h3>
          <div className="activity-list">
            {recentActivity.map(activity => (
              <div key={activity.id} className="activity-item">
                <div className="activity-icon">{activity.icon}</div>
                <div className="activity-content">
                  <p className="activity-action">{activity.action}</p>
                  <span className="activity-time">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}