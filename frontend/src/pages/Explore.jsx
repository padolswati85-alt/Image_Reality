"use client";
import { useEffect, useState, useMemo, useRef, useLayoutEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchDestinations, getNearbyDestinations } from "../services/api";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";
import toast from "react-hot-toast";

export default function Explore() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(8);

  const [nearbyActive, setNearbyActive] = useState(false);
  const [nearbyRadius, setNearbyRadius] = useState(10);
  const [loadingNearby, setLoadingNearby] = useState(false);
  const [userLocation, setUserLocation] = useState(null);

  const navbarRef = useRef(null);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const navigate = useNavigate();
  const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlist();
  const [searchParams] = useSearchParams();
  const talukaIdParam = searchParams.get("taluka");

  const loadAllDestinations = async () => {
    try {
      const data = await fetchDestinations();
      setPlaces(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setError("Failed to load destinations");
      toast.error("Failed to load destinations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllDestinations();
  }, []);

  const resetToAllDestinations = () => {
    setNearbyActive(false);
    setUserLocation(null);
    setSearchQuery("");
    loadAllDestinations();
    toast.success("Showing all destinations");
  };

  const handleNearMe = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation not supported");
      return;
    }
    setLoadingNearby(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        try {
          const nearbyData = await getNearbyDestinations(latitude, longitude, nearbyRadius);
          console.log("🔍 Raw API response:", nearbyData);
          
          if (!Array.isArray(nearbyData)) {
            toast.error("Invalid data received");
            return;
          }

          // Ensure each place has an id (use index fallback)
          const validated = nearbyData.map((p, idx) => ({
            ...p,
            id: p.id ?? idx,
            image: p.image || p.image_url || "/placeholder.jpg",
            description: p.description || "No description",
            talukaName: p.taluka?.name || p.taluka || "Nashik"
          }));

          const sorted = validated.sort((a,b) => (a.distance_km || 999) - (b.distance_km || 999));
          console.log("✅ Sorted & validated places:", sorted);
          
          setPlaces(sorted);
          setNearbyActive(true);
          setVisibleCount(8);
          setSearchQuery(""); // clear search
          
          if (sorted.length === 0) {
            toast(`No places found within ${nearbyRadius} km`);
          } else {
            toast.success(`Found ${sorted.length} place${sorted.length > 1 ? 's' : ''} nearby`);
          }
        } catch (err) {
          console.error("❌ Error:", err);
          toast.error("Could not fetch nearby places");
          setNearbyActive(false);
        } finally {
          setLoadingNearby(false);
        }
      },
      (err) => {
        console.error("Geolocation error:", err);
        toast.error("Location permission denied");
        setLoadingNearby(false);
      }
    );
  };

  // Filter: when nearbyActive, ignore taluka and search (search is cleared anyway)
  const filteredPlaces = useMemo(() => {
    let filtered = places;
    
    if (!nearbyActive && talukaIdParam) {
      filtered = filtered.filter((p) => String(p.taluka?.id) === talukaIdParam);
    }
    
    if (searchQuery && !nearbyActive) {
      filtered = filtered.filter((p) =>
        p.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  }, [places, searchQuery, talukaIdParam, nearbyActive]);

  const visiblePlaces = filteredPlaces.slice(0, visibleCount);
  const loadMore = () => setVisibleCount((prev) => prev + 4);

  useLayoutEffect(() => {
    if (navbarRef.current) setNavbarHeight(navbarRef.current.offsetHeight);
    else setNavbarHeight(80);
  }, []);

  if (loading) return <div className="p-10 text-gray-500">Loading...</div>;
  if (error) return <div className="p-10 text-red-500">{error}</div>;

  // Debug panel – shows when nearbyActive but no cards visible
  const showDebug = nearbyActive && places.length > 0 && visiblePlaces.length === 0;

  return (
    <div className="relative min-h-screen bg-amber-50" style={{ paddingTop: navbarHeight }}>
      <section className="px-4 md:px-6 py-12 md:py-16 bg-gradient-to-b from-[#00aaff]/20 to-amber-100">
        <motion.h2 className="text-3xl md:text-6xl font-extrabold mb-6 text-center text-[#0077aa]">
          Explore Nashik Places
        </motion.h2>

        <div className="flex flex-col gap-4 items-center justify-center">
          <div className="flex gap-3 flex-wrap justify-center">
            <button
              onClick={handleNearMe}
              disabled={loadingNearby}
              className={`px-5 py-2 rounded-full font-semibold shadow transition ${
                nearbyActive ? "bg-green-600 text-white" : "bg-[#0077aa] text-white"
              }`}
            >
              {loadingNearby ? "📍 Getting location..." : "📍 Near me"}
            </button>

            {nearbyActive && (
              <>
                <div className="flex items-center gap-2 bg-white rounded-full px-4 shadow">
                  <span className="text-sm">Radius:</span>
                  <select
                    value={nearbyRadius}
                    onChange={(e) => setNearbyRadius(Number(e.target.value))}
                    className="bg-transparent outline-none"
                  >
                    <option value={2}>2 km</option>
                    <option value={5}>5 km</option>
                    <option value={10}>10 km</option>
                    <option value={20}>20 km</option>
                    <option value={50}>50 km</option>
                  </select>
                  <button
                      onClick={handleNearMe}
                      className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white text-xs font-medium rounded-full shadow-sm hover:bg-blue-600 hover:scale-105 transition-all duration-200"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                      </svg>
                      Refresh
                    </button>
                </div>
                <button
                  onClick={resetToAllDestinations}
                  className="px-5 py-2 bg-gray-200 text-gray-800 rounded-full font-semibold shadow hover:bg-gray-300"
                >
                  Show all
                </button>
              </>
            )}
          </div>

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search destinations..."
            className="w-full max-w-md px-4 py-2 md:px-6 md:py-3 text-lg rounded-full outline-none shadow-lg border focus:ring-2"
          />

          {nearbyActive && userLocation && (
            <p className="text-sm text-gray-600">📍 Places within {nearbyRadius} km of your location</p>
          )}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Debug panel */}
        {showDebug && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 p-4 rounded mb-6">
            <p className="font-bold">⚠️ Debug: Places data is present but not displaying</p>
            <pre className="text-xs mt-2 overflow-auto">{JSON.stringify(places, null, 2)}</pre>
            <p className="mt-2">Check if each place has <strong>id</strong> and <strong>name</strong>.</p>
          </div>
        )}

        {visiblePlaces.length === 0 && !showDebug && (
          <div className="text-center text-gray-500 mt-10 text-lg">
            {nearbyActive
              ? `No places within ${nearbyRadius} km. Try increasing radius.`
              : "No destinations found."}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <AnimatePresence>
            {visiblePlaces.map((place) => (
              <motion.div
                key={place.id}
                whileHover={{ y: -5, scale: 1.02 }}
                onClick={() => navigate(`/places/${place.id}`)}
                className="cursor-pointer bg-amber-100 rounded-2xl overflow-hidden shadow-lg h-[350px]"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-full h-full object-cover"
                    onError={(e) => (e.target.src = "/placeholder.jpg")}
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      isWishlisted(place.id) ? removeFromWishlist(place.id) : addToWishlist(place);
                    }}
                    className="absolute top-2 right-2 z-10 bg-black/50 p-2 rounded-full"
                  >
                    <Heart size={20} className={isWishlisted(place.id) ? "text-pink-500 fill-pink-500" : "text-white/60"} />
                  </button>
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-bold text-[#034f84]">{place.name}</h2>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-3">{place.description}</p>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-xs text-gray-500">📍 {place.talukaName}</p>
                    {nearbyActive && place.distance_km && (
                      <p className="text-xs font-semibold text-blue-600">{place.distance_km} km away</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {visibleCount < filteredPlaces.length && (
          <div className="flex justify-center mt-8">
            <button onClick={loadMore} className="px-6 py-3 bg-[#0077aa] text-white rounded-full font-semibold">
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}