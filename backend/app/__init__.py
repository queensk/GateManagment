from .models.user import User
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from .models import create_all
from .api import api as api_bp
from flask_cors import CORS
from datetime import datetime, timedelta
import jwt
from passlib.hash import pbkdf2_sha256
import os
# from app.models import cleanup


def create_app():
    app = Flask(__name__)
    app.config.from_object('config')
    CORS(app)
    # app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:queens@localhost:5432/gateManagement'
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///management1.db'

    db = SQLAlchemy(app)
    db.init_app(app)

    @app.after_request
    def after_request(response):
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add(
            'Access-Control-Allow-Headers',
            'Content-Type,Authorization')
        response.headers.add(
            'Access-Control-Allow-Methods',
            'GET,POST,PUT,DELETE,OPTIONS,PATCH')
        return response

    app.register_blueprint(api_bp, url_prefix='/api')
    with app.app_context():
        create_all(engine=db)

    @app.route('/')
    def index():
        return 'Welcome to the Scheduling and Management System API!'

    @app.route('/login', methods=['POST'])
    def login():
        # Get the provided username and password from the request
        data = request.get_json()

        # Check if the password field is empty
        if 'password' not in data or not data['password']:
            return jsonify({'message': 'Password field is required'}), 400

        # Check if the userMail field is empty
        if 'userMail' not in data or not data['userMail']:
            return jsonify({'message': 'Email field is required'}), 400

        # Retrieve the username and password from the request data
        username = data.get('userMail')
        password = data.get('password')
        user = User.query.filter_by(email=username).first()
        if not user:
            return jsonify({'message': 'Invalid password and name'}, 401)
        hashed_password = user.password_hash

        if pbkdf2_sha256.verify(password, hashed_password):
            # If the password is valid, generate an authentication token
            try:
                exp_timestamp = datetime.timestamp(
                    datetime.utcnow() + timedelta(days=1))
                token = jwt.encode({
                    'user_name': user.name,
                    'user_email': user.email,
                    'user_id': user.id,
                    'role': user.role,
                    'exp': exp_timestamp
                },
                    os.environ['SECRET_KEY']
                )
                return jsonify({'token': token.decode('utf-8')})
            except Exception as e:
                return e
        else:
            # If the password is invalid, return an error message
            return 'Invalid password', 401

    return app
