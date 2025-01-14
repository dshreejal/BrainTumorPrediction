from app.routes.main_routes import main_bp
from app.routes.auth_routes import auth_bp
from app.routes.predict_routes import predict_bp

def register_routes(app):
    app.register_blueprint(main_bp)
    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(predict_bp, url_prefix='/predict')
