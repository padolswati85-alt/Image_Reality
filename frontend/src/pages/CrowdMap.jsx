import React, { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, CircleMarker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import CrowdAlertPanel from "../components/CrowdAlertPanel";
import CrowdAlertBanner from "../components/CrowdAlertBanner";
import EmergencyHelpPanel from "../components/EmergencyHelpPanel";
import SafeRouteSuggestion from "../components/SafeRouteSuggestion";

const API_URL = "http://127.0.0.1:8000/destinations";

const randomCrowd = () => {
  const levels = ["Low", "Medium", "High", "Danger"];
  return levels[Math.floor(Math.random() * levels.length)];
};

const getCrowdLevel = (place) => {
  const name = (place.name || "").toLowerCase();
  const zone = (place.zone || place.location || "").toLowerCase();

  if (
    name.includes("ramkund") ||
    name.includes("kalaram") ||
    name.includes("trimbakeshwar") ||
    name.includes("kusavarta") ||
    zone.includes("panchavati") ||
    zone.includes("godavari")
  ) {
    return "Danger";
  }

  if (
    name.includes("temple") ||
    name.includes("mandir") ||
    name.includes("fort") ||
    zone.includes("trimbak")
  ) {
    return "High";
  }

  if (
    zone.includes("wine") ||
    zone.includes("adventure") ||
    zone.includes("nature") ||
    zone.includes("hill")
  ) {
    return "Medium";
  }

  return "Low";
};

const getCrowdColor = (crowd) => {
  if (crowd === "Low") return "#22c55e";
  if (crowd === "Medium") return "#facc15";
  if (crowd === "High") return "#f97316";
  if (crowd === "Danger") return "#dc2626";
  return "#0284c7";
};

const getRadius = (crowd) => {
  if (crowd === "Low") return 6;
  if (crowd === "Medium") return 11;
  if (crowd === "High") return 15;
  if (crowd === "Danger") return 20;
  return 9;
};

const isValidCoordinate = (lat, lng) => {
  const latitude = Number(lat);
  const longitude = Number(lng);

  if (Number.isNaN(latitude) || Number.isNaN(longitude)) return false;
  if (latitude < 18.5 || latitude > 21.2) return false;
  if (longitude < 72.7 || longitude > 75.0) return false;

  return true;
};

function CrowdMap() {
  const [places, setPlaces] = useState([]);
  const [selectedCrowd, setSelectedCrowd] = useState("All");
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [emergencyOpen, setEmergencyOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchPlaces = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      const cleanedData = data
        .map((place) => {
          const lat = place.lat || place.latitude || place.location_lat;
          const lng = place.lng || place.longitude || place.location_lng;

          const backendCrowd =
            place.crowd_level && place.crowd_level !== ""
              ? place.crowd_level
              : null;

          return {
            ...place,
            lat: Number(lat),
            lng: Number(lng),
            zone:
              place.zone ||
              place.region ||
              place.location_zone ||
              place.location ||
              "Nashik",

            // Admin value first, otherwise automatic fallback
            crowd: backendCrowd || getCrowdLevel(place),

            // This tells simulation whether admin has already controlled it
            isAdminControlled: Boolean(backendCrowd),
          };
        })
        .filter((place) => isValidCoordinate(place.lat, place.lng));

      setPlaces(cleanedData);
    } catch (error) {
      console.error("Crowd map data loading failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaces();

    // Re-fetch backend data every 15 seconds
    const fetchInterval = setInterval(fetchPlaces, 15000);

    // Live crowd simulation every 8 seconds
    const simulationInterval = setInterval(() => {
      setPlaces((prevPlaces) =>
        prevPlaces.map((place) => {
          // Admin updated places should not be changed by simulation
          if (place.isAdminControlled) {
            return place;
          }

          return {
            ...place,
            crowd: randomCrowd(),
          };
        })
      );
    }, 8000);

    return () => {
      clearInterval(fetchInterval);
      clearInterval(simulationInterval);
    };
  }, []);

  const filteredPlaces = useMemo(() => {
    return places.filter((place) => {
      const crowd = place.crowd || place.crowd_level || "Low";

      const matchesCrowd =
        selectedCrowd === "All" || crowd === selectedCrowd;

      const matchesSearch = place.name
        ?.toLowerCase()
        .includes(search.toLowerCase());

      return matchesCrowd && matchesSearch;
    });
  }, [places, selectedCrowd, search]);

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-[#eefcff] via-[#fff8dc] to-[#fffaf0] pt-36 px-6 pb-16 transition-all duration-300 ${
        selectedPlace ? "lg:pr-[420px]" : ""
      }`}
    >
      <h1 className="text-4xl md:text-5xl font-extrabold text-center text-[#0077aa] drop-shadow-md mb-4">
        Live Crowd Density Map
      </h1>

      <div className="max-w-6xl mx-auto mb-5 rounded-2xl overflow-hidden shadow-md">
        <CrowdAlertBanner places={places} />
      </div>

      <div className="max-w-6xl mx-auto flex justify-end mb-5">
        <button
          onClick={() => setEmergencyOpen(true)}
          className="px-6 py-3 rounded-full bg-red-600 text-white font-bold shadow-lg hover:bg-red-700 hover:scale-105 transition"
        >
          Emergency Help
        </button>
      </div>

      <p className="text-center text-gray-700 text-base md:text-lg max-w-3xl mx-auto mb-6">
        View tourist and Kumbh Mela sensitive areas with crowd level indication.
        Auto simulation updates normal areas while admin-controlled places stay fixed.
      </p>

      <div className="max-w-6xl mx-auto bg-white/85 backdrop-blur-md rounded-3xl shadow-lg p-5 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Search place..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-5 py-3 rounded-full border outline-none focus:ring-2 focus:ring-blue-400"
          />

          <select
            value={selectedCrowd}
            onChange={(e) => setSelectedCrowd(e.target.value)}
            className="px-5 py-3 rounded-full border outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="All">All Crowd Levels</option>
            <option value="Low">Low Crowd</option>
            <option value="Medium">Medium Crowd</option>
            <option value="High">High Crowd</option>
            <option value="Danger">Danger Zone</option>
          </select>

          <div className="flex items-center justify-center font-semibold text-[#0077aa]">
            Showing {filteredPlaces.length} places
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4 flex-wrap mb-6">
        <span className="bg-white px-5 py-2 rounded-full shadow font-semibold text-green-600">
          ● Low
        </span>
        <span className="bg-white px-5 py-2 rounded-full shadow font-semibold text-yellow-500">
          ● Medium
        </span>
        <span className="bg-white px-5 py-2 rounded-full shadow font-semibold text-orange-500">
          ● High
        </span>
        <span className="bg-white px-5 py-2 rounded-full shadow font-semibold text-red-600">
          ● Danger
        </span>
      </div>

      {loading ? (
        <h2 className="text-center text-2xl font-bold text-[#0077aa]">
          Loading crowd map...
        </h2>
      ) : (
        <div className="relative z-0 max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-white bg-white p-3">
          <MapContainer
            center={[20.0059, 73.7919]}
            zoom={10}
            scrollWheelZoom={true}
            style={{ height: "520px", width: "100%", borderRadius: "22px" }}
          >
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {filteredPlaces.map((place) => {
              const crowd = place.crowd || place.crowd_level || "Low";
              const isSelected = selectedPlace?.id === place.id;

              return (
                <CircleMarker
                  key={place.id || place.name}
                  center={[place.lat, place.lng]}
                  radius={
                    isSelected
                      ? getRadius(crowd) + 7
                      : getRadius(crowd)
                  }
                  pathOptions={{
                    color: getCrowdColor(crowd),
                    fillColor: getCrowdColor(crowd),
                    fillOpacity: isSelected ? 0.9 : 0.7,
                    weight: isSelected ? 5 : 3,
                  }}
                  eventHandlers={{
                    click: (e) => {
                      setSelectedPlace({
                        ...place,
                        crowd,
                      });
                      e.target._map.setView([place.lat, place.lng], 13);
                    },
                  }}
                />
              );
            })}
          </MapContainer>
        </div>
      )}

      <SafeRouteSuggestion selectedPlace={selectedPlace} />

      <CrowdAlertPanel
        place={selectedPlace}
        onClose={() => setSelectedPlace(null)}
      />

      <EmergencyHelpPanel
        open={emergencyOpen}
        onClose={() => setEmergencyOpen(false)}
        selectedPlace={selectedPlace}
      />
    </div>
  );
}

export default CrowdMap;