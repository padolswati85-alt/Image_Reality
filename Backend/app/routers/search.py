from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.destination import Destination

router = APIRouter(prefix="/search", tags=["Search"])

@router.get("/")
def search_places(query: str, db: Session = Depends(get_db)):

    if not query.strip():
        raise HTTPException(status_code=400, detail="Query cannot be empty")

    results = db.query(Destination).filter(
        Destination.name.ilike(f"%{query}%")
    ).all()

    return [
        {
            "id": r.id,
            "name": r.name,
            "description": r.description,
            "image_url": r.image_url or "",  # avoids None issues
        }
        for r in results
    ]
