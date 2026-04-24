'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { JSX } from 'react';

/* ------------------------------------------------------------------ */
/*  Data — deduplicated from Intelligence + Learning                   */
/* ------------------------------------------------------------------ */

const CAPABILITIES = [
  {
    id: 'taste-system',
    label: 'Taste System',
    description:
      'Aesthetic and design judgment compressed into decision-making. Six engines generate diverse options, compare them relationally, simulate futures, and critique from multiple perspectives.',
    tags: ['Divergence', 'Comparative', 'Simulation', 'Braintrust', 'Authority', 'Memory'],
  },
  {
    id: 'world-model',
    label: 'World Model',
    description:
      'Predictive simulation of future states. Agents mentally rehearse action sequences before executing them, measuring both pragmatic and epistemic value.',
    tags: ['State encoding', 'Action prediction', 'Value estimation', 'Uncertainty modeling'],
  },
  {
    id: 'uncertainty-handler',
    label: 'Uncertainty Handler',
    description:
      'Probabilistic reasoning across four dimensions: epistemic, aleatoric, model, and adversarial. Calibrates confidence for every decision.',
    tags: ['Epistemic', 'Aleatoric', 'Model', 'Adversarial', 'Confidence calibration'],
  },
  {
    id: 'unified-learning-loop',
    label: 'Unified Learning Loop',
    description:
      'Every decision to outcome to credit to update to validation cycle improves the system. All subsystems feed into a continuous improvement engine.',
    tags: ['Outcome observation', 'Credit assignment', 'Model updates', 'Validation'],
  },
  {
    id: 'memory-layers',
    label: '4-Layer Memory',
    description:
      'Neuroscience-inspired memory hierarchy: Working, Episodic, Semantic, and Procedural. Memories consolidate across layers based on importance.',
    tags: ['Working', 'Episodic', 'Semantic', 'Procedural', 'Consolidation'],
  },
  {
    id: 'credit-assignment',
    label: 'Credit Assignment',
    description:
      'Distributes credit for outcomes across decisions and agents with temporal discounting. Learns which agents and strategies are most reliable.',
    tags: ['Direct credit', 'Indirect credit', 'Temporal discount', 'Multi-agent attribution'],
  },
  {
    id: 'narrative-intelligence',
    label: 'Narrative Intelligence',
    description:
      'Meaning construction and coherence maintenance. Ensures decisions align with company narrative and explanations make sense to stakeholders.',
    tags: ['Construction', 'Coherence', 'Alignment', 'Propagation', 'Memory'],
  },
  {
    id: 'action-perception-loop',
    label: 'Action-Perception Loop',
    description:
      'Active Inference theory: perception and action unified by free energy minimization. Models update continuously based on prediction errors.',
    tags: ['Perception', 'Deliberation', 'Action', 'Learning', 'Free energy minimization'],
  },
];

/* ------------------------------------------------------------------ */
/*  Illustrations                                                      */
/* ------------------------------------------------------------------ */

function TasteSystemIllustration(): JSX.Element {
  return (
    <svg viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <motion.polygon
        points="160,30 220,65 220,115 160,150 100,115 100,65"
        fill="rgba(255,255,255,0.03)"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="1"
        animate={{ rotate: [0, 3, 0, -3, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{ originX: '160px', originY: '90px' }}
      />
      <polygon points="160,55 190,75 190,105 160,125 130,105 130,75" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      {/* Orbiting critique nodes — precomputed */}
      {[
        { x: 225, y: 90, label: 'D' },
        { x: 192.5, y: 146.3, label: 'C' },
        { x: 127.5, y: 146.3, label: 'S' },
        { x: 95, y: 90, label: 'B' },
        { x: 127.5, y: 33.7, label: 'A' },
        { x: 192.5, y: 33.7, label: 'M' },
      ].map((node, i) => (
        <g key={i}>
          <line x1="160" y1="90" x2={node.x} y2={node.y} stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          <circle cx={node.x} cy={node.y} r="10" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          <text x={node.x} y={node.y + 3} textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="7" fontFamily="var(--font-mono)">{node.label}</text>
        </g>
      ))}
      <motion.circle
        cx="160"
        cy="90"
        r="65"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth="1"
        strokeDasharray="6 4"
        fill="none"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        style={{ originX: '160px', originY: '90px' }}
      />
    </svg>
  );
}

function WorldModelIllustration(): JSX.Element {
  return (
    <svg viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="160" cy="90" r="40" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      <motion.circle
        cx="160"
        cy="90"
        r="30"
        stroke="rgba(255,255,255,0.1)"
        strokeWidth="1"
        strokeDasharray="4 4"
        fill="none"
        animate={{ rotate: 360 }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        style={{ originX: '160px', originY: '90px' }}
      />
      {[
        { x1: 200, y1: 70, x2: 260, y2: 40 },
        { x1: 195, y1: 85, x2: 270, y2: 80 },
        { x1: 200, y1: 100, x2: 260, y2: 130 },
        { x1: 120, y1: 70, x2: 60, y2: 40 },
        { x1: 125, y1: 90, x2: 50, y2: 90 },
        { x1: 120, y1: 105, x2: 60, y2: 130 },
      ].map((line, i) => (
        <g key={i}>
          <motion.line
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
            strokeDasharray="3 3"
            animate={{ opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
          />
          <circle cx={line.x2} cy={line.y2} r="4" fill="rgba(255,255,255,0.15)" />
        </g>
      ))}
      {[40, 280].map((x, i) => (
        <motion.ellipse
          key={i}
          cx={x}
          cy={90}
          rx="20"
          ry="30"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="1"
          fill="none"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity, delay: i * 2 }}
          style={{ originX: `${x}px`, originY: '90px' }}
        />
      ))}
    </svg>
  );
}

function UncertaintyHandlerIllustration(): JSX.Element {
  return (
    <svg viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {[
        { x: 80, y: 50, label: 'E' },
        { x: 240, y: 50, label: 'A' },
        { x: 80, y: 130, label: 'M' },
        { x: 240, y: 130, label: 'D' },
      ].map((quad, i) => (
        <g key={i}>
          <rect
            x={quad.x - 35}
            y={quad.y - 25}
            width="70"
            height="50"
            rx="8"
            fill="rgba(255,255,255,0.02)"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
          />
          <text x={quad.x} y={quad.y + 4} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="12" fontFamily="var(--font-mono)">{quad.label}</text>
        </g>
      ))}
      <circle cx="160" cy="90" r="20" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
      <text x="160" y="94" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="10" fontFamily="var(--font-mono)">P</text>
      {[
        { x1: 120, y1: 65, x2: 145, y2: 80 },
        { x1: 200, y1: 65, x2: 175, y2: 80 },
        { x1: 120, y1: 115, x2: 145, y2: 100 },
        { x1: 200, y1: 115, x2: 175, y2: 100 },
      ].map((line, i) => (
        <motion.line
          key={i}
          x1={line.x1}
          y1={line.y1}
          x2={line.x2}
          y2={line.y2}
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="1"
          strokeDasharray="4 4"
          animate={{ strokeDashoffset: [0, -16] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay: i * 0.3 }}
        />
      ))}
    </svg>
  );
}

function LearningLoopIllustration(): JSX.Element {
  return (
    <svg viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {[
        { x: 60, y: 90, label: 'Decide', w: 55 },
        { x: 130, y: 60, label: 'Outcome', w: 55 },
        { x: 200, y: 90, label: 'Credit', w: 50 },
        { x: 130, y: 120, label: 'Update', w: 55 },
      ].map((node, i) => (
        <g key={i}>
          <rect x={node.x} y={node.y - 12} width={node.w} height="24" rx="4" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
          <text x={node.x + node.w / 2} y={node.y + 4} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="var(--font-mono)">{node.label}</text>
        </g>
      ))}
      <motion.path
        d="M 115 90 Q 130 75 130 60"
        stroke="rgba(255,255,255,0.1)"
        strokeWidth="1.5"
        fill="none"
        markerEnd="url(#arr3)"
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.path
        d="M 185 60 Q 200 75 200 90"
        stroke="rgba(255,255,255,0.1)"
        strokeWidth="1.5"
        fill="none"
        markerEnd="url(#arr3)"
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
      />
      <motion.path
        d="M 200 102 Q 185 120 185 120"
        stroke="rgba(255,255,255,0.1)"
        strokeWidth="1.5"
        fill="none"
        markerEnd="url(#arr3)"
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
      />
      <motion.path
        d="M 130 108 Q 115 90 115 90"
        stroke="rgba(255,255,255,0.1)"
        strokeWidth="1.5"
        fill="none"
        markerEnd="url(#arr3)"
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
      />
      <defs>
        <marker id="arr3" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
          <polygon points="0 0, 5 2.5, 0 5" fill="rgba(255,255,255,0.2)" />
        </marker>
      </defs>
    </svg>
  );
}

function MemoryLayersIllustration(): JSX.Element {
  return (
    <svg viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {[
        { y: 40, label: 'Working', w: 120, opacity: 0.3 },
        { y: 75, label: 'Episodic', w: 160, opacity: 0.25 },
        { y: 110, label: 'Semantic', w: 200, opacity: 0.2 },
        { y: 145, label: 'Procedural', w: 240, opacity: 0.15 },
      ].map((layer, i) => (
        <g key={i}>
          <motion.rect
            x={160 - layer.w / 2}
            y={layer.y}
            width={layer.w}
            height="24"
            rx="4"
            fill={`rgba(255,255,255,${layer.opacity * 0.1})`}
            stroke={`rgba(255,255,255,${layer.opacity})`}
            strokeWidth="1"
            animate={{ x: [160 - layer.w / 2, 160 - layer.w / 2 + 5, 160 - layer.w / 2] }}
            transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
          />
          <text x="160" y={layer.y + 15} textAnchor="middle" fill={`rgba(255,255,255,${layer.opacity + 0.2})`} fontSize="9" fontFamily="var(--font-mono)">{layer.label}</text>
        </g>
      ))}
      <motion.line
        x1="160"
        y1="25"
        x2="160"
        y2="170"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="1"
        strokeDasharray="4 4"
        animate={{ strokeDashoffset: [0, -16] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      />
    </svg>
  );
}

function CreditAssignmentIllustration(): JSX.Element {
  return (
    <svg viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Agents */}
      {[
        { x: 80, y: 60, label: 'A1' },
        { x: 160, y: 50, label: 'A2' },
        { x: 240, y: 60, label: 'A3' },
      ].map((agent, i) => (
        <g key={i}>
          <circle cx={agent.x} cy={agent.y} r="14" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
          <text x={agent.x} y={agent.y + 3} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="var(--font-mono)">{agent.label}</text>
        </g>
      ))}
      {/* Outcome */}
      <rect x="130" y="130" width="60" height="24" rx="4" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      <text x="160" y="146" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="var(--font-mono)">Outcome</text>
      {/* Credit distribution lines */}
      {[
        { x1: 80, y1: 74, x2: 140, y2: 130 },
        { x1: 160, y1: 64, x2: 160, y2: 130 },
        { x1: 240, y1: 74, x2: 180, y2: 130 },
      ].map((line, i) => (
        <motion.line
          key={i}
          x1={line.x1}
          y1={line.y1}
          x2={line.x2}
          y2={line.y2}
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="1"
          strokeDasharray="4 4"
          animate={{ strokeDashoffset: [0, -16] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay: i * 0.4 }}
        />
      ))}
    </svg>
  );
}

function NarrativeIllustration(): JSX.Element {
  return (
    <svg viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Story nodes connected */}
      {[
        { x: 60, y: 90 },
        { x: 120, y: 70 },
        { x: 180, y: 110 },
        { x: 240, y: 80 },
        { x: 300, y: 90 },
      ].map((node, i) => (
        <g key={i}>
          <circle cx={node.x} cy={node.y} r="5" fill="rgba(255,255,255,0.2)" />
          {i < 4 && (
            <line x1={node.x} y1={node.y} x2={[120, 180, 240, 300][i]} y2={[70, 110, 80, 90][i]} stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          )}
        </g>
      ))}
      {/* Coherence wave */}
      <motion.path
        d="M 40 140 Q 100 120 160 140 Q 220 160 280 140"
        stroke="rgba(255,255,255,0.1)"
        strokeWidth="1.5"
        fill="none"
        strokeDasharray="6 4"
        animate={{ strokeDashoffset: [0, -20] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
      />
      {/* Alignment indicator */}
      <motion.circle
        cx="160"
        cy="140"
        r="8"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="1"
        fill="none"
        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </svg>
  );
}

function ActionPerceptionIllustration(): JSX.Element {
  return (
    <svg viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Perception → Deliberation → Action cycle */}
      <circle cx="100" cy="90" r="25" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      <text x="100" y="93" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="var(--font-mono)">Sense</text>

      <circle cx="220" cy="90" r="25" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      <text x="220" y="93" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="var(--font-mono)">Act</text>

      {/* Connecting arrows */}
      <motion.path
        d="M 125 80 Q 160 50 195 80"
        stroke="rgba(255,255,255,0.12)"
        strokeWidth="1.5"
        fill="none"
        markerEnd="url(#arr4)"
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.path
        d="M 195 100 Q 160 130 125 100"
        stroke="rgba(255,255,255,0.12)"
        strokeWidth="1.5"
        fill="none"
        markerEnd="url(#arr4)"
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
      />

      {/* Free energy minimization curve */}
      <motion.ellipse
        cx="160"
        cy="90"
        rx="70"
        ry="45"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth="1"
        strokeDasharray="8 6"
        fill="none"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        style={{ originX: '160px', originY: '90px' }}
      />
      <defs>
        <marker id="arr4" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
          <polygon points="0 0, 5 2.5, 0 5" fill="rgba(255,255,255,0.2)" />
        </marker>
      </defs>
    </svg>
  );
}

const ILLUSTRATIONS: Record<string, () => JSX.Element> = {
  'taste-system': TasteSystemIllustration,
  'world-model': WorldModelIllustration,
  'uncertainty-handler': UncertaintyHandlerIllustration,
  'unified-learning-loop': LearningLoopIllustration,
  'memory-layers': MemoryLayersIllustration,
  'credit-assignment': CreditAssignmentIllustration,
  'narrative-intelligence': NarrativeIllustration,
  'action-perception-loop': ActionPerceptionIllustration,
};

/* ------------------------------------------------------------------ */
/*  Desktop: 2-column horizontal rows                                  */
/* ------------------------------------------------------------------ */

function DesktopLayout(): JSX.Element {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="hidden lg:grid grid-cols-2 gap-x-10 gap-y-12">
      {CAPABILITIES.map((item, index) => {
        const Illustration = ILLUSTRATIONS[item.id];
        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.6,
              delay: prefersReducedMotion ? 0 : (index % 2) * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex items-start gap-5"
          >
            {/* Illustration */}
            <div className="relative flex-shrink-0" style={{ width: '140px', height: '100px' }}>
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.02) 0%, transparent 70%)',
                }}
              />
              <div className="relative w-full h-full p-2">
                {Illustration && <Illustration />}
              </div>
            </div>

            {/* Text */}
            <div className="flex flex-col gap-2 min-w-0">
              <div className="flex items-center gap-2">
                <span
                  className="font-mono text-[10px] font-bold"
                  style={{
                    color: 'rgba(255,255,255,0.2)',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3
                  className="text-base font-semibold"
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
                  color: 'rgba(255,255,255,0.45)',
                  fontFamily: 'var(--font-body)',
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                {item.description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {item.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-1.5 py-0.5 rounded text-[10px] font-mono"
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
/*  Mobile Stack                                                       */
/* ------------------------------------------------------------------ */

function MobileStack(): JSX.Element {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="lg:hidden flex flex-col gap-12">
      {CAPABILITIES.map((item, index) => {
        const Illustration = ILLUSTRATIONS[item.id];
        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.6,
              delay: prefersReducedMotion ? 0 : index * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex flex-col gap-4"
          >
            {/* Illustration */}
            <div className="relative w-full" style={{ height: '160px' }}>
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.02) 0%, transparent 70%)',
                }}
              />
              <div className="relative w-full h-full p-3">
                {Illustration && <Illustration />}
              </div>
            </div>

            {/* Text */}
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-3">
                <span
                  className="font-mono text-[11px] font-bold"
                  style={{
                    color: 'rgba(255,255,255,0.25)',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3
                  className="text-base font-semibold"
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

export default function IntelligenceLearningSection(): JSX.Element {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="intelligence"
      className="relative overflow-hidden"
      aria-labelledby="intelligence-title"
      style={{
        paddingTop: 'clamp(80px, 10vw, 140px)',
        paddingBottom: 'clamp(80px, 10vw, 140px)',
      }}
    >
      {/* Ambient glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(255,255,255,0.02) 0%, transparent 70%)',
          top: '20%',
          right: '-5%',
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
            id="intelligence-title"
            className="font-semibold text-white"
            style={{
              fontSize: 'clamp(32px, 4vw, 48px)',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              margin: '0 0 16px 0',
              fontFamily: 'var(--font-headline)',
            }}
          >
            Intelligence that executes.
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
            Not just reasoning. Reasoning connected to action. Learning from every outcome.
          </p>
        </motion.div>

        {/* Content */}
        <DesktopLayout />
        <MobileStack />
      </div>
    </section>
  );
}
