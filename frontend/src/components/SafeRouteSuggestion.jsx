import React from "react";
import { Navigation, AlertTriangle, CheckCircle, MapPinned } from "lucide-react";

function SafeRouteSuggestion({ selectedPlace }) {
  if (!selectedPlace) {
    return (
      <div className="max-w-5xl mx-auto mt-6 bg-white/90 rounded-3xl shadow-lg p-6 border border-white">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 rounded-full bg-blue-100 text-blue-600">
            <Navigation size={24} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            Smart Route Suggestion
          </h2>
        </div>

        <p className="text-gray-600">
          Select any crowd marker on the map to get safe route guidance.
        </p>
      </div>
    );
  }

  const getRiskStyle = (crowd) => {
    if (crowd === "Danger") {
      return {
        bg: "bg-red-50",
        border: "border-red-300",
        text: "text-red-700",
        icon: <AlertTriangle size={26} />,
        title: "Avoid This Route",
        message:
          "This area is highly crowded. Movement may be slow or restricted. Choose an alternate route immediately.",
      };
    }

    if (crowd === "High") {
      return {
        bg: "bg-orange-50",
        border: "border-orange-300",
        text: "text-orange-700",
        icon: <AlertTriangle size={26} />,
        title: "Use With Caution",
        message:
          "This route has heavy crowd. Visit only if necessary and avoid peak time.",
      };
    }

    if (crowd === "Medium") {
      return {
        bg: "bg-yellow-50",
        border: "border-yellow-300",
        text: "text-yellow-700",
        icon: <MapPinned size={26} />,
        title: "Moderate Crowd Route",
        message:
          "This route is manageable, but keep extra time for walking and waiting.",
      };
    }

    return {
      bg: "bg-green-50",
      border: "border-green-300",
      text: "text-green-700",
      icon: <CheckCircle size={26} />,
      title: "Safe Route",
      message:
        "This location has low crowd. It is currently safer compared to crowded zones.",
    };
  };

  const risk = getRiskStyle(selectedPlace.crowd);

  return (
    <div
      className={`max-w-5xl mx-auto mt-6 rounded-3xl shadow-xl p-6 border ${risk.bg} ${risk.border}`}
    >
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">
        <div className="min-w-0">
          <div className={`flex items-center gap-3 mb-3 ${risk.text}`}>
            {risk.icon}
            <h2 className="text-2xl font-extrabold">{risk.title}</h2>
          </div>

          <p className="text-gray-800 font-semibold text-lg break-words">
            Selected Place: {selectedPlace.name}
          </p>

          <p className={`font-bold mt-1 ${risk.text}`}>
            Crowd Level: {selectedPlace.crowd}
          </p>

          <p className="text-gray-700 mt-3">{risk.message}</p>

          {(selectedPlace.crowd === "Danger" ||
            selectedPlace.crowd === "High") && (
            <div className="mt-4 bg-white/80 p-4 rounded-2xl text-sm text-gray-700">
              <b>Recommended action:</b> Avoid direct route through this zone.
              Prefer wider roads, less crowded areas, and visit during early
              morning hours.
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3 w-full xl:w-[210px] shrink-0">
          <button
            onClick={() => (window.location.href = "/trip-planner")}
            className="px-5 py-3 rounded-full bg-gradient-to-r from-blue-500 to-amber-400 text-white font-bold shadow hover:scale-105 transition"
          >
            Plan Safer Trip
          </button>

          <button
            onClick={() => (window.location.href = "/map")}
            className="px-5 py-3 rounded-full bg-white text-blue-600 font-bold shadow hover:scale-105 transition"
          >
            Open Route Map
          </button>
        </div>
      </div>
    </div>
  );
}

export default SafeRouteSuggestion;