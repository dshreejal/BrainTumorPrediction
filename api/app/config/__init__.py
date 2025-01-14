import os
from datetime import timedelta

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'your_secret_key')
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'postgresql://postgres:admin@localhost:5432/tumor_insight')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'your_jwt_secret_key')
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(minutes=int(os.getenv('JWT_ACCESS_EXPIRES', 15)))  # Access token expiration
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=int(os.getenv('JWT_REFRESH_EXPIRES', 30)))   # Refresh token expiration
    JWT_TOKEN_LOCATION = ['cookies', 'headers']
    JWT_COOKIE_CSRF_PROTECT = False
    MAIL_SERVER = os.getenv('MAIL_SERVER', 'smtp.ethereal.email') 
    MAIL_PORT = os.getenv('MAIL_PORT', 587)
    MAIL_USE_TLS = os.getenv('MAIL_USE_TLS', True)
    MAIL_USERNAME = os.getenv('MAIL_USERNAME', 'izabella.upton26@ethereal.email')  
    MAIL_PASSWORD = os.getenv('MAIL_PASSWORD', 'fMG8psPyZFmWRHg21v')    
    MAIL_DEFAULT_SENDER = os.getenv('MAIL_DEFAULT_SENDER', 'izabella.upton26@ethereal.email')
    MAIL_USE_TLS = os.getenv('MAIL_USE_TLS', True)
    LOGGED_IN_USER_DEFAULT_PREDICTIONS=os.getenv('LOGGED_IN_USER_DEFAULT_PREDICTIONS', 5)
    NON_LOGGED_IN_USER_PREDICTION_LIMIT=os.getenv('NON_LOGGED_IN_USER_PREDICTION_LIMIT', 3)
config = Config()