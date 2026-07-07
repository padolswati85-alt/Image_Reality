import React from "react";

function CrowdAlertBanner({ places }) {
  if (!places || places.length === 0) return null;

  const dangerPlaces = places.filter((p) => p.crowd === "Danger");
  const highPlaces = places.filter((p) => p.crowd === "High");

  let message = "";
  let color = "bg-green-500";

  if (dangerPlaces.length > 0) {
    message = `${dangerPlaces[0].name} is heavily crowded. Avoid visiting now.`;
    color = "bg-red-500";
  } else if (highPlaces.length > 0) {
    message = `${highPlaces[0].name} has high crowd. Plan accordingly.`;
    color = "bg-orange-500";
  } else {
    message = "All places are safe to visit.";
    color = "bg-green-500";
  }

  return (
    <div className={`w-full text-white text-center py-3 font-semibold ${color}`}>
      {message}
    </div>
  );
}

export default CrowdAlertBanner;