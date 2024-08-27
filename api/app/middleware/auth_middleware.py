from functools import wraps
from flask_jwt_extended import get_jwt_identity
from app.models import User, RoleEnum
import uuid

def role_required(required_role: RoleEnum):
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            user_id = get_jwt_identity()
            user = User.query.get(uuid.UUID(user_id))
            if user and any(role.name == required_role for role in user.roles):
                return f(*args, **kwargs)
            return {"message": "Access denied"}, 403
        return decorated_function
    return decorator
