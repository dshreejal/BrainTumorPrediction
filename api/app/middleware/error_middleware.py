from flask import jsonify
from app.helpers.logger import get_logger

logger = get_logger("error_middleware")

def handle_404_error(error):
    logger.error(f"404 Error: {error}")
    return jsonify({'error': 'Resource not found', 'message': str(error)}), 404

def handle_500_error(error):
    logger.error(f"500 Error: {error}")
    return jsonify({'error': 'Internal Server Error', 'message': 'An unexpected error occurred. Please try again later.'}), 500

def handle_generic_exception(error):
    logger.error(f"Unexpected error: {error}")
    return jsonify({'error': 'Unexpected error', 'message': str(error)}), 500
