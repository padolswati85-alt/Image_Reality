import React from "react";

function CrowdAlertPanel({ place, onClose }) {
  if (!place) return null;

  const getColor = (crowd) => {
    if (crowd === "Low") return "text-green-600";
    if (crowd === "Medium") return "text-yellow-500";
    if (crowd === "High") return "text-orange-500";
    if (crowd === "Danger") return "text-red-600";
    return "text-blue-500";
  };

  const getAdvice = (crowd) => {
    if (crowd === "Low") {
      return "Safe to visit. Crowd is manageable.";
    }

    if (crowd === "Medium") {
      return "Moderate crowd. Plan your visit with some buffer time.";
    }

    if (crowd === "High") {
      return "Crowded area. Expect waiting time and slow movement.";
    }

    if (crowd === "Danger") {
      return "High risk crowd. Movement may be restricted. Choose alternate route immediately.";
    }

    return "Crowd information is currently unavailable.";
  };

  const getBestTime = (crowd) => {
    if (crowd === "Low") return "Anytime";
    if (crowd === "Medium") return "Morning / Evening";
    if (crowd === "High") return "Early Morning";
    if (crowd === "Danger") return "Avoid today";
    return "Not available";
  };

  return (
    <div className="fixed top-0 right-0 h-full w-full sm:w-[380px] bg-white shadow-2xl z-[10000] p-5 overflow-y-auto">
      <button onClick={onClose} className="mb-4 text-red-500 font-bold">
        Close ✕
      </button>

      {(place.image_url || place.image) && (
        <img
          src={place.image_url || place.image}
          alt={place.name}
          className="w-full h-40 object-cover rounded-xl mb-4"
        />
      )}

      <h2 className="text-2xl font-bold text-gray-900 mb-2">{place.name}</h2>

      <p className="text-sm text-gray-600 mb-3">
        Zone: <b>{place.zone}</b>
      </p>

      <p className={`font-bold text-xl mb-3 ${getColor(place.crowd)}`}>
        Crowd: {place.crowd}
      </p>

      <p className="mb-4 text-gray-700 leading-relaxed">
        {getAdvice(place.crowd)}
      </p>

      <div className="bg-blue-50 p-4 rounded-xl mb-4">
        <p className="text-sm font-bold text-gray-800">Best Time:</p>
        <p className="text-sm text-gray-700">{getBestTime(place.crowd)}</p>
      </div>

      <button
        onClick={() => (window.location.href = "/trip-planner")}
        className="w-full py-3 rounded-full bg-gradient-to-r from-blue-500 to-amber-400 text-white font-bold hover:scale-105 transition mb-4"
      >
        Find Safer Route
      </button>

      {place.description && (
        <p className="text-sm text-gray-600 leading-relaxed">
          {place.description}
        </p>
      )}
    </div>
  );
}

export default CrowdAlertPanel;