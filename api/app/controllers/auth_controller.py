from flask import request, jsonify, make_response
from app.services.auth_service import AuthService
from flask_jwt_extended import jwt_required, get_jwt_identity, set_access_cookies, set_refresh_cookies, unset_refresh_cookies, unset_access_cookies

class AuthController:

    @staticmethod
    def register():
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        roles = data.get('roles', [])

        if not email or not password:
            return jsonify({"error": "Email and password are required"}), 400
        
        if not roles:
            return jsonify({"error": "User must have at least one role"}), 400
        
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
        try:
            auth_tokens = AuthService.authenticate_user(email, password)
            if auth_tokens:
                response = make_response(jsonify(auth_tokens))
                set_refresh_cookies(response, auth_tokens['refresh_token'])
                set_access_cookies(response, auth_tokens['access_token'])
                return response
            return jsonify({"message": "Invalid credentials"}), 401
        except ValueError as e:
            return jsonify({"error": str(e)}), 400

    @staticmethod
    @jwt_required(refresh=True)
    def refresh():
        user_id = get_jwt_identity()
        new_token = AuthService.refresh_user_token(user_id)
        return jsonify({"access_token": new_token}), 200


    @staticmethod
    @jwt_required()
    def get_user():
        user_id = get_jwt_identity()
        try:
            user = AuthService.get_user_by_id(user_id)
            if user:
                return jsonify(user), 200
            return jsonify({"message": "User not found"}), 404
        except ValueError as e:
            return jsonify({"error": str(e)}), 400
        
    
    @staticmethod
    @jwt_required()
    def logout():
        print("inside")
        response = make_response(jsonify({"message": "Logged out successfully"}))
        unset_access_cookies(response)
        unset_refresh_cookies(response)
        return response
