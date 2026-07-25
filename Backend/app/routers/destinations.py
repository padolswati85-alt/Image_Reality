from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session, joinedload
from pydantic import BaseModel
from math import radians, sin, cos, sqrt, atan2

from app import schemas
from app.database import get_db

from app.models.destination import Destination
from app.models.taluka import Taluka
from app.models.category import Category


router = APIRouter(
    prefix="/destinations",
    tags=["Destinations"]
)



# =========================
# Crowd Update Schema
# =========================

class CrowdUpdate(BaseModel):
    crowd_level: str



# =========================
# Serializer
# =========================

def serialize_destination(dest: Destination):

    return {

        "id": dest.id,

        "name": dest.name,

        "description": dest.description,

        "image_url": dest.image_url,

        # React uses this
        "image": dest.image_url,


        "latitude": dest.latitude,

        "longitude": dest.longitude,


        "taluka_id": dest.taluka_id,


        "area": dest.area,

        "visit_time": dest.visit_time,

        "time_required_hours": dest.time_required_hours,


        "zone": (
            dest.taluka.name
            if dest.taluka
            else "Nashik"
        ),


        # Database currently doesn't have this column
        "crowd_level": "Low",


        "taluka": {

            "id": dest.taluka.id,

            "name": dest.taluka.name

        } if dest.taluka else None,



        "categories":[

            {
                "id": cat.id,
                "name": cat.name
            }

            for cat in dest.categories

        ]

    }



# =========================
# Distance Calculator
# =========================

def haversine(
    lat1,
    lon1,
    lat2,
    lon2
):

    R = 6371


    dlat = radians(lat2-lat1)

    dlon = radians(lon2-lon1)


    a = (

        sin(dlat/2)**2

        +

        cos(radians(lat1))

        *

        cos(radians(lat2))

        *

        sin(dlon/2)**2

    )


    c = 2 * atan2(
        sqrt(a),
        sqrt(1-a)
    )


    return R*c





# =========================
# CREATE DESTINATION
# =========================


@router.post("/")
def create_destination(
    data: schemas.DestinationCreate,
    db: Session = Depends(get_db)
):


    if data.taluka_id:

        taluka = db.query(Taluka).filter(
            Taluka.id == data.taluka_id
        ).first()


        if not taluka:

            raise HTTPException(
                404,
                "Taluka not found"
            )



    exists = db.query(Destination).filter(

        Destination.name == data.name

    ).first()



    if exists:

        raise HTTPException(
            400,
            "Destination already exists"
        )



    destination = Destination(

        name=data.name,

        description=data.description,

        image_url=data.image_url,

        taluka_id=data.taluka_id,


        latitude=data.latitude,

        longitude=data.longitude,


        area=data.area,

        visit_time=data.visit_time,

        time_required_hours=data.time_required_hours

    )


    db.add(destination)

    db.commit()

    db.refresh(destination)



    # Categories

    if data.category_ids:


        categories = db.query(Category).filter(

            Category.id.in_(data.category_ids)

        ).all()



        destination.categories.extend(categories)

        db.commit()



    return serialize_destination(destination)






# =========================
# ALL DESTINATIONS
# =========================


@router.get("/")
def get_all_destinations(
    db: Session = Depends(get_db)
):


    destinations = (

        db.query(Destination)

        .options(

            joinedload(Destination.taluka),

            joinedload(Destination.categories)

        )

        .all()

    )


    return [

        serialize_destination(d)

        for d in destinations

    ]





# =========================
# BY TALUKA
# =========================


@router.get("/taluka/{taluka_id}")
def get_by_taluka(
    taluka_id:int,
    db:Session=Depends(get_db)
):


    destinations=(

        db.query(Destination)

        .options(

            joinedload(Destination.taluka),

            joinedload(Destination.categories)

        )

        .filter(

            Destination.taluka_id==taluka_id

        )

        .all()

    )


    return [

        serialize_destination(d)

        for d in destinations

    ]





# =========================
# BY CATEGORY
# =========================


@router.get("/category/{category_id}")
def get_by_category(
    category_id:int,
    db:Session=Depends(get_db)
):


    category=db.query(Category).filter(

        Category.id==category_id

    ).first()


    if not category:

        raise HTTPException(
            404,
            "Category not found"
        )



    destinations=(

        db.query(Destination)

        .options(

            joinedload(Destination.taluka),

            joinedload(Destination.categories)

        )

        .join(Destination.categories)

        .filter(

            Category.id==category_id

        )

        .all()

    )


    return [

        serialize_destination(d)

        for d in destinations

    ]






# =========================
# NEARBY DESTINATIONS
# =========================


@router.get("/nearby")
def nearby_destinations(

    lat:float=Query(...),

    lon:float=Query(...),

    radius_km:float=Query(
        5,
        ge=0.5,
        le=100
    ),

    db:Session=Depends(get_db)

):


    destinations=(

        db.query(Destination)

        .options(

            joinedload(Destination.taluka),

            joinedload(Destination.categories)

        )

        .all()

    )



    result=[]


    for d in destinations:


        if d.latitude and d.longitude:


            distance=haversine(

                lat,

                lon,

                d.latitude,

                d.longitude

            )



            if distance <= radius_km:


                item=serialize_destination(d)


                item["distance_km"]=round(

                    distance,

                    2

                )


                result.append(item)



    result.sort(

        key=lambda x:x["distance_km"]

    )


    return result





# =========================
# SINGLE DESTINATION
# =========================


@router.get("/{destination_id}")
def get_destination(

    destination_id:int,

    db:Session=Depends(get_db)

):


    destination=(

        db.query(Destination)

        .options(

            joinedload(Destination.taluka),

            joinedload(Destination.categories)

        )

        .filter(

            Destination.id==destination_id

        )

        .first()

    )


    if not destination:

        raise HTTPException(
            404,
            "Destination not found"
        )


    return serialize_destination(destination)