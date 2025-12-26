import React, { useState } from 'react';
import './App.css';
import { ThemeProvider } from './context/ThemeContext';
import Sidebar from './components/Sidebar';
import Login from './pages/auth/Login';
import Dashboard from './pages/dashboard/Dashboard';
import StudentsList from './pages/students/StudentsList';
import TeachersList from './pages/teachers/TeachersList';
import ClassesList from './pages/classes/ClassesList';
import AttendanceList from './pages/attendance/AttendanceList';
import TeacherAttendanceList from './pages/teacher-attendance/TeacherAttendanceList';
import SubjectsList from './pages/subjects/SubjectsList';
import FeesList from './pages/fees/FeesList';
import SalaryList from './pages/salary/SalaryList';
import ExamsList from './pages/exams/ExamsList';
import GradesList from './pages/grades/GradesList';
import Reports from './pages/reports/Reports';
import Timetable from './pages/timetable/Timetable';
import Announcements from './pages/announcements/Announcements';

function App() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  if (!user) {
    return (
      <ThemeProvider>
        <Login onLogin={setUser} />
      </ThemeProvider>
    );
  }

  const renderPage = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'students': return <StudentsList />;
      case 'attendance': return <AttendanceList />;
      case 'teacher-attendance': return <TeacherAttendanceList />;
      case 'teachers': return <TeachersList />;
      case 'subjects': return <SubjectsList />;
      case 'classes': return <ClassesList />;
      case 'fees': return <FeesList />;
      case 'salary': return <SalaryList />;
      case 'exams': return <ExamsList />;
      case 'grades': return <GradesList />;
      case 'reports': return <Reports />;
      case 'timetable': return <Timetable />;
      case 'announcements': return <Announcements />;
      default: return <Dashboard />;
    }
  };

  return (
    <ThemeProvider>
      <div className="app">
        <Sidebar 
          user={user} 
          onLogout={() => setUser(null)}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <main className="main-content">
          <div className="page-container">
            {renderPage()}
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
