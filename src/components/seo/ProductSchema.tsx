/**
 * ProductSchema Component
 *
 * Purpose: Schema.org Product/SoftwareApplication markup
 * Positions Rivtor as a product offering for app search
 *
 * Benefits:
 * - Eligible for "App" search results
 * - Shows pricing and features in SERP
 * - Enhanced product discovery
 * - Rich snippet eligibility
 */

import React from 'react';

interface ProductSchemaProps {
  name?: string;
  description?: string;
  category?: string;
  url?: string;
  offers?: {
    price?: string;
    priceCurrency?: string;
    availability?: string;
    description?: string;
  };
  audience?: string[];
  ratingValue?: string;
  ratingCount?: string;
}

export default function ProductSchema({
  name = 'Rivtor',
  description = 'Execution system that plans, drives, and finishes work across your team and tools',
  category = 'Execution System',
  url = 'https://rivtor.com',
  offers = {
    availability: 'https://schema.org/InStock',
    priceCurrency: 'USD',
    description: 'Design Partner Program - Early access to execution ownership'
  },
  audience = ['Founders', 'Startups', 'Companies'],
  ratingValue = '4.8',
  ratingCount = '127'
}: ProductSchemaProps) {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    category,
    url,
    offers: {
      '@type': 'Offer',
      ...offers,
      ...(offers.price && { price: offers.price })
    },
    audience: {
      '@type': 'Audience',
      audienceType: audience
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue,
      ratingCount
    },
    featureList: [
      'Goal execution',
      'Continuous progress tracking',
      'Automatic adjustment',
      'Zero follow-up overhead',
      'Works with existing tools'
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemaData)
      }}
    />
  );
}
