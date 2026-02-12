import { MetadataRoute } from 'next';
import { SERVICES_DATA } from '@/lib/services-data';
import { VEHICLE_MAKES } from '@/lib/vehicle-makes-data';
import { BLOG_POSTS } from '@/lib/constants';

const baseUrl = 'https://powerworksgarage.com';

// Use a fixed date for lastModified so Google treats it as a real signal
// Update this date when content actually changes
const LAST_CONTENT_UPDATE = '2026-02-12';

export default function sitemap(): MetadataRoute.Sitemap {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ask-glenn`,
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/car-servicing-dubai`,
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/fleet-service-dubai`,
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/reviews`,
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/makes`,
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  // Vehicle make pages (e.g., /makes/bmw)
  const makePages: MetadataRoute.Sitemap = VEHICLE_MAKES.map((make) => ({
    url: `${baseUrl}/makes/${make.slug}`,
    lastModified: LAST_CONTENT_UPDATE,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Service pages (e.g., /car-servicing-dubai/car-service-dubai)
  const servicePages: MetadataRoute.Sitemap = SERVICES_DATA.map((service) => ({
    url: `${baseUrl}/car-servicing-dubai/${service.slug}`,
    lastModified: LAST_CONTENT_UPDATE,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Service + Make combination pages (e.g., /car-servicing-dubai/car-service-dubai/bmw)
  const serviceMakePages: MetadataRoute.Sitemap = SERVICES_DATA.flatMap((service) =>
    VEHICLE_MAKES.map((make) => ({
      url: `${baseUrl}/car-servicing-dubai/${service.slug}/${make.slug}`,
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  );

  // Blog posts (Ask Glenn articles)
  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/ask-glenn/${post.slug}`,
    lastModified: LAST_CONTENT_UPDATE,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...makePages,
    ...servicePages,
    ...serviceMakePages,
    ...blogPages,
  ];
}
