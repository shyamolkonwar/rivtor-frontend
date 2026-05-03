'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { JSX } from 'react';

const CHANGES = [
  { label: 'Work', before: 'Manual', after: 'Continuous' },
  { label: 'Decisions', before: 'Reset every time', after: 'Build over time' },
  { label: 'Context', before: 'Scattered', after: 'Always available' },
  { label: 'Execution', before: 'Needs coordination', after: 'Happens automatically' },
  { label: 'Founder role', before: 'Driving everything', after: 'Setting direction' },
];

function FlowVisual(): JSX.Element {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
      <div
        className="relative overflow-hidden rounded-2xl"
        style={{
          minHeight: '260px',
          border: '1px solid rgba(255,255,255,0.06)',
          background: 'rgba(255,255,255,0.015)',
        }}
      >
        <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.035), transparent 45%)' }} />
        {['Slack', 'Docs', 'Tasks', 'CRM', 'Code'].map((tool, index) => (
          <div
            key={tool}
            className="absolute rounded-md px-3 py-1.5 font-mono text-[10px]"
            style={{
              left: `${18 + (index % 2) * 44}%`,
              top: `${18 + index * 14}%`,
              color: 'rgba(255,255,255,0.35)',
              border: '1px solid rgba(255,255,255,0.08)',
              background: 'rgba(255,255,255,0.02)',
              transform: `rotate(${index % 2 === 0 ? -8 : 7}deg)`,
            }}
          >
            {tool}
          </div>
        ))}
      </div>

      <div
        className="relative overflow-hidden rounded-2xl"
        style={{
          minHeight: '260px',
          border: '1px solid rgba(255,255,255,0.1)',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.035), rgba(255,255,255,0.012))',
        }}
      >
        <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 50% 45%, rgba(255,255,255,0.05), transparent 55%)' }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative flex items-center justify-center">
            <motion.div
              className="absolute rounded-full"
              style={{ width: '180px', height: '180px', border: '1px dashed rgba(255,255,255,0.14)' }}
              animate={{ rotate: 360 }}
              transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute rounded-full"
              style={{ width: '118px', height: '118px', border: '1px solid rgba(255,255,255,0.1)' }}
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />
            <div
              className="relative flex h-16 w-16 items-center justify-center rounded-full font-semibold"
              style={{
                color: '#FFFFFF',
                border: '1px solid rgba(255,255,255,0.18)',
                background: 'rgba(255,255,255,0.05)',
                fontFamily: 'var(--font-headline)',
              }}
            >
              01
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WhatChangesSection(): JSX.Element {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="what-changes"
      className="relative overflow-hidden"
      aria-labelledby="what-changes-title"
      style={{
        paddingTop: 'clamp(90px, 11vw, 150px)',
        paddingBottom: 'clamp(90px, 11vw, 150px)',
      }}
    >
      <div className="rv-container-v4 relative" style={{ zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 md:mb-20 text-center lg:text-left"
        >
          <h2
            id="what-changes-title"
            className="font-semibold text-white lg:max-w-[560px]"
            style={{
              fontSize: 'clamp(36px, 5vw, 64px)',
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              margin: '0 0 20px 0',
              fontFamily: 'var(--font-headline)',
            }}
          >
            What changes.
          </h2>
          <p
            className="font-normal mx-auto lg:mx-0 lg:max-w-[540px]"
            style={{
              fontSize: 'clamp(16px, 1.8vw, 20px)',
              color: 'rgba(255,255,255,0.45)',
              lineHeight: 1.6,
              margin: 0,
              fontFamily: 'var(--font-body)',
            }}
          >
            Execution stops resetting. Work keeps moving through one continuous loop.
          </p>
        </motion.div>

        <FlowVisual />

        <div className="mt-12 md:mt-16 rounded-2xl" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
          {CHANGES.map((change, index) => (
            <motion.div
              key={change.label}
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.5,
                delay: prefersReducedMotion ? 0 : index * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="grid grid-cols-1 md:grid-cols-[160px_1fr_1fr] gap-3 md:gap-6 items-center"
              style={{
                padding: '20px 24px',
                borderBottom: index < CHANGES.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
              }}
            >
              <span className="font-mono text-xs" style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-mono)' }}>
                {change.label}
              </span>
              <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', fontFamily: 'var(--font-body)' }}>
                {change.before}
              </span>
              <span className="font-medium" style={{ color: '#FFFFFF', fontSize: '15px', fontFamily: 'var(--font-body)' }}>
                {change.after}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
