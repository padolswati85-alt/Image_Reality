from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from pydantic import BaseModel
from typing import Optional, List

from app.database import get_db
from app.models.destination import Destination
from app.models.category import Category
from app.models.taluka import Taluka
from app.models.hotel import Hotel
from app.models.activity import Activity
from app.models.booking import Booking
from app.models.user import User

router = APIRouter(prefix="/admin", tags=["Admin"])


# =========================
# Schemas
# =========================

class DestinationAdminCreate(BaseModel):
    name: str
    description: Optional[str] = None
    image_url: Optional[str] = None
    image: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    crowd_level: Optional[str] = "Low"
    taluka_id: Optional[int] = None
    category_ids: Optional[List[int]] = []


class DestinationAdminUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    image_url: Optional[str] = None
    image: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    crowd_level: Optional[str] = None
    taluka_id: Optional[int] = None
    category_ids: Optional[List[int]] = None


class SimpleNameCreate(BaseModel):
    name: str


class SimpleNameUpdate(BaseModel):
    name: str


# =========================
# Helper
# =========================

def serialize_destination(dest: Destination):
    return {
        "id": dest.id,
        "name": dest.name,
        "description": dest.description,
        "image_url": dest.image_url,
        "image": dest.image_url,
        "latitude": dest.latitude,
        "longitude": dest.longitude,
        "crowd_level": dest.crowd_level or "Low",
        "taluka_id": dest.taluka_id,
        "zone": dest.taluka.name if dest.taluka else "Nashik",
        "taluka": {
            "id": dest.taluka.id,
            "name": dest.taluka.name,
        } if dest.taluka else None,
        "categories": [
            {
                "id": cat.id,
                "name": cat.name,
            }
            for cat in dest.categories
        ] if dest.categories else [],
    }


# =========================
# Dashboard Stats
# =========================

@router.get("/stats")
def get_admin_stats(db: Session = Depends(get_db)):
    return {
        "destinations": db.query(Destination).count(),
        "categories": db.query(Category).count(),
        "talukas": db.query(Taluka).count(),
        "hotels": db.query(Hotel).count(),
        "activities": db.query(Activity).count(),
        "bookings": db.query(Booking).count(),
        "users": db.query(User).count(),
    }


# =========================
# Destinations CRUD
# =========================

@router.get("/destinations")
def get_admin_destinations(db: Session = Depends(get_db)):
    destinations = db.query(Destination).options(
        joinedload(Destination.taluka),
        joinedload(Destination.categories)
    ).all()

    return [serialize_destination(dest) for dest in destinations]


@router.post("/destinations")
def create_admin_destination(
    data: DestinationAdminCreate,
    db: Session = Depends(get_db)
):
    if data.taluka_id:
        taluka = db.query(Taluka).filter(Taluka.id == data.taluka_id).first()
        if not taluka:
            raise HTTPException(status_code=404, detail="Taluka not found")

    existing = db.query(Destination).filter(
        Destination.name == data.name,
        Destination.taluka_id == data.taluka_id
    ).first()

    if existing:
        raise HTTPException(status_code=400, detail="Destination already exists")

    image_value = data.image_url or data.image

    dest = Destination(
        name=data.name,
        description=data.description,
        image_url=image_value,
        latitude=data.latitude,
        longitude=data.longitude,
        crowd_level=data.crowd_level or "Low",
        taluka_id=data.taluka_id,
    )

    if data.category_ids:
        categories = db.query(Category).filter(Category.id.in_(data.category_ids)).all()
        if len(categories) != len(data.category_ids):
            raise HTTPException(status_code=404, detail="One or more categories not found")
        dest.categories = categories

    db.add(dest)
    db.commit()
    db.refresh(dest)

    return serialize_destination(dest)


@router.put("/destinations/{destination_id}")
def update_admin_destination(
    destination_id: int,
    data: DestinationAdminUpdate,
    db: Session = Depends(get_db)
):
    dest = db.query(Destination).options(
        joinedload(Destination.taluka),
        joinedload(Destination.categories)
    ).filter(Destination.id == destination_id).first()

    if not dest:
        raise HTTPException(status_code=404, detail="Destination not found")

    if data.name is not None:
        dest.name = data.name

    if data.description is not None:
        dest.description = data.description

    image_value = data.image_url or data.image
    if image_value is not None:
        dest.image_url = image_value

    if data.latitude is not None:
        dest.latitude = data.latitude

    if data.longitude is not None:
        dest.longitude = data.longitude

    if data.crowd_level is not None:
        if data.crowd_level not in ["Low", "Medium", "High", "Danger"]:
            raise HTTPException(status_code=400, detail="Invalid crowd level")
        dest.crowd_level = data.crowd_level

    if data.taluka_id is not None:
        taluka = db.query(Taluka).filter(Taluka.id == data.taluka_id).first()
        if not taluka:
            raise HTTPException(status_code=404, detail="Taluka not found")
        dest.taluka_id = data.taluka_id

    if data.category_ids is not None:
        categories = db.query(Category).filter(Category.id.in_(data.category_ids)).all()
        if len(categories) != len(data.category_ids):
            raise HTTPException(status_code=404, detail="One or more categories not found")
        dest.categories = categories

    db.commit()
    db.refresh(dest)

    return serialize_destination(dest)


@router.delete("/destinations/{destination_id}")
def delete_admin_destination(destination_id: int, db: Session = Depends(get_db)):
    dest = db.query(Destination).filter(Destination.id == destination_id).first()

    if not dest:
        raise HTTPException(status_code=404, detail="Destination not found")

    db.delete(dest)
    db.commit()

    return {"message": "Destination deleted successfully"}


# =========================
# Categories CRUD
# =========================

@router.get("/categories")
def get_admin_categories(db: Session = Depends(get_db)):
    categories = db.query(Category).all()
    return [{"id": c.id, "name": c.name} for c in categories]


@router.post("/categories")
def create_admin_category(data: SimpleNameCreate, db: Session = Depends(get_db)):
    existing = db.query(Category).filter(Category.name == data.name).first()

    if existing:
        raise HTTPException(status_code=400, detail="Category already exists")

    category = Category(name=data.name)
    db.add(category)
    db.commit()
    db.refresh(category)

    return {"id": category.id, "name": category.name}


@router.put("/categories/{category_id}")
def update_admin_category(
    category_id: int,
    data: SimpleNameUpdate,
    db: Session = Depends(get_db)
):
    category = db.query(Category).filter(Category.id == category_id).first()

    if not category:
        raise HTTPException(status_code=404, detail="Category not found")

    category.name = data.name
    db.commit()
    db.refresh(category)

    return {"id": category.id, "name": category.name}


@router.delete("/categories/{category_id}")
def delete_admin_category(category_id: int, db: Session = Depends(get_db)):
    category = db.query(Category).filter(Category.id == category_id).first()

    if not category:
        raise HTTPException(status_code=404, detail="Category not found")

    db.delete(category)
    db.commit()

    return {"message": "Category deleted successfully"}


# =========================
# Talukas CRUD
# =========================

@router.get("/talukas")
def get_admin_talukas(db: Session = Depends(get_db)):
    talukas = db.query(Taluka).all()
    return [{"id": t.id, "name": t.name} for t in talukas]


@router.post("/talukas")
def create_admin_taluka(data: SimpleNameCreate, db: Session = Depends(get_db)):
    existing = db.query(Taluka).filter(Taluka.name == data.name).first()

    if existing:
        raise HTTPException(status_code=400, detail="Taluka already exists")

    taluka = Taluka(name=data.name)
    db.add(taluka)
    db.commit()
    db.refresh(taluka)

    return {"id": taluka.id, "name": taluka.name}


@router.put("/talukas/{taluka_id}")
def update_admin_taluka(
    taluka_id: int,
    data: SimpleNameUpdate,
    db: Session = Depends(get_db)
):
    taluka = db.query(Taluka).filter(Taluka.id == taluka_id).first()

    if not taluka:
        raise HTTPException(status_code=404, detail="Taluka not found")

    taluka.name = data.name
    db.commit()
    db.refresh(taluka)

    return {"id": taluka.id, "name": taluka.name}


@router.delete("/talukas/{taluka_id}")
def delete_admin_taluka(taluka_id: int, db: Session = Depends(get_db)):
    taluka = db.query(Taluka).filter(Taluka.id == taluka_id).first()

    if not taluka:
        raise HTTPException(status_code=404, detail="Taluka not found")

    db.delete(taluka)
    db.commit()

    return {"message": "Taluka deleted successfully"}