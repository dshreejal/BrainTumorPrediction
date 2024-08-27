from app.models import User, Role, RoleEnum, db
from flask_jwt_extended import create_access_token, create_refresh_token

class AuthService:
    @staticmethod
    def register_user(email, password, role_names):
        user = User(email=email)
        user.set_password(password)
        for role_name in role_names:
            role = Role.query.filter_by(name=RoleEnum(role_name)).first()
            if role:
                user.roles.append(role)
            else:
                raise ValueError(f"Role '{role_name}' does not exist.")
        db.session.add(user)
        db.session.commit()
        return user

    @staticmethod
    def authenticate_user(email, password):
        user = User.query.filter_by(email=email).first()
        if user and user.check_password(password):
            access_token = create_access_token(identity=str(user.id))
            refresh_token = create_refresh_token(identity=str(user.id))
            return {'access_token': access_token, 'refresh_token': refresh_token}
        return None

    @staticmethod
    def refresh_user_token(user_id):
        return create_access_token(identity=user_id)
