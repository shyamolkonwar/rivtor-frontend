'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { JSX } from 'react';

const STEPS = [
  'Give a goal',
  '01 plans the work',
  '01 executes across tools',
  'You review and guide',
];

export default function InteractionSection(): JSX.Element {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="how-you-work-with-01"
      className="relative overflow-hidden"
      aria-labelledby="how-you-work-title"
      style={{
        paddingTop: 'clamp(90px, 11vw, 150px)',
        paddingBottom: 'clamp(90px, 11vw, 150px)',
      }}
    >
      <div className="rv-container-v4 relative" style={{ zIndex: 2 }}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 text-center lg:text-left"
          >
            <h2
              id="how-you-work-title"
              className="font-semibold text-white"
              style={{
                fontSize: 'clamp(36px, 5vw, 64px)',
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
                margin: '0 0 20px 0',
                fontFamily: 'var(--font-headline)',
              }}
            >
              How you work with 01.
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
              You set direction. 01 turns it into a plan, executes, and keeps you in the loop.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.75, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <div
              className="relative overflow-hidden rounded-[28px] p-5 md:p-7"
              style={{
                border: '1px solid rgba(255,255,255,0.09)',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.012) 100%)',
              }}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(circle at 18% 12%, rgba(255,255,255,0.045), transparent 40%)' }}
              />

              <div className="relative rounded-2xl p-4 md:p-5" style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(0,0,0,0.18)' }}>
                <div className="mb-3 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ background: 'rgba(255,255,255,0.34)' }} />
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: 'rgba(255,255,255,0.32)' }}>
                    Goal
                  </span>
                </div>
                <p
                  style={{
                    color: 'rgba(255,255,255,0.82)',
                    fontSize: 'clamp(16px, 1.7vw, 20px)',
                    lineHeight: 1.45,
                    margin: 0,
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  Launch the product campaign by Friday.
                </p>
              </div>

              <div className="relative mt-6 grid grid-cols-1 md:grid-cols-4 gap-0">
                <div
                  className="hidden md:block absolute left-0 right-0 pointer-events-none"
                  style={{
                    top: '22px',
                    height: '1px',
                    background: 'linear-gradient(90deg, rgba(255,255,255,0.04), rgba(255,255,255,0.14), rgba(255,255,255,0.04))',
                  }}
                />

                {STEPS.map((step, index) => (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{
                      duration: prefersReducedMotion ? 0 : 0.45,
                      delay: prefersReducedMotion ? 0 : 0.14 + index * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="relative flex flex-col gap-3 py-4 md:px-4"
                  >
                    <span
                      className="flex h-11 w-11 items-center justify-center rounded-full font-mono text-[11px]"
                      style={{
                        color: index === 0 ? '#FFFFFF' : 'rgba(255,255,255,0.46)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        background: index === 0 ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.18)',
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <p
                      style={{
                        color: 'rgba(255,255,255,0.72)',
                        fontSize: '14px',
                        lineHeight: 1.45,
                        margin: 0,
                        fontFamily: 'var(--font-body)',
                      }}
                    >
                      {step}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
