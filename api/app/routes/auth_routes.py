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

@auth_bp.route('/admin', methods=['GET'])
def admin_dashboard():
    return AuthController().admin_dashboard()