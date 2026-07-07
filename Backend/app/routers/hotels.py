# app/routers/hotels.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models.hotel import Hotel
from app.schemas import HotelCreate, HotelOut

router = APIRouter(prefix="/hotels", tags=["Hotels"])

@router.post("/", response_model=HotelOut)
def create_hotel(data: HotelCreate, db: Session = Depends(get_db)):
    hotel = Hotel(**data.model_dump())
    db.add(hotel)
    db.commit()
    db.refresh(hotel)
    return hotel

@router.get("/", response_model=List[HotelOut])
def get_hotels(db: Session = Depends(get_db)):
    return db.query(Hotel).order_by(Hotel.id).all()
