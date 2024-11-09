import time
from app.helpers.logger import get_logger
from flask import jsonify, send_from_directory, current_app
from app import app
import os
from werkzeug.utils import secure_filename

logger = get_logger("controller")

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

class UploadController:
    
    def uploadImage(self, file):
        if not file:
            return jsonify({'message': 'No file selected'}), 400
        
        if not allowed_file(file.filename):
            return jsonify({'message': 'Invalid file type'}), 400
        
        # Generate a unique filename with a timestamo prefix
        timestamp = int(time.time())
        filename = f"{timestamp}_{secure_filename(file.filename)}"
        
        # Define the file save path
        save_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
        
        try:
            # Save the file
            file.save(save_path)
            logger.info(f"File saved successfully: {save_path}")
            return jsonify({'message': 'File uploaded successfully', 'filename': filename}), 201
        except Exception as e:
            logger.error(f"Error saving file: {str(e)}")
            return jsonify({'message': 'File upload failed'}), 500
        
    
    def downloadImage(self,name):
        logger.info(f"Request to download file: {name}")
        fileExists = os.path.exists(os.path.join(app.config['UPLOAD_FOLDER'], name))
        
        if not fileExists:
            logger.error(f"File '{name}' not found in {app.config['UPLOAD_FOLDER']}")
            return jsonify({'message': 'File not found!'}), 404
        
        return send_from_directory(current_app.config['UPLOAD_FOLDER'], name)