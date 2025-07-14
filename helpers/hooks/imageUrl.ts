export function getImageUrl(image?: string | null): string {
  // Check if not a string or empty string
  if (typeof image !== "string" || !image.trim()) {
    // You can return an empty string or a fallback image
    return "https://www.ss.mastersclinics.com/public/uploads/default.jpg";
  }

  if (/^https?:\/\//.test(image)) return image;

  if (image.startsWith("/public") || image.startsWith("/uploads")) {
    console.log(`Image URL: https://www.ss.mastersclinics.com${image}`);
    return `https://www.ss.mastersclinics.com${image}`;
  }

  return `https://www.ss.mastersclinics.com/public/uploads/${image}`;
}
