from flask import request, g
from time import time
from app.helpers.logger import get_logger

logger = get_logger("middleware")

# Before request handler
def before_request():
    g.start_time = time()  # Record the start time of the request
    logger.info(f"Incoming request: {request.method} {request.path} - Params: {request.args}")

# After request handler
def after_request(response):
    duration = time() - g.start_time  # Calculate the request duration
    logger.info(f"Completed request: {request.method} {request.path} - Status: {response.status_code} - Duration: {duration:.4f}s")
    return response