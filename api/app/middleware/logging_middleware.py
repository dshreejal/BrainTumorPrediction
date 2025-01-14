from flask import request, g, make_response
from time import time
from app.helpers.logger import get_logger
from flask_jwt_extended import get_jwt_identity, create_access_token, set_access_cookies, get_jwt
from datetime import datetime, timedelta, timezone

logger = get_logger("middleware")

# Before request handler
def before_request():
    g.start_time = time()  # Record the start time of the request
    logger.info(f"Incoming request: {request.method} {request.path} - Params: {request.args}")

# After request handler
def after_request(response):
    duration = time() - g.start_time  # Calculate the request duration
    logger.info(f"Completed request: {request.method} {request.path} - Status: {response.status_code} - Duration: {duration:.4f}s")
     # Check if a refresh token is present and handle access token refresh
    try:
        # Check if the request has a refresh token cookie
        refresh_token = request.cookies.get('refresh_token')
        if refresh_token:
            # Validate the refresh token and generate a new access token
            identity = get_jwt_identity()  # This might not be available if the request is not authenticated
            exp_timestamp = get_jwt()["exp"] if get_jwt() else None

            if exp_timestamp:
                now = datetime.now(timezone.utc)
                target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
                if target_timestamp > exp_timestamp:
                    # Generate a new access token
                    new_access_token = create_access_token(identity=identity)
                    response = make_response(response)
                    set_access_cookies(response, new_access_token)
    except (RuntimeError, KeyError):
        # Handle the case where there's no valid JWT or error in processing
        pass
    return response