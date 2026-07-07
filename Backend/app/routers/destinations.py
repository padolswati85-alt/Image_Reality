from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session, joinedload
from typing import List, Optional
from pydantic import BaseModel
from math import radians, sin, cos, sqrt, atan2

from app import schemas
from app.database import get_db
from app.models.destination import Destination
from app.models.taluka import Taluka
from app.models.category import Category

router = APIRouter(prefix="/destinations", tags=["Destinations"])


class CrowdUpdate(BaseModel):
    crowd_level: str


def serialize_destination(dest: Destination):
    return {
        "id": dest.id,
        "name": dest.name,
        "description": dest.description,
        "image_url": dest.image_url,
        "image": dest.image_url,
        "latitude": dest.latitude,
        "longitude": dest.longitude,
        "taluka_id": dest.taluka_id,
        "zone": dest.taluka.name if dest.taluka else "Nashik",
        "crowd_level": getattr(dest, "crowd_level", "Low"),
        "taluka": {
            "id": dest.taluka.id,
            "name": dest.taluka.name,
        } if dest.taluka else None,
        "categories": [
            {"id": cat.id, "name": cat.name}
            for cat in dest.categories
        ] if dest.categories else [],
    }


def haversine(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    R = 6371  # Earth radius in km
    dlat = radians(lat2 - lat1)
    dlon = radians(lon2 - lon1)
    a = sin(dlat/2)**2 + cos(radians(lat1)) * cos(radians(lat2)) * sin(dlon/2)**2
    c = 2 * atan2(sqrt(a), sqrt(1-a))
    return R * c


@router.post("/", response_model=schemas.DestinationOut)
def create_destination(data: schemas.DestinationCreate, db: Session = Depends(get_db)):
    if data.taluka_id:
        tal = db.query(Taluka).filter(Taluka.id == data.taluka_id).first()
        if not tal:
            raise HTTPException(status_code=404, detail="Taluka not found")

    existing = db.query(Destination).filter(
        Destination.name == data.name,
        Destination.taluka_id == data.taluka_id
    ).first()

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Destination already exists in this taluka"
        )

    dest = Destination(
        name=data.name,
        description=data.description,
        image_url=data.image_url,
        taluka_id=data.taluka_id,
        crowd_level="Low",
    )

    db.add(dest)
    db.commit()
    db.refresh(dest)

    if data.category_ids:
        categories = db.query(Category).filter(Category.id.in_(data.category_ids)).all()
        found_ids = {c.id for c in categories}
        missing = [cid for cid in data.category_ids if cid not in found_ids]

        if missing:
            raise HTTPException(
                status_code=404,
                detail=f"Category ids not found: {missing}"
            )

        dest.categories.extend(categories)
        db.commit()
        db.refresh(dest)

    return dest


@router.get("/")
def get_all_destinations(db: Session = Depends(get_db)):
    destinations = db.query(Destination).options(
        joinedload(Destination.taluka),
        joinedload(Destination.categories)
    ).all()
    return [serialize_destination(dest) for dest in destinations]


@router.get("/taluka/{taluka_id}")
def get_destinations_by_taluka(taluka_id: int, db: Session = Depends(get_db)):
    destinations = db.query(Destination).options(
        joinedload(Destination.taluka),
        joinedload(Destination.categories)
    ).filter(Destination.taluka_id == taluka_id).all()
    return [serialize_destination(dest) for dest in destinations]


@router.get("/category/{category_id}")
def get_destinations_by_category(category_id: int, db: Session = Depends(get_db)):
    category = db.query(Category).filter(Category.id == category_id).first()
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")

    destinations = db.query(Destination).options(
        joinedload(Destination.taluka),
        joinedload(Destination.categories)
    ).join(Destination.categories).filter(Category.id == category_id).all()
    return [serialize_destination(dest) for dest in destinations]


@router.put("/{destination_id}/crowd")
def update_crowd_level(
    destination_id: int,
    data: CrowdUpdate,
    db: Session = Depends(get_db)
):
    valid_levels = ["Low", "Medium", "High", "Danger"]
    if data.crowd_level not in valid_levels:
        raise HTTPException(
            status_code=400,
            detail="Invalid crowd level. Use Low, Medium, High, or Danger."
        )

    dest = db.query(Destination).filter(Destination.id == destination_id).first()
    if not dest:
        raise HTTPException(status_code=404, detail="Destination not found")

    dest.crowd_level = data.crowd_level
    db.commit()
    db.refresh(dest)

    return {
        "message": "Crowd level updated successfully",
        "id": dest.id,
        "name": dest.name,
        "crowd_level": dest.crowd_level,
    }


# ========== NEARBY ROUTE – MUST BE BEFORE {destination_id} ==========
@router.get("/nearby")
def get_nearby_destinations(
    lat: float = Query(..., description="Latitude of user location"),
    lon: float = Query(..., description="Longitude of user location"),
    radius_km: float = Query(5.0, description="Search radius in kilometers", ge=0.5, le=100),
    db: Session = Depends(get_db)
):
    """
    Returns destinations within a given radius from a point, sorted by distance.
    """
    destinations = db.query(Destination).options(
        joinedload(Destination.taluka),
        joinedload(Destination.categories)
    ).all()

    nearby = []
    for d in destinations:
        if d.latitude is not None and d.longitude is not None:
            dist = haversine(lat, lon, d.latitude, d.longitude)
            if dist <= radius_km:
                item = serialize_destination(d)
                item["distance_km"] = round(dist, 2)
                nearby.append(item)

    nearby.sort(key=lambda x: x["distance_km"])
    return nearby


# ========== INDIVIDUAL DESTINATION – MUST BE AFTER /nearby ==========
@router.get("/{destination_id}")
def get_destination(destination_id: int, db: Session = Depends(get_db)):
    dest = db.query(Destination).options(
        joinedload(Destination.taluka),
        joinedload(Destination.categories)
    ).filter(Destination.id == destination_id).first()
    if not dest:
        raise HTTPException(status_code=404, detail="Destination not found")
    return serialize_destination(dest)