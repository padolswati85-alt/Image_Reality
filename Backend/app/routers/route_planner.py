from fastapi import APIRouter
from typing import List
import math

router = APIRouter()

# fake travel time logic (later you can connect to Google Maps)
def calculate_plan(places: List[str], days: int):
    per_day = math.ceil(len(places) / days)

    plan = []
    idx = 0

    for day in range(1, days + 1):
        day_places = places[idx: idx + per_day]
        idx += per_day

        # simple visit order logic
        route = []
        for i, p in enumerate(day_places):
            route.append({
                "order": i + 1,
                "place": p
            })

        plan.append({
            "day": day,
            "places": route
        })

    return plan


@router.post("/plan-trip")
def plan_trip(days: int, places: List[str]):
    return {
        "total_places": len(places),
        "days": days,
        "itinerary": calculate_plan(places, days)
    }
