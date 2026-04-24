'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import type { JSX } from 'react';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type Category = {
  label: string;
  headline: string;
  description: string;
  items: string[];
  tagline: string;
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const CATEGORIES: Category[] = [
  {
    label: 'Software',
    headline: 'Helps you work',
    description: 'Interfaces, dashboards, manual input',
    items: ['You navigate menus', 'You fill out forms', 'You check dashboards'],
    tagline: 'You do the work',
  },
  {
    label: 'Tools',
    headline: 'Help you build',
    description: 'APIs, workflows, integrations',
    items: ['You wire up APIs', 'You configure workflows', 'You manage integrations'],
    tagline: 'You manage the complexity',
  },
  {
    label: 'Rivtor',
    headline: 'Gets it done',
    description: 'Plans, drives, and finishes the work',
    items: ['You set the goal', 'Rivtor owns execution', 'Work gets finished'],
    tagline: 'Not a tool. An owner.',
  },
];

/* ------------------------------------------------------------------ */
/*  Components                                                         */
/* ------------------------------------------------------------------ */

function CategoryCard({
  category,
  index,
  isHovered,
  onHover,
}: {
  category: Category;
  index: number;
  isHovered: boolean;
  onHover: (idx: number | null) => void;
}): JSX.Element {
  const prefersReducedMotion = useReducedMotion();
  const isRivtor = category.label === 'Rivtor';

  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.6,
        delay: prefersReducedMotion ? 0 : index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      style={{
        flex: '1 1 0',
        minWidth: '240px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        padding: '28px',
        borderRadius: '14px',
        border: isRivtor
          ? '1px solid rgba(255, 255, 255, 0.12)'
          : isHovered
            ? '1px solid rgba(255, 255, 255, 0.1)'
            : '1px solid rgba(255, 255, 255, 0.06)',
        background: isRivtor
          ? 'rgba(255, 255, 255, 0.04)'
          : isHovered
            ? 'rgba(255, 255, 255, 0.025)'
            : 'rgba(255, 255, 255, 0.01)',
        transition: 'all 0.25s ease',
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle top accent for Rivtor */}
      {isRivtor && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent)',
          }}
        />
      )}

      {/* Label */}
      <div
        style={{
          fontSize: '12px',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: isRivtor ? 'rgba(255, 255, 255, 0.6)' : 'rgba(255, 255, 255, 0.3)',
        }}
      >
        {category.label}
      </div>

      {/* Headline */}
      <h3
        style={{
          fontSize: '22px',
          fontWeight: 600,
          color: isRivtor ? '#FFFFFF' : isHovered ? 'rgba(255, 255, 255, 0.85)' : 'rgba(255, 255, 255, 0.7)',
          margin: 0,
          fontFamily: 'var(--font-headline)',
          letterSpacing: '-0.01em',
          lineHeight: 1.2,
          transition: 'color 0.2s ease',
        }}
      >
        {category.headline}
      </h3>

      {/* Description */}
      <p
        style={{
          fontSize: '14px',
          color: 'rgba(255, 255, 255, 0.4)',
          margin: 0,
          lineHeight: 1.5,
          fontFamily: 'var(--font-body)',
        }}
      >
        {category.description}
      </p>

      {/* Item List */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          marginTop: '4px',
        }}
      >
        {category.items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.4,
              delay: prefersReducedMotion ? 0 : index * 0.12 + 0.2 + i * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '14px',
              color: isRivtor ? 'rgba(255, 255, 255, 0.7)' : 'rgba(255, 255, 255, 0.45)',
            }}
          >
            <span
              style={{
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                background: isRivtor ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.2)',
                flexShrink: 0,
              }}
            />
            {item}
          </motion.div>
        ))}
      </div>

      {/* Tagline */}
      <div
        style={{
          marginTop: 'auto',
          paddingTop: '16px',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          fontSize: '13px',
          fontWeight: 500,
          color: isRivtor ? 'rgba(255, 255, 255, 0.7)' : 'rgba(255, 255, 255, 0.3)',
          fontFamily: 'var(--font-body)',
        }}
      >
        {category.tagline}
      </div>
    </motion.div>
  );
}

function ArrowConnector({ index }: { index: number }): JSX.Element {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.4,
        delay: prefersReducedMotion ? 0 : 0.3 + index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="hidden md:flex"
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        width: '40px',
        alignSelf: 'center',
      }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M5 12H19M19 12L13 6M19 12L13 18"
          stroke="rgba(255, 255, 255, 0.15)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Section                                                       */
/* ------------------------------------------------------------------ */

export default function CategorySection(): JSX.Element {
  const prefersReducedMotion = useReducedMotion();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="rv-section-v4 rv-category-section" aria-labelledby="category-title" style={{ paddingTop: 'clamp(80px, 10vw, 120px)', paddingBottom: 'clamp(80px, 10vw, 120px)' }}>
      <div className="rv-container-v4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ textAlign: 'center', marginBottom: '64px' }}
        >
          <h2
            id="category-title"
            style={{
              fontSize: 'clamp(28px, 3.5vw, 36px)',
              fontWeight: 600,
              letterSpacing: '-0.01em',
              lineHeight: 1.2,
              color: '#FFFFFF',
              margin: '0 0 16px 0',
              fontFamily: 'var(--font-headline)',
            }}
          >
            Tools help you work. Rivtor gets it done.
          </h2>
          <p
            style={{
              fontSize: 'clamp(16px, 1.8vw, 18px)',
              fontWeight: 400,
              color: 'rgba(255, 255, 255, 0.5)',
              maxWidth: '520px',
              margin: '0 auto',
              lineHeight: 1.5,
              fontFamily: 'var(--font-body)',
            }}
          >
            The difference between tools that assist and a system that owns.
          </p>
        </motion.div>

        {/* Cards with Arrows */}
        <div className="rv-category-comparison">
          {CATEGORIES.map((category, index) => (
            <div key={category.label} className="rv-category-comparison-item">
              <CategoryCard
                category={category}
                index={index}
                isHovered={hoveredIndex === index}
                onHover={setHoveredIndex}
              />
              {index < CATEGORIES.length - 1 && <ArrowConnector index={index} />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
