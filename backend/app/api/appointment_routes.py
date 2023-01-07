from flask.views import MethodView
from ..models.appointments import Appointment
from flask import jsonify, request


class AppointmentView(MethodView):
    def get(self, appointment_id=None):
        # Get a single appointment by id
        if appointment_id is None:
            # Return all appointments
            appointments = Appointment.query.all()
            return jsonify(
                {'appointments': [appointment.to_dict() for appointment in appointments]})
        else:
            # Return a single appointment
            appointment = Appointment.query.get(id=appointment_id)
            if not appointment:
                return jsonify({'error': 'Appointment not found'}), 404
            return jsonify({'appointment': appointment.to_dict()}), 200

    def post(self, request):
        # Create a new appointment
        data = request.get_json()
        appointment = Appointment(**data)
        appointment.save()
        return jsonify({'appointment': appointment.to_dict()}), 201

    def put(self, request, appointment_id):
        # Update a single appointment
        data = request.get_json()
        appointment = Appointment.query.get(appointment_id)
        if appointment:
            appointment.update(data)
            return jsonify({'appointment': appointment.to_dict()}), 201
        else:
            return jsonify({'message': 'Appointment not found'}), 404

    def delete(self, appointment_id):
        # Delete a single appointment
        appointment = Appointment.query.get(appointment_id)
        if appointment:
            appointment.delete()
            return jsonify({'message': 'Successfully deleted user'})
        else:
            return jsonify({'error': 'User not found'}, 404)
