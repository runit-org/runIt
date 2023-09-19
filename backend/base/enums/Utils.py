from enum import Enum

class get(Enum):
    DEFAULT_EMAIL_SENDER                 = 'runIt'
    TEST_USER_PASSWORD                   = 'password123*'
    EMAIL_VERIFICATION_TOKEN_EXPIRY_TIME = 180 #seconds
    EMAIL_VERIFICATION_TOKEN_OTP_LENGTH  = 6
    MAX_TITLE_LENGTH                     = 200
    MAX_CONTENT_LENGTH                   = 400
    MAX_CRED_LENGTH                      = 100