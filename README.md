# 🏫 School Management System

> **Ultra-Interactive Full-Stack Web Application** for comprehensive school administration

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Flask](https://img.shields.io/badge/Flask-2.3.3-green.svg)](https://flask.palletsprojects.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Ready-blue.svg)](https://postgresql.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## ✨ Features

### 📊 **Core Management**
- **👥 Student Management** - Complete CRUD with class assignments
- **👨🏫 Teacher Management** - Profile management with subjects
- **🏢 Class Management** - Organize classes and assign teachers
- **📋 Attendance Tracking** - Student & teacher attendance
- **📊 Grade Management** - Record and track student performance
- **📚 Subject Management** - Curriculum subject organization
- **📝 Exam Management** - Schedule and manage examinations
- **📋 Assignment Management** - Track student assignments
- **💰 Fee Management** - Handle student fee payments
- **💵 Salary Management** - Teacher salary administration

### 🎨 **Interactive UI/UX**
- **Glassmorphism Design** - Modern frosted glass effects
- **Animated Background** - Dynamic gradient with floating particles
- **Micro-interactions** - Hover effects, ripples, and transforms
- **Responsive Design** - Mobile-first approach
- **Real-time Analytics** - Interactive dashboard with statistics
- **Export Functionality** - CSV/PDF report generation
- **Search & Filter** - Advanced data filtering capabilities

### 🔐 **Security & Performance**
- **Authentication System** - Secure login/logout
- **Database Flexibility** - SQLite (dev) / PostgreSQL (prod)
- **API Integration** - RESTful backend architecture
- **Error Handling** - Comprehensive error management
- **Loading States** - Interactive loading animations

## 🛠 Tech Stack

### **Frontend**
- **React 18** - Modern JavaScript framework
- **CSS3** - Advanced animations & glassmorphism
- **Chart.js** - Data visualization (optional)
- **Modern ES6+** - Latest JavaScript features

### **Backend**
- **Python Flask** - Lightweight web framework
- **SQLAlchemy ORM** - Database abstraction layer
- **Flask-CORS** - Cross-origin resource sharing
- **PostgreSQL/SQLite** - Flexible database options

## 🚀 Quick Start

### **Prerequisites**
```bash
# Required
Node.js >= 16.0.0
Python >= 3.8
pip (Python package manager)
npm (Node package manager)

# Optional (for production)
PostgreSQL >= 12
```

### **Installation**

1. **Clone Repository**
```bash
git clone <your-repo-url>
cd SCHOOL-MANAGMENT-SYSTEM
```

2. **Backend Setup**
```bash
cd backend
pip install -r requirements.txt
```

3. **Frontend Setup**
```bash
cd ../sms-frontend
npm install
```

### **Development Mode**
```bash
# From project root
./start.sh
```

### **Production Mode**
```bash
# From project root
./start-production.sh
```

## 🌐 Access Points

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Login Credentials**: `abdi2693` / `abdi2693`

## 📁 Project Structure

```
SCHOOL-MANAGMENT-SYSTEM/
├── 📂 backend/                 # Flask API server
│   ├── app.py                 # Main application
│   ├── models.py              # Database models
│   ├── database.py            # Database configuration
│   ├── requirements.txt       # Python dependencies
│   └── .env                   # Environment variables
├── 📂 sms-frontend/           # React application
│   ├── 📂 src/
│   │   ├── 📂 pages/          # Page components
│   │   ├── 📂 components/     # Reusable components
│   │   ├── 📂 utils/          # Utility functions
│   │   ├── App.js             # Main app component
│   │   ├── App.css            # Styling
│   │   └── api.js             # API utilities
│   └── package.json           # Node dependencies
├── start.sh                   # Development startup
├── start-production.sh        # Production startup
└── README.md                  # This file
```

## 🗄️ Database Schema

### **Tables**
- `students` - Student information and class assignments
- `teachers` - Teacher profiles and subjects
- `classes` - Class organization and teacher assignments
- `subjects` - Curriculum subjects with codes
- `attendance` - Student attendance records
- `teacher_attendance` - Teacher attendance tracking
- `grades` - Student grade records
- `exams` - Examination scheduling
- `assignments` - Student assignment tracking
- `fees` - Fee payment management
- `salaries` - Teacher salary records
- `users` - Authentication system

## 🔧 Configuration

### **Environment Variables**
```bash
# Development (uses SQLite)
DATABASE_URL=

# Production (PostgreSQL)
DATABASE_URL=postgresql://username:password@localhost:5432/school_db
FLASK_ENV=production
```

## 📊 API Endpoints

### **Core Resources**
- `GET/POST /api/students` - Student management
- `GET/POST /api/teachers` - Teacher management
- `GET/POST /api/classes` - Class management
- `GET/POST /api/subjects` - Subject management
- `GET/POST /api/exams` - Exam management
- `GET/POST /api/assignments` - Assignment management
- `GET/POST /api/fees` - Fee management
- `GET/POST /api/salaries` - Salary management
- `GET/POST /api/attendance` - Student attendance
- `GET/POST /api/teacher-attendance` - Teacher attendance
- `GET/POST /api/grades` - Grade management
- `POST /api/login` - Authentication

## 🚀 Deployment

### **Local Production**
```bash
./start-production.sh
```

### **Cloud Deployment**

**Backend (Heroku/AWS/DigitalOcean)**
```bash
# Set environment variables
export DATABASE_URL=postgresql://...
export FLASK_ENV=production

# Install dependencies
pip install -r requirements.txt

# Run application
python app.py
```

**Frontend (Netlify/Vercel)**
```bash
# Build for production
npm run build

# Deploy build folder
```

## 🎯 Features Showcase

### **Interactive Dashboard**
- Real-time statistics with animated counters
- Glassmorphism design with backdrop blur
- Hover effects and micro-interactions

### **Advanced Forms**
- Floating labels and smooth transitions
- Real-time validation feedback
- Animated submit buttons with ripple effects

### **Data Tables**
- Interactive row hover effects
- Smooth scaling animations
- Professional action buttons

### **Modern UI Elements**
- Gradient backgrounds with particle effects
- Frosted glass components
- 3D transforms and shadows
- Responsive mobile design

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** - For the amazing framework
- **Flask Community** - For the lightweight backend
- **Modern CSS** - For glassmorphism inspiration
- **Open Source** - For making this possible

---

<div align="center">

**Built with ❤️ for modern education management**

[⭐ Star this repo](../../stargazers) • [🐛 Report Bug](../../issues) • [✨ Request Feature](../../issues)

</div>

## Project Structure

```
school-management-system/
├── frontend/sms-frontend/          # React frontend
│   ├── src/
│   │   ├── pages/                  # Page components
│   │   │   ├── auth/              # Authentication pages
│   │   │   ├── students/          # Student management
│   │   │   ├── teachers/          # Teacher management
│   │   │   ├── classes/           # Class management
│   │   │   ├── attendance/        # Attendance tracking
│   │   │   └── grades/            # Grade management
│   │   ├── api.js                 # API utilities
│   │   └── App.js                 # Main app component
│   └── package.json
├── backend/                        # Flask backend
│   ├── app.py                     # Main Flask application
│   ├── models.py                  # Database models
│   ├── database.py                # Database configuration
│   └── requirements.txt
└── start.sh                       # Startup script
```

## API Endpoints

- `GET/POST /api/students` - Student CRUD
- `GET/POST /api/teachers` - Teacher CRUD  
- `GET/POST /api/classes` - Class CRUD
- `GET/POST /api/attendance` - Attendance tracking
- `GET/POST /api/grades` - Grade management
- `POST /api/login` - Authentication

## Development

**Backend Development:**
```bash
cd backend
python app.py
```

**Frontend Development:**
```bash
cd frontend/sms-frontend
npm start
```

The frontend is configured with a proxy to automatically forward API requests to the backend server.