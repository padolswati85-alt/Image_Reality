# app/routers/talukas.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app import schemas
from app.database import get_db
from app.models.taluka import Taluka

router = APIRouter(prefix="/talukas", tags=["Talukas"])

@router.post("/", response_model=schemas.TalukaOut)
def create_taluka(data: schemas.TalukaCreate, db: Session = Depends(get_db)):
    print(data.name)
    existing = db.query(Taluka).filter(Taluka.name == data.name).first()
    if existing:
        raise HTTPException(status_code=400, detail="Taluka already exists")
    t = Taluka(name=data.name)
    db.add(t)
    db.commit()
    db.refresh(t)
    return t

@router.get("/", response_model=List[schemas.TalukaOut])
def get_talukas(db: Session = Depends(get_db)):
    return db.query(Taluka).order_by(Taluka.id).all()
