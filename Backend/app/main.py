from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

# Database
from app.database import Base, engine

# Routers
from app.routers import (
    hotels,
    booking,
    categories,
    destinations,
    talukas,
    images,
    activities,
    admin,
)

from app.routers.search import router as search_router
from app.routers.route_planner import router as route_planner_router

app = FastAPI(
    title="Nashik Sangam Backend",
    version="1.0.0"
)

# =========================
# CORS
# =========================
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",

        "https://nashik-sangam.web.app",
        "https://nashik-sangam.firebaseapp.com",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================
# Static Files
# =========================
app.mount(
    "/static",
    StaticFiles(directory="app/static"),
    name="static"
)

# =========================
# Database
# =========================
# Uncomment if you want tables created automatically
# Base.metadata.create_all(bind=engine)

# =========================
# Routers
# =========================
app.include_router(hotels.router)
app.include_router(booking.router)
app.include_router(categories.router)
app.include_router(destinations.router)
app.include_router(talukas.router)
app.include_router(images.router)
app.include_router(activities.router)
app.include_router(search_router)
app.include_router(route_planner_router, prefix="/planner", tags=["Trip Planner"])
app.include_router(admin.router)

# =========================
# Home
# =========================
@app.get("/")
def home():
    return {
        "status": "success",
        "message": "Nashik Sangam Backend is Running!"
    }