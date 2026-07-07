import React from "react";
import { X, Siren, Hospital, Shield, Search, Droplets } from "lucide-react";

// Add coordinates to each center
const emergencyCenters = [
  {
    type: "Police",
    name: "Panchavati Police",
    lat: 20.007,
    lng: 73.793,
    contact: "100",
    icon: <Shield />,
  },
  {
    type: "Medical",
    name: "Kumbh Medical Camp",
    lat: 20.006,
    lng: 73.792,
    contact: "108",
    icon: <Hospital />,
  },
  {
    type: "Lost & Found",
    name: "Ramkund Center",
    lat: 20.008,
    lng: 73.791,
    contact: "1091",
    icon: <Search />,
  },
  {
    type: "Water",
    name: "Rest Area",
    lat: 20.009,
    lng: 73.790,
    contact: "Available",
    icon: <Droplets />,
  },
];

// Distance formula
const getDistance = (lat1, lng1, lat2, lng2) => {
  return Math.sqrt(
    Math.pow(lat1 - lat2, 2) + Math.pow(lng1 - lng2, 2)
  );
};

function EmergencyHelpPanel({ open, onClose, selectedPlace }) {
  if (!open) return null;

  let sortedCenters = emergencyCenters;

  if (selectedPlace) {
    sortedCenters = [...emergencyCenters].sort((a, b) => {
      const d1 = getDistance(selectedPlace.lat, selectedPlace.lng, a.lat, a.lng);
      const d2 = getDistance(selectedPlace.lat, selectedPlace.lng, b.lat, b.lng);
      return d1 - d2;
    });
  }

  return (
    <div className="fixed inset-0 z-[10000] bg-black/40 flex justify-end">
      <div className="w-[350px] bg-white h-full p-5 shadow-2xl overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold flex items-center gap-2 text-red-600">
            <Siren /> Emergency Help
          </h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {selectedPlace && (
          <p className="mb-4 text-sm text-gray-600">
            Showing nearest help for: <b>{selectedPlace.name}</b>
          </p>
        )}

        <div className="space-y-3">
          {sortedCenters.map((c, i) => (
            <div
              key={i}
              className="border p-3 rounded-xl flex gap-3 items-center shadow-sm"
            >
              <div className="text-blue-500">{c.icon}</div>

              <div className="flex-1">
                <p className="font-semibold">{c.name}</p>
                <p className="text-sm text-gray-600">{c.type}</p>
                <p className="text-sm">
                  Contact: <b>{c.contact}</b>
                </p>
              </div>

              <button className="text-sm px-3 py-1 bg-blue-500 text-white rounded-full">
                Call
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EmergencyHelpPanel;