# app.py
from flask import Flask, request, jsonify, render_template, session
from flask_cors import CORS
from database import db
import models
from models import Student, Teacher, ClassRoom, User, Attendance, Grade, TeacherAttendance, Subject, Exam, Assignment, Fee, Salary
from datetime import datetime

def to_dict(obj):
    if isinstance(obj, Student):
        return {'id': obj.id, 'name': obj.name, 'age': obj.age, 'email': obj.email, 'class_id': obj.class_id}
    if isinstance(obj, Teacher):
        return {'id': obj.id, 'name': obj.name, 'subject': obj.subject}
    if isinstance(obj, ClassRoom):
        return {'id': obj.id, 'name': obj.name, 'teacher_id': obj.teacher_id}
    if isinstance(obj, User):
        return {'id': obj.id, 'username': obj.username, 'role': obj.role}
    if isinstance(obj, Attendance):
        return {'id': obj.id, 'student_id': obj.student_id, 'date': obj.date, 'status': obj.status}
    if isinstance(obj, Assignment):
        return {'id': obj.id, 'teacher_id': obj.teacher_id, 'class_id': obj.class_id, 'subject': obj.subject, 'title': obj.title, 'due_date': obj.due_date}
    if isinstance(obj, Fee):
        return {'id': obj.id, 'student_id': obj.student_id, 'amount': obj.amount, 'type': obj.type, 'status': obj.status, 'date': obj.date}
    if isinstance(obj, Salary):
        return {'id': obj.id, 'teacher_id': obj.teacher_id, 'amount': obj.amount, 'month': obj.month, 'year': obj.year, 'status': obj.status}
    if isinstance(obj, Exam):
        return {'id': obj.id, 'name': obj.name, 'class_id': obj.class_id, 'date': obj.date, 'duration': obj.duration, 'total_marks': obj.total_marks}
    if isinstance(obj, Subject):
        return {'id': obj.id, 'name': obj.name, 'code': obj.code, 'description': obj.description}
    if isinstance(obj, TeacherAttendance):
        return {'id': obj.id, 'teacher_id': obj.teacher_id, 'date': obj.date, 'status': obj.status}
    if isinstance(obj, Grade):
        return {'id': obj.id, 'student_id': obj.student_id, 'subject': obj.subject, 'score': obj.score}
    return {}

def create_app():
    app = Flask(__name__, template_folder='templates', static_folder='static')
    CORS(app)
    app.secret_key = 'dev-secret-change-me'
    
    # Database configuration
    import os
    from dotenv import load_dotenv
    load_dotenv()
    
    # Use PostgreSQL in production, SQLite for development
    if os.getenv('DATABASE_URL'):
        app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
    else:
        db_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'school.db')
        app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{db_path}'
    
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)

    @app.route('/')
    def home():
        return jsonify({'message': 'School Management System API running'})

    # --- Auth ---
    @app.route('/api/login', methods=['POST'])
    def login():
        data = request.json or {}
        username = data.get('username'); password = data.get('password')
        if not username or not password:
            return jsonify({'error':'username and password required'}), 400
        user = User.query.filter_by(username=username, password=password).first()
        if not user:
            return jsonify({'error':'invalid credentials'}), 401
        session['user'] = {'id': user.id, 'username': user.username, 'role': user.role}
        return jsonify({'message':'ok','user': to_dict(user)})

    @app.route('/api/logout', methods=['POST'])
    def logout():
        session.pop('user', None)
        return jsonify({'message':'logged out'})

    @app.route('/api/whoami', methods=['GET'])
    def whoami():
        return jsonify(session.get('user', None))

    # --- Students ---
    @app.route('/api/students', methods=['GET'])
    def get_students():
        return jsonify([to_dict(s) for s in Student.query.order_by(Student.id).all()])

    @app.route('/api/students', methods=['POST'])
    def create_student():
        data = request.json or {}
        name = data.get('name')
        if not name:
            return jsonify({'error':'Name required'}), 400
        s = Student(name=name, age=data.get('age'), email=data.get('email'), class_id=data.get('class_id'))
        db.session.add(s); db.session.commit()
        return jsonify(to_dict(s)), 201

    @app.route('/api/students/<int:sid>', methods=['PUT'])
    def update_student(sid):
        s = Student.query.get_or_404(sid)
        data = request.json or {}
        s.name = data.get('name', s.name); s.age = data.get('age', s.age)
        s.email = data.get('email', s.email); s.class_id = data.get('class_id', s.class_id)
        db.session.commit()
        return jsonify(to_dict(s))

    @app.route('/api/students/<int:sid>', methods=['DELETE'])
    def delete_student(sid):
        s = Student.query.get_or_404(sid)
        db.session.delete(s); db.session.commit()
        return jsonify({'message':'Deleted'})

    # --- Teachers ---
    @app.route('/api/teachers', methods=['GET'])
    def get_teachers():
        return jsonify([to_dict(t) for t in Teacher.query.order_by(Teacher.id).all()])

    @app.route('/api/teachers', methods=['POST'])
    def create_teacher():
        data = request.json or {}
        if not data.get('name'):
            return jsonify({'error':'Name required'}), 400
        t = Teacher(name=data.get('name'), subject=data.get('subject'))
        db.session.add(t); db.session.commit(); return jsonify(to_dict(t)), 201

    @app.route('/api/teachers/<int:tid>', methods=['PUT'])
    def update_teacher(tid):
        t = Teacher.query.get_or_404(tid)
        data = request.json or {}
        t.name = data.get('name', t.name); t.subject = data.get('subject', t.subject)
        db.session.commit(); return jsonify(to_dict(t))

    @app.route('/api/teachers/<int:tid>', methods=['DELETE'])
    def delete_teacher(tid):
        t = Teacher.query.get_or_404(tid)
        db.session.delete(t); db.session.commit()
        return jsonify({'message':'Deleted'})

    # --- Classes ---
    @app.route('/api/classes', methods=['GET'])
    def get_classes():
        return jsonify([to_dict(c) for c in ClassRoom.query.order_by(ClassRoom.id).all()])

    @app.route('/api/classes', methods=['POST'])
    def create_class():
        data = request.json or {}
        if not data.get('name'): return jsonify({'error':'Name required'}), 400
        c = ClassRoom(name=data.get('name'), teacher_id=data.get('teacher_id'))
        db.session.add(c); db.session.commit(); return jsonify(to_dict(c)), 201

    @app.route('/api/classes/<int:cid>', methods=['PUT'])
    def update_class(cid):
        c = ClassRoom.query.get_or_404(cid)
        data = request.json or {}
        c.name = data.get('name', c.name); c.teacher_id = data.get('teacher_id', c.teacher_id)
        db.session.commit(); return jsonify(to_dict(c))

    @app.route('/api/classes/<int:cid>', methods=['DELETE'])
    def delete_class(cid):
        c = ClassRoom.query.get_or_404(cid)
        # unassign students
        for s in Student.query.filter_by(class_id=c.id).all():
            s.class_id = None
        db.session.delete(c); db.session.commit()
        return jsonify({'message':'Deleted'})

    # --- Attendance ---
    @app.route('/api/attendance', methods=['GET'])
    def list_attendance():
        q_date = request.args.get('date'); student_id = request.args.get('student_id', type=int)
        q = Attendance.query
        if q_date: q = q.filter_by(date=q_date)
        if student_id: q = q.filter_by(student_id=student_id)
        return jsonify([to_dict(a) for a in q.order_by(Attendance.id).all()])

    @app.route('/api/attendance', methods=['POST'])
    def mark_attendance():
        data = request.json or {}
        if not (data.get('student_id') and data.get('date') and data.get('status')):
            return jsonify({'error':'student_id, date, status required'}), 400
        existing = Attendance.query.filter_by(student_id=data['student_id'], date=data['date']).first()
        if existing:
            existing.status = data['status']; db.session.commit(); return jsonify(to_dict(existing))
        a = Attendance(student_id=data['student_id'], date=data['date'], status=data['status'])
        db.session.add(a); db.session.commit(); return jsonify(to_dict(a)), 201

    @app.route('/api/attendance/<int:aid>', methods=['DELETE'])
    def delete_attendance(aid):
        a = Attendance.query.get_or_404(aid); db.session.delete(a); db.session.commit()
        return jsonify({'message':'Deleted'})

    # --- Grades ---
    @app.route('/api/grades', methods=['GET'])
    def list_grades():
        student_id = request.args.get('student_id', type=int); q = Grade.query
        if student_id: q = q.filter_by(student_id=student_id)
        return jsonify([to_dict(g) for g in q.order_by(Grade.id).all()])

    @app.route('/api/grades', methods=['POST'])
    def add_grade():
        data = request.json or {}
        if not (data.get('student_id') and data.get('subject') and data.get('score') is not None):
            return jsonify({'error':'student_id, subject, score required'}), 400
        g = Grade(student_id=data['student_id'], subject=data['subject'], score=float(data['score']))
        db.session.add(g); db.session.commit(); return jsonify(to_dict(g)), 201

    @app.route('/api/grades/<int:gid>', methods=['DELETE'])
    def delete_grade(gid):
        g = Grade.query.get_or_404(gid); db.session.delete(g); db.session.commit(); return jsonify({'message':'Deleted'})

    # --- Assignments ---
    @app.route('/api/assignments', methods=['GET'])
    def get_assignments():
        return jsonify([to_dict(a) for a in Assignment.query.order_by(Assignment.id).all()])

    @app.route('/api/assignments', methods=['POST'])
    def create_assignment():
        data = request.json or {}
        if not all([data.get('teacher_id'), data.get('class_id'), data.get('subject'), data.get('title'), data.get('due_date')]):
            return jsonify({'error':'All fields required'}), 400
        a = Assignment(teacher_id=data['teacher_id'], class_id=data['class_id'], subject=data['subject'], title=data['title'], due_date=data['due_date'])
        db.session.add(a); db.session.commit(); return jsonify(to_dict(a)), 201

    @app.route('/api/assignments/<int:aid>', methods=['DELETE'])
    def delete_assignment(aid):
        a = Assignment.query.get_or_404(aid); db.session.delete(a); db.session.commit()
        return jsonify({'message':'Deleted'})

    # --- Fees ---
    @app.route('/api/fees', methods=['GET'])
    def get_fees():
        return jsonify([to_dict(f) for f in Fee.query.order_by(Fee.id).all()])

    @app.route('/api/fees', methods=['POST'])
    def create_fee():
        data = request.json or {}
        if not all([data.get('student_id'), data.get('amount'), data.get('type'), data.get('status')]):
            return jsonify({'error':'All fields required'}), 400
        from datetime import date
        f = Fee(student_id=data['student_id'], amount=data['amount'], type=data['type'], status=data['status'], date=str(date.today()))
        db.session.add(f); db.session.commit(); return jsonify(to_dict(f)), 201

    @app.route('/api/fees/<int:fid>', methods=['DELETE'])
    def delete_fee(fid):
        f = Fee.query.get_or_404(fid); db.session.delete(f); db.session.commit()
        return jsonify({'message':'Deleted'})

    # --- Salaries ---
    @app.route('/api/salaries', methods=['GET'])
    def get_salaries():
        return jsonify([to_dict(s) for s in Salary.query.order_by(Salary.id).all()])

    @app.route('/api/salaries', methods=['POST'])
    def create_salary():
        data = request.json or {}
        if not all([data.get('teacher_id'), data.get('amount'), data.get('month'), data.get('year'), data.get('status')]):
            return jsonify({'error':'All fields required'}), 400
        s = Salary(teacher_id=data['teacher_id'], amount=data['amount'], month=data['month'], year=data['year'], status=data['status'])
        db.session.add(s); db.session.commit(); return jsonify(to_dict(s)), 201

    @app.route('/api/salaries/<int:sid>', methods=['DELETE'])
    def delete_salary(sid):
        s = Salary.query.get_or_404(sid); db.session.delete(s); db.session.commit()
        return jsonify({'message':'Deleted'})

    # --- Exams ---
    @app.route('/api/exams', methods=['GET'])
    def get_exams():
        return jsonify([to_dict(e) for e in Exam.query.order_by(Exam.id).all()])

    @app.route('/api/exams', methods=['POST'])
    def create_exam():
        data = request.json or {}
        if not all([data.get('name'), data.get('class_id'), data.get('date'), data.get('duration'), data.get('total_marks')]):
            return jsonify({'error':'All fields required'}), 400
        e = Exam(name=data['name'], class_id=data['class_id'], date=data['date'], 
                duration=data['duration'], total_marks=data['total_marks'])
        db.session.add(e); db.session.commit(); return jsonify(to_dict(e)), 201

    @app.route('/api/exams/<int:eid>', methods=['PUT'])
    def update_exam(eid):
        e = Exam.query.get_or_404(eid)
        data = request.json or {}
        e.name = data.get('name', e.name); e.class_id = data.get('class_id', e.class_id)
        e.date = data.get('date', e.date); e.duration = data.get('duration', e.duration)
        e.total_marks = data.get('total_marks', e.total_marks)
        db.session.commit(); return jsonify(to_dict(e))

    @app.route('/api/exams/<int:eid>', methods=['DELETE'])
    def delete_exam(eid):
        e = Exam.query.get_or_404(eid); db.session.delete(e); db.session.commit()
        return jsonify({'message':'Deleted'})

    # --- Subjects ---
    @app.route('/api/subjects', methods=['GET'])
    def get_subjects():
        return jsonify([to_dict(s) for s in Subject.query.order_by(Subject.id).all()])

    @app.route('/api/subjects', methods=['POST'])
    def create_subject():
        data = request.json or {}
        if not data.get('name') or not data.get('code'):
            return jsonify({'error':'Name and code required'}), 400
        s = Subject(name=data.get('name'), code=data.get('code'), description=data.get('description'))
        db.session.add(s); db.session.commit(); return jsonify(to_dict(s)), 201

    @app.route('/api/subjects/<int:sid>', methods=['PUT'])
    def update_subject(sid):
        s = Subject.query.get_or_404(sid)
        data = request.json or {}
        s.name = data.get('name', s.name); s.code = data.get('code', s.code)
        s.description = data.get('description', s.description)
        db.session.commit(); return jsonify(to_dict(s))

    @app.route('/api/subjects/<int:sid>', methods=['DELETE'])
    def delete_subject(sid):
        s = Subject.query.get_or_404(sid); db.session.delete(s); db.session.commit()
        return jsonify({'message':'Deleted'})

    # --- Teacher Attendance ---
    @app.route('/api/teacher-attendance', methods=['GET'])
    def list_teacher_attendance():
        q_date = request.args.get('date'); teacher_id = request.args.get('teacher_id', type=int)
        q = TeacherAttendance.query
        if q_date: q = q.filter_by(date=q_date)
        if teacher_id: q = q.filter_by(teacher_id=teacher_id)
        return jsonify([to_dict(a) for a in q.order_by(TeacherAttendance.id).all()])

    @app.route('/api/teacher-attendance', methods=['POST'])
    def mark_teacher_attendance():
        data = request.json or {}
        if not (data.get('teacher_id') and data.get('date') and data.get('status')):
            return jsonify({'error':'teacher_id, date, status required'}), 400
        existing = TeacherAttendance.query.filter_by(teacher_id=data['teacher_id'], date=data['date']).first()
        if existing:
            existing.status = data['status']; db.session.commit(); return jsonify(to_dict(existing))
        a = TeacherAttendance(teacher_id=data['teacher_id'], date=data['date'], status=data['status'])
        db.session.add(a); db.session.commit(); return jsonify(to_dict(a)), 201

    @app.route('/api/teacher-attendance/<int:aid>', methods=['DELETE'])
    def delete_teacher_attendance(aid):
        a = TeacherAttendance.query.get_or_404(aid); db.session.delete(a); db.session.commit()
        return jsonify({'message':'Deleted'})

    return app

if __name__ == '__main__':
    app = create_app()
    with app.app_context():
        db.create_all()
        # create demo user if none exists
        if User.query.count() == 0:

            demo = User(username='abdi2693', password='abdi2693', role='admin')
            db.session.add(demo); db.session.commit()
            print('Created demo user -> username: abdi2693 password: abdi2693')
    app.run(host='0.0.0.0', port=5000, debug=True)