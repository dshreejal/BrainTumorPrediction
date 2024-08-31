from flask import Blueprint
from app.controllers.main_controller import MainController

main_bp = Blueprint('main_bp', __name__)

@main_bp.route('/', methods=['GET'])
def api():
    return MainController().heartbeat()