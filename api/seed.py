from app import app, db
from app.models import User

def seed_admin_user():
    admin_email = "admin@example.com"
    admin_password = "adminpassword" 

    if not User.query.filter_by(email=admin_email).first():
        admin_user = User(
            email=admin_email,
            predictions_remaining=5 
        )
        admin_user.set_password(admin_password)
        
        db.session.add(admin_user)
        db.session.commit()

def run_seeders():
    with app.app_context():
        seed_admin_user()

if __name__ == "__main__":
    run_seeders()