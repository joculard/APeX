from flask import Blueprint, request, jsonify
from .. import db
from ..models import User
from flask_jwt_extended import create_access_token, jwt_required, get_jwt, get_jwt_identity
from datetime import timedelta

bp = Blueprint('auth', __name__)

@bp.route('/register', methods=['POST'])
def register():
    data = request.get_json() or {}
    username = data.get('username', '').strip()
    password = data.get('password', '')
    if not username or not password:
        return jsonify({"msg": "username and password required"}), 400
    if User.query.filter_by(username=username).first():
        return jsonify({"msg": "username already exists"}), 409

    user = User(username=username)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()
    return jsonify({"msg": "user created"}), 201

@bp.route('/login', methods=['POST'])
def login():
    data = request.get_json() or {}
    username = data.get('username', '').strip()
    password = data.get('password', '')
    if not username or not password:
        return jsonify({"msg": "username and password required"}), 400

    user = User.query.filter_by(username=username).first()
    if not user or not user.check_password(password):
        return jsonify({"msg": "bad credentials"}), 401
access_token = create_access_token(
    identity=str(user.id),
    additional_claims={"role": user.role},
    expires_delta=timedelta(hours=4)
)
    return jsonify(access_token=access_token), 200

@bp.route('/ping', methods=['GET'])
@jwt_required()
def ping():
    user_id = get_jwt_identity()
    role = get_jwt().get("role", "unknown")
    return jsonify({
        "msg": "pong",
        "you": {"id": user_id, "role": role}
    }), 200
