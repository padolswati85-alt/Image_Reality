from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List

# =========================================================
# Common Pydantic config (Pydantic v2)
# =========================================================
COMMON_MODEL_CONFIG = {
    "from_attributes": True,
    "populate_by_name": True
}

# =========================================================
# CATEGORY
# =========================================================
class CategoryBase(BaseModel):
    name: str


class CategoryCreate(CategoryBase):
    pass


class CategoryOut(CategoryBase):
    id: int
    model_config = COMMON_MODEL_CONFIG


# =========================================================
# TALUKA
# =========================================================
class TalukaBase(BaseModel):
    name: str


class TalukaCreate(TalukaBase):
    pass


class TalukaOut(TalukaBase):
    id: int
    model_config = COMMON_MODEL_CONFIG


# =========================================================
# DESTINATION
# =========================================================
class DestinationBase(BaseModel):
    name: str
    description: Optional[str] = None
    image_url: Optional[str] = None
    image: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    crowd_level: Optional[str] = "Low"


class DestinationCreate(DestinationBase):
    taluka_id: Optional[int] = None
    category_ids: Optional[List[int]] = []


class DestinationUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    image_url: Optional[str] = None
    image: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    crowd_level: Optional[str] = None
    taluka_id: Optional[int] = None
    category_ids: Optional[List[int]] = None


class CategorySimple(BaseModel):
    id: int
    name: str
    model_config = COMMON_MODEL_CONFIG


class DestinationOut(DestinationBase):
    id: int
    taluka_id: Optional[int] = None
    taluka: Optional[TalukaOut] = None
    categories: List[CategorySimple] = []
    model_config = COMMON_MODEL_CONFIG

    
# =========================================================
# USER (FIREBASE BASED – NO PASSWORDS)
# =========================================================

# Used internally when Firebase token is decoded
class FirebaseUserIn(BaseModel):
    uid: str
    email: EmailStr
    name: Optional[str] = None
    role: str = "user"
    email_verified: bool


# Used for API responses
class UserOut(BaseModel):
    id: int
    firebase_uid: str
    email: EmailStr
    name: Optional[str]
    role: str
    email_verified: bool
    model_config = COMMON_MODEL_CONFIG


# =========================================================
# HOTEL
# =========================================================
class HotelBase(BaseModel):
    name: str
    location: str
    price: float
    image_url: Optional[str] = None
    rating: Optional[float] = None


class HotelCreate(HotelBase):
    pass


class HotelOut(HotelBase):
    id: int
    model_config = COMMON_MODEL_CONFIG


# =========================================================
# BOOKING
# =========================================================
class BookingBase(BaseModel):
    user_id: int
    hotel_id: int


class BookingCreate(BookingBase):
    pass


class BookingOut(BookingBase):
    id: int
    model_config = COMMON_MODEL_CONFIG


# =========================================================
# ACTIVITY
# =========================================================
class ActivityBase(BaseModel):
    name: str


class ActivityCreate(ActivityBase):
    pass


class ActivityOut(ActivityBase):
    id: int
    model_config = COMMON_MODEL_CONFIG
