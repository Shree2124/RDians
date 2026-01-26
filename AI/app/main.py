from flask import Flask
from app.routes.verify import verify_bp

def create_app():
    app = Flask(__name__)
    app.register_blueprint(verify_bp)
    return app

app = create_app()

if __name__ == "__main__":
    app.run(debug=True)
