from app.models.user import User
from flask import jsonify
from flask.views import MethodView


class UserSearchView(MethodView):
    def get(self, search_query=None):
        # Search for users based on the search query
        users = User.query.filter(User.name.like(f'%{search_query}%')).all()
        if users is None:
            return jsonify({'message': 'User not found'}, 404)
        return jsonify({'users': [user.to_dict() for user in users]})
