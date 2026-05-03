'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { JSX } from 'react';

const SIGNALS = [
  'Understands state',
  'Decides next move',
  'Carries work forward',
];

export default function SolutionSection(): JSX.Element {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="solution"
      className="relative overflow-hidden"
      aria-labelledby="solution-title"
      style={{
        paddingTop: 'clamp(100px, 12vw, 160px)',
        paddingBottom: 'clamp(100px, 12vw, 160px)',
      }}
    >
      <div
        className="absolute pointer-events-none"
        style={{
          width: '720px',
          height: '520px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(255,255,255,0.026) 0%, transparent 70%)',
          top: '50%',
          right: '-220px',
          transform: 'translateY(-50%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="rv-container-v4 relative" style={{ zIndex: 2 }}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 text-center lg:text-left"
          >
            <h2
              id="solution-title"
              className="font-semibold text-white"
              style={{
                fontSize: 'clamp(34px, 5vw, 62px)',
                letterSpacing: '-0.03em',
                lineHeight: 1.08,
                margin: '0 0 20px 0',
                fontFamily: 'var(--font-headline)',
              }}
            >
              Work that carries itself forward.
            </h2>
            <p
              className="font-normal mx-auto lg:mx-0"
              style={{
                fontSize: 'clamp(16px, 1.8vw, 20px)',
                color: 'rgba(255,255,255,0.5)',
                lineHeight: 1.6,
                margin: 0,
                maxWidth: '560px',
                fontFamily: 'var(--font-body)',
              }}
            >
              Give 01 a goal. It understands the state, decides the next move, and drives execution.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.75, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6"
          >
            <div
              className="relative overflow-hidden rounded-[28px] p-6 md:p-8"
              style={{
                border: '1px solid rgba(255,255,255,0.09)',
                background: 'linear-gradient(180deg, rgba(255,255,255,0.035) 0%, rgba(255,255,255,0.012) 100%)',
              }}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at 76% 24%, rgba(255,255,255,0.05), transparent 42%)',
                }}
              />

              <div className="relative flex items-center gap-5 md:gap-7">
                <div className="relative flex h-28 w-28 shrink-0 items-center justify-center md:h-36 md:w-36">
                  <motion.div
                    className="absolute rounded-full"
                    style={{ width: '100%', height: '100%', border: '1px dashed rgba(255,255,255,0.16)' }}
                    animate={prefersReducedMotion ? {} : { rotate: 360 }}
                    transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
                  />
                  <div
                    className="relative flex h-16 w-16 items-center justify-center rounded-full md:h-20 md:w-20"
                    style={{
                      border: '1px solid rgba(255,255,255,0.18)',
                      background: 'rgba(255,255,255,0.05)',
                    }}
                  >
                    <span
                      className="font-semibold"
                      style={{ color: '#FFFFFF', fontFamily: 'var(--font-headline)', fontSize: '22px', letterSpacing: '-0.04em' }}
                    >
                      01
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col gap-4">
                  {SIGNALS.map((signal, index) => (
                    <motion.div
                      key={signal}
                      initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{
                        duration: prefersReducedMotion ? 0 : 0.45,
                        delay: prefersReducedMotion ? 0 : 0.16 + index * 0.08,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="flex items-center gap-3"
                    >
                      <span
                        className="font-mono text-[10px]"
                        style={{ color: 'rgba(255,255,255,0.25)', fontFamily: 'var(--font-mono)' }}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.08)' }} />
                      <span
                        className="text-sm font-medium"
                        style={{ color: 'rgba(255,255,255,0.82)', fontFamily: 'var(--font-body)' }}
                      >
                        {signal}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div
                className="relative mt-8 rounded-2xl px-4 py-3"
                style={{
                  border: '1px solid rgba(255,255,255,0.07)',
                  background: 'rgba(0,0,0,0.16)',
                }}
              >
                <p
                  className="font-mono text-xs"
                  style={{
                    color: 'rgba(255,255,255,0.42)',
                    margin: 0,
                    letterSpacing: '0.01em',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  From tools that require effort to an agent that does the work.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
