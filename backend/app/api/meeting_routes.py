from flask.views import MethodView
from ..models.meeting import Meeting
from flask import jsonify


class MeetingView(MethodView):
    def get(self, id=None):
        # Get a single meeting by id
        if id is None:
            # Return all meetings
            meetings = Meeting.query.all()
            return jsonify(
                {'meetings': [meeting.to_dict() for meeting in meetings]})
        else:
            # Return a single meeting
            meeting = Meeting.query.get(id)
            if not meeting:
                return jsonify({'error': 'User not found'}), 404
            return jsonify({'meeting': meeting.to_dict()}), 200

    def post(self, request=None):
        # Create a new meeting
        if request is None:
            return jsonify({'error': 'bad request'})
        data = request.get_json()
        meeting = Meeting(**data)
        meeting.save()
        return jsonify({'meeting': meeting.to_dict()}), 201

    def put(self, request, id):
        # Update a single meeting
        if request is None:
            return jsonify({'error': 'bad request'})
        data = request.get_json()
        meeting = Meeting.query.get(id)
        if meeting:
            meeting.update(data)
            return jsonify({'meeting': meeting.to_dict()}), 201
        else:
            return jsonify({'message': 'Meeting not found'}), 404

    def delete(self, id):
        # Delete a single meeting
        meeting = Meeting.query.get(id)
        if meeting:
            meeting.delete()
            return jsonify({'message': 'Successfully deleted user'})
        else:
            return jsonify({'error': 'User not found'}, 404)
