// components/RouteMapOSRM.jsx
import { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";

function Routing({ points }) {
  const map = useMap();

  useEffect(() => {
    if (!points || points.length < 2) return;

    const waypoints = points.map(p => L.latLng(p.latitude, p.longitude));

    const control = L.Routing.control({
      waypoints,
      lineOptions: { styles: [{ color: "#8F0D4E", weight: 5 }] },
      router: L.Routing.osrmv1({
        serviceUrl: "https://router.project-osrm.org/route/v1",
      }),
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      showAlternatives: false,
    }).addTo(map);

    return () => map.removeControl(control);
  }, [points, map]);

  return null;
}

export default function RouteMapOSRM({ points }) {
  const center =
    points?.length > 0
      ? [points[0].latitude, points[0].longitude]
      : [19.9975, 73.7898];

  return (
    <MapContainer center={center} zoom={13} className="h-96 w-full rounded-xl mt-6">
      <TileLayer
        attribution="© OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Routing points={points} />
    </MapContainer>
  );
}
