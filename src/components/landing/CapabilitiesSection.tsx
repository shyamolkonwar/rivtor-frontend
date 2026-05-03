'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { JSX } from 'react';

const CAPABILITIES = [
  {
    number: '01',
    title: 'Context',
    text: 'Real-time from every tool.',
  },
  {
    number: '02',
    title: 'Understanding',
    text: 'Company state, connected.',
  },
  {
    number: '03',
    title: 'Decision',
    text: 'Options become action.',
  },
  {
    number: '04',
    title: 'Execution',
    text: 'Tasks run to completion.',
  },
  {
    number: '05',
    title: 'Reliability',
    text: 'Tracked, retried, verified.',
  },
];

export default function CapabilitiesSection(): JSX.Element {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="capabilities"
      className="relative overflow-hidden"
      aria-labelledby="capabilities-title"
      style={{
        paddingTop: 'clamp(90px, 11vw, 150px)',
        paddingBottom: 'clamp(90px, 11vw, 150px)',
      }}
    >
      <div
        className="absolute inset-x-0 top-1/2 pointer-events-none"
        style={{
          height: '520px',
          transform: 'translateY(-50%)',
          background: 'radial-gradient(ellipse at 72% 50%, rgba(255,255,255,0.035) 0%, transparent 58%)',
        }}
      />

      <div className="rv-container-v4 relative" style={{ zIndex: 2 }}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-4 text-center lg:text-left"
          >
            <h2
              id="capabilities-title"
              className="font-semibold text-white"
              style={{
                fontSize: 'clamp(36px, 5vw, 64px)',
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
                margin: '0 0 20px 0',
                fontFamily: 'var(--font-headline)',
              }}
            >
              Built for execution.
            </h2>
            <p
              className="font-normal mx-auto lg:mx-0"
              style={{
                fontSize: 'clamp(16px, 1.8vw, 20px)',
                color: 'rgba(255,255,255,0.48)',
                lineHeight: 1.6,
                margin: 0,
                maxWidth: '460px',
                fontFamily: 'var(--font-body)',
              }}
            >
              Not a workflow. Not a copilot. A system built to execute.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.75, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-8"
          >
            <div
              className="relative overflow-hidden rounded-[28px]"
              style={{
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.018) 48%, rgba(255,255,255,0.035) 100%)',
                boxShadow: '0 40px 120px rgba(0,0,0,0.32)',
              }}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)
                  `,
                  backgroundSize: '54px 54px',
                  maskImage: 'radial-gradient(circle at 50% 45%, black 0%, transparent 72%)',
                }}
              />

              <div className="relative p-5 md:p-8">
                <div
                  className="mb-6 flex items-center justify-between rounded-full px-4 py-2"
                  style={{
                    border: '1px solid rgba(255,255,255,0.07)',
                    background: 'rgba(0,0,0,0.18)',
                  }}
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: 'rgba(255,255,255,0.32)' }}>
                    Execution surface
                  </span>
                  <span className="font-mono text-[10px]" style={{ color: 'rgba(255,255,255,0.42)' }}>
                    01 active
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[1fr_220px_1fr] gap-4 md:gap-5 items-center">
                  <div className="flex flex-col gap-4">
                    {CAPABILITIES.slice(0, 2).map((item, index) => (
                      <CapabilityCard key={item.title} item={item} index={index} />
                    ))}
                  </div>

                  <div className="relative flex min-h-[260px] items-center justify-center">
                    <motion.div
                      className="absolute rounded-full"
                      style={{ width: '214px', height: '214px', border: '1px solid rgba(255,255,255,0.08)' }}
                      animate={prefersReducedMotion ? {} : { rotate: 360 }}
                      transition={{ duration: 34, repeat: Infinity, ease: 'linear' }}
                    />
                    <motion.div
                      className="absolute rounded-full"
                      style={{ width: '154px', height: '154px', border: '1px dashed rgba(255,255,255,0.12)' }}
                      animate={prefersReducedMotion ? {} : { rotate: -360 }}
                      transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
                    />
                    <div
                      className="relative flex h-24 w-24 items-center justify-center rounded-full"
                      style={{
                        border: '1px solid rgba(255,255,255,0.18)',
                        background: 'radial-gradient(circle, rgba(255,255,255,0.11) 0%, rgba(255,255,255,0.035) 70%)',
                      }}
                    >
                      <span
                        className="font-semibold"
                        style={{ color: '#FFFFFF', fontFamily: 'var(--font-headline)', fontSize: '24px', letterSpacing: '-0.04em' }}
                      >
                        01
                      </span>
                    </div>
                    {CAPABILITIES.map((item, index) => (
                      <span
                        key={item.number}
                        className="absolute h-2 w-2 rounded-full"
                        style={{
                          background: 'rgba(255,255,255,0.55)',
                          boxShadow: '0 0 18px rgba(255,255,255,0.24)',
                          transform: `rotate(${index * 72 - 90}deg) translateX(96px)`,
                          transformOrigin: 'center',
                        }}
                        aria-hidden="true"
                      />
                    ))}
                  </div>

                  <div className="flex flex-col gap-4">
                    {CAPABILITIES.slice(2).map((item, index) => (
                      <CapabilityCard key={item.title} item={item} index={index + 2} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function CapabilityCard({
  item,
  index,
}: {
  item: (typeof CAPABILITIES)[number];
  index: number;
}): JSX.Element {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.5,
        delay: prefersReducedMotion ? 0 : index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="rounded-2xl p-4"
      style={{
        border: '1px solid rgba(255,255,255,0.08)',
        background: 'rgba(0,0,0,0.18)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="font-mono text-[10px]" style={{ color: 'rgba(255,255,255,0.25)', fontFamily: 'var(--font-mono)' }}>
          {item.number}
        </span>
        <span className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.06)' }} />
      </div>
      <h3
        className="font-semibold"
        style={{
          color: '#FFFFFF',
          fontSize: '16px',
          letterSpacing: '-0.01em',
          margin: '0 0 6px 0',
          fontFamily: 'var(--font-headline)',
        }}
      >
        {item.title}
      </h3>
      <p
        style={{
          color: 'rgba(255,255,255,0.5)',
          fontSize: '13px',
          lineHeight: 1.5,
          margin: 0,
          fontFamily: 'var(--font-body)',
        }}
      >
        {item.text}
      </p>
    </motion.div>
  );
}
