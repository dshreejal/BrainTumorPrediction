from PIL import Image
from app.helpers.logger import get_logger
from app.services.openCV_service import OpenCVImageValidator, OpenCVImageValidatorRefined
from tensorflow.keras.models import load_model
import numpy as np
from flask import  current_app
import os
import matplotlib.pyplot as plt
import matplotlib
import io
from app.models import User, db
import base64
from datetime import datetime

matplotlib.use('Agg')




logger = get_logger("controller")
class_dict = ['glioma', 'meningioma', 'notumor', 'pituitary']

class PredictService:
    
    def __init__(self):        
        # self.image_validator = OpenCVImageValidator()
        self.image_validator = OpenCVImageValidatorRefined()
        
    def predict(self,img_path, model_name):
        
        # check if the model name belong to one of vgg16, resnet50
        if model_name not in ['vgg16', 'resnet50']:
            raise ValueError('Invalid model name')
        
        print('Validate if image is MRI', current_app.config['CHECK_IS_MRI_IMAGE'])
        if current_app.config['CHECK_IS_MRI_IMAGE']:
            validation_result = self.is_valid_medical_image(img_path)
            print('validation_result', validation_result)
            if not validation_result['is_valid']:
                # Log the detailed validation results
                logger.warning(f"Image validation failed: {validation_result}")
                raise ValueError('System only accepts MRI images')
        
        loaded_model = None
        
        if(model_name == 'vgg16'):
            logger.info(f"Loading model: {model_name}")
            model_path = os.path.join(current_app.config['MODEL_FOLDER'], 'vgg/vgg16_model.h5')
            if not os.path.exists(model_path):
                logger.error(f"Model not found: {model_name}")
                raise ValueError('Unable to load model at the moment, please try again later')
            
            loaded_model = load_model(model_path)
            logger.info(f"Model loaded successfully: {model_name}")
        
        if(model_name == 'resnet50'):
            logger.info(f"Loading model: {model_name}")
            model_path = os.path.join(current_app.config['MODEL_FOLDER'], 'resnet/resnet50_model.h5')
            if not os.path.exists(model_path):
                logger.error(f"Model not found: {model_name}")
                raise ValueError('Unable to load model at the moment, please try again later')
            
            loaded_model = load_model(model_path)
            logger.info(f"Model loaded successfully: {model_name}")
        

        # if no model is loaded, raise an exception
        if not loaded_model:
            logger.error('Some errror occured while loading the model, please try again')
            raise ValueError('Some errror occured while loading the model, please try again')
        
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
        

        fig, ax = plt.subplots(figsize=(6, 4))
        bars = ax.barh(class_dict, probs)
        ax.set_xlabel('Probability')
        ax.bar_label(bars, fmt='%.2f')
        plt.tight_layout()
        
        # Save the plot to a BytesIO object
        buf = io.BytesIO()
        plt.savefig(buf, format='png')
        buf.seek(0)
        plt.close(fig)

        # Encode the image as Base64
        image_base64 = base64.b64encode(buf.getvalue()).decode('utf-8')
        
        # clear the buffer
        buf.close()
            
        
        print('Predicted label:', predicted_label)
        print('\n')

        return predicted_label, image_base64
    
    @staticmethod
    def checkLoggedInUserPredictionLimit( user_id):        
        user = User.query.filter_by(id=user_id).first()
        
        if not user:
            raise ValueError('User not found')
        
        if not user.can_predict(datetime.now()):
            raise ValueError('Daily prediction limit reached')
        
        user.predictions_remaining -= 1
        
        
        # If this was the last prediction, set the limit reached timestamp
        if user.predictions_remaining == 0:
            user.update_limit_reached(datetime.fromtimestamp(datetime.now().timestamp()))
            
        db.session.commit()
                
        
    def is_valid_medical_image(self, file):
        # Save file temporarily to validate
        temp_path = os.path.join(current_app.config['UPLOAD_FOLDER'], file.filename)
        file.save(temp_path)
        print('path', temp_path)
        try:            
             # Validate using OpenCV
            validation_result = self.image_validator.validate_medical_image(temp_path)
            return validation_result
        finally:
            # Clean up temporary file
            os.remove(temp_path)
            print('temp_path', temp_path)