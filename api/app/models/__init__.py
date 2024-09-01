import uuid
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import Enum, DateTime, func
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from enum import Enum as PyEnum
print("Importing models")
db = SQLAlchemy()

class RoleEnum(PyEnum):
    USER = "user"
    ADMIN = "admin"
    DOCTOR = "doctor"

class Role(db.Model):
    __tablename__ = 'roles'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = db.Column(Enum(RoleEnum), unique=True, nullable=False)
    created_at = db.Column(DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(DateTime(timezone=True), onupdate=func.now())

    def __repr__(self):
        return f"<Role {self.name.value}>"

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password_hash = db.Column(db.Text, nullable=False)
    created_at = db.Column(DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(DateTime(timezone=True), onupdate=func.now())
    roles = db.relationship('Role', secondary='user_roles', backref='users')

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
    def check_role(self, role_name):
        return role_name in [role.name.value for role in self.roles]
    
    def __repr__(self):
        return f"<User {self.email}>"
    
    def to_dict(self):
        return {
            'id': str(self.id),
            'email': self.email,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'roles': [role.name.value for role in self.roles]
        }

class UserRoles(db.Model):
    __tablename__ = 'user_roles'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = db.Column(UUID(as_uuid=True), db.ForeignKey('users.id', ondelete='CASCADE'))
    role_id = db.Column(UUID(as_uuid=True), db.ForeignKey('roles.id', ondelete='CASCADE'))
    created_at = db.Column(DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(DateTime(timezone=True), onupdate=func.now())
