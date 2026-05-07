'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { JSX } from 'react';

import ProductUIMockup from './ProductUIMockup';

export default function ProductGlimpseSection(): JSX.Element {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="product-glimpse"
      className="relative overflow-hidden"
      aria-labelledby="product-glimpse-title"
      style={{
        paddingTop: 'clamp(90px, 11vw, 150px)',
        paddingBottom: 'clamp(90px, 11vw, 150px)',
      }}
    >
      <div
        className="absolute pointer-events-none"
        style={{
          width: '880px',
          height: '560px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(255,255,255,0.026) 0%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="rv-container-v4 relative" style={{ zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 md:mb-24"
        >
          <h2
            id="product-glimpse-title"
            className="font-semibold text-white"
            style={{
              fontSize: 'clamp(36px, 5vw, 64px)',
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              margin: '0 0 20px 0',
              fontFamily: 'var(--font-headline)',
            }}
          >
            A glimpse of execution.
          </h2>
          <p
            className="font-normal"
            style={{
              fontSize: 'clamp(16px, 1.8vw, 20px)',
              color: 'rgba(255,255,255,0.45)',
              lineHeight: 1.6,
              maxWidth: '520px',
              margin: '0 auto',
              fontFamily: 'var(--font-body)',
            }}
          >
            Goal to deploy, in one flow.
          </p>
        </motion.div>

        <ProductUIMockup />
      </div>
    </section>
  );
}
