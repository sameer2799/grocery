from flask_sqlalchemy import SQLAlchemy
from flask_security import UserMixin, RoleMixin


db = SQLAlchemy()


class RolesUsers(db.Model):
    __tablename__ = 'roles_users'
    id = db.Column(db.Integer(), primary_key=True)
    user_id = db.Column('user_id', db.Integer(), db.ForeignKey('user.id'))
    role_id = db.Column('role_id', db.Integer(), db.ForeignKey('role.id'))


class User(db.Model, UserMixin):
    __tablename__ = "user"

    id = db.Column(db.Integer(), primary_key=True)
    email = db.Column(db.String(255), unique=True)
    username = db.Column(db.String(255), unique=False, nullable=True)
    password = db.Column(db.String(255), nullable=False)
    active = db.Column(db.Boolean())  # default = True
    fs_uniquifier = db.Column(db.String(64), unique=True, nullable=False)
    roles = db.relationship('Role', secondary='roles_users', backref = db.backref('users', lazy='dynamic'))


class Role(db.Model, RoleMixin):
    __tablename__ = "role"

    id = db.Column(db.Integer(), primary_key = True)
    name = db.Column(db.String(20), nullable = False)
    description = db.Column(db.String(30), nullable = False)

    def __repr__(self):
        return f"<role {self.seller_name}>"



class Categories(db.Model):
    __tablename__ = 'categories'

    category_id = db.Column(db.Integer, primary_key = True)
    category_name = db.Column(db.String, nullable = False)
    # sellers = db.relationship('User', backref = 'has_categories')
    is_approved = db.Column(db.Boolean(), default = False)

class Products(db.Model):
    __tablename__ = 'products'

    product_id = db.Column(db.Integer, primary_key = True)
    product_name = db.Column(db.String(length = 30), unique=True, nullable = False)
    units = db.Column(db.String, nullable = False)
    price_per_unit = db.Column(db.Double, nullable = False)
    stock = db.Column(db.Integer, nullable = False)
    expiry_date = db.Column(db.Date, nullable = False)
    description = db.Column(db.Text, nullable = False)
    product_category_id = db.Column(db.Integer, db.ForeignKey("categories.category_id"))

# class Customer_cart(db.Model):
#     __tablename__ = 'customer_cart'    
    
#     cust = db.Column(db.Integer, db.ForeignKey("customer.id"),primary_key = True)
#     carted_products = db.Column(db.Integer, db.ForeignKey("products.product_id"), primary_key = True)
#     quantity = db.Column(db.Integer, default = 1, nullable = False)

# class Order(db.Model):
#     __tablename__ = "order"
#     order_id = db.Column(db.Integer, primary_key = True)
#     order_customer_id = db.Column(db.Integer, nullable = False)
#     order_category_id = db.Column(db.Integer, nullable = False)
#     order_product_id = db.Column(db.Integer, nullable = False)
#     total_amount = db.Column(db.Double, nullable = False)
