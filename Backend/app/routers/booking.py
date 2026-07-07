# app/routers/booking.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.booking import Booking
from app.schemas import BookingCreate, BookingOut
from typing import List

router = APIRouter(prefix="/booking", tags=["Booking"])

@router.post("/", response_model=BookingOut)
def create_booking(data: BookingCreate, db: Session = Depends(get_db)):
    booking = Booking(**data.model_dump())
    db.add(booking)
    db.commit()
    db.refresh(booking)
    return booking

@router.get("/", response_model=List[BookingOut])
def get_bookings(db: Session = Depends(get_db)):
    return db.query(Booking).order_by(Booking.id).all()
