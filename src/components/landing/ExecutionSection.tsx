'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import type { JSX } from 'react';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type WorkItem = {
  id: string;
  label: string;
  status: 'lost' | 'done';
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const BEFORE_ITEMS: WorkItem[] = [
  { id: 'b1', label: 'Launch onboarding fix', status: 'lost' },
  { id: 'b2', label: 'Q3 revenue plan', status: 'lost' },
  { id: 'b3', label: 'Hire senior engineer', status: 'lost' },
];

const AFTER_ITEMS: WorkItem[] = [
  { id: 'a1', label: 'Launch onboarding fix', status: 'done' },
  { id: 'a2', label: 'Q3 revenue plan', status: 'done' },
  { id: 'a3', label: 'Hire senior engineer', status: 'done' },
];

const PIPELINE_STEPS = [
  { key: 'goal', label: 'Goal set' },
  { key: 'assign', label: 'Assigned' },
  { key: 'drop', label: 'Dropped' },
];

const RIVTOR_PIPELINE = [
  { key: 'goal', label: 'Goal set' },
  { key: 'own', label: 'Rivtor owns it' },
  { key: 'done', label: 'Done' },
];

/* ------------------------------------------------------------------ */
/*  Components                                                         */
/* ------------------------------------------------------------------ */

function StatusBadge({ status }: { status: WorkItem['status'] }): JSX.Element {
  if (status === 'done') {
    return (
      <span
        style={{
          padding: '2px 8px',
          borderRadius: '4px',
          background: 'rgba(255, 255, 255, 0.1)',
          color: 'rgba(255, 255, 255, 0.9)',
          fontSize: '11px',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.03em',
          border: '1px solid rgba(255, 255, 255, 0.15)',
        }}
      >
        Done
      </span>
    );
  }

  return (
    <span
      style={{
        padding: '2px 8px',
        borderRadius: '4px',
        background: 'transparent',
        color: 'rgba(255, 255, 255, 0.3)',
        fontSize: '11px',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.03em',
        border: '1px solid rgba(255, 255, 255, 0.06)',
      }}
    >
      Lost
    </span>
  );
}

function WorkCard({
  item,
  index,
  variant,
}: {
  item: WorkItem;
  index: number;
  variant: 'before' | 'after';
}): JSX.Element {
  const prefersReducedMotion = useReducedMotion();
  const isLost = variant === 'before' && item.status === 'lost';
  const isDone = variant === 'after' && item.status === 'done';

  return (
    <motion.div
      initial={{ opacity: 0, x: prefersReducedMotion ? 0 : variant === 'before' ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.5,
        delay: prefersReducedMotion ? 0 : index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px',
        padding: '14px 16px',
        borderRadius: '10px',
        border: isLost
          ? '1px solid rgba(255, 255, 255, 0.04)'
          : isDone
            ? '1px solid rgba(255, 255, 255, 0.12)'
            : '1px solid rgba(255, 255, 255, 0.08)',
        background: isLost
          ? 'rgba(255, 255, 255, 0.01)'
          : isDone
            ? 'rgba(255, 255, 255, 0.04)'
            : 'rgba(255, 255, 255, 0.02)',
        opacity: isLost ? 0.45 : 1,
      }}
    >
      <span
        style={{
          fontSize: '14px',
          fontWeight: 500,
          color: isLost ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.9)',
          textDecoration: isLost ? 'line-through' : 'none',
          textDecorationColor: 'rgba(255, 255, 255, 0.2)',
        }}
      >
        {item.label}
      </span>
      <StatusBadge status={item.status} />
    </motion.div>
  );
}

function PipelineNode({
  label,
  active,
  isFinal,
  index,
  variant,
}: {
  label: string;
  active: boolean;
  isFinal: boolean;
  index: number;
  variant: 'before' | 'after';
}): JSX.Element {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.4,
        delay: prefersReducedMotion ? 0 : index * 0.2,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}
    >
      <div
        style={{
          width: '28px',
          height: '28px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: active
            ? isFinal
              ? variant === 'after'
                ? 'rgba(255, 255, 255, 0.15)'
                : 'rgba(255, 255, 255, 0.06)'
              : 'rgba(255, 255, 255, 0.08)'
            : 'rgba(255, 255, 255, 0.03)',
          border: active
            ? isFinal
              ? variant === 'after'
                ? '1px solid rgba(255, 255, 255, 0.25)'
                : '1px solid rgba(255, 255, 255, 0.1)'
              : '1px solid rgba(255, 255, 255, 0.12)'
            : '1px solid rgba(255, 255, 255, 0.06)',
          fontSize: '11px',
          fontWeight: 700,
          color: active
            ? isFinal
              ? variant === 'after'
                ? '#FFFFFF'
                : 'rgba(255, 255, 255, 0.4)'
              : 'rgba(255, 255, 255, 0.8)'
            : 'rgba(255, 255, 255, 0.25)',
          flexShrink: 0,
        }}
      >
        {isFinal && active && variant === 'after' ? '✓' : index + 1}
      </div>
      <span
        style={{
          fontSize: '12px',
          fontWeight: 500,
          color: active
            ? isFinal && variant === 'after'
              ? 'rgba(255, 255, 255, 0.85)'
              : 'rgba(255, 255, 255, 0.6)'
            : 'rgba(255, 255, 255, 0.3)',
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </span>
    </motion.div>
  );
}

function Connector({
  active,
  index,
  isBroken,
}: {
  active: boolean;
  index: number;
  isBroken?: boolean;
}): JSX.Element {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.4,
        delay: prefersReducedMotion ? 0 : index * 0.2 + 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        height: '2px',
        width: '100%',
        background: isBroken
          ? 'linear-gradient(90deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02))'
          : active
            ? 'linear-gradient(90deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.06))'
            : 'rgba(255, 255, 255, 0.03)',
        transformOrigin: 'left',
        margin: '8px 0',
        position: 'relative',
      }}
    >
      {isBroken && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.3 }}
          style={{
            position: 'absolute',
            right: '-3px',
            top: '-3px',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.08)',
          }}
        />
      )}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Section                                                       */
/* ------------------------------------------------------------------ */

export default function ExecutionSection(): JSX.Element {
  const prefersReducedMotion = useReducedMotion();
  const [hoveredCol, setHoveredCol] = useState<'before' | 'after' | null>(null);

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
            Someone needs to own execution.
          </h2>
          <p
            style={{
              fontSize: 'clamp(16px, 1.8vw, 18px)',
              fontWeight: 400,
              color: 'rgba(255, 255, 255, 0.5)',
              maxWidth: '500px',
              margin: '0 auto',
              lineHeight: 1.5,
              fontFamily: 'var(--font-body)',
            }}
          >
            Goals get set, but no one drives them. Tasks get assigned, but no one follows up.
          </p>
        </motion.div>

        {/* Two-Column Comparison */}
        <div
          className="rv-execution-comparison"
          style={{
            maxWidth: '900px',
            margin: '0 auto',
          }}
        >
          {/* BEFORE COLUMN */}
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.6,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            onMouseEnter={() => setHoveredCol('before')}
            onMouseLeave={() => setHoveredCol(null)}
            style={{
              padding: 'clamp(16px, 4vw, 24px)',
              borderRadius: '14px',
              background: 'rgba(255, 255, 255, 0.015)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              transition: 'all 0.2s ease',
              opacity: hoveredCol === 'after' ? 0.4 : 1,
            }}
          >
            {/* Column Label */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '4px',
              }}
            >
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'rgba(255, 255, 255, 0.35)',
                }}
              >
                Before
              </span>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 500,
                  color: 'rgba(255, 255, 255, 0.25)',
                }}
              >
                No owner
              </span>
            </div>

            {/* Pipeline */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0',
                marginBottom: '8px',
              }}
            >
              {PIPELINE_STEPS.map((step, i) => (
                <div key={step.key}>
                  <PipelineNode
                    label={step.label}
                    active={true}
                    isFinal={i === PIPELINE_STEPS.length - 1}
                    index={i}
                    variant="before"
                  />
                  {i < PIPELINE_STEPS.length - 1 && (
                    <Connector active={true} index={i} isBroken />
                  )}
                </div>
              ))}
            </div>

            {/* Work Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {BEFORE_ITEMS.map((item, i) => (
                <WorkCard key={item.id} item={item} index={i} variant="before" />
              ))}
            </div>
          </motion.div>

          {/* AFTER COLUMN */}
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.6,
              delay: 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
            onMouseEnter={() => setHoveredCol('after')}
            onMouseLeave={() => setHoveredCol(null)}
            style={{
              padding: 'clamp(16px, 4vw, 24px)',
              borderRadius: '14px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              transition: 'all 0.2s ease',
              opacity: hoveredCol === 'before' ? 0.4 : 1,
            }}
          >
            {/* Column Label */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '4px',
              }}
            >
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'rgba(255, 255, 255, 0.7)',
                }}
              >
                With Rivtor
              </span>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 500,
                  color: 'rgba(255, 255, 255, 0.5)',
                }}
              >
                Owner assigned
              </span>
            </div>

            {/* Pipeline */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0',
                marginBottom: '8px',
              }}
            >
              {RIVTOR_PIPELINE.map((step, i) => (
                <div key={step.key}>
                  <PipelineNode
                    label={step.label}
                    active={true}
                    isFinal={i === RIVTOR_PIPELINE.length - 1}
                    index={i}
                    variant="after"
                  />
                  {i < RIVTOR_PIPELINE.length - 1 && (
                    <Connector active={true} index={i} />
                  )}
                </div>
              ))}
            </div>

            {/* Work Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {AFTER_ITEMS.map((item, i) => (
                <WorkCard key={item.id} item={item} index={i} variant="after" />
              ))}
            </div>
          </motion.div>
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
            Rivtor owns execution so you do not have to.
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
            Set the goal. It gets done.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
