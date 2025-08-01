from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS
import os
from .routes.assignment import bp as assignment_bp
app.register_blueprint(assignment_bp, url_prefix="/api")
from .routes.example import bp as example_bp
app.register_blueprint(example_bp, url_prefix="/api")

db = SQLAlchemy()
jwt = JWTManager()

def create_app():

from .routes.assignment import bp as assignment_bp
app.register_blueprint(assignment_bp, url_prefix="/api")

    app = Flask(__name__)

    app.config['SECRET_KEY'] = 'your-secret-key'
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///apex.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    CORS(app)

    db.init_app(app)
    jwt.init_app(app)

    # Import and register blueprints here, inside the function
    from .routes.predict import bp as predict_bp
    app.register_blueprint(predict_bp, url_prefix="/api")

    return app
