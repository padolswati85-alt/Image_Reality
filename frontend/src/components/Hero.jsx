//hero.jsx which is called in home.jsx

"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// HERO IMAGE
import heroImage from "../assets/images/nashikBG.png";

// GALLERY IMAGES
import gallery1 from "../assets/images/gallery1.png";
import gallery2 from "../assets/images/gallery2.png";
import gallery3 from "../assets/images/gallery3.png";
import gallery4 from "../assets/images/gallery4.png";
import gallery5 from "../assets/images/gallery5.png";
import gallery6 from "../assets/images/gallery6.png";
import gallery7 from "../assets/images/gallery7.png";
import gallery8 from "../assets/images/gallery8.png";

// ITINERARY IMAGES
import itinerary1 from "../assets/images/itinerary1.png";
import itinerary2 from "../assets/images/itinerary2.png";
import itinerary3 from "../assets/images/itinerary3.png";

// Placeholder image
import noImage from "../assets/images/noImage.png";

export default function Home() {
  const [query, setQuery] = useState("");
  const [places, setPlaces] = useState([]);
  const navigate = useNavigate();

  // Load destinations from backend
  useEffect(() => {
    fetch("http://127.0.0.1:8000/destinations")
      .then((res) => res.json())
      .then((data) => setPlaces(data))
      .catch((err) => console.log(err));
  }, []);

  const handleInput = (e) => setQuery(e.target.value);

  const getImage = (image) => {
    if (!image) return noImage;
    if (image.startsWith("http")) return image;
    return `http://127.0.0.1:8000${image}`;
  };

  // Only filter if query exists
  const filtered = query
    ? places.filter((item) =>
        item.name?.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const galleryImages = [
    gallery1, gallery2, gallery3, gallery4,
    gallery5, gallery6, gallery7, gallery8
  ];

  const itineraries = [
    { title: "Temples + Vineyards", duration: "2 Days", highlights: ["Trimbakeshwar", "Sula Vineyards"], img: itinerary1 },
    { title: "Nature Trekking Weekend", duration: "2 Days", highlights: ["Harihar Fort", "Anjneri Hills"], img: itinerary2 },
    { title: "Cultural & Food Tour", duration: "1 Day", highlights: ["Local markets", "Street food"], img: itinerary3 },
  ];

  return (
    <div className="bg-slate-50 text-gray-900">

      {/* HERO */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.8 }}
        />
        <div className="absolute inset-0 bg-black/50"></div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative z-10 flex flex-col items-center text-center px-6 md:px-16 space-y-8"
        >
          <h1 className="text-6xl md:text-8xl font-extrabold text-white drop-shadow-2xl uppercase">
            Explore Nashik
          </h1>
          <p className="text-xl md:text-3xl text-gray-200 drop-shadow-lg max-w-3xl">
            Discover temples, vineyards, forts, and breathtaking landscapes in the spiritual and wine capital of India.
          </p>

          <div className="relative w-full max-w-2xl flex flex-col items-center space-y-4">
            <input
              value={query}
              onChange={handleInput}
              placeholder="Search destinations..."
              className="w-full px-12 py-6 text-2xl md:text-3xl outline-none bg-white/40 backdrop-blur-xl placeholder:text-white/80 caret-white rounded-full shadow-lg focus:shadow-2xl transition-all hover:scale-105 duration-500"
            />
            {query && (
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(59,130,246,0.4)" }}
                className="bg-blue-600 text-white px-10 py-4 text-2xl rounded-full shadow-xl hover:bg-blue-700 transition-all"
                onClick={() => document.getElementById("search-results")?.scrollIntoView({ behavior: "smooth" })}
              >
                Show Results
              </motion.button>
            )}
          </div>
        </motion.div>
      </section>

      {/* SEARCH RESULTS (only visible when query exists) */}
      {query && (
        <section id="search-results" className="px-6 md:px-16 py-20 bg-slate-50">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-12 text-center text-blue-700 drop-shadow-lg">
            Search Results
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {filtered.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.03, y: -2 }}
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 4, repeat: Infinity, repeatType: "loop", delay: item.id * 0.05 }}
                className="bg-white rounded-3xl overflow-hidden shadow-2xl cursor-pointer hover:shadow-3xl transition-transform duration-500"
                onClick={() => navigate("/explore")}
              >
                <div className="overflow-hidden">
                  <img
                    src={getImage(item.image)}
                    alt={item.name}
                    className="w-full h-64 md:h-72 object-cover transition-transform duration-700 hover:scale-105"
                    onError={(e) => (e.target.src = noImage)}
                  />
                </div>
                <div className="p-6 flex justify-between items-center">
                  <h3 className="font-bold text-xl text-gray-800">{item.name}</h3>
                  <span className="text-sm bg-amber-400 text-white px-4 py-1 rounded-full animate-pulse">
                    Visit
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* POPULAR DESTINATIONS */}
      <section className="px-6 md:px-16 py-20 bg-gradient-to-b from-blue-50 to-amber-50">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-12 text-center text-blue-700 drop-shadow-lg">
          Popular Destinations
        </h2>
        <div className="grid md:grid-cols-4 gap-8">
          {places.slice(0, 8).map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.03, y: -2 }}
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 4, repeat: Infinity, repeatType: "loop", delay: item.id * 0.05 }}
              className="bg-white rounded-3xl overflow-hidden shadow-2xl cursor-pointer hover:shadow-3xl transition-transform duration-500"
              onClick={() => navigate("/explore")}
            >
              <div className="overflow-hidden">
                <img
                  src={getImage(item.image)}
                  alt={item.name}
                  className="w-full h-64 md:h-72 object-cover transition-transform duration-700 hover:scale-105"
                  onError={(e) => (e.target.src = noImage)}
                />
              </div>
              <div className="p-6 flex justify-between items-center">
                <h3 className="font-bold text-xl text-gray-800">{item.name}</h3>
                <span className="text-sm bg-amber-400 text-white px-4 py-1 rounded-full animate-pulse">
                  Visit
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SUGGESTED ITINERARIES */}
      <section className="py-32 px-6 md:px-16 bg-slate-50">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-16 text-center text-blue-700 drop-shadow-lg">
          Suggested Itineraries
        </h2>
        <div className="grid md:grid-cols-3 gap-12">
          {itineraries.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03, y: -2 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-white rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-transform duration-500 cursor-pointer"
              onClick={() => navigate("/trip-planner")}
            >
              <img src={item.img} alt={item.title} className="w-full h-64 object-cover" />
              <div className="p-6">
                <h3 className="font-bold text-2xl text-gray-800">{item.title}</h3>
                <p className="text-gray-500 mb-2">{item.duration}</p>
                <ul className="list-disc list-inside text-gray-600">
                  {item.highlights.map((h, idx) => (
                    <li key={idx}>{h}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PHOTO GALLERY */}
      <section className="py-32 px-6 md:px-16 bg-gradient-to-b from-blue-50 to-amber-50">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-16 text-blue-700 drop-shadow-lg">
          Photo Gallery
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {galleryImages.map((img, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="overflow-hidden rounded-2xl cursor-pointer"
              onClick={() => window.open(img, "_blank")}
            >
              <img
                src={img}
                alt={`Gallery ${i + 1}`}
                className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105"
              />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}