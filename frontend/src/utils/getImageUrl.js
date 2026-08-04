const BACKEND_URL = "https://image-reality.onrender.com";

export function getImageUrl(imagePath) {
  if (!imagePath) return "/placeholder.jpg";

  if (imagePath.startsWith("http")) {
    return imagePath;
  }

  if (imagePath.startsWith("/")) {
    return `${BACKEND_URL}${imagePath}`;
  }

  return `${BACKEND_URL}/${imagePath}`;
}