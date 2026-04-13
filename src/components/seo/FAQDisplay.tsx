/**
 * FAQDisplay Component
 *
 * Purpose: User-visible FAQ section with expandable Q&A
 * Provides content for both users and search engines
 *
 * Features:
 * - Accordion-style expandable answers
 * - Smooth animations
 * - Semantic HTML for accessibility
 * - Pairs with FAQSchema for full SEO coverage
 */

'use client';

import type { JSX, ReactNode } from 'react';
import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQDisplayProps {
  questions: FAQItem[];
  title?: string;
  subtitle?: string;
  className?: string;
  maxItems?: number;
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

function Reveal({ children, className = '', delay = 0 }: RevealProps): JSX.Element {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.6,
        delay: prefersReducedMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

export default function FAQDisplay({
  questions,
  title = 'Frequently Asked Questions',
  subtitle,
  className = '',
  maxItems
}: FAQDisplayProps) {
  const displayQuestions = maxItems ? questions.slice(0, maxItems) : questions;

  return (
    <section className={`rv-section-v4 ${className}`}>
      <div className="rv-container-v4">
        {/* Section header */}
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2
              className="rv-h2-v4 rv-h2-v4--centered"
              style={{
                fontSize: '40px',
                fontWeight: 600,
                lineHeight: '1.2',
                letterSpacing: '-1%',
                color: 'var(--rv-text-primary)',
                marginBottom: '16px',
                fontFamily: 'var(--font-headline)',
              }}
            >
              {title}
            </h2>
            {subtitle && (
              <p
                style={{
                  fontSize: '18px',
                  lineHeight: '28px',
                  color: 'rgba(255, 255, 255, 0.6)',
                  margin: 0,
                  fontFamily: 'var(--font-body)',
                }}
              >
                {subtitle}
              </p>
            )}
          </div>
        </Reveal>

        {/* FAQ items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
              mainEntity: displayQuestions.map(faq => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: faq.answer.replace(/<[^>]*>/g, '') // Strip HTML for schema
                }
              }))
            })
          }}
        />
      </div>
    </section>
  );
}

function FAQItem({ faq, index }: { faq: FAQItem; index: number }) {
  const prefersReducedMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Reveal delay={index * 0.05}>
      <motion.div
        style={{
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          borderRadius: '12px',
          overflow: 'hidden',
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            width: '100%',
            padding: '20px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            textAlign: 'left',
            fontFamily: 'var(--font-body)',
          }}
          aria-expanded={isOpen}
        >
          <span
            style={{
              fontSize: '18px',
              fontWeight: 500,
              color: 'var(--rv-text-primary)',
              paddingRight: '16px',
              letterSpacing: '-0.3%',
              lineHeight: '1.4',
            }}
          >
            {faq.question}
          </span>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              color: 'rgba(255, 255, 255, 0.4)',
            }}
          >
            <svg
              width="20"
              height="20"
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

        <motion.div
          initial={false}
          animate={{
            height: isOpen ? 'auto' : 0,
            opacity: isOpen ? 1 : 0,
          }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.3,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              padding: '0 24px 24px 24px',
            }}
          >
            <div
              style={{
                fontSize: '16px',
                lineHeight: '1.6',
                color: 'rgba(255, 255, 255, 0.7)',
                fontFamily: 'var(--font-body)',
              }}
              dangerouslySetInnerHTML={{ __html: faq.answer }}
            />
          </div>
        </motion.div>
      </motion.div>
    </Reveal>
  );
}
