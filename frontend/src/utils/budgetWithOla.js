// budgetWithOla.js

// 🚶 Walk: 0/km, 🏍️ Bike: 6/km, 🚗 Car: 12/km
const PER_KM_COST = {
  walk: 0,
  bike: 6,
  car: 12,
};

/**
 * Calculate transport + hotel + food budget
 * @param {Object} params
 * @param {number} params.totalDistance - Total distance in km
 * @param {number} params.days - Number of days
 * @param {number} params.travellers - Number of travellers
 * @param {string} params.travelMode - "walk" | "bike" | "car"
 * @returns {Object} - { travelCost, hotelCost, foodCost, total }
 */
export const calculateBudget = ({ totalDistance, days, travellers, travelMode }) => {
  const travelCost = Math.round(totalDistance * (PER_KM_COST[travelMode] || 0));
  const rooms = Math.ceil(travellers / 2);
  const hotelCost = days > 1 ? (days - 1) * rooms * 1500 : 0; // ₹1500 per room per night
  const foodCost = days * travellers * 500; // ₹500 per traveller per day

  return {
    travelCost,
    hotelCost,
    foodCost,
    total: travelCost + hotelCost + foodCost,
  };
};

/**
 * Simulate Ola fare estimate (just using per-km cost)
 * @param {number} distance - in km
 * @param {string} mode - "car" or "bike"
 * @returns {number} - Estimated fare in rupees
 */
export const fetchOlaEstimate = (distance, mode = "car") => {
  if (!distance || distance <= 0) return 0;
  if (mode !== "car" && mode !== "bike") mode = "car";
  return Math.round(distance * PER_KM_COST[mode]);
};
