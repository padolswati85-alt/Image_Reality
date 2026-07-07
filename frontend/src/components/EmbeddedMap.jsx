export default function EmbeddedMap({ origin, destination, waypoints = [] }) {
  if (!origin || !destination) return null;

  const base = "https://www.google.com/maps/embed/v1/directions";
  const key = "YOUR_GOOGLE_MAPS_EMBED_API_KEY"; // ⚠️ REQUIRED

  const params = new URLSearchParams({
    key,
    origin: `${origin.latitude},${origin.longitude}`,
    destination: `${destination.latitude},${destination.longitude}`,
    waypoints: waypoints
      .map(w => `${w.latitude},${w.longitude}`)
      .join("|"),
  });

  return (
    <div className="w-full h-[420px] rounded-2xl overflow-hidden border">
      <iframe
        title="route-map"
        width="100%"
        height="100%"
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={`${base}?${params.toString()}`}
      />
    </div>
  );
}
