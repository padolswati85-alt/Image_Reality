const API = "https://image-reality.onrender.com"; // Render FastAPI backend

// ===========================
// Fetch all destinations
// ===========================
export const fetchDestinations = async () => {
  try {
    const res = await fetch(`${API}/destinations/`);

    if (!res.ok) {
      throw new Error(`Failed to fetch destinations: ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error("Fetch error:", err);
    return []; // Prevent frontend crash
  }
};

// ===========================
// Fetch nearby destinations
// ===========================
export const getNearbyDestinations = async (
  lat,
  lon,
  radiusKm = 5
) => {
  try {
    const res = await fetch(
      `${API}/destinations/nearby?lat=${lat}&lon=${lon}&radius_km=${radiusKm}`
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch nearby places: ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error("Nearby fetch error:", err);
    return [];
  }
};

// ===========================
// Google Maps Route
// ===========================
export const showRoute = (placesList, setDirections) => {
  if (!placesList || placesList.length < 2) return;

  if (!window.google || !window.google.maps) {
    console.error("Google Maps API not loaded.");
    return;
  }

  const service = new window.google.maps.DirectionsService();

  const waypoints = placesList.slice(1, -1).map((place) => ({
    location: {
      lat: place.latitude,
      lng: place.longitude,
    },
    stopover: true,
  }));

  service.route(
    {
      origin: {
        lat: placesList[0].latitude,
        lng: placesList[0].longitude,
      },
      destination: {
        lat: placesList[placesList.length - 1].latitude,
        lng: placesList[placesList.length - 1].longitude,
      },
      waypoints,
      travelMode: window.google.maps.TravelMode.DRIVING,
    },
    (result, status) => {
      if (status === "OK") {
        setDirections(result);
      } else {
        console.error("Directions request failed:", status);
      }
    }
  );
};