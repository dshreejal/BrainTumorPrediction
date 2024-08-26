from flask import Flask, jsonify
from flask_cors import CORS
from app.middleware.error_middleware import handle_404_error, handle_500_error, handle_generic_exception
from app.middleware.logging_middleware import before_request, after_request
import os

basedir = os.path.abspath(os.path.dirname(os.path.dirname(__file__)))

UPLOAD_FOLDER = os.path.join(basedir, 'uploads')

# if the uploads folder does not exist, create it
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app = Flask(__name__) 
CORS(app)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Register logging middleware
app.before_request(before_request)
app.after_request(after_request)

# Register global error handlers
app.register_error_handler(404, handle_404_error)
app.register_error_handler(500, handle_500_error)
app.register_error_handler(Exception, handle_generic_exception)


from app.routes import register_routes
register_routes(app)