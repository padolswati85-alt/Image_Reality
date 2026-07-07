# app/models/destination.py
from sqlalchemy import Column, Integer, String, ForeignKey, Float
from sqlalchemy.orm import relationship
from app.database import Base

class Destination(Base):
    __tablename__ = "destinations"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    taluka_id = Column(Integer, ForeignKey("talukas.id"), nullable=True)
    description = Column(String(1000))
    image_url = Column(String(255))
    latitude = Column(Float, nullable=True)    # <--- new
    longitude = Column(Float, nullable=True)   # <--- new
    crowd_level = Column(String(20), default="Low")
    
    taluka = relationship("Taluka", back_populates="destinations")
    categories = relationship(
        "Category",
        secondary="destination_categories",
        back_populates="destinations"
    )
    