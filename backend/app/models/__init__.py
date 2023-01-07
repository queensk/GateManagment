from .base_model import db
# import app
# engine_container = db.get_engine(app)


def create_all(engine):
    db.create_all()


# def cleanup(session):
#     """
#     This method cleans up the session object and also closes the connection pool using the dispose method.
#     """
#     session.close()
#     engine_container.dispose()
