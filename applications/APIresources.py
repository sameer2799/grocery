from flask_restful import Resource, Api, reqparse, fields, marshal_with
from .models import *

api = Api(prefix = '/api')


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