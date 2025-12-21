import React, { useEffect, useState } from 'react';
import { getJSON } from '../../api';

export default function Dashboard() {
  const [stats, setStats] = useState({
    students: 0,
    teachers: 0,
    classes: 0,
    attendance: 0
  });

  useEffect(() => {
    async function loadStats() {
      try {
        const [students, teachers, classes, attendance] = await Promise.all([
          getJSON('/students'),
          getJSON('/teachers'),
          getJSON('/classes'),
          getJSON('/attendance')
        ]);
        setStats({
          students: students.length,
          teachers: teachers.length,
          classes: classes.length,
          attendance: attendance.length
        });
      } catch (error) {
        console.error('Error loading stats:', error);
      }
    }
    loadStats();
  }, []);

  return (
    <div>
      <h2>📊 Dashboard</h2>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <h3>{stats.students}</h3>
            <p>Total Students</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">👨🏫</div>
          <div className="stat-info">
            <h3>{stats.teachers}</h3>
            <p>Total Teachers</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">🏫</div>
          <div className="stat-info">
            <h3>{stats.classes}</h3>
            <p>Total Classes</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">📋</div>
          <div className="stat-info">
            <h3>{stats.attendance}</h3>
            <p>Attendance Records</p>
          </div>
        </div>
      </div>
    </div>
  );
}