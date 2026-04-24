/**
 * FAQDisplay Component
 *
 * Purpose: User-visible FAQ section with expandable Q&A
 * Provides content for both users and search engines
 *
 * Features:
 * - Editorial list-style accordion (no card boxes)
 * - Mono index numbers, thin horizontal borders
 * - Smooth height + opacity animations
 * - Semantic HTML for accessibility
 * - Pairs with FAQSchema for full SEO coverage
 */

'use client';

import type { JSX } from 'react';
import { useState } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';

interface FAQItemData {
  question: string;
  answer: string;
}

interface FAQDisplayProps {
  questions: FAQItemData[];
  title?: string;
  subtitle?: string;
  maxItems?: number;
}

export default function FAQDisplay({
  questions,
  title = 'Questions',
  subtitle = 'What founders ask before they delegate.',
  maxItems,
}: FAQDisplayProps): JSX.Element {
  const displayQuestions = maxItems ? questions.slice(0, maxItems) : questions;

  return (
    <section className="rv-faq-v4" aria-labelledby="faq-title">
      {/* Top divider */}
      <div className="rv-faq-v4__divider" aria-hidden="true" />

      <div className="rv-container-v4">
        {/* Header */}
        <div className="rv-faq-v4__header">
          <h2 id="faq-title" className="rv-faq-v4__title">
            {title}
          </h2>
          {subtitle && <p className="rv-faq-v4__subtitle">{subtitle}</p>}
        </div>

        {/* FAQ List */}
        <div className="rv-faq-v4__list" role="list">
          {displayQuestions.map((faq, index) => (
            <FAQItem key={index} faq={faq} index={index} />
          ))}
        </div>

        {/* Hidden structured data for LLMs */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: displayQuestions.map((faq) => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: faq.answer.replace(/<[^>]*>/g, ''),
                },
              })),
            }),
          }}
        />
      </div>
    </section>
  );
}

function FAQItem({
  faq,
  index,
}: {
  faq: FAQItemData;
  index: number;
}): JSX.Element {
  const prefersReducedMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const num = String(index + 1).padStart(2, '0');

  return (
    <div className="rv-faq-v4__item" role="listitem">
      <button
        className="rv-faq-v4__trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
      >
        <span className="rv-faq-v4__index" aria-hidden="true">
          {num}
        </span>
        <span className="rv-faq-v4__question">{faq.question}</span>
        <motion.span
          className="rv-faq-v4__chevron"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.25 }}
          aria-hidden="true"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-answer-${index}`}
            className="rv-faq-v4__answer-wrap"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: {
                duration: prefersReducedMotion ? 0 : 0.35,
                ease: [0.22, 1, 0.36, 1],
              },
              opacity: {
                duration: prefersReducedMotion ? 0 : 0.25,
                delay: prefersReducedMotion ? 0 : 0.05,
              },
            }}
          >
            <div
              className="rv-faq-v4__answer"
              dangerouslySetInnerHTML={{ __html: faq.answer }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
