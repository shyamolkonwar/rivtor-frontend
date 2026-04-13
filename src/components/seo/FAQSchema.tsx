/**
 * FAQSchema Component
 *
 * Purpose: Generate Schema.org FAQPage markup for search engines
 * Invisible to users, visible to crawlers
 *
 * Benefits:
 * - FAQs appear as expandable rich results in Google
 * - Targets long-tail queries
 * - Reduces bounce rate by preemptively answering questions
 * - LLMs use FAQs to answer user questions
 */

import React from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  questions: FAQItem[];
}

export default function FAQSchema({ questions }: FAQSchemaProps) {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
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
