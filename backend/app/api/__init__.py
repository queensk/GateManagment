from flask import Blueprint
from .user_routes import UserView
from .user_appointments_routes import UserAppointmentView
from .user_search_route import UserSearchView
# from app import  app, db
# from app import db
# from app.models import db
# from app import cleanup

api = Blueprint('api', __name__)
# engine_container = db.get_engine(app)

user_view = UserView.as_view('user_view')
api.add_url_rule('/users/', view_func=user_view, methods=['GET', 'POST'])
api.add_url_rule(
    '/users/<string:id>/',
    view_func=user_view,
    methods=[
        'GET',
        'PUT',
        'DELETE'])
api.add_url_rule(
    '/users/<string:id>/update/',
    view_func=user_view,
    methods=['PATCH'])

search_view = UserSearchView.as_view('search_view')
api.add_url_rule(
    '/users/search/<string:search_query>',
    view_func=search_view,
    methods=['GET'])

visitor_appointments_view = UserAppointmentView.as_view(
    'visitor_appointments_view')
api.add_url_rule(
    '/visitor_appointments/',
    view_func=visitor_appointments_view,
    methods=[
        'GET',
        'POST',
        'PUT',
        'DELETE'])
api.add_url_rule(
    '/visitor_appointments/<string:id>',
    view_func=visitor_appointments_view,
    methods=[
        'GET',
        'PUT',
        'DELETE'])
