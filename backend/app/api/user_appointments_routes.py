from flask import request, jsonify
from flask.views import MethodView
from ..models.user_appointments import UserAppointment
from app.models.user import User
import smtplib
from email.mime.text import MIMEText
import os
from app.Authorization.Authorization import require_auth


class UserAppointmentView(MethodView):
    @require_auth
    def get(self, id=None):
        # Get a single user appointment by id
        if id is None:
            # Return all user appointments
            user_appointments = UserAppointment.query.all()
            return jsonify({'user_appointments': [
                           user_appointment.to_dict() for user_appointment in user_appointments]})
        else:
            # Return a single user appointment
            user_appointment = UserAppointment.query.get(id)
            if user_appointment:
                return jsonify(user_appointment.to_dict())
            else:
                return 'User appointment not found', 404

    def post(self):
        # Create a new user appointment
        data = request.get_json()
        user = User.query.get(data['to_visit_id'])  # Get the user object
        user_appointment = UserAppointment(**data)
        user.appointments.append(user_appointment)
        # Set the to_visit field to the user object
        # user_appointment.save()
        user.save()

        # Send email notification to the user
        gmail_user = os.environ['GMAIL_USERNAME']  # Your Gmail account
        gmail_password = os.environ['GMAIL_PASSWORD']  # Your Gmail password
        recipient = user.email  # Email address of the user
        subject = 'New User Appointment'
        message = f"""
        Dear {user.name},

        Appointment created at {user_appointment.create_time} to discuss {user_appointment.reason_for_visit},
        Created by {user_appointment.first_name} {user_appointment.last_name} and  email address is {user_appointment.user_email}.

        Thank.

        Sincerely,
        {user_appointment.terms_signature_name}
        """

        msg = MIMEText(message)
        msg['Subject'] = subject
        msg['To'] = recipient
        msg['From'] = gmail_user

        # Send email
        server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
        server.login(gmail_user, gmail_password)
        server.send_message(msg)
        server.quit()
        return jsonify(data), 201

    @require_auth
    def put(self, id):
        # Update a single user appointment
        data = request.get_json()
        user_appointment = UserAppointment.query.get(id)
        if user_appointment:
            user_appointment.update(**data)
            return jsonify({'user_appointment': user_appointment.to_dict()})
        else:
            return jsonify({'message': 'User appointment not found'}, 404)

    @require_auth
    def delete(self, id):
        # Delete a single user appointment
        user_appointment = UserAppointment.query.get(id)
        if user_appointment:
            user_appointment.delete()
            return jsonify({
                'message': 'successfully deleted appointment',
                'user_appointment': user_appointment.to_dict()
            }), 204
        else:
            return jsonify({'message': 'User appointment not found'}), 404
