from app.helpers.logger import get_logger
from datetime import datetime
from flask import jsonify, request,send_from_directory, current_app, Response
from app import app
import os
from flask_jwt_extended import jwt_required, get_jwt_identity

from app.services.predict_service import PredictService

logger = get_logger("controller")

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

# Temporary storage for non-logged-in user prediction tracking
non_logged_in_users = {}

class PredictController:
    
    def allowed_file(self,filename):
        return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
    
    
    @jwt_required(optional=True)
    def predictTumor(self, file):
        user_id = get_jwt_identity()
        
        # For non-logged-in users, track IP-based prediction count
        if not user_id:
            print(f"Not logged in", non_logged_in_users)
            ip = request.remote_addr
            today = datetime.now().strftime('%Y-%m-%d')
            
            if ip not in non_logged_in_users:
                non_logged_in_users[ip] = {"date": today, "count": 0}
            
            user_data = non_logged_in_users[ip]

            # Reset count if the date has changed
            if user_data["date"] != today:
                user_data["date"] = today
                user_data["count"] = 0

            # Check if the user exceeded their limit
            if user_data["count"] >= 3:
                return jsonify({'message': 'You have reached the daily prediction limit. Please log in for more predictions.'}), 400

            # Increment prediction count
            user_data["count"] += 1
            
        elif user_id:
            print(f"Logged in", user_id)
            try:
                PredictService.checkLoggedInUserPredictionLimit(user_id)   
            except ValueError as e:
                return jsonify({'message': str(e)}), 400

        if not file:
            return jsonify({'message': 'No file selected'}), 400
        
        if not self.allowed_file(file.filename):
            return jsonify({'message': 'Invalid file type'}), 400
        
        data = request.form
        
        model_name = data.get('model_name')

        if not model_name:
            return jsonify({'message': 'Model has not been selected'}), 400
        
        try:
            predict_service = PredictService()
            prediction_result, base64_image = predict_service.predict(file, model_name)
        except ValueError as e:
            return jsonify({'message': str(e)}), 400
                        
        if user_id:
            return jsonify({'message': 'Image processed successfully', 'prediction': prediction_result, 'image':base64_image}), 200
        else:
            return jsonify({'message': 'Image processed successfully', 'prediction': prediction_result}), 200
        
    
    def downloadImage(self,name):
        logger.info(f"Request to download file: {name}")
        fileExists = os.path.exists(os.path.join(app.config['UPLOAD_FOLDER'], name))
        
        if not fileExists:
            logger.error(f"File '{name}' not found in {app.config['UPLOAD_FOLDER']}")
            return jsonify({'message': 'File not found!'}), 404
        
        return send_from_directory(current_app.config['UPLOAD_FOLDER'], name)