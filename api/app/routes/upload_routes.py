from flask import Blueprint, request
from app.controllers.upload_controller import UploadController

upload_bp = Blueprint('upload_bp', __name__)

@upload_bp.route('/<name>', methods=['GET'])
def viewImage(name):
    return UploadController().downloadImage(name)

@upload_bp.route('/', methods=['POST'])
def uploadImage():
    if 'file' not in request.files:
        return {'message':'Image is required'}, 400
    file = request.files['file']
    if file.filename == '':
        return {'message':'No file selected'}, 400
    return UploadController().uploadImage(file)