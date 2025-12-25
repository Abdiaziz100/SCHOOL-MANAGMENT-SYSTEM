# init_db.py
from app import create_app
from database import db
from models import Student, Teacher, ClassRoom, User

app = create_app()
with app.app_context():
    db.create_all()
    # clear tables (careful)
    Student.query.delete(); Teacher.query.delete(); ClassRoom.query.delete(); User.query.delete()
    db.session.commit()

    t1 = Teacher(name='Mrs. Amina', subject='Mathematics')
    t2 = Teacher(name='Mr. James', subject='English')
    db.session.add_all([t1, t2]); db.session.commit()

    c1 = ClassRoom(name='Grade 7A', teacher_id=t1.id)
    c2 = ClassRoom(name='Grade 8B', teacher_id=t2.id)
    db.session.add_all([c1, c2]); db.session.commit()

    s1 = Student(name='Ali', age=13, email='ali@example.com', class_id=c1.id)
    s2 = Student(name='Zahra', age=14, email='zahra@example.com', class_id=c2.id)
    s3 = Student(name='Omar', age=13, email='omar@example.com', class_id=c1.id)
    db.session.add_all([s1, s2, s3]); db.session.commit()


    u = User(username='abdi2693', password='abdi2693', role='admin')
    db.session.add(u); db.session.commit()
    print('DB seeded.')