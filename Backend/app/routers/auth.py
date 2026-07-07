from fastapi import Depends, HTTPException
from firebase_admin import auth as firebase_auth
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

security = HTTPBearer()

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    try:
        decoded_token = firebase_auth.verify_id_token(token)
        return decoded_token  # contains uid, email, etc.
    except:
        raise HTTPException(status_code=401, detail="Invalid token")
