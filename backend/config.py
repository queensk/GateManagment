import os


class Config(object):
    # SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:queens@localhost:5432/gateManagement'
    SQLALCHEMY_DATABASE_URI = os.environ['SQLALCHEMY_DATABASE_URI']
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.environ['SECRET_KEY']
    # SQLALCHEMY_ENGINE_OPTIONS = {
    #     pool_size=20,
    #     pool_reset_on_return='commit', # looks like postgres likes this more than rollback
    #     pool_timeout=5, # try a low value here maybe
    # }
