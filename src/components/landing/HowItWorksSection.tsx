'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import type { JSX } from 'react';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type Step = {
  number: string;
  title: string;
  description: string;
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const STEPS: Step[] = [
  {
    number: '01',
    title: 'Set a goal',
    description: 'Describe what you want to achieve.',
  },
  {
    number: '02',
    title: 'Rivtor owns it',
    description: 'Plans, assigns, and drives the work forward.',
  },
  {
    number: '03',
    title: 'Work gets done',
    description: 'Results arrive. No follow-ups needed.',
  },
];

/* ------------------------------------------------------------------ */
/*  Components                                                         */
/* ------------------------------------------------------------------ */

function TimelineConnector({
  index,
  isActive,
}: {
  index: number;
  isActive: boolean;
}): JSX.Element {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.6,
        delay: prefersReducedMotion ? 0 : 0.3 + index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        flex: 1,
        height: '1px',
        background: isActive
          ? 'linear-gradient(90deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.08))'
          : 'linear-gradient(90deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.04))',
        transformOrigin: 'left',
        position: 'relative',
        marginTop: '28px',
      }}
    >
      {isActive && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 + index * 0.15, duration: 0.3 }}
          style={{
            position: 'absolute',
            right: '-3px',
            top: '-3px',
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.2)',
          }}
        />
      )}
    </motion.div>
  );
}

function StepNode({
  step,
  index,
  isHovered,
  onHover,
}: {
  step: Step;
  index: number;
  isHovered: boolean;
  onHover: (idx: number | null) => void;
}): JSX.Element {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.6,
        delay: prefersReducedMotion ? 0 : index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
        flex: '0 0 auto',
        cursor: 'default',
      }}
    >
      {/* Number Circle */}
      <motion.div
        animate={{
          scale: isHovered ? 1.08 : 1,
          borderColor: isHovered
            ? 'rgba(255, 255, 255, 0.25)'
            : 'rgba(255, 255, 255, 0.1)',
          backgroundColor: isHovered
            ? 'rgba(255, 255, 255, 0.08)'
            : 'rgba(255, 255, 255, 0.03)',
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          background: 'rgba(255, 255, 255, 0.03)',
          fontSize: '18px',
          fontWeight: 700,
          color: isHovered ? '#FFFFFF' : 'rgba(255, 255, 255, 0.6)',
          fontFamily: 'var(--font-headline)',
          letterSpacing: '-0.02em',
          flexShrink: 0,
        }}
      >
        {step.number}
      </motion.div>

      {/* Text */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          maxWidth: '220px',
          textAlign: 'center',
        }}
      >
        <h3
          style={{
            fontSize: '18px',
            fontWeight: 600,
            color: isHovered ? '#FFFFFF' : 'rgba(255, 255, 255, 0.85)',
            margin: 0,
            fontFamily: 'var(--font-headline)',
            letterSpacing: '-0.01em',
            transition: 'color 0.2s ease',
          }}
        >
          {step.title}
        </h3>
        <p
          style={{
            fontSize: '15px',
            fontWeight: 400,
            color: isHovered
              ? 'rgba(255, 255, 255, 0.6)'
              : 'rgba(255, 255, 255, 0.4)',
            margin: 0,
            lineHeight: 1.5,
            fontFamily: 'var(--font-body)',
            transition: 'color 0.2s ease',
          }}
        >
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}

function MobileStep({
  step,
  index,
  isHovered,
  onHover,
}: {
  step: Step;
  index: number;
  isHovered: boolean;
  onHover: (idx: number | null) => void;
}): JSX.Element {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.5,
        delay: prefersReducedMotion ? 0 : index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '16px',
        padding: '20px',
        borderRadius: '12px',
        border: isHovered
          ? '1px solid rgba(255, 255, 255, 0.12)'
          : '1px solid rgba(255, 255, 255, 0.06)',
        background: isHovered
          ? 'rgba(255, 255, 255, 0.03)'
          : 'rgba(255, 255, 255, 0.01)',
        transition: 'all 0.2s ease',
      }}
    >
      {/* Number */}
      <div
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          background: 'rgba(255, 255, 255, 0.03)',
          fontSize: '14px',
          fontWeight: 700,
          color: isHovered ? '#FFFFFF' : 'rgba(255, 255, 255, 0.5)',
          fontFamily: 'var(--font-headline)',
          flexShrink: 0,
          transition: 'all 0.2s ease',
        }}
      >
        {step.number}
      </div>

      {/* Text */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: 600,
            color: isHovered ? '#FFFFFF' : 'rgba(255, 255, 255, 0.85)',
            margin: 0,
            fontFamily: 'var(--font-headline)',
            letterSpacing: '-0.01em',
            transition: 'color 0.2s ease',
          }}
        >
          {step.title}
        </h3>
        <p
          style={{
            fontSize: '14px',
            fontWeight: 400,
            color: 'rgba(255, 255, 255, 0.45)',
            margin: 0,
            lineHeight: 1.5,
            fontFamily: 'var(--font-body)',
          }}
        >
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Section                                                       */
/* ------------------------------------------------------------------ */

export default function HowItWorksSection(): JSX.Element {
  const prefersReducedMotion = useReducedMotion();
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  return (
    <section
      id="how-it-works"
      className="rv-section-v4 rv-section-v4--centered"
      aria-labelledby="how-it-works-title"
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
            id="how-it-works-title"
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
            How it works
          </h2>
          <p
            style={{
              fontSize: 'clamp(16px, 1.8vw, 18px)',
              fontWeight: 400,
              color: 'rgba(255, 255, 255, 0.5)',
              margin: 0,
              lineHeight: 1.5,
              fontFamily: 'var(--font-body)',
            }}
          >
            Three steps. No learning curve. No setup.
          </p>
        </motion.div>

        {/* Desktop: Horizontal Timeline */}
        <div
          className="hidden md:flex"
          style={{
            alignItems: 'flex-start',
            justifyContent: 'center',
            gap: '0',
            maxWidth: '800px',
            margin: '0 auto',
          }}
        >
          {STEPS.map((step, index) => (
            <div key={step.number} style={{ display: 'flex', alignItems: 'flex-start', flex: index < STEPS.length - 1 ? '1 1 0' : '0 0 auto' }}>
              <StepNode
                step={step}
                index={index}
                isHovered={hoveredStep === index}
                onHover={setHoveredStep}
              />
              {index < STEPS.length - 1 && (
                <TimelineConnector
                  index={index}
                  isActive={hoveredStep === index || hoveredStep === index + 1}
                />
              )}
            </div>
          ))}
        </div>

        {/* Mobile: Vertical Cards */}
        <div
          className="flex md:hidden"
          style={{
            flexDirection: 'column',
            gap: '12px',
            maxWidth: '400px',
            margin: '0 auto',
          }}
        >
          {STEPS.map((step, index) => (
            <MobileStep
              key={step.number}
              step={step}
              index={index}
              isHovered={hoveredStep === index}
              onHover={setHoveredStep}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
