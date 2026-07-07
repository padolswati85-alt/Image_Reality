export default function BudgetHint({
  totalDistance,
  days,
  travellers,
  transportMode,
  budget,
  budgetRange = { min: 0, max: Infinity } // ✅ DEFAULT
}) {
  if (!budget) return null;

  const withinRange =
    budget >= budgetRange.min && budget <= budgetRange.max;

  return (
    <div className="mt-6 p-6 rounded-2xl bg-[#FBF0F4] text-[#2B2B2B] shadow">
      <h4 className="text-lg font-bold mb-2">💡 Budget Insight</h4>

      <p className="text-sm mb-1">
        • Total Distance: {totalDistance.toFixed(2)} km
      </p>
      <p className="text-sm mb-1">
        • Days: {days} | Travellers: {travellers}
      </p>
      <p className="text-sm mb-3">
        • Transport: {transportMode.label}
      </p>

      {withinRange ? (
        <p className="text-green-700 font-semibold">
          ✅ Your trip fits the selected budget range.
        </p>
      ) : (
        <p className="text-red-600 font-semibold">
          ⚠️ Budget may exceed your preferred range.
        </p>
      )}
    </div>
  );
}


