from .base_model import BaseModel, db
from datetime import datetime, timedelta
from flask import jsonify
from typing import List
import re
import uuid


class UserAppointment(BaseModel):
    __tablename__ = 'userAppointments'
    # __allow_unmapped__ = True
    first_name: str = db.Column(db.String(120))
    last_name: str = db.Column(db.String(120))
    user_email: str = db.Column(db.String(120))
    to_visit_id: str = db.Column(db.String, db.ForeignKey('users.id'))
    reason_for_visit: str = db.Column(db.String(500))
    terms_signature_name: str = db.Column(db.String(120))

    def __init__(self, first_name: str, last_name: str, user_email: str,
                 to_visit_id, reason_for_visit: str, terms_signature_name: str, id=None):
        # Validate the values passed as arguments
        if id is None:
            self.id = str(uuid.uuid4())
        else:
            self.id = id
        try:
            # Validate the values passed as arguments
            if not all(map(lambda x: bool(x), [
                       first_name, last_name, user_email, to_visit_id, reason_for_visit, terms_signature_name])):
                raise ValueError('Invalid input')
            if not re.match(r'[^@]+@[^@]+\.[^@]+', user_email):
                raise ValueError('Invalid email')
            if len(reason_for_visit) > 500:
                raise ValueError('Reason for visit is too long')
        except ValueError as e:
            return jsonify({'error': str(e)}), 400

        self.first_name = first_name
        self.last_name = last_name
        self.user_email = user_email
        self.to_visit_id = to_visit_id
        self.reason_for_visit = reason_for_visit
        self.terms_signature_name = terms_signature_name

    def to_dict(self):
        return {
            'id': self.id,
            'create_time': self.create_time,
            'updated_time': self.updated_time,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'user_email': self.user_email,
            'to_visit_id': self.to_visit_id,
            'reason_for_visit': self.reason_for_visit,
            'terms_signature_name': self.terms_signature_name
        }

    def update(self):
        db.session.commit()

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()
