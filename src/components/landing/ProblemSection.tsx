'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { JSX } from 'react';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const FAILURE_MODES = [
  {
    number: '01',
    label: 'Drift',
    text: 'Goals get defined, but no system owns the outcome.',
  },
  {
    number: '02',
    label: 'Fragmentation',
    text: 'Work fragments across tools with no unified context.',
  },
  {
    number: '03',
    label: 'Overhead',
    text: 'Humans chase status instead of driving results.',
  },
  {
    number: '04',
    label: 'Amnesia',
    text: 'Decisions lack memory — every plan starts from zero.',
  },
];

/* ------------------------------------------------------------------ */
/*  Main Section                                                       */
/* ------------------------------------------------------------------ */

export default function ProblemSection(): JSX.Element {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="problem"
      className="relative overflow-hidden"
      aria-labelledby="problem-title"
      style={{
        paddingTop: 'clamp(100px, 12vw, 160px)',
        paddingBottom: 'clamp(100px, 12vw, 160px)',
      }}
    >
      {/* Top border */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)',
        }}
      />

      <div className="rv-container-v4 relative" style={{ zIndex: 2 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mb-16 md:mb-24 text-center lg:text-left mx-auto lg:mx-0 lg:max-w-none"
        >
          <h2
            id="problem-title"
            className="font-semibold text-white lg:max-w-[600px]"
            style={{
              fontSize: 'clamp(36px, 5vw, 64px)',
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              margin: '0 0 24px 0',
              fontFamily: 'var(--font-headline)',
            }}
          >
            The death of momentum.
          </h2>
          <p
            className="font-normal mx-auto lg:mx-0 lg:max-w-[560px]"
            style={{
              fontSize: 'clamp(16px, 1.8vw, 20px)',
              color: 'rgba(255,255,255,0.45)',
              lineHeight: 1.6,
              fontFamily: 'var(--font-body)',
            }}
          >
            Goals drift. Context evaporates. Every plan starts from zero. The problem isn't effort — it's that no system remembers.
          </p>
        </motion.div>

        {/* Desktop: Horizontal failure modes */}
        <div className="hidden lg:grid grid-cols-4 gap-0 relative">
          {/* Horizontal connecting line */}
          <div
            className="absolute top-0 left-0 right-0 pointer-events-none"
            style={{
              height: '1px',
              background: 'linear-gradient(90deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))',
            }}
          />

          {FAILURE_MODES.map((item, index) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.6,
                delay: prefersReducedMotion ? 0 : index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative flex flex-col gap-4"
              style={{
                paddingTop: '32px',
                paddingRight: index < FAILURE_MODES.length - 1 ? '32px' : '0',
                paddingLeft: index > 0 ? '32px' : '0',
                borderLeft: index > 0 ? '1px solid rgba(255,255,255,0.06)' : 'none',
              }}
            >
              {/* Number + Label row */}
              <div className="flex items-center gap-3">
                <span
                  className="font-mono font-bold"
                  style={{
                    fontSize: '11px',
                    color: 'rgba(255,255,255,0.15)',
                    fontFamily: 'var(--font-mono)',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {item.number}
                </span>
                <span
                  className="px-2 py-0.5 rounded text-[10px] font-mono"
                  style={{
                    color: 'rgba(255,255,255,0.35)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    fontFamily: 'var(--font-mono)',
                    letterSpacing: '0.02em',
                  }}
                >
                  {item.label}
                </span>
              </div>

              {/* Description */}
              <p
                className="text-sm leading-relaxed"
                style={{
                  color: 'rgba(255,255,255,0.55)',
                  fontFamily: 'var(--font-body)',
                  margin: 0,
                }}
              >
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Mobile: Vertical stack */}
        <div className="lg:hidden flex flex-col gap-0">
          {FAILURE_MODES.map((item, index) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.5,
                delay: prefersReducedMotion ? 0 : index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative flex flex-col gap-2"
              style={{
                paddingTop: index > 0 ? '24px' : '0',
                paddingBottom: index < FAILURE_MODES.length - 1 ? '24px' : '0',
                borderBottom: index < FAILURE_MODES.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
              }}
            >
              <div className="flex items-center gap-3">
                <span
                  className="font-mono font-bold"
                  style={{
                    fontSize: '11px',
                    color: 'rgba(255,255,255,0.2)',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  {item.number}
                </span>
                <span
                  className="px-2 py-0.5 rounded text-[10px] font-mono"
                  style={{
                    color: 'rgba(255,255,255,0.4)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  {item.label}
                </span>
              </div>
              <p
                className="text-sm"
                style={{
                  color: 'rgba(255,255,255,0.5)',
                  fontFamily: 'var(--font-body)',
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
