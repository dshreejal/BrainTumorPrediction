import time
from app.helpers.logger import get_logger
from flask import jsonify, send_from_directory, current_app
from app import app
import os
from PIL import Image
from werkzeug.utils import secure_filename
import numpy as np
from tensorflow.keras.models import load_model

logger = get_logger("controller")

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

class_dict = ['glioma', 'meningioma', 'notumor', 'pituitary']

class UploadController:
    
    def allowed_file(self,filename):
        return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
    
    def predict(self, img_path):
        loaded_model = load_model(current_app.config['MODEL_FOLDER'] + '/my_model.h5')
        # Load and preprocess the image
        img = Image.open(img_path).convert('RGB') # Open image and convert to RGB
        resized_img = img.resize((299, 299))  # Resize to match model input shape
        img_array = np.asarray(resized_img)  # Convert image to numpy array
        img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
        img_array = img_array / 255.0  # Normalize pixel values 

        # Make predictions using the loaded model
        predictions = loaded_model.predict(img_array)
        probs = predictions[0]  # Get the probabilities for each class

        # Get the label with the highest probability
        predicted_index = np.argmax(probs)
        predicted_label = class_dict[predicted_index]
        
        print('Predicted label:', predicted_label)
        print('\n')

        return predicted_label
    
    def uploadImage(self, file):
        if not file:
            return jsonify({'message': 'No file selected'}), 400
        
        if not self.allowed_file(file.filename):
            return jsonify({'message': 'Invalid file type'}), 400
        
        # # Generate a unique filename with a timestamo prefix
        # timestamp = int(time.time())
        # filename = f"{timestamp}_{secure_filename(file.filename)}"
        
        # # Define the file save path
        # save_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
        
        # try:
        #     # Save the file
        #     file.save(save_path)
        #     logger.info(f"File saved successfully: {save_path}")
        #     return jsonify({'message': 'File uploaded successfully', 'filename': filename}), 201
        # except Exception as e:
        #     logger.error(f"Error saving file: {str(e)}")
        #     return jsonify({'message': 'File upload failed'}), 500
        prediction_result = self.predict(file.stream)
        return jsonify({'message': 'File uploaded successfully', 'prediction': prediction_result}), 201
        
    
    def downloadImage(self,name):
        logger.info(f"Request to download file: {name}")
        fileExists = os.path.exists(os.path.join(app.config['UPLOAD_FOLDER'], name))
        
        if not fileExists:
            logger.error(f"File '{name}' not found in {app.config['UPLOAD_FOLDER']}")
            return jsonify({'message': 'File not found!'}), 404
        
        return send_from_directory(current_app.config['UPLOAD_FOLDER'], name)