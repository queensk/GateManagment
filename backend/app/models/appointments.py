from .base_model import BaseModel, db
import uuid


class Appointment(BaseModel):
    __tablename__ = 'appointments'
    start_time: str = db.Column(db.DateTime)
    end_time: str = db.Column(db.DateTime)
    location: str = db.Column(db.String(120))
    appointment_purpose: str = db.Column(db.String(120))
    # user_id: str = db.Column(db.Integer, db.ForeignKey('users.id'))

    def __init__(self, start_time: str, end_time: str, location: str,
                 appointment_purpose: str, user_id: str, id=None):
        if id is None:
            self.id = str(uuid.uuid4())
        else:
            self.id = id
        self.start_time = start_time,
        self.end_time = end_time,
        self.location = location,
        self.appointment_purpose = appointment_purpose,
        self.user_id = user_id

    def to_dict(self):
        return {
            'start_time': self.start_time,
            'end_time': self.end_time,
            'location': self.location,
            'appointment_purpose': self.location,
            'user_id': self.user_id
        }

    def save(self):
        db.session.add(self)
        db.session.commit()
        db.session.close()

    def delete(self):
        db.session.delete(self)
        db.session.commit()
        db.session.close()
