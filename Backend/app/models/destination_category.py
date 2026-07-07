# app/models/destination_category.py
from sqlalchemy import Column, Integer, ForeignKey
from app.database import Base

class DestinationCategory(Base):
    __tablename__ = "destination_categories"

    id = Column(Integer, primary_key=True, index=True)
    destination_id = Column(Integer, ForeignKey("destinations.id", ondelete="CASCADE"))
    category_id = Column(Integer, ForeignKey("categories.id", ondelete="CASCADE"))
