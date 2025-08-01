from app import create_app, db
from app.models import User

app = create_app()


def seed_roles():
    if not User.query.filter_by(username="admin").first():
        admin = User(username="admin")
        admin.set_password("strongpassword")
        admin.role = "admin"
        db.session.add(admin)
    if not User.query.filter_by(username="mrsmith").first():
        teacher = User(username="mrsmith")
        teacher.set_password("teachpass")
        teacher.role = "teacher"
        db.session.add(teacher)
    if not User.query.filter_by(username="alice").first():
        student = User(username="alice")
        student.set_password("studentpass")
        student.role = "student"
        db.session.add(student)
    db.session.commit()

# call it
seed_roles()
