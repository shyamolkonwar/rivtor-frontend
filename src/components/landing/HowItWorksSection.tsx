'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { JSX } from 'react';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const STEPS = [
  {
    number: '01',
    title: 'Perceive',
    description: 'Ingest events from every company system in real-time.',
  },
  {
    number: '02',
    title: 'Model',
    description: 'Build a predictive world model from current state.',
  },
  {
    number: '03',
    title: 'Decide',
    description: 'Generate options, simulate futures, select the optimal path.',
  },
  {
    number: '04',
    title: 'Plan',
    description: 'Compile decisions into dependency-aware execution graphs.',
  },
  {
    number: '05',
    title: 'Act',
    description: 'Dispatch tasks to agents, invoke tools, drive to completion.',
  },
  {
    number: '06',
    title: 'Learn',
    description: 'Observe outcomes, assign credit, update predictions.',
  },
];

/* ------------------------------------------------------------------ */
/*  Main Section                                                       */
/* ------------------------------------------------------------------ */

export default function HowItWorksSection(): JSX.Element {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden"
      aria-labelledby="how-it-works-title"
      style={{
        paddingTop: 'clamp(80px, 10vw, 140px)',
        paddingBottom: 'clamp(80px, 10vw, 140px)',
      }}
    >
      <div className="rv-container-v4 relative" style={{ zIndex: 2 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="text-center mb-16 md:mb-24"
        >
          <h2
            id="how-it-works-title"
            className="font-semibold text-white"
            style={{
              fontSize: 'clamp(32px, 4vw, 48px)',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              margin: '0 0 16px 0',
              fontFamily: 'var(--font-headline)',
            }}
          >
            How it works
          </h2>
          <p
            className="font-normal"
            style={{
              fontSize: 'clamp(16px, 1.8vw, 18px)',
              color: 'rgba(255,255,255,0.45)',
              maxWidth: '520px',
              margin: '0 auto',
              lineHeight: 1.5,
              fontFamily: 'var(--font-body)',
            }}
          >
            Six steps. One closed loop. The agent improves with every iteration.
          </p>
        </motion.div>

        {/* Desktop: 3-column grid with connecting spine */}
        <div className="hidden lg:block relative">
          {/* Horizontal spine */}
          <div
            className="absolute left-0 right-0 pointer-events-none"
            style={{
              top: '36px',
              height: '1px',
              background: 'linear-gradient(90deg, rgba(255,255,255,0.04), rgba(255,255,255,0.1), rgba(255,255,255,0.04))',
            }}
          />

          <div className="grid grid-cols-3 gap-x-8 gap-y-16 relative" style={{ zIndex: 2 }}>
            {STEPS.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.6,
                  delay: prefersReducedMotion ? 0 : (index % 3) * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex flex-col items-start gap-4"
              >
                {/* Number on spine */}
                <div className="relative w-full">
                  <span
                    className="font-mono font-bold"
                    style={{
                      fontSize: '13px',
                      color: 'rgba(255,255,255,0.25)',
                      fontFamily: 'var(--font-mono)',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {step.number}
                  </span>
                  {/* Dot on spine */}
                  <div
                    className="absolute"
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.15)',
                      top: '22px',
                      left: '3px',
                    }}
                  />
                </div>

                {/* Title */}
                <h3
                  className="text-lg font-semibold"
                  style={{
                    color: '#FFFFFF',
                    fontFamily: 'var(--font-headline)',
                    letterSpacing: '-0.01em',
                    margin: 0,
                    marginTop: '4px',
                  }}
                >
                  {step.title}
                </h3>

                {/* Description */}
                <p
                  className="text-sm leading-relaxed"
                  style={{
                    color: 'rgba(255,255,255,0.4)',
                    fontFamily: 'var(--font-body)',
                    margin: 0,
                    maxWidth: '280px',
                  }}
                >
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile: Vertical list with spine */}
        <div className="lg:hidden relative flex flex-col gap-0" style={{ paddingLeft: '28px' }}>
          {/* Vertical spine */}
          <div
            className="absolute pointer-events-none"
            style={{
              left: '8px',
              top: '0',
              bottom: '0',
              width: '1px',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))',
            }}
          />

          {STEPS.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.5,
                delay: prefersReducedMotion ? 0 : index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative flex flex-col gap-2"
              style={{ paddingBottom: index === STEPS.length - 1 ? '0' : '40px' }}
            >
              {/* Dot on spine */}
              <div
                className="absolute"
                style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.15)',
                  left: '-24px',
                  top: '6px',
                }}
              />

              {/* Number + Title */}
              <div className="flex items-baseline gap-3">
                <span
                  className="font-mono font-bold"
                  style={{
                    fontSize: '11px',
                    color: 'rgba(255,255,255,0.25)',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  {step.number}
                </span>
                <h3
                  className="text-base font-semibold"
                  style={{
                    color: '#FFFFFF',
                    fontFamily: 'var(--font-headline)',
                    letterSpacing: '-0.01em',
                    margin: 0,
                  }}
                >
                  {step.title}
                </h3>
              </div>

              {/* Description */}
              <p
                className="text-sm"
                style={{
                  color: 'rgba(255,255,255,0.45)',
                  fontFamily: 'var(--font-body)',
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom closing line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.6,
            delay: 0.3,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-20 md:mt-28 flex justify-center"
        >
          <div
            className="flex items-center gap-3 px-5 py-2.5 rounded-full"
            style={{
              border: '1px solid rgba(255,255,255,0.08)',
              background: 'rgba(255,255,255,0.02)',
            }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
            <span
              className="font-mono text-xs"
              style={{
                color: 'rgba(255,255,255,0.4)',
                fontFamily: 'var(--font-mono)',
                letterSpacing: '0.01em',
              }}
            >
              Each loop makes the next one smarter
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
