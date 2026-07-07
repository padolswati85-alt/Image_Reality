import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";

export default function RouteMap({ points }) {
  if (!points || points.length < 2) return null;

  const path = points.map(p => [p.latitude, p.longitude]);

  return (
    <MapContainer
      center={path[0]}
      zoom={13}
      className="h-96 w-full rounded-xl mt-6"
    >
      <TileLayer
        attribution="© OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Route line */}
      <Polyline positions={path} />

      {/* Markers */}
      {points.map((p, i) => (
        <Marker key={i} position={[p.latitude, p.longitude]}>
          <Popup>{p.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
