const BACKEND_URL = "http://127.0.0.1:8000";

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