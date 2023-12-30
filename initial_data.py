from main import app
from applications.security import datastore
from applications.models import db, Role
from flask_security import hash_password
from werkzeug.security import generate_password_hash

with app.app_context():
    db.create_all()
    datastore.find_or_create_role(name = 'admin', description = 'There can be only one Admin!')
    datastore.find_or_create_role(name = 'seller', description = 'Sellers need approval from Admin!')
    datastore.find_or_create_role(name = 'buyer', description = 'There can be many buyers!')
    db.session.commit()
    if not datastore.find_user(email = "admin@email.com"):
        datastore.create_user(email = "admin@email.com", password = generate_password_hash("password", method='pbkdf2:sha256', salt_length=16), roles = ["admin"])
    db.session.commit()
    # admin = Role(id= 1, name = 'Admin', description = 'There is only one Admin!')
    # db.session.add(admin)
    # seller = Role(id='seller', name = 'Seller', description = 'New sellers require permission from Admin!')
    # db.session.add(seller)
    # user = Role(id='user', name = 'User', description = 'Users can buy stuff!')
    # db.session.add(user)
    # try:
        # db.session.commit()
    # except:
    #     pass
