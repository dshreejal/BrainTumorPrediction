import uuid
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import DateTime, func, Integer
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
import pytz

print("Importing models")
db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password_hash = db.Column(db.Text, nullable=False)
    created_at = db.Column(DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(DateTime(timezone=True), onupdate=func.now())
    predictions_remaining = db.Column(Integer, nullable=False, default=5)  # Number of predictions remaining
    limit_reached_at = db.Column(DateTime(timezone=True), nullable=True)   # Timestamp of when the limit was reached

    def set_password(self, password):
        """Hashes the password and sets it to the password_hash attribute."""
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        """Checks if the provided password matches the hashed password."""
        return check_password_hash(self.password_hash, password)

    def reset_predictions(self):
        """Resets the user's prediction count and clears the limit reached timestamp."""
        self.predictions_remaining = 5  # Need to change this to take the limit from the config .TODO
        self.limit_reached_at = None

    def update_limit_reached(self, current_time):
        """Sets the limit reached timestamp to the current time."""
        self.limit_reached_at = current_time

    def can_predict(self, current_time, reset_period=24):
        """
        Checks if the user can make a prediction based on the remaining predictions
        and the time elapsed since the limit was reached.
        """
        if self.predictions_remaining > 0:
            return True
        if self.limit_reached_at:
            utc = pytz.utc
            current_time = current_time.replace(tzinfo=utc) if current_time.tzinfo is None else current_time
            print(f"Current time: {current_time}")
            limit_reached_at = self.limit_reached_at.replace(tzinfo=utc) 
            print(f"Limit reached at: {limit_reached_at}")

            elapsed_time = (current_time - limit_reached_at).total_seconds() / 3600
            print(f"Elapsed time: {elapsed_time}")
            
            print(f"Reset period: {reset_period}")
            if elapsed_time >= reset_period:
                self.reset_predictions()
                return True
        return False

    def __repr__(self):
        return f"<User {self.email}>"

    def to_dict(self):
        return {
            'id': str(self.id),
            'email': self.email,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'predictions_remaining': self.predictions_remaining,
            'limit_reached_at': self.limit_reached_at
        }
