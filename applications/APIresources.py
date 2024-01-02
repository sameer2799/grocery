from flask_restful import Resource, Api, reqparse, fields, marshal_with, marshal
from flask_security import auth_required, roles_required
from .models import *


api = Api(prefix = '/api')


#-------------------------------------------------------------
#-----------------------Approve Seller------------------------
#-------------------------------------------------------------
seller_parser = reqparse.RequestParser()
seller_parser.add_argument('id', type=int, location='json', required=True)

class ApproveSeller(Resource):
    @auth_required("token")
    @roles_required("admin")
    def post(self):
        args = seller_parser.parse_args()
        seller_id = args['id']
        
        seller = User.query.get(seller_id)
        if not seller or "seller" not in seller.roles:
            return {"message": "Seller not found"}, 404

        if seller.active:
            return {"info": "Seller already approved"}

        seller.active = True
        db.session.commit()
        return {"info": "Seller Approved"}

api.add_resource(ApproveSeller, '/approve/seller')

#-------------------------------------------------------------
#-----------------------Approve Category----------------------
#-------------------------------------------------------------
category_parser = reqparse.RequestParser()
category_parser.add_argument('category_id', type=int, location='json', required=True)

class ApproveCategory(Resource):
    @auth_required("token")
    @roles_required("admin")
    def post(self):
        args = category_parser.parse_args()
        category_id = args['category_id']
        
        category = Categories.query.get(category_id)
        if not category:
            return {"message": "Category not found"}, 404

        if category.is_approved:
            return {"info": "Category already approved"}

        category.is_approved = True
        db.session.commit()
        return {"info": "Category Approved"}

api.add_resource(ApproveCategory, '/approve/category')

#-------------------------------------------------------------
#-----------------------Category APIs-------------------------
#-------------------------------------------------------------
# -----------Argument Parser-----------------

parser = reqparse.RequestParser()
parser.add_argument('id', location = 'json' , type=int, help='Id of Category')
parser.add_argument('name', type=str, help='Name of Category')
parser.add_argument('description', type=str, help='Description of Category')

# -----------Return Parser-----------------

category_format = {
    'category_id': fields.Integer,
    'category_name': fields.String,
    'description': fields.String,
    'is_approved': fields.Boolean,
}

class Category(Resource):
    @auth_required("token")
    def get(self):
        all_category = Categories.query.all()
        if not all_category:
            return {"info":"No Category Found"}, 404
        return marshal(all_category, category_format), 200

    @auth_required("token")
    @roles_required("seller")
    def post(self):
        args = parser.parse_args()
        name = args['name']
        description = args['description']
        if not name and not description:
            return {"message": "Category name, description is required"}, 400
        existing_category = Categories.query.filter_by(category_name = name).first()
        if existing_category:
            return {"message": "Category already exists"}, 400
        
        obj = Categories(category_name = name, description = description)
        db.session.add(obj)
        db.session.commit()

        return {"info": "Request submitted, please wait for admin approval! "}, 200
    

    @auth_required("token")
    @roles_required("admin")
    def delete(self):
        args = parser.parse_args()
        id = args['id']
        category = Categories.query.get(id)
        if not category:
            return {"message": "Category not found"}, 404

        db.session.query(Categories).filter_by(category_id = id).delete(synchronize_session="fetch")
        db.session.commit()
        return {"info": "Category deleted"}

    @auth_required("token")
    @roles_required("admin")
    def put(self):
        args = parser.parse_args()
        id = args['id']
        name = args['name']
        description = args['description']

        category = Categories.query.get(id)
        if not category:
            return {"message": "Category not found"}, 404

        if name:
            category.category_name = name
        if description:
            category.category_description = description

        db.session.commit()
        return {"info": "Category updated"}


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