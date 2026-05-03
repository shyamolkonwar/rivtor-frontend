'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { JSX } from 'react';

export default function FinalCTASection(): JSX.Element {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="final-cta"
      className="relative overflow-hidden"
      aria-labelledby="final-cta-title"
      style={{
        paddingTop: 'clamp(72px, 9vw, 120px)',
        paddingBottom: 'clamp(96px, 11vw, 150px)',
      }}
    >
      <div className="rv-container-v4 relative" style={{ zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative overflow-hidden rounded-[32px] text-center"
          style={{
            border: '1px solid rgba(255,255,255,0.1)',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.045) 0%, rgba(255,255,255,0.015) 100%)',
            padding: 'clamp(36px, 6vw, 72px)',
          }}
        >
          <div
            className="absolute pointer-events-none"
            style={{
              inset: 0,
              background: 'radial-gradient(circle at 50% 20%, rgba(255,255,255,0.08), transparent 42%)',
            }}
          />

          <div className="relative mx-auto" style={{ maxWidth: '720px' }}>
            <h2
              id="final-cta-title"
              className="font-semibold text-white"
              style={{
                fontSize: 'clamp(38px, 5vw, 68px)',
                letterSpacing: '-0.04em',
                lineHeight: 1.02,
                margin: '0 0 18px 0',
                fontFamily: 'var(--font-headline)',
              }}
            >
              Give 01 a goal.
            </h2>
            <p
              style={{
                fontSize: 'clamp(18px, 2vw, 22px)',
                color: 'rgba(255,255,255,0.52)',
                lineHeight: 1.5,
                margin: '0 auto',
                maxWidth: '480px',
                fontFamily: 'var(--font-body)',
              }}
            >
              Watch it do the work.
            </p>

            <div
              className="flex flex-col sm:flex-row items-center justify-center gap-3"
              style={{ marginTop: '32px' }}
            >
              <a href="https://app.rivtor.com" className="rv-btn-v4 rv-btn-v4--primary">
                Try 01
              </a>
              <a href="#product-glimpse" className="rv-btn-v4 rv-btn-v4--secondary">
                See it execute
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
