from flask_mail import Mail, Message
from app import app
from flask import render_template, url_for
import flask_jwt_extended as jwt
from datetime import datetime, timedelta
import os

mail = Mail(app)


class EmailService:
    
    fe_url =  os.getenv('FRONT_END_URL', 'http://localhost:5173')

    @staticmethod
    def send_password_reset_email(user):
        try:
            token = EmailService.generate_token(user.email)
            
            reset_url = f"{EmailService.fe_url}/reset-password?token={token}"

            html_content = render_template('emails/password_reset.html', reset_url=reset_url, user=user)

            msg = Message('Password Reset Request From Tumor Insight',
                        recipients=[user.email],
                        html=html_content)
            mail.send(msg)
            print(f"Email sent to {user.email}")
        
        except Exception as e:
            print("Error sending mail", e)
            raise ValueError(f"Error sending mail. Please try again later")

    @staticmethod
    def send_welcome_email(user):
        try:

            token = EmailService.generate_token(user.email)
            
            setup_url = f"{EmailService.fe_url}/setup-password?token={token}"
            
            html_content = render_template('emails/welcome_email.html', setup_url=setup_url, user=user)
            
            msg = Message('Setup Your Password On Tumor Insight',
                        recipients=[user.email],
                        html=html_content
                        )
            mail.send(msg)
            print(f"Email sent to {user.email}")
        except Exception as e:
            print("Error sending mail", e)
            raise ValueError(f"Error sending mail. Please try again later")
            

    @staticmethod
    def generate_token(email):
        expiration_time = timedelta(hours=24)  

        token = jwt.create_access_token(identity=email, expires_delta=expiration_time)
        return token

    @staticmethod
    def verify_token(token):
        try:
            data = jwt.decode_token(token)

            if data['exp'] > datetime.now().timestamp():
                return data['sub']
        

        except Exception as e:
            print(e)
            return None
