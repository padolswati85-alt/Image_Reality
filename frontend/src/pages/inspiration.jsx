"use client";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";

// Images
import nashik from "../assets/images/nashik.jpg";
import igatpuri from "../assets/images/igatpuri.jpg";
import trimbakeshwar from "../assets/images/trimbakeshwar.jpg";
import dindori from "../assets/images/dindori.png";
import peth from "../assets/images/peth.jpg";
import kalwan from "../assets/images/kalwan.png";
import surgana from "../assets/images/satana.png";
import chandwad from "../assets/images/chandwad.png";
import deola from "../assets/images/devola.png";
import satana from "../assets/images/satana.png";
import malegaon from "../assets/images/malegoan.png";
import nandgaon from "../assets/images/nandgoan.png";
import yeola from "../assets/images/yeoula.png";
import niphad from "../assets/images/niphad.jpg";
import sinnar from "../assets/images/sinner.png";

const talukas = [
  { id: 1, name: "Nashik", image: nashik, tag: "Spiritual" },
  { id: 2, name: "Igatpuri", image: igatpuri, tag: "Hills" },
  { id: 3, name: "Trimbakeshwar", image: trimbakeshwar, tag: "Spiritual" },
  { id: 4, name: "Dindori", image: dindori, tag: "Nature" },
  { id: 5, name: "Peth", image: peth, tag: "Tribal" },
  { id: 6, name: "Kalwan", image: kalwan, tag: "Adventure" },
  { id: 7, name: "Surgana", image: surgana, tag: "Forest" },
  { id: 8, name: "Chandwad", image: chandwad, tag: "Heritage" },
  { id: 9, name: "Deola", image: deola, tag: "Rural" },
  { id: 10, name: "Satana", image: satana, tag: "History" },
  { id: 11, name: "Malegaon", image: malegaon, tag: "Urban" },
  { id: 12, name: "Nandgaon", image: nandgaon, tag: "Culture" },
  { id: 13, name: "Yeola", image: yeola, tag: "Wine" },
  { id: 14, name: "Niphad", image: niphad, tag: "Wine" },
  { id: 15, name: "Sinnar", image: sinnar, tag: "History" }
];

export default function InspirationSection() {
  const [ripples, setRipples] = useState([]);

  // Add a new ripple on every cursor move
  const handleMouseMove = (e, cardId) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const key = Date.now() + Math.random(); // unique key
    setRipples((prev) => [...prev, { x, y, cardId, key }]);
    // Remove ripple after 0.8s
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.key !== key));
    }, 800);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, rotate: -2 },
    visible: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const buttonHover = {
    scale: 1.15,
    boxShadow: "0 0 15px rgba(0, 170, 255, 0.6)",
    transition: { duration: 0.3, yoyo: Infinity }
  };

  return (
    <section className="px-6 py-24 bg-amber-50">
      {/* Heading */}
      <motion.h2
        className="text-4xl md:text-5xl font-extrabold text-center text-[#0077aa] mb-16 drop-shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        Discover Places of <span className="text-[#034f84]">Nashik</span> Through Talukas
      </motion.h2>

      {/* Taluka Cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        {talukas.map((t) => (
          <motion.div
            key={t.id}
            variants={cardVariants}
            onMouseMove={(e) => handleMouseMove(e, t.id)}
            whileHover={{ y: -8, scale: 1.05, boxShadow: "0 15px 30px rgba(0, 170, 255, 0.35)" }}
            className="relative cursor-pointer bg-amber-100 rounded-2xl overflow-hidden shadow-lg border border-white/10 transition-all duration-500 hover:shadow-xl group"
          >
            {/* Image with shine */}
            <motion.div className="relative overflow-hidden">
              <motion.img
                src={t.image}
                alt={t.name}
                className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
              />
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <motion.div
                  className="absolute top-0 -left-32 w-32 h-full bg-white/20 transform rotate-12 blur-lg"
                  initial={{ x: -150 }}
                  whileHover={{ x: 150 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
              </div>
            </motion.div>

            {/* Gradient Overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-70"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.7 }}
              transition={{ duration: 0.8 }}
            />

            {/* Continuous Ripple */}
            {ripples
              .filter((r) => r.cardId === t.id)
              .map((r) => (
                <span
                  key={r.key}
                  style={{
                    left: r.x,
                    top: r.y
                  }}
                  className="absolute w-6 h-6 bg-white/30 rounded-full animate-ripple pointer-events-none"
                />
              ))}

            {/* Taluka Name */}
            <motion.h3
              className="absolute bottom-5 left-5 text-xl md:text-2xl font-bold text-white drop-shadow-md"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {t.name}
            </motion.h3>

            {/* Tag */}
            <motion.span
              className="absolute top-5 left-5 px-3 py-1 bg-[#0077aa]/90 text-white text-xs rounded-full shadow-md"
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {t.tag}
            </motion.span>

            {/* Explore Button with shine */}
            <motion.div
              className="absolute top-5 right-5 bg-[#0077aa] p-3 rounded-full shadow-lg overflow-hidden"
              whileHover={buttonHover}
            >
              <Link to={`/explore?taluka=${t.id}`} className="relative z-10">
                <Plus size={18} className="text-white" />
              </Link>
              <motion.div
                className="absolute top-0 left-0 w-16 h-16 bg-white/20 rounded-full blur-xl"
                initial={{ x: -40, y: -40 }}
                whileHover={{ x: 40, y: 40 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Ripple animation keyframes */}
      <style>
        {`
          @keyframes ripple {
            0% {
              transform: scale(0);
              opacity: 0.5;
            }
            80% {
              transform: scale(2);
              opacity: 0.3;
            }
            100% {
              transform: scale(3);
              opacity: 0;
            }
          }
          .animate-ripple {
            animation: ripple 0.8s ease-out forwards;
          }
        `}
      </style>
    </section>
  );
}