// src/utils/budgetWithFixedRates.js

const PER_KM_COST = {
  walk: 0,
  bike: 6,   // bike per km
  car: 12,   // car per km
};

export const calculateBudget = ({ totalDistance, days, travellers, travelMode }) => {
  // Calculate travel cost based on distance and transport type
  const travelCost = Math.round(totalDistance * (PER_KM_COST[travelMode] || 0));

  // Hotel cost: assume 2 travellers per room, ₹1500 per night
  const rooms = Math.ceil(travellers / 2);
  const hotelCost = days > 1 ? (days - 1) * rooms * 1500 : 0;

  // Food cost: ₹500 per traveller per day
  const foodCost = days * travellers * 500;

  return {
    travelCost,
    hotelCost,
    foodCost,
    total: travelCost + hotelCost + foodCost,
  };
};
