/**
 * HowToSchema Component
 *
 * Purpose: Generate Schema.org HowTo markup for search engines
 * Invisible to users, visible to crawlers
 *
 * Benefits:
 * - Google shows rich snippets for HowTo content
 * - Increases SERP real estate
 * - Positions entity as solution-provider
 * - Enables voice search compatibility
 */

import React from 'react';

interface HowToStep {
  name: string;
  text: string;
  url?: string;
}

interface HowToSchemaProps {
  name: string;
  description: string;
  steps: HowToStep[];
  totalTime?: string;
}

export default function HowToSchema({
  name,
  description,
  steps,
  totalTime = 'PT5M'
}: HowToSchemaProps) {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    totalTime,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.url && { url: step.url })
    }))
  };

  // This component only renders the schema markup
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemaData)
      }}
    />
  );
}

/**
 * Hook for components to use HowToSchema data
 */
export function useHowToSchema(name: string, description: string, steps: HowToStep[]) {
  return { name, description, steps };
}
