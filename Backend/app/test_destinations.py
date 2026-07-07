import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.database import Base
from app.models.destination import Destination

# Create in-memory SQLite database
SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
TestingSessionLocal = sessionmaker(bind=engine)

Base.metadata.create_all(bind=engine)

def test_insert_destination():
    db = TestingSessionLocal()

    destination = Destination(
        name="Trimbakeshwar Mandir",
        description="Sacred Shiva temple",
        image_url="trimbakeshwarmandir.jpg",
        latitude=19.93232303,
        longitude=73.53118883
    )

    db.add(destination)
    db.commit()

    result = db.query(Destination).first()

    assert result.name == "Trimbakeshwar Mandir"
    assert result.latitude == 19.93232303
    assert result.longitude == 73.53118883

    db.close()
