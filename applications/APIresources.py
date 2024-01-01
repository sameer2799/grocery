from flask_restful import Resource, Api, reqparse, fields, marshal_with, marshal
from flask_security import auth_required, roles_required

from .models import *


api = Api(prefix = '/api')


#-------------------------------------------------------------
#-----------------------Approve Seller------------------------
#-------------------------------------------------------------
seller_parser = reqparse.RequestParser()
seller_parser.add_argument('id', type=int, location='json')

class ApproveSeller(Resource):
    @auth_required("token")
    @roles_required("admin")
    def post(self):
        args = seller_parser.parse_args()
        seller_id = args['id']
        
        seller = User.query.get(seller_id)
        if not seller or "seller" not in seller.roles:
            return {"message": "Seller not found"}, 404

        seller.active = True
        db.session.commit()
        return {"message": "Seller Approved"}

api.add_resource(ApproveSeller, '/approve/seller')

# -----------Argument Parser-----------------

parser = reqparse.RequestParser()
parser.add_argument('', type=str, help='', required= True)
parser.add_argument('', type=str, help='')
parser.add_argument('', type=str, help='')

# -----------Return Parser-----------------

category_format = {
    'id': fields.Integer,
    'name': fields.String,
    'description': fields.String,
    'link': fields.Url
}

class Category(Resource):
    # @marshal_with(category_format)
    def get(self):
        all_category = Categories.query.all()
        return {"message":"all_category"}

    def post(self):
        args = parser.parse_args()
        obj = Category(**args)
        db.session.add(obj)
        db.session.commit()
        return {"message": "category done"}, 200

api.add_resource(Category, '/category')

#--------------------------------------------------------
#-----------------------All Users------------------------
#--------------------------------------------------------

user_fields = {
    'id': fields.Integer,
    'username': fields.String,
    'email': fields.String,
    'active': fields.Boolean,
    'role': fields.String,
}


class UserList(Resource):
    @auth_required("token")
    @roles_required("admin")
    def get(self):
        users = User.query.all()
        
        if len(users) == 1:
            return {"message": "No User Found"}, 404
        
        for user in users:            
            user.role = user.roles[0].name.title()
        
        return marshal(users, user_fields), 200

api.add_resource(UserList, '/user-list')