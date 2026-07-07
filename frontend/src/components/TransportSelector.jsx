export default function TransportSelector({ mode, setMode }) {
  const MODES = [
    { id: "walk", label: "🚶 Walk", cost: 2 },
    { id: "auto", label: "🛺 Auto", cost: 8 },
    { id: "car", label: "🚗 Car", cost: 12 },
  ];

  return (
    <div className="flex gap-3 justify-center">
      {MODES.map(m => (
        <button
          key={m.id}
          onClick={() => setMode(m)}
          className={`px-5 py-2 rounded-full border ${
            mode.id === m.id
              ? "bg-blue-600 text-white"
              : "bg-white"
          }`}
        >
          {m.label}
        </button>
      ))}
    </div>
  );
}
