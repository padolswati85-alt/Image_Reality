const API = "https://image-reality.onrender.com"; // your FastAPI backend

export const fetchDestinations = async () => {
  try {
    const res = await fetch(`${API}/destinations/`);
    if (!res.ok) {
      throw new Error(`Failed to fetch destinations: ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.error("Fetch error:", err);
    return []; // fallback so frontend doesn’t crash
  }
};

export const getNearbyDestinations = async (lat, lon, radiusKm = 5) => {
  const url = `${API}/destinations/nearby?lat=${lat}&lon=${lon}&radius_km=${radiusKm}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch nearby places");
  return await res.json();
};

export const showRoute = (placesList, setDirections) => {
  if (!placesList || placesList.length < 2) return;
  if (!setDirections) throw new Error("setDirections callback is required");

  const service = new window.google.maps.DirectionsService();

  const waypoints = placesList.slice(1, -1).map((p) => ({
    location: { lat: p.latitude, lng: p.longitude },
    stopover: true,
  }));

  service.route(
    {
      origin: { lat: placesList[0].latitude, lng: placesList[0].longitude },
      destination: {
        lat: placesList[placesList.length - 1].latitude,
        lng: placesList[placesList.length - 1].longitude,
      },
      waypoints,
      travelMode: "DRIVING",
    },
    (result, status) => {
      if (status === "OK") setDirections(result);
      else console.error("Directions request failed:", status);
    }
  );
};