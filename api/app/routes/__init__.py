from app.routes.main_routes import main_bp

def register_routes(app):
    app.register_blueprint(main_bp)
