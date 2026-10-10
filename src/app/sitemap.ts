import type { MetadataRoute } from "next";
import { getAllDestinations, getAllExperiences } from "@/lib/data";

const BASE = "https://getguidr.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [destinations, experiences] = await Promise.all([
    getAllDestinations(),
    getAllExperiences(),
  ]);

  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/experiences`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/destinations`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/planner`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/how-it-works`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${BASE}/for-operators`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${BASE}/brand`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/legal`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE}/legal/cancellation`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/legal/operator-agreement`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const destinationRoutes: MetadataRoute.Sitemap = destinations.map((d) => ({
    url: `${BASE}/destinations/${d.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const experienceRoutes: MetadataRoute.Sitemap = experiences.map((e) => ({
    url: `${BASE}/experiences/${e.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...destinationRoutes, ...experienceRoutes];
}
