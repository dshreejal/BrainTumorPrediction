from app.models import User, db
from flask_jwt_extended import create_access_token, create_refresh_token
from sqlalchemy import func

class AuthService:
    @staticmethod
    def register_user(email):
        email = email.lower()

        # Check if user already exists
        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            raise ValueError("A user with the same email already exists.")

        user = User(email=email)
        
        try:
            # Add to DB and commit transaction
            db.session.add(user)
            db.session.commit()
            print(f"User created with email: {user.email}") 
            return user
        except Exception as e:
            # Rollback in case of error
            db.session.rollback()
            raise ValueError(f"Error creating user: {str(e)}")

    @staticmethod
    def authenticate_user(email, password):
        print(email)
        print(password)
        user = User.query.filter_by(email=email).first()
        print(user)
        if not user:
            raise ValueError("User not found.")
        
        # if there is no password set, return None
        if not user.password_hash:
            raise ValueError("User has not set a password yet.")
        
        if user and user.check_password(password):
                access_token = create_access_token(identity=str(user.id), additional_claims={
                    'email': user.email})
                refresh_token = create_refresh_token(identity=str(user.id))
                return {'access_token': access_token, 'refresh_token': refresh_token}
        return None

    @staticmethod
    def refresh_user_token(user_id):
        return create_access_token(identity=user_id)
    
    @staticmethod
    def get_user_by_id(user_id):
        user = User.query.filter_by(id=user_id).first()
        if user:
            return user.to_dict()
        return None
    
    @staticmethod
    def cleanup_user(email):
        user = User.query.filter_by(email=email).first()
        if user:
            db.session.delete(user)
            db.session.commit()
            
            print(f"User with email {email} deleted. Error occured during sending email")
            return True
        return False
    
    @staticmethod
    def verifyUserPasswordExists(email):
        user = User.query.filter_by(email=email).first()
        if user and user.password_hash:
            return True
        return False