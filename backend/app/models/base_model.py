import uuid
from datetime import datetime
from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()
time_format = '%Y-%m-%d %H:%M:%S'
# engine_container = db.get_engine(app)


class BaseModel(db.Model):
    """
    Model defines a BaseModel class with three fields

    Attributes:
        id: UUID that is generated automatically,
         when a new instance of the model is created
        created_at: timestamp that is set to the current,
         UTC time when a new instance of the model is created
        updated_at: a timestamp that is set to the,
         current UTC time when the model is updated.
    """
    __abstract__ = True
    id: str = db.Column(
        db.String(128),
        primary_key=True,
        default=str(
            uuid.uuid4()))
    create_time: str = db.Column(db.DateTime, default=datetime.utcnow)
    updated_time: str = db.Column(db.DateTime, default=datetime.utcnow,
                                  onupdate=datetime.utcnow)
