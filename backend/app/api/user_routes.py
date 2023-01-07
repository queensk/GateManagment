from flask.views import MethodView
from ..models.user import User, db
from flask import jsonify, request
from app.Authorization.Authorization import require_auth


class UserView(MethodView):
    @require_auth
    def get(self, id=None):
        if id:
            # Retrieve a single user by ID
            user = User.query.get(id)
            if user is None:
                return jsonify({'message': 'User not found'}, 404)
            return jsonify({'user': user.to_dict()})
        # elif search_query:
        #     # Search for users based on the search query
        #     users = User.query.filter(User.name.like(f'%{search_query}%')).all()
        #     return jsonify({'users': [user.to_dict() for user in users]})
        else:
            # Return a list of all users
            users = User.query.all()
            return jsonify(
                {
                    'users': [user.to_dict() for user in users],
                })

    @require_auth
    def post(self):
        # Create a new user
        data = request.get_json()
        if not data:
            return jsonify({'error': 'Invalid data'}), 400
        user = User(**data)
        user.save()
        return jsonify({
            'user': user.to_dict(),
            'message': 'Success'
        }, 201)

    @require_auth
    def put(self, id):
        user = User.query.get(id)
        if user is None:
            return jsonify({'message': 'User not found'}, 404)

        data = request.get_json()
        user.update(**data)
        return jsonify({'user': user.to_dict()}, 200)

    @require_auth
    def delete(self, id):
        user = User.query.get(id)
        if user is None:
            return jsonify({'message': 'User not found'}, 404)

        user.delete()
        return jsonify({'message': 'Successfully deleted user'})

    @require_auth
    def patch(self, id):
        # Get data from the request header
        data = request.get_json()
        user = User.query.get(id)
        if user:
            user.update_patch(**data)
            return jsonify({'user': user.to_dict()})
        else:
            return jsonify({'message': 'User appointment not found'}), 404
