export default function sitemap() {
  const base = "https://ink3dshop.com";
  const pages = ["", "/teams", "/creators", "/program", "/merch", "/originals", "/about", "/photos", "/apply"];
  return pages.map((p) => ({
    url: base + p,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: p === "" ? 1 : 0.7,
  }));
}
