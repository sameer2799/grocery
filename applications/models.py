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
    description = db.Column(db.String, nullable=False)
    is_approved = db.Column(db.Boolean(), default = False)
    products = db.relationship('Products', backref = 'category', lazy = True)    

from enum import Enum

class Season(Enum):
    OFF_SEASON = 1
    PEAK_SEASON = 2


class Products(db.Model):
    __tablename__ = 'products'

    product_id = db.Column(db.Integer, primary_key = True)
    product_name = db.Column(db.String(length = 30), nullable = False)
    units = db.Column(db.String, nullable = False)
    price_per_unit = db.Column(db.Double, nullable = False)
    stock = db.Column(db.Integer, nullable = False)
    expiry_date = db.Column(db.Date, nullable = False)
    description = db.Column(db.Text, nullable = False)
    product_category_id = db.Column(db.Integer, db.ForeignKey("categories.category_id"))
    is_featured = db.Column(db.Boolean, default=False)
    is_available = db.Column(db.Boolean, default=False)
    seller_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    season = db.Column(db.Enum(Season), default=Season.OFF_SEASON)

    def get_price(self):
        if self.season == Season.PEAK_SEASON:
            return (self.price_per_unit * 1.1)
        else:
            return self.price_per_unit

# change the value of season in order endpoint

class Cart(db.Model):
    __tablename__ = 'cart'    
    
    customer = db.Column(db.Integer, db.ForeignKey("user.id"), primary_key = True)
    carted_products = db.Column(db.Integer, db.ForeignKey("products.product_id"), primary_key = True)
    quantity = db.Column(db.Integer, default = 1, nullable = False)

class Order(db.Model):
    __tablename__ = "order"

    order_id = db.Column(db.Integer, primary_key = True)
    order_customer_id = db.Column(db.Integer, nullable = False)
    order_category_id = db.Column(db.Integer, nullable = False)
    order_product_id = db.Column(db.Integer, nullable = False)
    total_amount = db.Column(db.Double, nullable = False)
    order_date = db.Column(db.DateTime, nullable=False)
    is_completed = db.Column(db.Boolean, default=False)
    shipping_address = db.Column(db.String(255), nullable=False)
    payment_method = db.Column(db.String(50), nullable=False)
# Card
# Net Banking
# PayPal
# UPI
# Bank Transfer
# Cash on Delivery (COD)
# Cryptocurrency (e.g., Bitcoin, Ethereum)
# Mobile Wallets (e.g., Samsung Pay, Alipay)
# Gift Card

# for DYNAMIC PRICING

# from datetime import datetime

# # Define your date range
# start_date = datetime(2022, 1, 1)
# end_date = datetime(2022, 12, 31)

# # Define the date you want to check
# date_to_check = datetime(2022, 6, 15)

# # Check if the date is within the range
# if start_date <= date_to_check <= end_date:
#     print("Date is within range")
# else:
#     print("Date is not within range")
#----------------------------------------
# from datetime import datetime

# # Define the datetime object you want to compare
# date_to_check = datetime(2022, 6, 15)

# # Get the current date and time
# now = datetime.now()

# # Compare the datetime object with the current date
# if date_to_check.date() == now.date():
#     print("The date is today")
# elif date_to_check.date() < now.date():
#     print("The date is in the past")
# else:
#     print("The date is in the future")