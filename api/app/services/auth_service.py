from app.models import User, db
from flask_jwt_extended import create_access_token, create_refresh_token
from sqlalchemy import func

class AuthService:
    @staticmethod
    def register_user(email, password, role_names):
        existing_user = User.query.filter_by(email=email.lower()).first()
        if existing_user:
            raise ValueError("A user with the same email already exists.")
        
        user = User(email=email)
        user.set_password(password)
        # for role_name in role_names:
        #     role = Role.query.filter_by(name=RoleEnum(role_name)).first()
        #     if role:
        #         user.roles.append(role)
        #     else:
        #         raise ValueError(f"Role '{role_name}' does not exist.")
        db.session.add(user)
        db.session.commit()
        return user

    @staticmethod
    def authenticate_user(email, password):
        print(email)
        print(password)
        user = User.query.filter_by(email=email).first()
        print(user)
        if not user:
            raise ValueError("User not found.")
        if user and user.check_password(password):
            # if user.check_role(accountType):
            #     print("AccountType", accountType)
            #     roles = [role.name.value for role in user.roles]
            #     access_token = create_access_token(identity=str(user.id), additional_claims={
            #         'email': user.email, 'roles':roles})
            #     refresh_token = create_refresh_token(identity=str(user.id))
            #     return {'access_token': access_token, 'refresh_token': refresh_token}
            # return None
            
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