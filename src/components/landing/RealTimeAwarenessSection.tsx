'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { JSX } from 'react';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const AWARENESS_ITEMS = [
  {
    id: 'event-sourcing',
    label: 'Event Sourcing',
    description: 'Every action is an immutable event. State is a calculated view replayed from the beginning.',
    tags: ['Append-only ledger', 'Cryptographic chain', 'Deterministic replay'],
  },
  {
    id: 'ontology-projection',
    label: 'Ontology Projection',
    description: 'Events continuously project into a living knowledge graph of your company\'s structure.',
    tags: ['Core primitives', 'Relationship types', 'Flexible schema'],
  },
  {
    id: 'integration-sync',
    label: 'Integration Sync',
    description: 'Real-time sync across all platforms. Every external change becomes an internal event.',
    tags: ['Continuous sync', 'Webhook handlers', 'Secure auth'],
  },
  {
    id: 'context-builder',
    label: 'Context Builder',
    description: 'Context assembled as an OS-level resource. Agents never rely on memory — the system remembers.',
    tags: ['Planner', 'Build Engine', 'Growth Engine', 'Capital Engine'],
  },
];

/* ------------------------------------------------------------------ */
/*  Illustrations                                                      */
/* ------------------------------------------------------------------ */

function EventSourcingIllustration(): JSX.Element {
  return (
    <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Time axis */}
      <line x1="40" y1="200" x2="360" y2="200" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      {[40, 120, 200, 280, 360].map((x, i) => (
        <line key={i} x1={x} y1="196" x2={x} y2="204" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      ))}

      {/* Event blocks stacked */}
      {[
        { x: 60, y: 160, w: 80, h: 28, opacity: 0.15 },
        { x: 70, y: 124, w: 90, h: 28, opacity: 0.2 },
        { x: 55, y: 88, w: 100, h: 28, opacity: 0.25 },
        { x: 80, y: 52, w: 110, h: 28, opacity: 0.3 },
        { x: 65, y: 16, w: 120, h: 28, opacity: 0.35 },
      ].map((block, i) => (
        <g key={i}>
          <rect
            x={block.x}
            y={block.y}
            width={block.w}
            height={block.h}
            rx="4"
            fill={`rgba(255,255,255,${block.opacity * 0.1})`}
            stroke={`rgba(255,255,255,${block.opacity})`}
            strokeWidth="1"
          />
          {/* Hash inside */}
          <line x1={block.x + 12} y1={block.y + block.h / 2} x2={block.x + block.w - 12} y2={block.y + block.h / 2} stroke={`rgba(255,255,255,${block.opacity * 0.5})`} strokeWidth="1" strokeDasharray="4 3" />
        </g>
      ))}

      {/* Arrow pointing to projection */}
      <motion.path
        d="M 200 120 Q 280 120 320 80"
        stroke="rgba(255,255,255,0.15)"
        strokeWidth="1.5"
        fill="none"
        strokeDasharray="6 4"
        animate={{ strokeDashoffset: [0, -20] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      />
      <polygon points="318,74 328,80 318,86" fill="rgba(255,255,255,0.2)" />

      {/* Projected state sphere */}
      <circle cx="340" cy="60" r="28" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      <motion.circle
        cx="340"
        cy="60"
        r="20"
        stroke="rgba(255,255,255,0.1)"
        strokeWidth="1"
        strokeDasharray="3 3"
        fill="none"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        style={{ originX: '340px', originY: '60px' }}
      />
      <text x="340" y="64" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="10" fontFamily="var(--font-mono)">S</text>
    </svg>
  );
}

function OntologyIllustration(): JSX.Element {
  return (
    <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Central hub */}
      <circle cx="200" cy="120" r="24" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
      <text x="200" y="124" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="11" fontFamily="var(--font-mono)">KG</text>

      {/* Orbiting nodes */}
      {[
        { cx: 120, cy: 80, label: 'P' },
        { cx: 280, cy: 80, label: 'C' },
        { cx: 120, cy: 160, label: 'I' },
        { cx: 280, cy: 160, label: 'O' },
        { cx: 200, cy: 50, label: 'T' },
        { cx: 200, cy: 190, label: 'R' },
      ].map((node, i) => (
        <g key={i}>
          <line x1="200" y1="120" x2={node.cx} y2={node.cy} stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          <circle cx={node.cx} cy={node.cy} r="14" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
          <text x={node.cx} y={node.cy + 4} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="var(--font-mono)">{node.label}</text>
        </g>
      ))}

      {/* Outer orbit ring */}
      <motion.ellipse
        cx="200"
        cy="120"
        rx="100"
        ry="70"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth="1"
        strokeDasharray="8 6"
        fill="none"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        style={{ originX: '200px', originY: '120px' }}
      />

      {/* Projection beams from top */}
      {[160, 200, 240].map((x, i) => (
        <motion.line
          key={i}
          x1={x}
          y1="10"
          x2={x}
          y2="96"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="1"
          strokeDasharray="4 4"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
        />
      ))}
    </svg>
  );
}

function IntegrationSyncIllustration(): JSX.Element {
  return (
    <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* External platforms as nodes on the perimeter */}
      {[
        { x: 60, y: 60, label: 'Slack' },
        { x: 340, y: 60, label: 'Git' },
        { x: 60, y: 180, label: 'HubSpot' },
        { x: 340, y: 180, label: 'Linear' },
        { x: 200, y: 30, label: 'Ads' },
      ].map((platform, i) => (
        <g key={i}>
          <motion.line
            x1={platform.x}
            y1={platform.y}
            x2="200"
            y2="120"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
            strokeDasharray="4 4"
            animate={{ strokeDashoffset: [0, -16] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay: i * 0.3 }}
          />
          <rect
            x={platform.x - 24}
            y={platform.y - 10}
            width="48"
            height="20"
            rx="4"
            fill="rgba(255,255,255,0.03)"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
          />
          <text x={platform.x} y={platform.y + 4} textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="8" fontFamily="var(--font-mono)">{platform.label}</text>
        </g>
      ))}

      {/* Central ingestion hub */}
      <motion.circle
        cx="200"
        cy="120"
        r="32"
        fill="rgba(255,255,255,0.03)"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="1.5"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
        style={{ originX: '200px', originY: '120px' }}
      />
      <motion.circle
        cx="200"
        cy="120"
        r="40"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="1"
        strokeDasharray="6 4"
        fill="none"
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        style={{ originX: '200px', originY: '120px' }}
      />
      <text x="200" y="124" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="10" fontFamily="var(--font-mono)">◉</text>

      {/* Outgoing event stream */}
      <motion.path
        d="M 200 152 Q 200 200 280 210"
        stroke="rgba(255,255,255,0.12)"
        strokeWidth="1.5"
        fill="none"
        strokeDasharray="6 4"
        animate={{ strokeDashoffset: [0, -20] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
      />
      <polygon points="278,204 288,212 276,216" fill="rgba(255,255,255,0.2)" />
      <rect x="290" y="200" width="50" height="20" rx="4" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      <text x="315" y="213" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="8" fontFamily="var(--font-mono)">Event Log</text>
    </svg>
  );
}

function ContextBuilderIllustration(): JSX.Element {
  return (
    <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Concentric context layers */}
      {[100, 80, 60, 40].map((r, i) => (
        <motion.circle
          key={i}
          cx="200"
          cy="120"
          r={r}
          fill="none"
          stroke={`rgba(255,255,255,${0.06 + i * 0.03})`}
          strokeWidth="1"
          strokeDasharray={i % 2 === 0 ? '8 6' : '4 4'}
          animate={i % 2 === 0 ? { rotate: 360 } : { rotate: -360 }}
          transition={{ duration: 20 + i * 5, repeat: Infinity, ease: 'linear' }}
          style={{ originX: '200px', originY: '120px' }}
        />
      ))}

      {/* Core agent */}
      <circle cx="200" cy="120" r="16" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
      <text x="200" y="124" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="10" fontFamily="var(--font-mono)">A</text>

      {/* Context type nodes on outer rings — precomputed */}
      {[
        { x: 290, y: 120, label: 'Planner' },
        { x: 200, y: 210, label: 'Build' },
        { x: 110, y: 120, label: 'Growth' },
        { x: 200, y: 30, label: 'Capital' },
      ].map((ctx, i) => (
        <g key={i}>
          <line x1="200" y1="120" x2={ctx.x} y2={ctx.y} stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          <circle cx={ctx.x} cy={ctx.y} r="10" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
          <text x={ctx.x} y={ctx.y + 3} textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="7" fontFamily="var(--font-mono)">{ctx.label}</text>
        </g>
      ))}

      {/* Memory fragments orbiting — precomputed */}
      {[
        { cx: 270, cy: 120 },
        { cx: 241.7, cy: 186.6 },
        { cx: 158.3, cy: 186.6 },
        { cx: 130, cy: 120 },
        { cx: 158.3, cy: 53.4 },
      ].map((frag, i) => (
        <motion.circle
          key={i}
          r="2"
          fill="rgba(255,255,255,0.3)"
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear', delay: i * 0.5 }}
          style={{
            originX: '200px',
            originY: '120px',
            cx: frag.cx,
            cy: frag.cy,
          }}
        />
      ))}
    </svg>
  );
}

const ILLUSTRATIONS: Record<string, () => JSX.Element> = {
  'event-sourcing': EventSourcingIllustration,
  'ontology-projection': OntologyIllustration,
  'integration-sync': IntegrationSyncIllustration,
  'context-builder': ContextBuilderIllustration,
};

/* ------------------------------------------------------------------ */
/*  Desktop Row                                                        */
/* ------------------------------------------------------------------ */

function DesktopRow({
  item,
  index,
}: {
  item: (typeof AWARENESS_ITEMS)[0];
  index: number;
}): JSX.Element {
  const prefersReducedMotion = useReducedMotion();
  const Illustration = ILLUSTRATIONS[item.id];
  const isReversed = index % 2 === 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.7,
        delay: prefersReducedMotion ? 0 : 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="hidden lg:grid grid-cols-12 gap-12 items-center"
      style={{ padding: '60px 0' }}
    >
      {/* Illustration */}
      <div className={isReversed ? 'col-span-7 col-start-6' : 'col-span-7'}>
        <div className="relative w-full" style={{ height: '300px' }}>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.025) 0%, transparent 70%)',
            }}
          />
          <div className="relative w-full h-full p-6">
            {Illustration && <Illustration />}
          </div>
        </div>
      </div>

      {/* Text */}
      <div className={isReversed ? 'col-span-4 col-start-1 row-start-1' : 'col-span-4 col-start-9'}>
        <div className="flex flex-col gap-4">
          {/* Number + label */}
          <div className="flex items-center gap-3">
            <span
              className="font-mono text-xs font-bold"
              style={{
                color: 'rgba(255,255,255,0.2)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
          </div>

          {/* Title */}
          <h3
            className="text-2xl font-semibold"
            style={{
              color: '#FFFFFF',
              fontFamily: 'var(--font-headline)',
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
              margin: 0,
            }}
          >
            {item.label}
          </h3>

          {/* Description */}
          <p
            className="text-sm"
            style={{
              color: 'rgba(255,255,255,0.5)',
              fontFamily: 'var(--font-body)',
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            {item.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-1">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded text-[11px] font-mono"
                style={{
                  color: 'rgba(255,255,255,0.35)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Mobile Stack                                                       */
/* ------------------------------------------------------------------ */

function MobileStack(): JSX.Element {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="lg:hidden flex flex-col gap-16">
      {AWARENESS_ITEMS.map((item, index) => {
        const Illustration = ILLUSTRATIONS[item.id];
        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.6,
              delay: prefersReducedMotion ? 0 : index * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex flex-col gap-5"
          >
            {/* Illustration */}
            <div className="relative w-full" style={{ height: '200px' }}>
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.02) 0%, transparent 70%)',
                }}
              />
              <div className="relative w-full h-full p-4">
                {Illustration && <Illustration />}
              </div>
            </div>

            {/* Text */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span
                  className="font-mono text-xs font-bold"
                  style={{
                    color: 'rgba(255,255,255,0.25)',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3
                  className="text-lg font-semibold"
                  style={{
                    color: '#FFFFFF',
                    fontFamily: 'var(--font-headline)',
                    letterSpacing: '-0.01em',
                    margin: 0,
                  }}
                >
                  {item.label}
                </h3>
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
                {item.description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded text-[10px] font-mono"
                    style={{
                      color: 'rgba(255,255,255,0.3)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Section                                                       */
/* ------------------------------------------------------------------ */

export default function RealTimeAwarenessSection(): JSX.Element {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="awareness"
      className="relative overflow-hidden"
      aria-labelledby="awareness-title"
      style={{
        paddingTop: 'clamp(80px, 10vw, 140px)',
        paddingBottom: 'clamp(80px, 10vw, 140px)',
      }}
    >
      {/* Ambient background */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: '600px',
          height: '800px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(255,255,255,0.02) 0%, transparent 70%)',
          top: '50%',
          left: '0',
          transform: 'translateY(-50%)',
          filter: 'blur(80px)',
        }}
      />

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
            id="awareness-title"
            className="font-semibold text-white"
            style={{
              fontSize: 'clamp(32px, 4vw, 48px)',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              margin: '0 0 16px 0',
              fontFamily: 'var(--font-headline)',
            }}
          >
            Complete awareness
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
            Rivtor sees everything. Not through dashboards — through events.
          </p>
        </motion.div>

        {/* Desktop: Alternating rows */}
        <div className="hidden lg:flex flex-col">
          {AWARENESS_ITEMS.map((item, index) => (
            <DesktopRow key={item.id} item={item} index={index} />
          ))}
        </div>

        {/* Mobile: Stacked */}
        <MobileStack />
      </div>
    </section>
  );
}
