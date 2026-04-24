'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import type { JSX } from 'react';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const REASONING_STEPS = [
  {
    phase: 'Perceive',
    action: 'Ingest events from all company systems',
    detail: 'Real-time event stream ingestion from communications, code repositories, project management, analytics, and payments.',
  },
  {
    phase: 'Model',
    action: 'Build predictive world model',
    detail: 'Encode current state into latent representation. Simulate action sequences to predict outcomes before execution.',
  },
  {
    phase: 'Decide',
    action: 'Generate and evaluate options',
    detail: 'Structurally diverse option generation, multi-perspective critique, future simulation, and optimal path selection.',
  },
  {
    phase: 'Plan',
    action: 'Compile execution graph',
    detail: 'Transform decisions into dependency-aware task graphs with atomic operations, verification gates, and rollback points.',
  },
  {
    phase: 'Act',
    action: 'Execute with autonomy',
    detail: 'Dispatch tasks to specialist agents, invoke tools, write code, send communications, and drive to completion.',
  },
  {
    phase: 'Learn',
    action: 'Update models from outcomes',
    detail: 'Observe results, assign credit to decisions and agents, update trust scores, and improve future predictions.',
  },
];

/* ------------------------------------------------------------------ */
/*  Components                                                         */
/* ------------------------------------------------------------------ */

function ReasoningCard({
  step,
  index,
  isHovered,
  onHover,
}: {
  step: (typeof REASONING_STEPS)[0];
  index: number;
  isHovered: boolean;
  onHover: (idx: number | null) => void;
}): JSX.Element {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.5,
        delay: prefersReducedMotion ? 0 : index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      style={{
        padding: '24px',
        borderRadius: '14px',
        background: isHovered
          ? 'rgba(255, 255, 255, 0.04)'
          : 'rgba(255, 255, 255, 0.015)',
        border: isHovered
          ? '1px solid rgba(255, 255, 255, 0.12)'
          : '1px solid rgba(255, 255, 255, 0.06)',
        transition: 'all 0.25s ease',
        cursor: 'default',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '12px',
        }}
      >
        <span
          style={{
            fontSize: '12px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'rgba(255, 255, 255, 0.3)',
            fontFamily: 'var(--font-mono)',
          }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
        <div
          style={{
            flex: 1,
            height: '1px',
            background: 'rgba(255, 255, 255, 0.06)',
          }}
        />
      </div>

      <h3
        style={{
          fontSize: '18px',
          fontWeight: 600,
          color: isHovered ? '#FFFFFF' : 'rgba(255, 255, 255, 0.85)',
          margin: '0 0 8px 0',
          fontFamily: 'var(--font-headline)',
          letterSpacing: '-0.01em',
          transition: 'color 0.2s ease',
        }}
      >
        {step.phase}
      </h3>

      <p
        style={{
          fontSize: '15px',
          fontWeight: 500,
          color: 'rgba(255, 255, 255, 0.7)',
          margin: '0 0 6px 0',
          fontFamily: 'var(--font-body)',
          lineHeight: 1.5,
        }}
      >
        {step.action}
      </p>

      <p
        style={{
          fontSize: '14px',
          color: 'rgba(255, 255, 255, 0.4)',
          margin: 0,
          fontFamily: 'var(--font-mono)',
          lineHeight: 1.5,
        }}
      >
        {step.detail}
      </p>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Section                                                       */
/* ------------------------------------------------------------------ */

export default function ExecutionSection(): JSX.Element {
  const prefersReducedMotion = useReducedMotion();
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  return (
    <section
      id="execution"
      className="bg-[#0A0A0A]"
      aria-labelledby="execution-title"
      style={{
        paddingTop: 'clamp(80px, 10vw, 120px)',
        paddingBottom: 'clamp(80px, 10vw, 120px)',
      }}
    >
      <div className="rv-container-v4">
        {/* Section Header */}
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
            id="execution-title"
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
            Cognitive execution loop.
          </h2>
          <p
            style={{
              fontSize: 'clamp(16px, 1.8vw, 18px)',
              fontWeight: 400,
              color: 'rgba(255, 255, 255, 0.5)',
              maxWidth: '560px',
              margin: '0 auto',
              lineHeight: 1.5,
              fontFamily: 'var(--font-body)',
            }}
          >
            Perceive, model, decide, plan, act, learn. A closed loop that improves with every iteration.
          </p>
        </motion.div>

        {/* Reasoning Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '16px',
            maxWidth: '1000px',
            margin: '0 auto',
          }}
        >
          {REASONING_STEPS.map((step, index) => (
            <ReasoningCard
              key={step.phase}
              step={step}
              index={index}
              isHovered={hoveredStep === index}
              onHover={setHoveredStep}
            />
          ))}
        </div>

        {/* Bottom Statement */}
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.6,
            delay: 0.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            textAlign: 'center',
            marginTop: '56px',
          }}
        >
          <p
            style={{
              fontSize: 'clamp(16px, 1.8vw, 18px)',
              fontWeight: 500,
              color: 'rgba(255, 255, 255, 0.7)',
              margin: '0 0 8px 0',
              fontFamily: 'var(--font-body)',
            }}
          >
            Each loop makes the next one smarter.
          </p>
          <p
            style={{
              fontSize: 'clamp(16px, 1.8vw, 18px)',
              fontWeight: 600,
              color: '#FFFFFF',
              margin: 0,
              fontFamily: 'var(--font-body)',
            }}
          >
            The agent improves itself.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
