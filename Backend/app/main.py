from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

# DB
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

app = FastAPI(title="Nashik Sangham Backend")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Static
app.mount("/static", StaticFiles(directory="app/static"), name="static")

# DEV only – comment out if database is not ready
# Base.metadata.create_all(bind=engine)   # <-- comment this line for now

# Routers
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

@app.get("/")
def home():
    return {"message": "API Working!"}