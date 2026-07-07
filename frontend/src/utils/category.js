// src/utils/category.js

export const detectCategory = (place) => {
  const n = place.name.toLowerCase();

  if (n.includes("temple")) return "temple";
  if (n.includes("fort")) return "fort";
  if (n.includes("water park")) return "waterpark";
  if (n.includes("theme")) return "themepark";
  if (n.includes("misal")) return "misal";
  if (n.includes("hill")) return "hills";
  if (n.includes("lake")) return "lake";
  if (n.includes("museum")) return "museum";
  if (n.includes("sanctuary")) return "sanctuary";
  if (n.includes("vineyard") || n.includes("wine")) return "vineyard";
  if (n.includes("waterfall")) return "waterfall";
  if (n.includes("view") || n.includes("point")) return "scenic";

  return "historical";
};
