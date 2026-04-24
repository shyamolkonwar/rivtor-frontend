'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import type { JSX } from 'react';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const BEFORE_ITEMS = [
  { text: 'Assign tasks', icon: '✗' },
  { text: 'Chase status', icon: '✗' },
  { text: 'Follow up', icon: '✗' },
];

const AFTER_ITEMS = [
  { text: 'Set the goal', highlight: false },
  { text: 'Work gets done', highlight: true },
];

/* ------------------------------------------------------------------ */
/*  Main Section                                                       */
/* ------------------------------------------------------------------ */

export default function FutureSection(): JSX.Element {
  const prefersReducedMotion = useReducedMotion();
  const [hoveredSide, setHoveredSide] = useState<'before' | 'after' | null>(null);

  return (
    <section
      id="vision"
      className="rv-section-v4"
      aria-labelledby="future-title"
      style={{
        paddingTop: 'clamp(80px, 10vw, 120px)',
        paddingBottom: 'clamp(80px, 10vw, 120px)',
      }}
    >
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
            id="future-title"
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
            The way work gets done is changing.
          </h2>
          <p
            style={{
              fontSize: 'clamp(16px, 1.8vw, 18px)',
              fontWeight: 400,
              color: 'rgba(255, 255, 255, 0.5)',
              maxWidth: '480px',
              margin: '0 auto',
              lineHeight: 1.5,
              fontFamily: 'var(--font-body)',
            }}
          >
            From managing every step to setting the goal and moving on.
          </p>
        </motion.div>

        {/* Cards Container - CSS Grid responsive */}
        <div
          className="rv-future-comparison-grid"
          style={{
            maxWidth: '900px',
            margin: '0 auto',
          }}
        >
          {/* BEFORE CARD */}
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.6,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            onMouseEnter={() => setHoveredSide('before')}
            onMouseLeave={() => setHoveredSide(null)}
            style={{
              padding: 'clamp(20px, 5vw, 32px)',
              borderRadius: '14px',
              background: 'rgba(255, 255, 255, 0.015)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              transition: 'all 0.25s ease',
              opacity: hoveredSide === 'after' ? 0.35 : 1,
            }}
          >
            <div
              style={{
                fontSize: '12px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'rgba(255, 255, 255, 0.3)',
              }}
            >
              Before Rivtor
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {BEFORE_ITEMS.map((item) => (
                <div
                  key={item.text}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.04)',
                  }}
                >
                  <span style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.2)', fontWeight: 500 }}>
                    {item.icon}
                  </span>
                  <span
                    style={{
                      fontSize: '15px',
                      color: 'rgba(255, 255, 255, 0.45)',
                      textDecoration: 'line-through',
                      textDecorationColor: 'rgba(255, 255, 255, 0.15)',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    {item.text}
                  </span>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: 'auto',
                paddingTop: '20px',
                borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                fontSize: '14px',
                fontWeight: 500,
                color: 'rgba(255, 255, 255, 0.35)',
                fontFamily: 'var(--font-body)',
              }}
            >
              Execution is your job.
            </div>
          </motion.div>

          {/* AFTER CARD */}
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.6,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            onMouseEnter={() => setHoveredSide('after')}
            onMouseLeave={() => setHoveredSide(null)}
            style={{
              padding: 'clamp(20px, 5vw, 32px)',
              borderRadius: '14px',
              background: 'rgba(255, 255, 255, 0.035)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              transition: 'all 0.25s ease',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
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

            <div
              style={{
                fontSize: '12px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'rgba(255, 255, 255, 0.6)',
              }}
            >
              With Rivtor
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {AFTER_ITEMS.map((item) => (
                <div
                  key={item.text}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '14px 18px',
                    borderRadius: '8px',
                    background: item.highlight ? 'rgba(255, 255, 255, 0.06)' : 'rgba(255, 255, 255, 0.02)',
                    border: item.highlight ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(255, 255, 255, 0.04)',
                  }}
                >
                  <span style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.5)', fontWeight: 600 }}>
                    {item.highlight ? '✓' : '→'}
                  </span>
                  <span
                    style={{
                      fontSize: '15px',
                      color: item.highlight ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.7)',
                      fontWeight: item.highlight ? 600 : 400,
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    {item.text}
                  </span>
                </div>
              ))}
            </div>

            <div
              style={{
                padding: '12px 16px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
              }}
            >
              <p
                style={{
                  fontSize: '14px',
                  color: 'rgba(255, 255, 255, 0.5)',
                  margin: 0,
                  lineHeight: 1.5,
                  fontFamily: 'var(--font-body)',
                }}
              >
                No chasing. No follow-ups. Just results.
              </p>
            </div>

            <div
              style={{
                marginTop: 'auto',
                paddingTop: '20px',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                fontSize: '14px',
                fontWeight: 600,
                color: 'rgba(255, 255, 255, 0.7)',
                fontFamily: 'var(--font-body)',
              }}
            >
              Execution is handled.
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
