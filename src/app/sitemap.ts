/**
 * Sitemap Configuration
 *
 * Dynamic sitemap generation for Rivtor landing pages
 * Helps search engines discover and index all pages
 */

import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://rivtor.com';
  const currentDate = new Date();

  return [
    // Homepage - highest priority, updated weekly
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1,
    },
    // Design Partners page
    {
      url: `${baseUrl}/design-partners`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // How it works section (anchor link on homepage)
    {
      url: `${baseUrl}#how-it-works`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    // Execution Intelligence section (anchor link on homepage)
    {
      url: `${baseUrl}#execution-intelligence`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];
}
