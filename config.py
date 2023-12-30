
class Config(object):
    DEBUG = False
    TESTING = False

class DevelopementConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///dev.db'
    SECRET_KEY = 'secretKEy'  # secrets.token_urlsafe()
    SECURITY_PASSWORD_SALT = 'SecretKeyy'  # secrets.SystemRandom().getrandbits(128)
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    WTF_CSRF_ENABLED = False
    SECURITY_TOKEN_AUTHENTICATION_HEADER = 'Authentication-Token'