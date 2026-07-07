from sqlalchemy import Column, Integer, String, Float, Text, ForeignKey
from app.database import Base

class Hotel(Base):
    __tablename__ = "hotels"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String(150), nullable=False)   # ✅ FIXED
    address = Column(String(255), nullable=False)
    city = Column(String(100), nullable=False)

    price_per_night = Column(Float, nullable=False)

    description = Column(Text, nullable=True)    # ✅ Text is fine (no length needed)

    image_url = Column(String(255), nullable=True)
