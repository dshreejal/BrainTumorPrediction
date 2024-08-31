from app import app, db
from app.models import Role, User, RoleEnum

def seed_roles():
    roles = [
        Role(name=RoleEnum.USER),
        Role(name=RoleEnum.ADMIN),
        Role(name=RoleEnum.DOCTOR)
    ]
    
    for role in roles:
        if not Role.query.filter_by(name=role.name).first():
            db.session.add(role)
    db.session.commit()

def seed_admin_user():
    admin_email = "admin@example.com"
    admin_password = "adminpassword"  # Use a more secure password in production

    if not User.query.filter_by(email=admin_email).first():
        admin_user = User(email=admin_email)
        admin_user.set_password(admin_password)
        
        admin_role = Role.query.filter_by(name=RoleEnum.ADMIN).first()
        admin_user.roles.append(admin_role)
        
        db.session.add(admin_user)
        db.session.commit()

def run_seeders():
    with app.app_context():
        seed_roles()
        seed_admin_user()

if __name__ == "__main__":
    run_seeders()