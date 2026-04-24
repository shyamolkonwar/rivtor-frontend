'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { JSX } from 'react';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const LEARNING_ITEMS = [
  {
    label: 'Unified Learning Loop',
    description: 'Every decision → outcome → credit → update → validation cycle improves the system. The learning loop integrates all subsystems into a continuous improvement engine.',
    detail: 'Outcome observation · Credit assignment · Model updates · Update validation',
  },
  {
    label: 'World Model',
    description: 'Predictive simulation of future states. Agents rehearse actions mentally before executing them in the real world.',
    detail: 'State encoding · Action prediction · Trajectory simulation · Value estimation',
  },
  {
    label: '4-Layer Memory',
    description: 'Neuroscience-inspired memory hierarchy: Working, Episodic, Semantic, and Procedural memory. Memories consolidate across layers based on importance.',
    detail: 'Working · Episodic · Semantic · Procedural · Consolidation engine',
  },
  {
    label: 'Credit Assignment',
    description: 'Distributes credit for outcomes across decisions and agents with temporal discounting. Learns which agents and strategies are most reliable.',
    detail: 'Direct credit · Indirect credit · Temporal discount · Multi-agent attribution',
  },
  {
    label: 'Taste System',
    description: 'Judgment infrastructure that compresses long-term consequences into present-time decisions. Six engines generate, compare, simulate, critique, and decide.',
    detail: 'Divergence · Comparative · Simulation · Braintrust · Authority · Memory',
  },
  {
    label: 'Action-Perception Loop',
    description: 'Implements Active Inference theory where perception and action are unified by free energy minimization. The system continuously updates its models based on prediction errors.',
    detail: 'Perception · Deliberation · Action · Learning · Free energy minimization',
  },
];

/* ------------------------------------------------------------------ */
/*  Main Section                                                       */
/* ------------------------------------------------------------------ */

export default function LearningAdaptationSection(): JSX.Element {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="learning"
      className="rv-section-v4"
      aria-labelledby="learning-title"
      style={{
        paddingTop: 'clamp(80px, 10vw, 120px)',
        paddingBottom: 'clamp(80px, 10vw, 120px)',
      }}
    >
      <div className="rv-container-v4">
        {/* Header */}
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
            id="learning-title"
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
            Learns from every action.
          </h2>
          <p
            style={{
              fontSize: 'clamp(16px, 1.8vw, 18px)',
              fontWeight: 400,
              color: 'rgba(255, 255, 255, 0.5)',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: 1.5,
              fontFamily: 'var(--font-body)',
            }}
          >
            Not pre-trained. Continuously learning from outcomes, updating models, and improving decisions.
          </p>
        </motion.div>

        {/* Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '16px',
            maxWidth: '1000px',
            margin: '0 auto',
          }}
        >
          {LEARNING_ITEMS.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.5,
                delay: prefersReducedMotion ? 0 : index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                padding: '24px',
                borderRadius: '14px',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                background: 'rgba(255, 255, 255, 0.015)',
              }}
            >
              <h3
                style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: 'rgba(255, 255, 255, 0.85)',
                  margin: '0 0 8px 0',
                  fontFamily: 'var(--font-headline)',
                  letterSpacing: '-0.01em',
                }}
              >
                {item.label}
              </h3>
              <p
                style={{
                  fontSize: '14px',
                  color: 'rgba(255, 255, 255, 0.5)',
                  margin: '0 0 12px 0',
                  fontFamily: 'var(--font-body)',
                  lineHeight: 1.5,
                }}
              >
                {item.description}
              </p>
              <span
                style={{
                  fontSize: '11px',
                  color: 'rgba(255, 255, 255, 0.25)',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.01em',
                }}
              >
                {item.detail}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
