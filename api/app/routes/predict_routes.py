from flask import Blueprint, request
from app.controllers.predict_controller import PredictController

predict_bp = Blueprint('predict_bp', __name__)

@predict_bp.route('/<name>', methods=['GET'])
def viewImage(name):
    return PredictController().downloadImage(name)

@predict_bp.route('/', methods=['POST'])
def predictTumor():
    if 'file' not in request.files:
        return {'message':'Image is required'}, 400
    file = request.files['file']
    if file.filename == '':
        return {'message':'No file selected'}, 400
    return PredictController().predictTumor(file)