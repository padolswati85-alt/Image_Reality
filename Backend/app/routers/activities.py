# app/routers/activities.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.activity import Activity
from app.schemas import ActivityCreate, ActivityOut
from typing import List

router = APIRouter(prefix="/activities", tags=["Activities"])

@router.get("/", response_model=List[ActivityOut])
def get_activities(db: Session = Depends(get_db)):
    return db.query(Activity).order_by(Activity.id).all()

@router.post("/", response_model=ActivityOut)
def create_activity(data: ActivityCreate, db: Session = Depends(get_db)):
    activity = Activity(name=data.name)
    db.add(activity)
    db.commit()
    db.refresh(activity)
    return activity
