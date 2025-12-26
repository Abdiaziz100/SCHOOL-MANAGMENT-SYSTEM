import React, { useState, useEffect } from 'react';
import { getJSON } from '../../api';

export default function Reports() {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [grades, setGrades] = useState([]);
  const [fees, setFees] = useState([]);
  const [salaries, setSalaries] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setStudents(await getJSON('/students'));
      setTeachers(await getJSON('/teachers'));
      setAttendance(await getJSON('/attendance'));
      setGrades(await getJSON('/grades'));
      setFees(await getJSON('/fees'));
      setSalaries(await getJSON('/salaries'));
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }

  const generateAttendanceReport = () => {
    const presentCount = attendance.filter(a => a.status === 'present').length;
    const totalCount = attendance.length;
    const attendanceRate = totalCount > 0 ? ((presentCount / totalCount) * 100).toFixed(1) : 0;
    
    return { presentCount, totalCount, attendanceRate };
  };

  const generateGradeReport = () => {
    if (grades.length === 0) return { average: 0, highest: 0, lowest: 0 };
    
    const marks = grades.map(g => g.marks);
    const average = (marks.reduce((a, b) => a + b, 0) / marks.length).toFixed(1);
    const highest = Math.max(...marks);
    const lowest = Math.min(...marks);
    
    return { average, highest, lowest };
  };

  const generateFinancialReport = () => {
    const totalFeesCollected = fees.reduce((sum, fee) => sum + fee.amount, 0);
    const totalSalariesPaid = salaries.reduce((sum, salary) => sum + salary.amount, 0);
    const netBalance = totalFeesCollected - totalSalariesPaid;
    
    return { totalFeesCollected, totalSalariesPaid, netBalance };
  };

  const attendanceReport = generateAttendanceReport();
  const gradeReport = generateGradeReport();
  const financialReport = generateFinancialReport();

  const exportToCSV = (data, filename) => {
    const csv = data.map(row => Object.values(row).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
  };

  return (
    <div>
      <h2>📊 Reports</h2>
      
      <div className="reports-grid">
        <div className="report-card">
          <h3>📅 Attendance Report</h3>
          <div className="report-stats">
            <div className="stat">
              <span className="stat-label">Present:</span>
              <span className="stat-value">{attendanceReport.presentCount}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Total Records:</span>
              <span className="stat-value">{attendanceReport.totalCount}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Attendance Rate:</span>
              <span className="stat-value">{attendanceReport.attendanceRate}%</span>
            </div>
          </div>
          <button 
            className="export-btn"
            onClick={() => exportToCSV(attendance, 'attendance-report.csv')}
          >
            Export CSV
          </button>
        </div>

        <div className="report-card">
          <h3>📈 Grade Report</h3>
          <div className="report-stats">
            <div className="stat">
              <span className="stat-label">Average:</span>
              <span className="stat-value">{gradeReport.average}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Highest:</span>
              <span className="stat-value">{gradeReport.highest}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Lowest:</span>
              <span className="stat-value">{gradeReport.lowest}</span>
            </div>
          </div>
          <button 
            className="export-btn"
            onClick={() => exportToCSV(grades, 'grades-report.csv')}
          >
            Export CSV
          </button>
        </div>

        <div className="report-card">
          <h3>💰 Financial Report</h3>
          <div className="report-stats">
            <div className="stat">
              <span className="stat-label">Fees Collected:</span>
              <span className="stat-value">${financialReport.totalFeesCollected}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Salaries Paid:</span>
              <span className="stat-value">${financialReport.totalSalariesPaid}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Net Balance:</span>
              <span className={`stat-value ${financialReport.netBalance >= 0 ? 'positive' : 'negative'}`}>
                ${financialReport.netBalance}
              </span>
            </div>
          </div>
          <button 
            className="export-btn"
            onClick={() => exportToCSV([...fees, ...salaries], 'financial-report.csv')}
          >
            Export CSV
          </button>
        </div>

        <div className="report-card">
          <h3>📋 Summary</h3>
          <div className="report-stats">
            <div className="stat">
              <span className="stat-label">Total Students:</span>
              <span className="stat-value">{students.length}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Total Teachers:</span>
              <span className="stat-value">{teachers.length}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Attendance Rate:</span>
              <span className="stat-value">{attendanceReport.attendanceRate}%</span>
            </div>
          </div>
          <button 
            className="export-btn"
            onClick={() => window.print()}
          >
            Print Report
          </button>
        </div>
      </div>
    </div>
  );
}