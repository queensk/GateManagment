from .meeting import Meeting
from .base_model import BaseModel, db
from .user_appointments import UserAppointment
from typing import List
import re
import uuid
from passlib.hash import pbkdf2_sha256


class User(BaseModel):
    __tablename__ = 'users'
    name: str = db.Column(db.String(), index=True)
    email: str = db.Column(db.String(), index=True, unique=True)
    password_hash: str = db.Column(db.String())
    availability: bool = db.Column(db.Boolean, default=True)
    role: str = db.Column(db.String(), default='user')
    appointments = db.relationship(
        'UserAppointment',
        backref='user',
        lazy='dynamic',
        cascade='all, delete')
    meetings = db.relationship(
        'Meeting',
        backref='user',
        lazy='dynamic',
        cascade='all, delete')

    def __init__(self, name: str, email: str, password_hash: str, availability: bool = True, role: str = None,
                 user_appointments: List[UserAppointment] = [], meetings: List[Meeting] = [], id=None):
        if id is None:
            self.id = str(uuid.uuid4())
        else:
            self.id = id

        if not all(map(lambda x: bool(x), [name, email, password_hash])):
            raise ValueError('Invalid input')
        if not re.match(r'[^@]+@[^@]+\.[^@]+', email):
            raise ValueError('Invalid Email')
        if len(password_hash) > 128:
            raise ValueError('Reason for visit is too long')
        self.name = name
        self.email = email
        self.password_hash = pbkdf2_sha256.hash(password_hash)
        self.availability = availability
        self.role = role

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'appointments': [appointment.to_dict() for appointment in self.appointments],
            'meetings': [meeting.to_dict() for meeting in self.meetings],
            'create_time': self.create_time,
            'updated_time': self.updated_time,
            'availability': self.availability,
            'role': self.role
        }

    def update(self, name: str, email: str, password_hash: str):
        self.name = name
        self.email = email
        self.password_hash = pbkdf2_sha256.hash(password_hash)
        db.session.commit()

    def update_patch(self, **kwargs):
        for key, value in kwargs.items():
            setattr(self, key, value)
        db.session.commit()

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()
