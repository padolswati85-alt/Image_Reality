from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from app.database import Base


class Taluka(Base):

    __tablename__ = "talukas"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    name = Column(
        String(100),
        nullable=False
    )


    destinations = relationship(
        "Destination",
        back_populates="taluka"
    )