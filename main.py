from flask import Flask
from flask_security import Security, SQLAlchemyUserDatastore
from applications.security import datastore
from applications.models import db, User, Role
from config import DevelopementConfig
from applications.APIresources import api
from applications.worker import celery_init_app


def create_app():
    app = Flask(__name__, template_folder="templates")
    app.config.from_object(DevelopementConfig)
    db.init_app(app)
    api.init_app(app)
    
    app.security = Security(app, datastore)

    with app.app_context():
        import applications.controllers
        
    return app

app = create_app()
celery_app = celery_init_app(app)


if __name__ == '__main__':
    import initial_data
    app.run(debug=True)
    