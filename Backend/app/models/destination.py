from sqlalchemy import Column, Integer, String, ForeignKey, Float
from sqlalchemy.orm import relationship

from app.database import Base


class Destination(Base):

    __tablename__ = "image_reality"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    name = Column(
        String(100),
        nullable=False
    )


    description = Column(
        String(1000)
    )


    image_url = Column(
        String(255)
    )


    taluka_id = Column(
        Integer,
        ForeignKey("talukas.id"),
        nullable=True
    )


    area = Column(
        String(255),
        nullable=True
    )


    visit_time = Column(
        String(255),
        nullable=True
    )


    time_required_hours = Column(
        Integer,
        nullable=True
    )


    latitude = Column(
        Float,
        nullable=True
    )


    longitude = Column(
        Float,
        nullable=True
    )


    # IMPORTANT FOR CROWD MAP
    crowd_level = Column(
        String(20),
        default="Low",
        nullable=False
    )


    taluka = relationship(
        "Taluka",
        back_populates="destinations"
    )


    categories = relationship(
        "Category",
        secondary="destination_categories",
        back_populates="destinations"
    )