import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Guidr: Guided tours and activities in Namibia",
    short_name: "Guidr",
    description:
      "Discover and request guided tours across Namibia. Curated local operators, honest prices, WhatsApp-first booking.",
    start_url: "/",
    display: "browser",
    background_color: "#ECEAE6",
    theme_color: "#C4552D",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
