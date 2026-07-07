# app/models/category.py
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from app.database import Base

class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, nullable=False)

    destinations = relationship(
        "Destination",
        secondary="destination_categories",
        back_populates="categories",
        passive_deletes=True
    )
