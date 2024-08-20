from flask import  jsonify, send_from_directory, request
from app import app

import os;

@app.route('/', methods=['GET'])
def api():
    return jsonify({'message': 'Hello, World!'})


@app.route('/upload', methods=['POST'])
def upload():
    return jsonify({'message': 'File uploaded'})


@app.route('/uploads/<name>', methods=['GET']) 
def download_file(name):
    return send_from_directory(app.config["UPLOAD_FOLDER"], name)