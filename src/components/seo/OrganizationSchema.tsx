/**
 * OrganizationSchema Component
 *
 * Purpose: Schema.org Organization markup for brand entity
 * Helps search engines understand the company entity
 *
 * Benefits:
 * - Knowledge graph inclusion
 * - Brand entity recognition
 * - Local business eligibility
 * - Social profile linking
 */

import React from 'react';

interface OrganizationSchemaProps {
  name?: string;
  description?: string;
  url?: string;
  logo?: string;
  sameAs?: string[];
  foundedYear?: string;
  location?: {
    addressLocality?: string;
    addressRegion?: string;
    addressCountry?: string;
  };
}

export default function OrganizationSchema({
  name = 'Rivtor',
  description = 'Execution Intelligence — autonomous execution systems that build companies',
  url = 'https://rivtor.com',
  logo = 'https://rivtor.com/logo.png',
  sameAs = [
    'https://twitter.com/rivtor',
    'https://linkedin.com/company/rivtor'
  ],
  foundedYear = '2024',
  location = {
    addressCountry: 'US'
  }
}: OrganizationSchemaProps) {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    description,
    url,
    logo,
    sameAs,
    foundingDate: foundedYear,
    ...(location && {
      address: {
        '@type': 'PostalAddress',
        addressCountry: location.addressCountry,
        ...(location.addressLocality && { addressLocality: location.addressLocality }),
        ...(location.addressRegion && { addressRegion: location.addressRegion })
      }
    }),
    knowsAbout: [
      'Execution Intelligence',
      'Autonomous Agents',
      'Agentic Systems',
      'AI Execution',
      'Autonomous Business',
      'Goal-Oriented AI'
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
