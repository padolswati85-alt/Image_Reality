from sqlalchemy import Column, Integer, String, Boolean
from app.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    firebase_uid = Column(String(128), unique=True, nullable=False)
    email = Column(String(150), unique=True, nullable=False)
    name = Column(String(150), nullable=True)
    role = Column(String(20), default="user")
    email_verified = Column(Boolean, default=False)
