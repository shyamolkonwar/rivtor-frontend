'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { JSX } from 'react';

const USE_CASES = [
  'Launch a product',
  'Run growth experiments',
  'Manage tasks across tools',
  'Track and act on metrics',
  'Execute workflows end-to-end',
];

export default function LandingUseCasesSection(): JSX.Element {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="what-you-can-do"
      className="relative overflow-hidden"
      aria-labelledby="what-you-can-do-title"
      style={{
        paddingTop: 'clamp(90px, 11vw, 150px)',
        paddingBottom: 'clamp(90px, 11vw, 150px)',
      }}
    >
      <div className="rv-container-v4 relative" style={{ zIndex: 2 }}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 text-center lg:text-left"
          >
            <h2
              id="what-you-can-do-title"
              className="font-semibold text-white"
              style={{
                fontSize: 'clamp(36px, 5vw, 64px)',
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
                margin: '0 0 20px 0',
                fontFamily: 'var(--font-headline)',
              }}
            >
              What you can do.
            </h2>
            <p
              className="font-normal mx-auto lg:mx-0"
              style={{
                fontSize: 'clamp(16px, 1.8vw, 20px)',
                color: 'rgba(255,255,255,0.45)',
                lineHeight: 1.6,
                margin: 0,
                maxWidth: '460px',
                fontFamily: 'var(--font-body)',
              }}
            >
              Give 01 an outcome. It turns the work into execution across your tools.
            </p>
          </motion.div>

          <div className="lg:col-span-7">
            <div
              className="relative overflow-hidden rounded-[28px]"
              style={{
                border: '1px solid rgba(255,255,255,0.09)',
                background: 'linear-gradient(180deg, rgba(255,255,255,0.026) 0%, rgba(255,255,255,0.01) 100%)',
              }}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at 82% 18%, rgba(255,255,255,0.045), transparent 42%)',
                }}
              />

              {USE_CASES.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.5,
                    delay: prefersReducedMotion ? 0 : index * 0.07,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative grid grid-cols-[44px_1fr_auto] items-center gap-4"
                  style={{
                    padding: '22px 24px',
                    borderBottom: index < USE_CASES.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                  }}
                >
                  <span
                    className="font-mono text-[11px]"
                    style={{ color: 'rgba(255,255,255,0.24)', fontFamily: 'var(--font-mono)' }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span
                    className="font-medium"
                    style={{
                      color: 'rgba(255,255,255,0.88)',
                      fontSize: 'clamp(16px, 1.7vw, 20px)',
                      letterSpacing: '-0.01em',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    {item}
                  </span>
                  <span
                    className="font-mono text-[11px] uppercase tracking-[0.12em]"
                    style={{ color: 'rgba(255,255,255,0.32)', fontFamily: 'var(--font-mono)' }}
                  >
                    Execute
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
