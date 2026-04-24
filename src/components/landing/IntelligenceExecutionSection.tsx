'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { JSX } from 'react';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const INTELLIGENCE_ITEMS = [
  {
    label: 'Taste System',
    description: 'Aesthetic and design judgment compressed into decision-making. Six engines generate diverse options, compare them relationally, simulate futures, and critique from multiple perspectives.',
    detail: 'Divergence · Comparative · Simulation · Braintrust · Authority · Memory',
  },
  {
    label: 'World Model',
    description: 'Predictive simulation of future states. Agents mentally rehearse action sequences before executing them, measuring both pragmatic and epistemic value.',
    detail: 'State encoding · Action prediction · Value estimation · Uncertainty modeling',
  },
  {
    label: 'Uncertainty Handler',
    description: 'Probabilistic reasoning across four dimensions: epistemic (knowledge gaps), aleatoric (inherent randomness), model (limitations), and adversarial (conflict).',
    detail: 'Epistemic · Aleatoric · Model · Adversarial · Confidence calibration',
  },
  {
    label: 'Narrative Intelligence',
    description: 'Meaning construction and coherence maintenance. Ensures decisions align with company narrative and that explanations make sense to stakeholders.',
    detail: 'Construction · Coherence · Alignment · Propagation · Memory',
  },
  {
    label: 'Business Metrics Integrator',
    description: 'Real-time integration with analytics, advertising, and payment platforms. Provides live business intelligence as context for every decision.',
    detail: 'Analytics · Advertising · Payments · Real-time KPIs · Business health',
  },
  {
    label: 'Focus Management',
    description: 'Attention allocation and execution coherence. Manages context switching costs, attention budgets, and global workspace sharing across agents.',
    detail: 'Attention budget · Context switching · Focus decay · Global workspace',
  },
];

/* ------------------------------------------------------------------ */
/*  Main Section                                                       */
/* ------------------------------------------------------------------ */

export default function IntelligenceExecutionSection(): JSX.Element {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="intelligence"
      className="rv-section-v4"
      aria-labelledby="intelligence-title"
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
            id="intelligence-title"
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
            Intelligence that executes.
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
            Not just reasoning. Reasoning connected to action.
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
          {INTELLIGENCE_ITEMS.map((item, index) => (
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
