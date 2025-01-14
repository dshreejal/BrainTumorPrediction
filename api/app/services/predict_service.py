from PIL import Image
from app.helpers.logger import get_logger
from tensorflow.keras.models import load_model
import numpy as np
from flask import jsonify, send_from_directory, current_app
import os
import matplotlib.pyplot as plt
import matplotlib
import io
from app.models import User, db
import base64
from datetime import datetime
import pytz

matplotlib.use('Agg')




logger = get_logger("controller")
class_dict = ['glioma', 'meningioma', 'notumor', 'pituitary']

class PredictService:
    @staticmethod
    def predict( img_path, model_name, user_id):
        
        # check if the model name belong to one of vgg16, resnet50
        if model_name not in ['vgg16', 'resnet50']:
            raise ValueError('Invalid model name')
        
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
        # utc = pytz.utc
        # current_time = datetime.now().replace(tzinfo=utc)
        
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
                
        