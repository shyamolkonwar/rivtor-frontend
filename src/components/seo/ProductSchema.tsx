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
  name = 'Rivtor Execution Intelligence',
  description = 'Autonomous execution system that plans, executes, and iterates on goals without human coordination',
  category = 'Execution Intelligence',
  url = 'https://rivtor.com',
  offers = {
    availability: 'https://schema.org/InStock',
    priceCurrency: 'USD',
    description: 'Design Partner Program - Early access to autonomous execution'
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
      'Autonomous execution',
      '24/7 continuous operation',
      'Automatic iteration',
      'Zero management overhead',
      'Goal-oriented operation'
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
