'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { JSX } from 'react';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const AUTONOMY_ITEMS = [
  {
    id: 'decision-engine',
    label: 'Decision Engine',
    description: 'Frames problems, generates structurally diverse options, consults specialist agents, and selects the optimal path.',
    tags: ['Problem framing', 'Option generation', 'Multi-agent consultation', 'Intelligence evaluation'],
  },
  {
    id: 'agent-os',
    label: 'Agent OS',
    description: 'A multi-agent operating system where agents coordinate, schedule, and execute without human intervention.',
    tags: ['Orchestrator', 'Scheduler', 'Event Bus', 'Resource Locks', 'Recovery Engine'],
  },
  {
    id: 'task-graph',
    label: 'Task Graph Engine',
    description: 'Graph-based task management with efficient traversal, cycle detection, and parallel grouping.',
    tags: ['Graph traversal', 'Cycle detection', 'Parallel grouping', 'Distributed caching'],
  },
  {
    id: 'tool-registry',
    label: 'Tool Registry',
    description: 'Unified tool system with agent-based permissions. Agents select and execute tools based on capability requirements.',
    tags: ['Category-based', 'Permission-controlled', 'Usage tracking', 'Approval gates'],
  },
  {
    id: 'execution-compiler',
    label: 'Execution Compiler',
    description: 'Transforms plans into compiled execution graphs with atomic nodes, verification steps, and retry logic.',
    tags: ['Decision → Plan', 'Plan → Task Graph', 'Atomic nodes', 'Verification'],
  },
  {
    id: 'sandboxed-execution',
    label: 'Sandboxed Execution',
    description: 'Code and workflows execute in isolated environments with automatic cleanup and controlled resource access.',
    tags: ['Isolated environments', 'Controlled access', 'Terminal access', 'Auto cleanup'],
  },
];

/* ------------------------------------------------------------------ */
/*  Illustrations                                                      */
/* ------------------------------------------------------------------ */

function DecisionEngineIllustration(): JSX.Element {
  return (
    <svg viewBox="0 0 360 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Central diamond */}
      <motion.polygon
        points="180,40 260,110 180,180 100,110"
        fill="rgba(255,255,255,0.03)"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="1.5"
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
        style={{ originX: '180px', originY: '110px' }}
      />
      {/* Question mark */}
      <text x="180" y="116" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="18" fontFamily="var(--font-mono)">?</text>

      {/* Radiating option paths */}
      {[
        { x1: 260, y1: 110, x2: 320, y2: 60 },
        { x1: 260, y1: 110, x2: 330, y2: 110 },
        { x1: 260, y1: 110, x2: 320, y2: 160 },
        { x1: 100, y1: 110, x2: 40, y2: 60 },
        { x1: 100, y1: 110, x2: 30, y2: 110 },
        { x1: 100, y1: 110, x2: 40, y2: 160 },
      ].map((line, i) => (
        <g key={i}>
          <line x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2} stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx={line.x2} cy={line.y2} r="4" fill="rgba(255,255,255,0.2)" />
        </g>
      ))}

      {/* Evaluation rings */}
      <motion.circle
        cx="180"
        cy="110"
        r="75"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth="1"
        strokeDasharray="8 6"
        fill="none"
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        style={{ originX: '180px', originY: '110px' }}
      />
    </svg>
  );
}

function AgentOSIllustration(): JSX.Element {
  return (
    <svg viewBox="0 0 360 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Central orchestrator */}
      <circle cx="180" cy="110" r="20" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
      <text x="180" y="114" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9" fontFamily="var(--font-mono)">OS</text>

      {/* Orbiting agents — precomputed to avoid hydration mismatch */}
      {[
        { x: 250, y: 110, label: 'A1' },
        { x: 215, y: 170.6, label: 'A2' },
        { x: 145, y: 170.6, label: 'A3' },
        { x: 110, y: 110, label: 'A4' },
        { x: 145, y: 49.4, label: 'A5' },
        { x: 215, y: 49.4, label: 'A6' },
      ].map((agent, i) => (
        <g key={i}>
          <line x1="180" y1="110" x2={agent.x} y2={agent.y} stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          <circle cx={agent.x} cy={agent.y} r="12" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
          <text x={agent.x} y={agent.y + 3} textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="7" fontFamily="var(--font-mono)">{agent.label}</text>
        </g>
      ))}

      {/* Orbit ring */}
      <motion.circle
        cx="180"
        cy="110"
        r="70"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth="1"
        strokeDasharray="6 4"
        fill="none"
        animate={{ rotate: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        style={{ originX: '180px', originY: '110px' }}
      />

      {/* Event bus lines */}
      {[40, 320].map((x, i) => (
        <motion.line
          key={i}
          x1={x}
          y1="110"
          x2={i === 0 ? '80' : '280'}
          y2="110"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="1"
          strokeDasharray="4 4"
          animate={{ strokeDashoffset: [0, -16] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear', delay: i * 0.5 }}
        />
      ))}
    </svg>
  );
}

function TaskGraphIllustration(): JSX.Element {
  return (
    <svg viewBox="0 0 360 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* DAG nodes */}
      {[
        { cx: 180, cy: 30, r: 8 },
        { cx: 120, cy: 80, r: 7 },
        { cx: 240, cy: 80, r: 7 },
        { cx: 90, cy: 140, r: 6 },
        { cx: 150, cy: 140, r: 6 },
        { cx: 210, cy: 140, r: 6 },
        { cx: 270, cy: 140, r: 6 },
        { cx: 180, cy: 190, r: 8 },
      ].map((node, i) => (
        <circle key={i} cx={node.cx} cy={node.cy} r={node.r} fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      ))}

      {/* Edges */}
      <g stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" markerEnd="url(#arrow)">
        <line x1="176" y1="37" x2="124" y2="73" />
        <line x1="184" y1="37" x2="236" y2="73" />
        <line x1="116" y1="87" x2="94" y2="133" />
        <line x1="124" y1="87" x2="146" y2="133" />
        <line x1="236" y1="87" x2="214" y2="133" />
        <line x1="244" y1="87" x2="266" y2="133" />
        <line x1="96" y1="146" x2="174" y2="183" />
        <line x1="146" y1="146" x2="176" y2="183" />
        <line x1="214" y1="146" x2="184" y2="183" />
        <line x1="266" y1="146" x2="186" y2="183" />
      </g>

      {/* Cycle detection ring */}
      <motion.ellipse
        cx="180"
        cy="110"
        rx="100"
        ry="70"
        stroke="rgba(255,255,255,0.05)"
        strokeWidth="1"
        strokeDasharray="8 6"
        fill="none"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        style={{ originX: '180px', originY: '110px' }}
      />

      <defs>
        <marker id="arrow" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
          <polygon points="0 0, 5 2.5, 0 5" fill="rgba(255,255,255,0.15)" />
        </marker>
      </defs>
    </svg>
  );
}

function ToolRegistryIllustration(): JSX.Element {
  return (
    <svg viewBox="0 0 360 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Central registry hub */}
      <rect x="150" y="90" width="60" height="40" rx="6" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
      <text x="180" y="114" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9" fontFamily="var(--font-mono)">REG</text>

      {/* Tool categories */}
      {[
        { x: 60, y: 40, label: 'Code' },
        { x: 260, y: 40, label: 'Comm' },
        { x: 60, y: 160, label: 'Data' },
        { x: 260, y: 160, label: 'Deploy' },
      ].map((tool, i) => (
        <g key={i}>
          <motion.line
            x1={tool.x + 24}
            y1={tool.y + 10}
            x2={tool.x < 180 ? '150' : '210'}
            y2={tool.y < 110 ? '90' : '130'}
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
            strokeDasharray="4 4"
            animate={{ strokeDashoffset: [0, -16] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay: i * 0.3 }}
          />
          <rect x={tool.x} y={tool.y} width="48" height="20" rx="4" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          <text x={tool.x + 24} y={tool.y + 13} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="var(--font-mono)">{tool.label}</text>
        </g>
      ))}

      {/* Permission gate indicators */}
      {[155, 165, 175, 185, 195, 205].map((x, i) => (
        <motion.rect
          key={i}
          x={x}
          y="80"
          width="4"
          height="4"
          rx="1"
          fill="rgba(255,255,255,0.2)"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </svg>
  );
}

function ExecutionCompilerIllustration(): JSX.Element {
  return (
    <svg viewBox="0 0 360 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Input: Decision */}
      <rect x="30" y="90" width="60" height="30" rx="4" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
      <text x="60" y="109" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="var(--font-mono)">Decision</text>

      {/* Arrow 1 */}
      <motion.line
        x1="95"
        y1="105"
        x2="125"
        y2="105"
        stroke="rgba(255,255,255,0.15)"
        strokeWidth="1.5"
        markerEnd="url(#arr2)"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Compiler */}
      <rect x="130" y="80" width="60" height="50" rx="6" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
      <text x="160" y="108" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9" fontFamily="var(--font-mono)">Compile</text>
      {/* Gear icon */}
      <motion.g animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: 'linear' }} style={{ originX: '160px', originY: '95px' }}>
        <circle cx="160" cy="95" r="6" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none" />
        <circle cx="160" cy="95" r="2" fill="rgba(255,255,255,0.3)" />
      </motion.g>

      {/* Arrow 2 */}
      <motion.line
        x1="195"
        y1="105"
        x2="225"
        y2="105"
        stroke="rgba(255,255,255,0.15)"
        strokeWidth="1.5"
        markerEnd="url(#arr2)"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
      />

      {/* Output: Task Graph */}
      <rect x="230" y="90" width="60" height="30" rx="4" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
      <text x="260" y="109" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="var(--font-mono)">Task Graph</text>

      {/* Atomic nodes below */}
      {[245, 265, 285].map((x, i) => (
        <g key={i}>
          <motion.line
            x1={x}
            y1="120"
            x2={x}
            y2="145"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
            strokeDasharray="3 3"
            animate={{ strokeDashoffset: [0, -12] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear', delay: i * 0.2 }}
          />
          <rect x={x - 10} y="145" width="20" height="16" rx="3" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        </g>
      ))}

      {/* Verification checkmarks */}
      {[250, 270].map((x, i) => (
        <motion.text
          key={i}
          x={x}
          y="175"
          textAnchor="middle"
          fill="rgba(255,255,255,0.25)"
          fontSize="10"
          fontFamily="var(--font-mono)"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
        >
          ✓
        </motion.text>
      ))}

      <defs>
        <marker id="arr2" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
          <polygon points="0 0, 5 2.5, 0 5" fill="rgba(255,255,255,0.2)" />
        </marker>
      </defs>
    </svg>
  );
}

function SandboxedExecutionIllustration(): JSX.Element {
  return (
    <svg viewBox="0 0 360 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Outer boundary */}
      <rect x="100" y="40" width="160" height="140" rx="12" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" strokeDasharray="8 4" />

      {/* Inner sandbox containers */}
      {[
        { x: 120, y: 60, w: 50, h: 40 },
        { x: 190, y: 60, w: 50, h: 40 },
        { x: 120, y: 120, w: 50, h: 40 },
        { x: 190, y: 120, w: 50, h: 40 },
      ].map((box, i) => (
        <g key={i}>
          <rect x={box.x} y={box.y} width={box.w} height={box.h} rx="6" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          <motion.rect
            x={box.x + 8}
            y={box.y + 8}
            width={box.w - 16}
            height="4"
            rx="2"
            fill="rgba(255,255,255,0.08)"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
          />
          <motion.rect
            x={box.x + 8}
            y={box.y + 18}
            width={(box.w - 16) * 0.6}
            height="4"
            rx="2"
            fill="rgba(255,255,255,0.06)"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 + 0.2 }}
          />
        </g>
      ))}

      {/* Shield / lock icon center */}
      <motion.g animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 3, repeat: Infinity }}>
        <circle cx="180" cy="110" r="14" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        <rect x="174" y="106" width="12" height="8" rx="1" stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="none" />
        <circle cx="180" cy="103" r="3" stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="none" />
      </motion.g>

      {/* Terminal line at bottom */}
      <motion.line
        x1="120"
        y1="195"
        x2="240"
        y2="195"
        stroke="rgba(255,255,255,0.1)"
        strokeWidth="1"
        strokeDasharray="4 4"
        animate={{ strokeDashoffset: [0, -16] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      />
      <text x="120" y="192" fill="rgba(255,255,255,0.2)" fontSize="8" fontFamily="var(--font-mono)">$</text>
    </svg>
  );
}

const ILLUSTRATIONS: Record<string, () => JSX.Element> = {
  'decision-engine': DecisionEngineIllustration,
  'agent-os': AgentOSIllustration,
  'task-graph': TaskGraphIllustration,
  'tool-registry': ToolRegistryIllustration,
  'execution-compiler': ExecutionCompilerIllustration,
  'sandboxed-execution': SandboxedExecutionIllustration,
};

/* ------------------------------------------------------------------ */
/*  Desktop: 3-Column Showcase                                         */
/* ------------------------------------------------------------------ */

function DesktopGrid(): JSX.Element {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="hidden lg:grid grid-cols-3 gap-x-8 gap-y-16">
      {AUTONOMY_ITEMS.map((item, index) => {
        const Illustration = ILLUSTRATIONS[item.id];
        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.6,
              delay: prefersReducedMotion ? 0 : (index % 3) * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex flex-col gap-4"
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
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <span
                  className="font-mono text-[11px] font-bold"
                  style={{
                    color: 'rgba(255,255,255,0.2)',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
              </div>

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

              <div className="flex flex-wrap gap-1.5 mt-1">
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
    <div className="lg:hidden flex flex-col gap-14">
      {AUTONOMY_ITEMS.map((item, index) => {
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
            <div className="relative w-full" style={{ height: '180px' }}>
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

export default function AutonomousExecutionSection(): JSX.Element {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="autonomy"
      className="relative overflow-hidden"
      aria-labelledby="autonomy-title"
      style={{
        paddingTop: 'clamp(80px, 10vw, 140px)',
        paddingBottom: 'clamp(80px, 10vw, 140px)',
      }}
    >
      {/* Ambient glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: '700px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(255,255,255,0.02) 0%, transparent 70%)',
          top: '20%',
          right: '-10%',
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
            id="autonomy-title"
            className="font-semibold text-white"
            style={{
              fontSize: 'clamp(32px, 4vw, 48px)',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              margin: '0 0 16px 0',
              fontFamily: 'var(--font-headline)',
            }}
          >
            Executes without asking.
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
            Not a copilot. A system that makes decisions and acts on them.
          </p>
        </motion.div>

        {/* Content */}
        <DesktopGrid />
        <MobileStack />
      </div>
    </section>
  );
}
