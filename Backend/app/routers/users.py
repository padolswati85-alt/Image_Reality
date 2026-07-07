from fastapi import APIRouter, Depends
from app.security import verify_firebase_token

router = APIRouter(prefix="/users", tags=["Users"])

@router.get("/me")
def get_my_profile(user=Depends(verify_firebase_token)):
    return {
        "uid": user["uid"],
        "email": user.get("email"),
        "name": user.get("name")
    }
