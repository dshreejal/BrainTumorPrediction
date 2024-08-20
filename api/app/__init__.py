from flask import Flask 
from flask_cors import CORS
import os

basedir = os.path.abspath(os.path.dirname(os.path.dirname(__file__)))

UPLOAD_FOLDER = os.path.join(basedir, 'uploads')

# if the uploads folder does not exist, create it
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app = Flask(__name__) 
CORS(app)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


from app import routes