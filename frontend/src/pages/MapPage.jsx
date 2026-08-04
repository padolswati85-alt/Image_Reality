"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../MapPage.css";

/* Fix leaflet icons */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

/* Icons */
const startIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
  iconSize: [32, 32],
});
const destinationIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
  iconSize: [32, 32],
});

/* Nashik bounds */
const NASHIK_BOUNDS = [
  [19.5, 73.3],
  [20.4, 74.4],
];

/* Starting points */
const STARTING_POINTS = [
  { name: "Nashik Road Railway Station", latitude: 19.9475, longitude: 73.8422 },
  { name: "Nashik Road Bus Stand", latitude: 19.9481, longitude: 73.8415 },
  { name: "Central Bus Stand (CBS)", latitude: 20.0012, longitude: 73.7821 },
  { name: "Nimani Bus Stand", latitude: 20.0117, longitude: 73.7968 },
  { name: "Ozar / Nashik Airport", latitude: 20.1191, longitude: 73.9129 },
];

function RecenterMap({ lat, lng }) {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], 11, { animate: true });
  }, [lat, lng, map]);
  return null;
}

export default function MapPage() {
  const [locations, setLocations] = useState([]);
  const [search, setSearch] = useState("");
  const [startPoint, setStartPoint] = useState(STARTING_POINTS[0]);

  useEffect(() => {
    fetch("https://image-reality.onrender.com/destinations/")
      .then((res) => res.json())
      .then((data) => {
        const valid = data.filter(
          (p) =>
            Number.isFinite(parseFloat(p.latitude)) &&
            Number.isFinite(parseFloat(p.longitude))
        );
        setLocations(valid);
      });
  }, []);

  const filteredLocations = locations.filter((loc) =>
    loc.name.toLowerCase().includes(search.toLowerCase())
  );

  const hoverVariants = {
    hover: { scale: 1.05, rotate: 1, transition: { duration: 0.3 } },
  };

  return (
    <div className="relative min-h-screen bg-amber-50 overflow-hidden pt-20 px-6">

      {/* Floating blobs */}
      <div className="absolute -top-40 -left-40 w-[400px] h-[400px] bg-[#00aaff]/20 rounded-full blur-[140px] animate-floating"></div>
      <div className="absolute top-1/4 -right-48 w-[500px] h-[500px] bg-[#00aaff]/15 rounded-full blur-[180px] animate-floating delay-2000"></div>
      <div className="absolute bottom-20 -left-36 w-[350px] h-[350px] bg-[#00aaff]/10 rounded-full blur-[160px] animate-floating delay-1000"></div>

      {/* HERO */}
      <section className="text-center py-16 relative z-10">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4
          bg-clip-text text-transparent bg-gradient-to-r from-[#0077aa] via-[#00aaff] to-[#0077aa] animate-gradient-text drop-shadow-lg"
        >
          Explore Nashik Visually
        </h1>
        <p className="text-[#005f8a] text-lg mb-8">
          Plan routes, discover destinations, and travel with confidence.
        </p>
      </section>

      {/* CONTROLS */}
      <motion.section
        className="glass mb-10 max-w-4xl mx-auto p-6 rounded-3xl shadow-lg backdrop-blur-md border border-white/20 flex flex-col md:flex-row gap-4 items-center justify-center"
        variants={hoverVariants}
        whileHover="hover"
      >
        <select
          value={startPoint.name}
          onChange={(e) =>
            setStartPoint(
              STARTING_POINTS.find((p) => p.name === e.target.value)
            )
          }
          className="p-3 rounded-xl border border-white/20 bg-white/10 text-[#005f8a] focus:outline-none focus:ring-2 focus:ring-[#00aaff]"
        >
          {STARTING_POINTS.map((point) => (
            <option key={point.name} value={point.name}>
              {point.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Search destinations..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-3 rounded-xl border border-white/20 bg-white/10 text-[#005f8a] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00aaff] flex-1"
        />
      </motion.section>

      {/* MAP CARD */}
      <motion.section
        className="glass p-6 rounded-3xl shadow-lg backdrop-blur-md border border-white/20 max-w-7xl mx-auto"
        variants={hoverVariants}
        whileHover="hover"
      >
        <MapContainer
          center={[startPoint.latitude, startPoint.longitude]}
          zoom={11}
          maxBounds={NASHIK_BOUNDS}
          className="w-full h-[600px] rounded-2xl"
        >
          <RecenterMap lat={startPoint.latitude} lng={startPoint.longitude} />

          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />

          <Marker
            position={[startPoint.latitude, startPoint.longitude]}
            icon={startIcon}
          >
            <Popup>
              <strong>{startPoint.name}</strong>
              <br />
              Starting Point
            </Popup>
          </Marker>

          {filteredLocations.map((loc) => (
            <Marker
              key={loc.id}
              position={[loc.latitude, loc.longitude]}
              icon={destinationIcon}
            >
              <Popup>
                <strong>{loc.name}</strong>
                <p>{loc.description}</p>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </motion.section>

      <style>{`
        .glass {
          background: rgba(255,255,255,0.2);
          backdrop-filter: blur(12px);
          border-radius: 1.5rem;
          border: 1px solid rgba(255,255,255,0.2);
        }
        .animate-floating {
          animation: floatAnim 15s ease-in-out infinite;
        }
        @keyframes floatAnim {
          0%,100%{ transform: translateY(0) translateX(0);}
          25%{ transform: translateY(-15px) translateX(10px);}
          50%{ transform: translateY(10px) translateX(-10px);}
          75%{ transform: translateY(-5px) translateX(5px);}
        }
        .animate-gradient-text {
          background-size: 200% 200%;
          animation: gradientShift 5s ease infinite;
        }
        @keyframes gradientShift {
          0%{ background-position:0% 50%; }
          50%{ background-position:100% 50%; }
          100%{ background-position:0% 50%; }
        }
      `}</style>
    </div>
  );
}