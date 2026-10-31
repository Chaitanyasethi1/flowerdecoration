import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { occasionsData } from "@/data/occasions";
import { decorationsData } from "@/data/decorations";
import { blogsData } from "@/data/blogs";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/decorations/all",
    "/gallery",
    "/offers",
    "/custom-quote",
    "/corporate",
    "/wedding",
    "/about",
    "/contact",
    "/faq",
    "/policies",
    "/blog",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: route === "" ? 1.0 : 0.8,
  }));

  const occasionRoutes: MetadataRoute.Sitemap = occasionsData.map((occ) => ({
    url: `${baseUrl}/decorations/${occ.slug}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.9,
  }));

  const decorationRoutes: MetadataRoute.Sitemap = decorationsData.map((dec) => ({
    url: `${baseUrl}/decoration/${dec.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogsData.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...occasionRoutes, ...decorationRoutes, ...blogRoutes];
}
