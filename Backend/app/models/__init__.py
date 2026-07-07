# app/models/__init__.py
# Import all model modules so SQLAlchemy metadata is populated when this package is imported.
from .activity import Activity
from .booking import Booking
from .category import Category
from .destination import Destination
from .destination_category import DestinationCategory
from .hotel import Hotel
from .taluka import Taluka
from .user import User
