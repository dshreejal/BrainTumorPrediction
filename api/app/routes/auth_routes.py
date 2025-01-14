from flask import Blueprint
from app.controllers.auth_controller import AuthController

auth_bp = Blueprint('auth_bp', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    return AuthController().register()

@auth_bp.route('/login', methods=['POST'])
def login():
    return AuthController().login()

@auth_bp.route('/refresh', methods=['POST'])
def refresh():
    return AuthController().refresh()

@auth_bp.route('/user', methods=['GET'])
def get_user():
    return AuthController().get_user()

@auth_bp.route('/logout', methods=['POST'])
def logout():
    return AuthController().logout()

@auth_bp.route('/verify-token', methods=['POST'])
def verify_token():
    return AuthController().verify_token()

@auth_bp.route('/setup-password', methods=['POST'])
def setup_password():
    return AuthController.setup_password()

@auth_bp.route('/forgot-password', methods=['POST'])
def forgot_password():
    return AuthController.forgot_password()

@auth_bp.route('/reset-password', methods=['POST'])
def reset_password():
    return AuthController.reset_password()