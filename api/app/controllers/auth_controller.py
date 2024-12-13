from flask import request, jsonify, make_response
from app.services.auth_service import AuthService
from app.services.email_service import EmailService
from flask_jwt_extended import jwt_required, get_jwt_identity, set_access_cookies, set_refresh_cookies, unset_refresh_cookies, unset_access_cookies
from app.models import User, db

class AuthController:

    @staticmethod
    def register():
        data = request.get_json()
        email = data.get('email')

        if not email:
            return jsonify({"error": "Email is required"}), 400
        
        try:
            user = AuthService.register_user(email)
            if not user:
                return jsonify({"error": "User creation failed"}), 500
        
            EmailService.send_welcome_email(user)  # Send email with the token for password setup
            return jsonify({"message": "User registered successfully, check your email to set up your password."}), 201
        except ValueError as e:
            if(user):
                AuthService.cleanup_user(user.email)
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
    
    @staticmethod
    def setup_password(token):
        email = EmailService.verify_token(token)
        if not email:
            return jsonify({"error": "Invalid or expired token"}), 400

        data = request.get_json()
        password = data.get('password')
        if not password:
            return jsonify({"error": "Password is required"}), 400
        
        # the password should contain at least 8 characters, a capital letter, a number and a special character either !@#$&
        if not any(char.isupper() for char in password) or not any(char.isdigit() for char in password) or not any(char in "!@#$&" for char in password) or len(password) < 8:
            return jsonify({"error": "Password must contain at least 8 characters, a capital letter, a number and a special character (!@#$&)"}), 400
        
        
        user = User.query.filter_by(email=email).first()
        if user:
            user.set_password(password)
            db.session.commit()
            return jsonify({"message": "Password successfully set"}), 200
        
        return jsonify({"error": "User not found"}), 404
    
    @staticmethod
    def forgot_password():
        data = request.get_json()
        email = data.get('email')
        
        if not email:
            return jsonify({"error": "Email is required"}), 400
        
        user = User.query.filter_by(email=email).first()
        if user:
            EmailService.send_password_reset_email(user)
            return jsonify({"message": "Password reset email sent."}), 200
        return jsonify({"error": "User not found"}), 404
    
    @staticmethod
    def reset_password(token):
        email = EmailService.verify_token(token)
        if not email:
            return jsonify({"error": "Invalid or expired token"}), 400

        # Allow the user to set a new password
        data = request.get_json()
        password = data.get('password')
        
        data = request.get_json()
        password = data.get('password')
        if not password:
            return jsonify({"error": "Password is required"}), 400
        
        # the password should contain at least 8 characters, a capital letter, a number and a special character either !@#$&
        if not any(char.isupper() for char in password) or not any(char.isdigit() for char in password) or not any(char in "!@#$&" for char in password) or len(password) < 8:
            return jsonify({"error": "Password must contain at least 8 characters, a capital letter, a number and a special character (!@#$&)"}), 400
        
        
        user = User.query.filter_by(email=email).first()
        if user:
            user.set_password(password)
            db.session.commit()
            return jsonify({"message": "Password successfully reset"}), 200
        
        return jsonify({"error": "User not found"}), 404
