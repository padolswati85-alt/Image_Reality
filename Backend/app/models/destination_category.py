from sqlalchemy import Column, Integer, ForeignKey
from app.database import Base


class DestinationCategory(Base):

    __tablename__ = "destination_categories"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    destination_id = Column(
        Integer,
        ForeignKey(
            "image_reality.id",
            ondelete="CASCADE"
        ),
        nullable=False
    )


    category_id = Column(
        Integer,
        ForeignKey(
            "categories.id",
            ondelete="CASCADE"
        ),
        nullable=False
    )