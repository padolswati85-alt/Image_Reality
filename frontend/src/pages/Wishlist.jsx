"use client";
import { motion, AnimatePresence } from "framer-motion";
import { HeartOff } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";
import { Link } from "react-router-dom";

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();

  const cardVariants = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } };

  return (
    <div className="relative min-h-screen bg-amber-50 overflow-hidden pt-20 px-6">

      {/* Multi-layer floating blobs */}
      <div className="absolute -top-40 -left-40 w-[400px] h-[400px] bg-[#00aaff]/20 rounded-full blur-[140px] animate-floating"></div>
      <div className="absolute top-1/4 -right-48 w-[500px] h-[500px] bg-[#00aaff]/15 rounded-full blur-[180px] animate-floating delay-2000"></div>
      <div className="absolute bottom-20 -left-36 w-[350px] h-[350px] bg-[#00aaff]/10 rounded-full blur-[160px] animate-floating delay-1000"></div>

      {/* HEADER */}
      <motion.h1
        className="text-3xl md:text-4xl font-extrabold mb-12 text-center
          bg-clip-text text-transparent bg-gradient-to-r from-[#0077aa] via-[#00aaff] to-[#0077aa] animate-gradient-text drop-shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        ❤️ Your Wishlist
      </motion.h1>

      {wishlist.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mt-32"
        >
          <p className="text-[#005f8a] text-xl mb-6">Your wishlist is empty</p>
          <Link
            to="/explore"
            className="inline-block px-8 py-4 rounded-2xl font-semibold
              bg-gradient-to-r from-[#0077aa] to-[#00aaff]
              hover:scale-105 transition-transform shadow-lg shadow-[#00aaff]/20"
          >
            Explore Destinations
          </Link>
        </motion.div>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
        >
          <AnimatePresence>
            {wishlist.map((place) => (
              <motion.div
                key={place.id}
                layout
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative group bg-amber-100/30 backdrop-blur-md border border-white/20 rounded-3xl p-6 shadow-lg hover:scale-105 hover:rotate-1 hover:shadow-[#00aaff]/30 transition-transform duration-500"
              >
                {/* REMOVE BUTTON */}
                <button
                  onClick={() => removeFromWishlist(place.id)}
                  className="absolute top-4 right-4 z-10 bg-black/40 p-2 rounded-full hover:scale-110 transition backdrop-blur"
                  title="Remove from wishlist"
                >
                  <HeartOff size={18} className="text-red-400" />
                </button>

                {/* IMAGE */}
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-full h-48 object-cover rounded-xl mb-4"
                  loading="lazy"
                />

                {/* CONTENT */}
                <div>
                  <h2 className="text-lg font-semibold mb-1 text-[#0077aa]">{place.name}</h2>
                  {place.description && (
                    <p className="text-[#005f8a] text-sm line-clamp-2">{place.description}</p>
                  )}
                  <Link
                    to="/explore"
                    className="inline-block mt-4 text-[#00aaff] font-medium hover:text-[#0077aa] transition"
                  >
                    View More →
                  </Link>
                </div>

                <span className="absolute top-3 left-3 px-3 py-1 bg-gradient-to-r from-[#00aaff]/80 to-[#0077aa]/80 text-white text-xs rounded-full shadow-md">
                  WISHLIST
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* STYLES */}
      <style>{`
        .animate-floating {
          animation: floatAnim 15s ease-in-out infinite;
        }
        @keyframes floatAnim {
          0%,100%{ transform: translateY(0) translateX(0);}
          25%{ transform: translateY(-15px) translateX(10px);}
          50%{ transform: translateY(10px) translateX(-10px);}
          75%{ transform: translateY(-5px) translateX(5px);}
        }
        .animate-gradient-text{
          background-size: 200% 200%;
          animation: gradientShift 5s ease infinite;
        }
        @keyframes gradientShift{
          0%{background-position:0% 50%;}
          50%{background-position:100% 50%;}
          100%{background-position:0% 50%;}
        }
      `}</style>
    </div>
  );
}