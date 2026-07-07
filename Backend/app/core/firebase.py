import os
import json
import firebase_admin
from firebase_admin import credentials, auth

if not firebase_admin._apps:
    firebase_config = os.environ.get("FIREBASE_CREDENTIALS")

    if not firebase_config:
        raise Exception("FIREBASE_CREDENTIALS environment variable not found.")

    cred_dict = json.loads(firebase_config)
    cred = credentials.Certificate(cred_dict)
    firebase_admin.initialize_app(cred)

def verify_firebase_token(token: str):
    return auth.verify_id_token(token)