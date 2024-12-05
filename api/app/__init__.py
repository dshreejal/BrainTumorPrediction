from flask import Flask, jsonify
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from app.middleware.error_middleware import handle_404_error, handle_500_error, handle_generic_exception
from app.middleware.logging_middleware import before_request, after_request
from app.models import db
import os
from app.config import config
from flask_migrate import Migrate

basedir = os.path.abspath(os.path.dirname(os.path.dirname(__file__)))

print (basedir)

UPLOAD_FOLDER = os.path.join(basedir, 'uploads')

MODEL_FOLDER=os.path.join(basedir,'app', 'prediction', 'models')

# if the uploads folder does not exist, create it
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)
     
if(not os.path.exists(MODEL_FOLDER)):
    os.makedirs(MODEL_FOLDER)

app = Flask(__name__) 
CORS(app,supports_credentials=True, resources={r"/*": {"origins": "http://localhost:5173"}})
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MODEL_FOLDER'] = MODEL_FOLDER

# Database configuration
app.config.from_object(config)

db.init_app(app)
jwt = JWTManager(app)
migrate = Migrate(app, db)


# Register logging middleware
app.before_request(before_request)
app.after_request(after_request)

# Register global error handlers
app.register_error_handler(404, handle_404_error)
app.register_error_handler(500, handle_500_error)
app.register_error_handler(Exception, handle_generic_exception)


from app.routes import register_routes
register_routes(app)