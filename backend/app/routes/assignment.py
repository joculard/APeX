from flask import Blueprint, request, jsonify
from app import db
from app.models import Assignment, Submission
from datetime import datetime
from app.auth_utils import role_required  # import decorator

bp = Blueprint('assignment', __name__)

@bp.route("/assignments", methods=["POST"])
@role_required("teacher", "admin")  # only teachers or admins can create assignments
def create_assignment():
    data = request.get_json()
    new_assignment = Assignment(
        title=data["title"],
        description=data.get("description"),
        due_date=datetime.strptime(data["due_date"], "%Y-%m-%d") if data.get("due_date") else None,
        created_by=data["teacher_id"]
    )
    db.session.add(new_assignment)
    db.session.commit()
    return jsonify({"msg": "Assignment created"}), 201


@bp.route("/submissions", methods=["POST"])
@role_required("student")  # only students can submit
def submit_assignment():
    data = request.get_json()
    submission = Submission(
        assignment_id=data["assignment_id"],
        student_id=data["student_id"],
        file_url=data["file_url"]
    )
    db.session.add(submission)
    db.session.commit()
    return jsonify({"msg": "Submission received"}), 201


@bp.route("/submissions/<int:submission_id>", methods=["PATCH"])
@role_required("teacher", "admin")  # only teacher/admin can grade
def grade_submission(submission_id):
    data = request.get_json()
    submission = Submission.query.get_or_404(submission_id)
    submission.grade = data["grade"]
    submission.feedback = data.get("feedback", "")
    db.session.commit()
    return jsonify({"msg": "Graded"}), 200
