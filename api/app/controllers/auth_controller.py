from flask import request, jsonify
from app.services.auth_service import AuthService
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.middleware.auth_middleware import role_required
from app.models import RoleEnum

class AuthController:

    @staticmethod
    def register():
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        roles = data.get('roles', [])
        try:
            user = AuthService.register_user(email, password, roles)
            return jsonify({"message": "User registered successfully"}), 201
        except ValueError as e:
            return jsonify({"error": str(e)}), 400

    @staticmethod
    def login():
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        auth_tokens = AuthService.authenticate_user(email, password)
        if auth_tokens:
            return jsonify(auth_tokens), 200
        return jsonify({"message": "Invalid credentials"}), 401

    @staticmethod
    @jwt_required(refresh=True)
    def refresh():
        user_id = get_jwt_identity()
        new_token = AuthService.refresh_user_token(user_id)
        return jsonify({"access_token": new_token}), 200

    @staticmethod
    @jwt_required()
    @role_required(RoleEnum.ADMIN)
    def admin_dashboard():
        return jsonify({"message": "Welcome, admin!"}), 200
