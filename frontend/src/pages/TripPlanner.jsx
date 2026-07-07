"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import toast from "react-hot-toast";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import { sortByProximity, haversine } from "../utils/geo";
import { fetchDestinations } from "../services/api";
import { detectCategory } from "../utils/category";
import { useWishlist } from "../context/WishlistContext";
import { getImageUrl } from "../utils/getImageUrl";

import {
  MapContainer,
  TileLayer
} from "react-leaflet";

import L from "leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl
});

const BASE = {
  latitude: 19.9975,
  longitude: 73.7898
};

const CATEGORY_OPTIONS = [
  "temple",
  "fort",
  "waterpark",
  "themepark",
  "misal",
  "hills",
  "historical",
  "lake",
  "museum",
  "sanctuary",
  "scenic",
  "vineyard",
  "waterfall"
];

const TRANSPORT_MODES = [
  {
    id: "walk",
    label: "🚶 Walk",
    speed: 5,
    costPerKm: 0
  },
  {
    id: "auto",
    label: "🛺 Auto",
    speed: 20,
    costPerKm: 12
  },
  {
    id: "car",
    label: "🚗 Car",
    speed: 40,
    costPerKm: 20
  }
];

const STARTING_POINTS = [
  {
    name: "Nashik Road Railway Station",
    latitude: 19.9475,
    longitude: 73.8422
  },
  {
    name: "Nashik Road Bus Stand",
    latitude: 19.9481,
    longitude: 73.8415
  },
  {
    name: "Central Bus Stand (CBS)",
    latitude: 20.0011961,
    longitude: 73.7820646
  },
  {
    name: "Nimani Bus Stand",
    latitude: 20.0116757,
    longitude: 73.7968223
  },
  {
    name: "Ozar / Nashik Airport",
    latitude: 20.1191,
    longitude: 73.9129
  }
];

const normalizeCrowd = (value) => {
  return (value || "Low")
    .toString()
    .trim()
    .toLowerCase();
};

const displayCrowd = (value) => {
  const c = normalizeCrowd(value);

  if (c === "danger") return "Danger";
  if (c === "high") return "High";
  if (c === "medium") return "Medium";

  return "Low";
};

const isCrowded = (place) => {
  const c = normalizeCrowd(
    place?.crowd_level || place?.crowd
  );

  return c === "high" || c === "danger";
};

const calculateTripBudget = (
  totalDistanceKm,
  transportMode
) => {
  return Math.round(
    totalDistanceKm *
      (transportMode?.costPerKm || 0)
  );
};

export default function TripPlanner() {

  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedPlaces, setSelectedPlaces] =
    useState([]);

  const [transportMode, setTransportMode] =
    useState(TRANSPORT_MODES[1]);

  const [plan, setPlan] = useState([]);

  const [budget, setBudget] = useState(0);

  const [totalDistance, setTotalDistance] =
    useState(0);

  const [search, setSearch] = useState("");

  const [category, setCategory] =
    useState("all");

  const [taluka, setTaluka] =
    useState("all");

  const [selectedStart, setSelectedStart] =
    useState(STARTING_POINTS[0]);

  const [crowdWarnings, setCrowdWarnings] =
    useState([]);

  const [safeMode, setSafeMode] =
    useState(true);

  const [filterNearby, setFilterNearby] =
    useState(false);

  const [nearbyRadius, setNearbyRadius] =
    useState(10);

  const [userLocation, setUserLocation] =
    useState(null);

  const [loadingLocation, setLoadingLocation] =
    useState(false);

  const [placeName, setPlaceName] =
    useState("");

  const [showTopBtn, setShowTopBtn] =
    useState(false);

  const { wishlist } = useWishlist();

  const mapRef = useRef(null);
  const resultRef = useRef(null);
  const planRef = useRef(null);
  const routingRefs = useRef({});
  const mapRenderComplete = useRef(false);

  const PLACES_PER_DAY = 3;

  // BACK TO TOP
  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // FETCH DESTINATIONS
  useEffect(() => {
    setLoading(true);
    fetchDestinations()
      .then((data) => {
        const normalized = (data || []).map((p) => ({
          ...p,
          id: p?.id || crypto.randomUUID(),
          latitude: Number(p?.latitude),
          longitude: Number(p?.longitude),
          taluka: typeof p?.taluka === "string" ? p?.taluka : p?.taluka?.name || "",
          crowd_level: normalizeCrowd(p?.crowd_level || p?.crowd || "Low")
        }));
        setPlaces(normalized);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load destinations");
        setLoading(false);
      });
  }, []);

  // WISHLIST
  useEffect(() => {
    if (!wishlist?.length) return;
    setSelectedPlaces((prev) => {
      const names = wishlist.map((w) => w?.name).filter(Boolean);
      return Array.from(new Set([...prev, ...names]));
    });
  }, [wishlist]);

  // TALUKA OPTIONS
  const talukaOptions = useMemo(() => {
    const set = new Set();
    places.forEach((p) => {
      if (p?.taluka) set.add(p.taluka);
    });
    return Array.from(set);
  }, [places]);

  // TOGGLE PLACE
  const togglePlace = (name) => {
    if (!name) return;
    setSelectedPlaces((prev) => {
      if (prev.includes(name)) return prev.filter((p) => p !== name);
      return [...prev, name];
    });
  };

  // GPS
  const getUserLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation not supported");
      return;
    }
    setLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude
        });
        toast.success("Current location detected");
        setLoadingLocation(false);
      },
      () => {
        toast.error("GPS failed");
        setLoadingLocation(false);
      }
    );
  };

  // SEARCH PLACE
  const searchPlace = async () => {
    if (!placeName.trim()) {
      toast.error("Enter a place name");
      return;
    }
    try {
      setLoadingLocation(true);
      const query = encodeURIComponent(`${placeName}, Nashik, India`);
      const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`);
      const data = await res.json();
      if (data?.length > 0) {
        setUserLocation({
          latitude: parseFloat(data[0].lat),
          longitude: parseFloat(data[0].lon)
        });
        toast.success("Location updated");
      } else {
        toast.error("Place not found");
      }
    } catch (err) {
      console.error(err);
      toast.error("Search failed");
    } finally {
      setLoadingLocation(false);
    }
  };

  // USE MY LOCATION
  const useMyLocationAsStart = () => {
    if (!userLocation) {
      toast.error("Set your location first");
      return;
    }
    setSelectedStart({
      name: "My Location",
      latitude: userLocation.latitude,
      longitude: userLocation.longitude
    });
    toast.success("Starting point updated");
  };

  // NEARBY FILTER
  const applyNearbyFilter = (list) => {
    if (!filterNearby || !userLocation) return list;
    return list.filter((p) => {
      if (!p?.latitude || !p?.longitude) return false;
      const dist = haversine(
        userLocation.latitude,
        userLocation.longitude,
        p.latitude,
        p.longitude
      );
      return dist <= nearbyRadius;
    });
  };

  // PLAN GENERATOR
  const generateDayWisePlan = (placesList) => {
    const finalPlan = [];
    let distanceSum = 0;
    const totalDays = Math.ceil(placesList.length / PLACES_PER_DAY);
    for (let d = 1; d <= totalDays; d++) {
      const slice = placesList.slice((d - 1) * PLACES_PER_DAY, d * PLACES_PER_DAY);
      const enhanced = slice.map((p, i) => {
        const next = slice[i + 1];
        let dist = null, time = null;
        if (next && p?.latitude && p?.longitude && next?.latitude && next?.longitude) {
          dist = haversine(p.latitude, p.longitude, next.latitude, next.longitude);
          distanceSum += dist;
          const hours = dist / transportMode.speed;
          time = `${hours.toFixed(1)} hr`;
        }
        return {
          ...p,
          distance: dist ? dist.toFixed(2) : null,
          travelTime: time,
          visitTime: ["Morning", "Afternoon", "Evening"][i % 3]
        };
      });
      finalPlan.push({ day: d, places: enhanced });
    }
    setTotalDistance(distanceSum);
    setBudget(calculateTripBudget(distanceSum, transportMode));
    return finalPlan;
  };

  // ROUTING
  const addRouting = (planData) => {
    if (!mapRef.current) {
      console.log("Map not ready");
      return;
    }

    Object.values(routingRefs.current).forEach((c) => {
      if (c) c.remove();
    });
    routingRefs.current = {};

    planData.forEach((day) => {
      if (!day?.places?.length) return;

      const waypoints = [L.latLng(selectedStart.latitude, selectedStart.longitude)];
      day.places.forEach((p) => {
        if (p?.latitude && p?.longitude) {
          waypoints.push(L.latLng(p.latitude, p.longitude));
        }
      });

      const routingControl = L.Routing.control({
        waypoints,
        router: L.Routing.osrmv1({
          serviceUrl: "https://router.project-osrm.org/route/v1"
        }),
        lineOptions: { styles: [{ color: "#122960", weight: 5 }] },
        show: true,
        collapsible: true,
        addWaypoints: false,
        draggableWaypoints: false,
        fitSelectedRoutes: true,
        routeWhileDragging: false,
        showAlternatives: true
      });
      routingControl.addTo(mapRef.current);
      routingRefs.current[`day-${day.day}`] = routingControl;
    });

    mapRef.current.setView([selectedStart.latitude, selectedStart.longitude], 12);
  };

  // GENERATE PLAN
  const generatePlan = () => {
    if (!selectedPlaces.length) {
      toast.error("Select at least one place");
      return;
    }

    let selected = places.filter((p) => selectedPlaces.includes(p?.name));
    if (filterNearby && userLocation) {
      selected = applyNearbyFilter(selected);
      if (!selected.length) {
        toast.error(`No places within ${nearbyRadius} km`);
        return;
      }
    }

    const dangerPlaces = selected.filter(isCrowded);
    setCrowdWarnings(dangerPlaces);
    if (safeMode) selected = selected.filter((p) => !isCrowded(p));
    if (!selected.length) {
      toast.error("All places crowded");
      return;
    }

    const ordered = sortByProximity(selected, userLocation || BASE);
    const finalPlan = generateDayWisePlan(ordered);
    setPlan(finalPlan);

    setTimeout(() => {
      addRouting(finalPlan);
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 500);

    toast.success("Trip generated");
  };

  // AI AUTO PLAN
  const aiAutoPlan = () => {
    if (taluka === "all") {
      toast.error("Select a taluka first");
      return;
    }

    let pool = places.filter((p) => p?.taluka === taluka);
    if (category !== "all") pool = pool.filter((p) => detectCategory(p) === category);
    if (filterNearby && userLocation) {
      pool = applyNearbyFilter(pool);
      if (!pool.length) {
        toast.error(`No places within ${nearbyRadius} km for this taluka/category`);
        return;
      }
    }
    if (!pool.length) {
      toast.error("No places found");
      return;
    }

    const dangerPlaces = pool.filter(isCrowded);
    setCrowdWarnings(dangerPlaces);
    if (safeMode) pool = pool.filter((p) => !isCrowded(p));
    if (!pool.length) {
      toast.error("All places crowded – turn off Safe Mode");
      return;
    }

    const recommendations = pool.slice(0, 6);
    setSelectedPlaces(recommendations.map((p) => p.name));
    const finalPlan = generateDayWisePlan(recommendations);
    setPlan(finalPlan);

    setTimeout(() => {
      addRouting(finalPlan);
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 500);

    toast.success(dangerPlaces.length ? "AI safe plan (crowded avoided)" : "AI plan ready");
  };

  // ========== DOWNLOAD FUNCTIONS ==========
  const downloadPlanAsPDF = async () => {
    if (!planRef.current) {
      toast.error("No plan to download");
      return;
    }
    try {
      toast.loading("Generating PDF...");
      const canvas = await html2canvas(planRef.current, {
        scale: 2,
        backgroundColor: "#ffffff"
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      pdf.save("Nashik_Trip_Plan.pdf");
      toast.dismiss();
      toast.success("PDF downloaded");
    } catch (error) {
      console.error(error);
      toast.dismiss();
      toast.error("Failed to generate PDF");
    }
  };

  // IMPROVED MAP DOWNLOAD – forces route lines to be captured
  const downloadMapAsImage = async () => {
    if (!mapRef.current) {
      toast.error("Map not available");
      return;
    }

    const map = mapRef.current;
    const mapContainer = map.getContainer();

    toast.loading("Preparing map with routes...", { duration: 0 });

    // Force map to invalidate size and redraw
    setTimeout(() => map.invalidateSize(), 100);

    // Wait for all routing controls to fully render
    const routingKeys = Object.keys(routingRefs.current);
    if (routingKeys.length > 0) {
      // Create a promise that resolves when all routes are drawn
      const routePromises = routingKeys.map((key) => {
        const control = routingRefs.current[key];
        if (control && control._router && !control._router._done) {
          return new Promise((resolve) => {
            control.on('routesfound', () => resolve());
            setTimeout(resolve, 3000); // fallback after 3 sec
          });
        }
        return Promise.resolve();
      });
      await Promise.all(routePromises);
    }

    // Extra delay for canvas painting
    await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      const canvas = await html2canvas(mapContainer, {
        scale: 3,
        backgroundColor: "#f0f0f0",
        useCORS: true,
        logging: false,
        windowWidth: mapContainer.scrollWidth,
        windowHeight: mapContainer.scrollHeight,
        onclone: (clonedDoc, element) => {
          // Ensure cloned map container uses the same dimensions
          const clonedMap = element.querySelector('.leaflet-container');
          if (clonedMap) {
            clonedMap.style.width = mapContainer.clientWidth + 'px';
            clonedMap.style.height = mapContainer.clientHeight + 'px';
            // Trigger a resize on the cloned map
            if (clonedMap._leaflet_map) {
              clonedMap._leaflet_map.invalidateSize();
            }
          }
        }
      });

      const link = document.createElement("a");
      link.download = "Nashik_Map.png";
      link.href = canvas.toDataURL();
      link.click();

      toast.dismiss();
      toast.success("Map image downloaded (route included)");
    } catch (error) {
      console.error(error);
      toast.dismiss();
      toast.error("Failed to capture map");
    }
  };
  // ========================================

  // FILTERED PLACES
  const filteredPlaces = useMemo(() => {
    let filtered = places.filter((p) => {
      const matchSearch = search === "" || p?.name?.toLowerCase().includes(search.toLowerCase());
      const matchCategory = category === "all" || detectCategory(p) === category;
      const matchTaluka = taluka === "all" || p?.taluka === taluka;
      return matchSearch && matchCategory && matchTaluka;
    });
    if (filterNearby && userLocation) filtered = applyNearbyFilter(filtered);
    return filtered;
  }, [places, search, category, taluka, filterNearby, userLocation, nearbyRadius]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F6F1E7]">
        <div className="text-2xl font-bold text-[#1E6FA8]">Loading destinations...</div>
      </div>
    );
  }

  return (
    <section className="min-h-screen pt-20 bg-[#F6F1E7] text-[#1E6FA8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h1 className="text-4xl sm:text-6xl font-extrabold text-center mb-8">🧭 Smart Trip Planner</h1>

        {/* FILTERS */}
        <div className="flex flex-wrap gap-3 justify-center mb-6">
          <select
            value={selectedStart?.name || ""}
            onChange={(e) => {
              const found = STARTING_POINTS.find((s) => s.name === e.target.value);
              if (found) setSelectedStart(found);
            }}
            className="bg-white rounded-full px-4 py-2 text-sm shadow"
          >
            {STARTING_POINTS.map((sp) => (
              <option key={sp.name} value={sp.name}>{sp.name}</option>
            ))}
          </select>

          <input
            type="text"
            placeholder="🔍 Search places"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-white rounded-full px-4 py-2 text-sm shadow w-40"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-white rounded-full px-4 py-2 text-sm shadow"
          >
            <option value="all">All Categories</option>
            {CATEGORY_OPTIONS.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <select
            value={taluka}
            onChange={(e) => setTaluka(e.target.value)}
            className="bg-white rounded-full px-4 py-2 text-sm shadow"
          >
            <option value="all">All Talukas</option>
            {talukaOptions.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>

          <select
            value={transportMode?.id || ""}
            onChange={(e) => {
              const found = TRANSPORT_MODES.find((t) => t.id === e.target.value);
              if (found) setTransportMode(found);
            }}
            className="bg-white rounded-full px-4 py-2 text-sm shadow"
          >
            {TRANSPORT_MODES.map((t) => (
              <option key={t.id} value={t.id}>{t.label}</option>
            ))}
          </select>
        </div>

        {/* ACTIONS */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-6">
          <button
            onClick={getUserLocation}
            disabled={loadingLocation}
            className="bg-purple-600 text-white p-2 rounded-full shadow hover:bg-purple-700 w-10 h-10 flex items-center justify-center text-lg"
            title="Get GPS location"
          >
            📍
          </button>

          <div className="flex bg-white rounded-full px-3 py-1 shadow gap-1">
            <input
              type="text"
              placeholder="Search place (e.g., Trimbak)"
              value={placeName}
              onChange={(e) => setPlaceName(e.target.value)}
              className="w-40 text-sm outline-none"
            />
            <button
              onClick={searchPlace}
              className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full"
              title="Search location by name"
            >
              Set
            </button>
          </div>

          {userLocation && (
            <>
              <button
                onClick={useMyLocationAsStart}
                className="bg-green-600 text-white p-2 rounded-full shadow hover:bg-green-700 w-10 h-10 flex items-center justify-center text-lg"
                title="Use as start point"
              >
                🚩
              </button>

              <button
                onClick={() => setFilterNearby(!filterNearby)}
                className={`p-2 rounded-full shadow w-10 h-10 flex items-center justify-center text-lg ${
                  filterNearby ? "bg-teal-600 text-white" : "bg-gray-200 text-gray-800"
                }`}
                title={filterNearby ? "Disable nearby filter" : "Only show places within radius"}
              >
                {filterNearby ? "✅" : "📍"}
              </button>

              {filterNearby && (
                <select
                  value={nearbyRadius}
                  onChange={(e) => setNearbyRadius(Number(e.target.value))}
                  className="bg-white rounded-full px-3 py-1 text-sm shadow"
                  title="Filter radius"
                >
                  <option value={2}>2 km</option>
                  <option value={5}>5 km</option>
                  <option value={10}>10 km</option>
                  <option value={20}>20 km</option>
                  <option value={50}>50 km</option>
                </select>
              )}
            </>
          )}

          <button
            onClick={() => {
              setSelectedPlaces([]);
              setPlan([]);
              setBudget(0);
              setTotalDistance(0);
              toast.success("Cleared");
            }}
            className="bg-gray-200 p-2 rounded-full shadow w-10 h-10 flex items-center justify-center text-lg hover:bg-gray-300"
            title="Clear all"
          >
            ❌
          </button>

          <button
            onClick={generatePlan}
            className="bg-[#1E6FA8] text-white p-2 rounded-full shadow w-10 h-10 flex items-center justify-center text-lg"
            title="Generate trip"
          >
            🚀
          </button>

          <button
            onClick={aiAutoPlan}
            className="bg-[#1E6FA8] text-white p-2 rounded-full shadow w-10 h-10 flex items-center justify-center text-lg"
            title="AI auto-plan"
          >
            🤖
          </button>

          <button
            onClick={() => {
              setSafeMode(!safeMode);
              toast.success(safeMode ? "Safe Mode OFF" : "Safe Mode ON");
            }}
            className={`p-2 rounded-full shadow w-10 h-10 flex items-center justify-center text-lg ${
              safeMode ? "bg-green-600 text-white" : "bg-red-600 text-white"
            }`}
            title={safeMode ? "Safe mode ON – tap to disable" : "Safe mode OFF – tap to enable"}
          >
            {safeMode ? "🛡" : "⚠️"}
          </button>

          {plan.length > 0 && (
            <>
              <button
                onClick={downloadPlanAsPDF}
                className="bg-orange-600 text-white p-2 rounded-full shadow hover:bg-orange-700 w-10 h-10 flex items-center justify-center text-lg"
                title="Download trip plan as PDF"
              >
                📄
              </button>
              <button
                onClick={downloadMapAsImage}
                className="bg-cyan-600 text-white p-2 rounded-full shadow hover:bg-cyan-700 w-10 h-10 flex items-center justify-center text-lg"
                title="Download map as image (includes route)"
              >
                🗺️
              </button>
            </>
          )}
        </div>

        {/* WARNINGS */}
        {crowdWarnings.length > 0 && (
          <div className="bg-red-100 text-red-700 p-3 rounded-2xl mb-6 text-sm">
            ⚠️ Crowded: {crowdWarnings.map((p) => p?.name).join(", ")}
          </div>
        )}

        {/* PLACE CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-10">
          {filteredPlaces.map((p) => {
            const selected = selectedPlaces.includes(p?.name);
            const crowd = normalizeCrowd(p?.crowd_level);
            return (
              <div
                key={p?.id}
                onClick={() => togglePlace(p?.name)}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg cursor-pointer transition"
                title={selected ? "Remove from trip" : "Add to trip"}
              >
                <img
                  src={getImageUrl(p?.image_url || p?.image)}
                  onError={(e) => (e.target.src = "/placeholder.jpg")}
                  alt={p?.name}
                  className="h-40 w-full object-cover"
                />
                <div className="p-3">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-[#034f84]">{p?.name}</h3>
                    <button
                      className={`text-xs px-2 py-1 rounded-full ${
                        selected ? "bg-green-500 text-white" : "bg-[#1E6FA8] text-white"
                      }`}
                    >
                      {selected ? "✔" : "+"}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{p?.description}</p>
                  <div className="flex justify-between mt-2 text-xs">
                    <span>📍 {p?.taluka || "Nashik"}</span>
                    <span
                      className={`px-2 rounded-full ${
                        crowd === "danger"
                          ? "bg-red-600"
                          : crowd === "high"
                          ? "bg-orange-500"
                          : crowd === "medium"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      } text-white`}
                    >
                      {displayCrowd(crowd)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* PLAN DISPLAY */}
        <div ref={resultRef}>
          {plan.length > 0 && (
            <div ref={planRef} className="bg-white rounded-2xl shadow-lg p-4 mb-6">
              <h2 className="text-xl font-bold mb-3">📋 Your Trip Plan</h2>
              {plan.map((day) => (
                <div key={day.day} className="mb-3 border-b pb-2">
                  <h3 className="font-bold text-[#1E6FA8]">Day {day.day}</h3>
                  {day.places.map((p) => (
                    <div key={p.name} className="flex justify-between bg-gray-50 p-2 rounded mt-1 text-sm">
                      <span>{p.name} – {p.visitTime}</span>
                      {p.distance && <span>{p.distance} km, {p.travelTime}</span>}
                    </div>
                  ))}
                </div>
              ))}
              {budget > 0 && (
                <div className="text-center font-semibold mt-3">
                  💰 Est. Cost: ₹{budget} | 📏 Distance: {totalDistance.toFixed(2)} km
                </div>
              )}
            </div>
          )}
        </div>

        {/* MAP */}
        {plan.length > 0 && (
          <div className="h-[60vh] rounded-2xl shadow-lg mb-8 relative z-0">
            <MapContainer
              ref={mapRef}
              center={[BASE.latitude, BASE.longitude]}
              zoom={12}
              className="h-full w-full"
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            </MapContainer>
          </div>
        )}
      </div>

      {/* BACK TO TOP */}
      {showTopBtn && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-[9999] bg-[#1E6FA8] hover:bg-[#155A8A] text-white w-12 h-12 rounded-full shadow-xl text-xl flex items-center justify-center"
        >
          ↑
        </button>
      )}
    </section>
  );
}