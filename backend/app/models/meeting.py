from .base_model import BaseModel, db
import uuid


class Meeting(BaseModel):
    __tablename__ = 'meetings'
    name: str = db.Column(db.String(120))
    description: str = db.Column(db.String(500))
    start_time: str = db.Column(db.DateTime)
    end_time: str = db.Column(db.DateTime)
    location: str = db.Column(db.String(120))
    user_id: str = db.Column(db.String, db.ForeignKey('users.id'))

    def __init__(self, name: str, description: str, start_time: str,
                 end_time: str, location: str, user_id: str, id=None):
        if id is None:
            self.id = str(uuid.uuid4())
        else:
            self.id = id
        self.name = name,
        self.description = description,
        self.start_time = start_time,
        self.end_time = end_time,
        self.location = location,
        self.user_id = user_id

    def to_dict(self):
        return {
            'name': self.name,
            'description': self.description,
            'start_time': self.start_time,
            'end_time': self.end_time,
            'location': self.location,
            'user_id': self.user_id,
            'create_time': self.create_time,
            'updated_time': self.updated_time
        }

    def save(self):
        db.session.add(self)
        db.session.commit()
        db.session.close()

    def delete(self):
        db.session.delete(self)
        db.session.commit()
        db.session.close()
