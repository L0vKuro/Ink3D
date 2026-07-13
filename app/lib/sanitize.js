export function sanitize(str) {
  if (typeof str !== "string") return str;
  return str
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;")
    .trim();
}

export function sanitizeObject(obj) {
  const clean = {};
  for (const key in obj) {
    if (typeof obj[key] === "string") {
      clean[key] = sanitize(obj[key]);
    } else if (Array.isArray(obj[key])) {
      clean[key] = obj[key];
    } else {
      clean[key] = obj[key];
    }
  }
  return clean;
}
