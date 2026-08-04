import React from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";

const BACKEND_URL = "https://image-reality.onrender.com";

const getImageUrl = (imagePath) => {
  if (!imagePath) return "https://via.placeholder.com/400x250";

  if (imagePath.startsWith("http")) {
    return imagePath;
  }

  if (imagePath.startsWith("/")) {
    return `${BACKEND_URL}${imagePath}`;
  }

  return `${BACKEND_URL}/${imagePath}`;
};

export default function PlaceCard({ place }) {
  const img = getImageUrl(place.image_url || place.image);

  const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(place.id);

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (wishlisted) {
      removeFromWishlist(place.id);
    } else {
      addToWishlist(place);
    }
  };

  return (
    <Link to={`/places/${place.id}`} className="block relative group">
      <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow hover:shadow-lg transition">
        <div className="relative">
          <img
            src={img}
            alt={place.name}
            className="w-full h-40 object-cover"
            onError={(e) => {
              e.currentTarget.src = "https://via.placeholder.com/400x250";
            }}
          />

          <button
            onClick={handleWishlist}
            className="absolute top-3 right-3 bg-white/90 dark:bg-gray-900 p-2 rounded-full shadow hover:scale-110 transition z-10"
          >
            <Heart
              className={`w-5 h-5 ${
                wishlisted ? "text-red-500 fill-red-500" : "text-gray-400"
              }`}
            />
          </button>
        </div>

        <div className="p-3">
          <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">
            {place.name}
          </h3>
        </div>
      </div>
    </Link>
  );
}