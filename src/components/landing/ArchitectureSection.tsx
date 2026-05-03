'use client';

import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import type { JSX } from 'react';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type PipelineStep = {
  id: string;
  number: string;
  label: string;
  description: string;
  detail: string;
  tags: string[];
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const STEPS: PipelineStep[] = [
  {
    id: 'ontology',
    number: '01',
    label: 'Ontology',
    description: 'Structured map of your company',
    detail: 'Captures products, customers, systems, and goals as connected entities.',
    tags: ['Entity graph', 'Relationship mapping', 'Flexible schema'],
  },
  {
    id: 'event-log',
    number: '02',
    label: 'Event Log',
    description: 'Complete history of every change',
    detail: 'Every action is recorded as an ordered, append-only event stream. Current state is built from this history.',
    tags: ['Immutable log', 'Transactional events', 'Deterministic replay'],
  },
  {
    id: 'task-graph',
    number: '03',
    label: 'Task Graph',
    description: 'Execution plan with dependencies',
    detail: 'Work is organized as a graph of tasks, showing order, dependencies, and parallel paths.',
    tags: ['Graph traversal', 'Cycle detection', 'Parallel execution'],
  },
  {
    id: 'decision',
    number: '04',
    label: 'Decision',
    description: 'Reasoning engine for choosing actions',
    detail: 'Analyzes problems, generates options, consults specialized agents, and selects the best approach.',
    tags: ['Option generation', 'Multi-agent reasoning', 'Evaluation systems'],
  },
  {
    id: 'planning',
    number: '05',
    label: 'Planning',
    description: 'Turning decisions into executable steps',
    detail: 'Converts decisions into structured plans and adapts them based on current context and predictions.',
    tags: ['Decision to plan', 'Plan to task graph', 'Adaptive planning'],
  },
  {
    id: 'execution-graph',
    number: '06',
    label: 'Execution Graph',
    description: 'Reliable execution of operations',
    detail: 'Tasks are broken into atomic steps with validation, retries, and full execution tracking.',
    tags: ['Atomic operations', 'Verification', 'Retry logic', 'Timeline replay'],
  },
  {
    id: 'tasks',
    number: '07',
    label: 'Tasks',
    description: 'Work assigned to agents',
    detail: 'Ready tasks are identified and routed to the right agents for execution, including parallel work.',
    tags: ['Task readiness', 'Agent routing', 'Parallel execution'],
  },
];

/* ------------------------------------------------------------------ */
/*  Technical Illustrations — abstract geometric compositions            */
/* ------------------------------------------------------------------ */

function OntologyIllustration({ active }: { active: boolean }): JSX.Element {
  return (
    <svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Constellation of connected nodes */}
      <g stroke="rgba(255,255,255,0.12)" strokeWidth="1">
        <line x1="60" y1="50" x2="100" y2="35" />
        <line x1="100" y1="35" x2="150" y2="55" />
        <line x1="60" y1="50" x2="45" y2="95" />
        <line x1="100" y1="35" x2="100" y2="105" />
        <line x1="150" y1="55" x2="160" y2="100" />
        <line x1="45" y1="95" x2="100" y2="105" />
        <line x1="100" y1="105" x2="160" y2="100" />
        <line x1="60" y1="50" x2="150" y2="55" />
      </g>
      {/* Nodes */}
      {[
        { cx: 100, cy: 35, r: active ? 7 : 5 },
        { cx: 60, cy: 50, r: active ? 5 : 4 },
        { cx: 150, cy: 55, r: active ? 6 : 4 },
        { cx: 45, cy: 95, r: active ? 5 : 3.5 },
        { cx: 100, cy: 105, r: active ? 7 : 5 },
        { cx: 160, cy: 100, r: active ? 5 : 4 },
      ].map((node, i) => (
        <motion.circle
          key={i}
          cx={node.cx}
          cy={node.cy}
          r={node.r}
          fill={active ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.5)'}
          animate={active ? { r: [node.r, node.r + 2, node.r] } : {}}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
      {/* Orbiting ring around central hub */}
      <motion.circle
        cx="100"
        cy="70"
        r="38"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="1"
        strokeDasharray="4 6"
        animate={active ? { rotate: 360 } : {}}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        style={{ originX: '100px', originY: '70px' }}
      />
    </svg>
  );
}

function EventLogIllustration({ active }: { active: boolean }): JSX.Element {
  return (
    <svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Cascading blocks */}
      {[0, 1, 2, 3].map((i) => {
        const y = 30 + i * 26;
        const x = 40 + i * 12;
        return (
          <g key={i}>
            <rect
              x={x}
              y={y}
              width="120"
              height="18"
              rx="3"
              fill={active ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)'}
              stroke={active ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.08)'}
              strokeWidth="1"
            />
            {/* Hash lines inside blocks */}
            <line x1={x + 10} y1={y + 9} x2={x + 40} y2={y + 9} stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
            <line x1={x + 50} y1={y + 6} x2={x + 90} y2={y + 6} stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
            <line x1={x + 50} y1={y + 12} x2={x + 80} y2={y + 12} stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
            {/* Chain link between blocks */}
            {i < 3 && (
              <motion.path
                d={`M ${x + 120} ${y + 9} Q ${x + 132} ${y + 22} ${x + 132} ${y + 35}`}
                stroke={active ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)'}
                strokeWidth="1.5"
                fill="none"
                strokeDasharray="4 3"
                animate={active ? { strokeDashoffset: [0, -14] } : {}}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
            )}
          </g>
        );
      })}
      {/* Lock icon on top block */}
      <motion.g animate={active ? { opacity: [0.4, 1, 0.4] } : {}} transition={{ duration: 2, repeat: Infinity }}>
        <rect x="155" y="34" width="8" height="6" rx="1" stroke="rgba(255,255,255,0.4)" strokeWidth="1" fill="none" />
        <circle cx="159" cy="32" r="3" stroke="rgba(255,255,255,0.4)" strokeWidth="1" fill="none" />
      </motion.g>
    </svg>
  );
}

function TaskGraphIllustration({ active }: { active: boolean }): JSX.Element {
  return (
    <svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* DAG nodes */}
      <g>
        {/* Level 1 */}
        <circle cx="100" cy="25" r="6" fill={active ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.5)'} />
        {/* Level 2 */}
        <circle cx="70" cy="65" r="5" fill={active ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.35)'} />
        <circle cx="130" cy="65" r="5" fill={active ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.35)'} />
        {/* Level 3 */}
        <circle cx="55" cy="105" r="4" fill={active ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.3)'} />
        <circle cx="85" cy="105" r="4" fill={active ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.3)'} />
        <circle cx="115" cy="105" r="4" fill={active ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.3)'} />
        <circle cx="145" cy="105" r="4" fill={active ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.3)'} />
      </g>
      {/* Edges with arrowheads */}
      <g stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" markerEnd="url(#arrowhead)">
        <line x1="96" y1="30" x2="74" y2="60" />
        <line x1="104" y1="30" x2="126" y2="60" />
        <line x1="68" y1="70" x2="58" y2="100" />
        <line x1="72" y1="70" x2="82" y2="100" />
        <line x1="128" y1="70" x2="112" y2="100" />
        <line x1="132" y1="70" x2="142" y2="100" />
      </g>
      {/* Cycle detection highlight */}
      {active && (
        <motion.ellipse
          cx="100"
          cy="70"
          rx="60"
          ry="45"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="1"
          strokeDasharray="6 4"
          fill="none"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          style={{ originX: '100px', originY: '70px' }}
        />
      )}
      <defs>
        <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <polygon points="0 0, 6 3, 0 6" fill="rgba(255,255,255,0.2)" />
        </marker>
      </defs>
    </svg>
  );
}

function DecisionIllustration({ active }: { active: boolean }): JSX.Element {
  return (
    <svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Central diamond */}
      <motion.polygon
        points="100,30 140,70 100,110 60,70"
        fill={active ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.02)'}
        stroke={active ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.15)'}
        strokeWidth="1.5"
        animate={active ? { scale: [1, 1.03, 1] } : {}}
        transition={{ duration: 3, repeat: Infinity }}
        style={{ originX: '100px', originY: '70px' }}
      />
      {/* Radiating option paths */}
      {[
        { x1: 140, y1: 70, x2: 175, y2: 45 },
        { x1: 140, y1: 70, x2: 175, y2: 70 },
        { x1: 140, y1: 70, x2: 175, y2: 95 },
        { x1: 60, y1: 70, x2: 25, y2: 45 },
        { x1: 60, y1: 70, x2: 25, y2: 70 },
        { x1: 60, y1: 70, x2: 25, y2: 95 },
      ].map((line, i) => (
        <g key={i}>
          <line
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke={active ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.08)'}
            strokeWidth="1"
            strokeDasharray="3 3"
          />
          <circle
            cx={line.x2}
            cy={line.y2}
            r="3"
            fill={active ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.25)'}
          />
        </g>
      ))}
      {/* Inner question mark */}
      <text
        x="100"
        y="75"
        textAnchor="middle"
        fill={active ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.3)'}
        fontSize="20"
        fontFamily="var(--font-mono)"
        fontWeight="300"
      >
        ?
      </text>
      {/* Orbiting evaluation dots — precomputed */}
      {active && [
        { cx: 150, cy: 70 },
        { cx: 125, cy: 113.3 },
        { cx: 75, cy: 113.3 },
      ].map((dot, i) => (
        <motion.circle
          key={i}
          r="2.5"
          fill="rgba(255,255,255,0.5)"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear', delay: i * 0.3 }}
          style={{
            originX: '100px',
            originY: '70px',
            cx: dot.cx,
            cy: dot.cy,
          }}
        />
      ))}
    </svg>
  );
}

function PlanningIllustration({ active }: { active: boolean }): JSX.Element {
  return (
    <svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Funnel / convergence visualization */}
      {/* Many paths on left */}
      {[30, 50, 70, 90, 110].map((y, i) => (
        <motion.line
          key={i}
          x1="20"
          y1={y}
          x2="80"
          y2="70"
          stroke={active ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.06)'}
          strokeWidth="1"
          animate={active ? { pathLength: [0.3, 1, 0.3] } : {}}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
      {/* Converged single path on right */}
      <motion.line
        x1="80"
        y1="70"
        x2="180"
        y2="70"
        stroke={active ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.15)'}
        strokeWidth="2"
        animate={active ? { opacity: [0.3, 1, 0.3] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      />
      {/* Decision nodes on left */}
      {[30, 50, 70, 90, 110].map((y, i) => (
        <circle key={i} cx="20" cy={y} r="3" fill={active ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.2)'} />
      ))}
      {/* Plan checkpoint nodes on right */}
      {[110, 140, 170].map((x, i) => (
        <g key={i}>
          <circle cx={x} cy="70" r="4" fill={active ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.3)'} />
          <motion.circle
            cx={x}
            cy="70"
            r="8"
            stroke={active ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)'}
            strokeWidth="1"
            fill="none"
            animate={active ? { r: [6, 12, 6], opacity: [0.5, 0, 0.5] } : {}}
            transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
          />
        </g>
      ))}
      {/* Funnel boundary */}
      <path
        d="M 80 40 L 80 100"
        stroke={active ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.1)'}
        strokeWidth="1"
        strokeDasharray="4 4"
      />
      {/* Adaptive arrow */}
      <motion.polygon
        points="175,66 185,70 175,74"
        fill={active ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.2)'}
        animate={active ? { x: [0, 4, 0] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </svg>
  );
}

function ExecutionGraphIllustration({ active }: { active: boolean }): JSX.Element {
  return (
    <svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* DAG nodes in a sequence */}
      {[
        { cx: 35, cy: 70, label: 'A' },
        { cx: 80, cy: 45, label: 'B' },
        { cx: 80, cy: 95, label: 'C' },
        { cx: 125, cy: 70, label: 'D' },
        { cx: 170, cy: 70, label: 'E' },
      ].map((node, i) => (
        <g key={i}>
          <motion.rect
            x={node.cx - 12}
            y={node.cy - 12}
            width="24"
            height="24"
            rx="4"
            fill={active ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.02)'}
            stroke={active ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.12)'}
            strokeWidth="1"
            animate={active ? { opacity: [0.5, 1, 0.5] } : {}}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
          />
          <text
            x={node.cx}
            y={node.cy + 4}
            textAnchor="middle"
            fill={active ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.3)'}
            fontSize="10"
            fontFamily="var(--font-mono)"
          >
            {node.label}
          </text>
        </g>
      ))}
      {/* Edges */}
      <g stroke={active ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.1)'} strokeWidth="1.5">
        <line x1="47" y1="70" x2="68" y2="45" />
        <line x1="47" y1="70" x2="68" y2="95" />
        <line x1="92" y1="45" x2="113" y2="70" />
        <line x1="92" y1="95" x2="113" y2="70" />
        <line x1="137" y1="70" x2="158" y2="70" />
      </g>
      {/* Retry loop indicator on C */}
      <motion.path
        d="M 80 107 Q 60 115 60 95 Q 60 80 72 83"
        stroke={active ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)'}
        strokeWidth="1"
        fill="none"
        strokeDasharray="3 3"
        animate={active ? { strokeDashoffset: [0, -12] } : {}}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
      />
      {/* Timeline ticks below */}
      {Array.from({ length: 8 }).map((_, i) => (
        <line
          key={i}
          x1={30 + i * 20}
          y1="125"
          x2={30 + i * 20}
          y2="132"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="1"
        />
      ))}
      <line x1="30" y1="128" x2="170" y2="128" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
    </svg>
  );
}

function TasksIllustration({ active }: { active: boolean }): JSX.Element {
  return (
    <svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Central dispatch hub */}
      <motion.circle
        cx="100"
        cy="50"
        r="14"
        fill={active ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.03)'}
        stroke={active ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.15)'}
        strokeWidth="1.5"
        animate={active ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ originX: '100px', originY: '50px' }}
      />
      <text x="100" y="54" textAnchor="middle" fill={active ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.3)'} fontSize="10" fontFamily="var(--font-mono)">
        ◈
      </text>
      {/* Dispatch lines to agents */}
      {[
        { x: 40, y: 100, delay: 0 },
        { x: 80, y: 115, delay: 0.2 },
        { x: 120, y: 115, delay: 0.4 },
        { x: 160, y: 100, delay: 0.6 },
      ].map((agent, i) => (
        <g key={i}>
          <motion.line
            x1="100"
            y1="64"
            x2={agent.x}
            y2={agent.y - 10}
            stroke={active ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.08)'}
            strokeWidth="1"
            strokeDasharray="4 4"
            animate={active ? { strokeDashoffset: [0, -16] } : {}}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear', delay: agent.delay }}
          />
          {/* Agent nodes */}
          <rect
            x={agent.x - 10}
            y={agent.y - 10}
            width="20"
            height="20"
            rx="4"
            fill={active ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.02)'}
            stroke={active ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.1)'}
            strokeWidth="1"
          />
          {/* Mini task squares being dispatched */}
          {active && (
            <motion.rect
              x={agent.x - 3}
              y={agent.y - 25}
              width="6"
              height="6"
              rx="1"
              fill="rgba(255,255,255,0.6)"
              animate={{ y: [agent.y - 35, agent.y - 15, agent.y - 35], opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: agent.delay + 0.3 }}
            />
          )}
        </g>
      ))}
      {/* Ready queue indicator */}
      {[0, 1, 2, 3].map((i) => (
        <motion.rect
          key={i}
          x={70 + i * 12}
          y="28"
          width="8"
          height="8"
          rx="2"
          fill={active ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.15)'}
          animate={active ? { opacity: [0.2, 0.8, 0.2] } : {}}
          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </svg>
  );
}

const ILLUSTRATIONS: Record<string, (props: { active: boolean }) => JSX.Element> = {
  ontology: OntologyIllustration,
  'event-log': EventLogIllustration,
  'task-graph': TaskGraphIllustration,
  decision: DecisionIllustration,
  planning: PlanningIllustration,
  'execution-graph': ExecutionGraphIllustration,
  tasks: TasksIllustration,
};

/* ------------------------------------------------------------------ */
/*  Background Grid                                                    */
/* ------------------------------------------------------------------ */

function BlueprintGrid(): JSX.Element {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Pipeline Connector — animated SVG spine                            */
/* ------------------------------------------------------------------ */

function PipelineSpine(): JSX.Element {
  return (
    <svg
      className="absolute top-0 left-0 w-full h-full pointer-events-none hidden lg:block"
      preserveAspectRatio="none"
      style={{ zIndex: 1 }}
    >
      <defs>
        <linearGradient id="spineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.01)" />
          <stop offset="20%" stopColor="rgba(255,255,255,0.06)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0.08)" />
          <stop offset="80%" stopColor="rgba(255,255,255,0.06)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.01)" />
        </linearGradient>
        <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="50%" stopColor="rgba(255,255,255,0.4)" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>
      {/* Main spine line */}
      <line
        x1="0"
        y1="50%"
        x2="100%"
        y2="50%"
        stroke="url(#spineGradient)"
        strokeWidth="2"
      />
      {/* Animated flow pulse */}
      <motion.line
        x1="-20%"
        y1="50%"
        x2="20%"
        y2="50%"
        stroke="url(#flowGradient)"
        strokeWidth="2"
        animate={{ x1: ['-20%', '100%'], x2: ['20%', '140%'] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Stage Node — floating composition, not a card                      */
/* ------------------------------------------------------------------ */

function StageNode({
  step,
  index,
  isHovered,
  onHover,
}: {
  step: PipelineStep;
  index: number;
  isHovered: boolean;
  onHover: (idx: number | null) => void;
}): JSX.Element {
  const prefersReducedMotion = useReducedMotion();
  const Illustration = ILLUSTRATIONS[step.id];

  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.7,
        delay: prefersReducedMotion ? 0 : index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      className="relative flex flex-col items-center text-center cursor-default group"
      style={{ zIndex: 2 }}
    >
      {/* Number */}
      <div className="relative flex items-center justify-center mb-5">
        <motion.div
          className="relative flex items-center justify-center"
          animate={{
            scale: isHovered ? 1.15 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Outer glow ring */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: '48px',
              height: '48px',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
            animate={isHovered ? {
              borderColor: 'rgba(255,255,255,0.25)',
              boxShadow: '0 0 30px rgba(255,255,255,0.06)',
            } : {
              borderColor: 'rgba(255,255,255,0.08)',
              boxShadow: '0 0 0px rgba(255,255,255,0)',
            }}
            transition={{ duration: 0.3 }}
          />
          {/* Inner number */}
          <span
            className="relative font-mono text-xs font-bold"
            style={{
              color: isHovered ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.4)',
              fontFamily: 'var(--font-mono)',
              letterSpacing: '-0.02em',
              transition: 'color 0.3s ease',
              width: '48px',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {step.number}
          </span>
        </motion.div>
      </div>

      {/* Technical Illustration */}
      <motion.div
        className="relative w-40 h-28 mb-4"
        animate={{
          filter: isHovered ? 'brightness(1.3)' : 'brightness(1)',
        }}
        transition={{ duration: 0.3 }}
      >
        {Illustration && <Illustration active={isHovered} />}
      </motion.div>

      {/* Label */}
      <h3
        className="text-base font-semibold tracking-tight mb-1"
        style={{
          color: isHovered ? '#FFFFFF' : 'rgba(255,255,255,0.85)',
          fontFamily: 'var(--font-headline)',
          letterSpacing: '-0.01em',
          transition: 'color 0.3s ease',
        }}
      >
        {step.label}
      </h3>

      {/* One-line description */}
      <p
        className="text-[13px] font-medium mb-2 max-w-[180px]"
        style={{
          color: 'rgba(255,255,255,0.5)',
          fontFamily: 'var(--font-body)',
          lineHeight: 1.4,
        }}
      >
        {step.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap justify-center gap-1">
        {step.tags.map((tag) => (
          <span
            key={tag}
            className="px-1.5 py-0.5 rounded text-[10px] font-mono"
            style={{
              color: isHovered ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.25)',
              border: '1px solid rgba(255,255,255,0.06)',
              background: isHovered ? 'rgba(255,255,255,0.03)' : 'transparent',
              fontFamily: 'var(--font-mono)',
              transition: 'all 0.3s ease',
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Detail text — reveals on hover */}
      <motion.p
        className="text-[11px] mt-2 max-w-[190px] px-1"
        style={{
          color: 'rgba(255,255,255,0.35)',
          fontFamily: 'var(--font-body)',
          lineHeight: 1.5,
        }}
        initial={{ opacity: 0, y: 6 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          y: isHovered ? 0 : 6,
        }}
        transition={{ duration: 0.25 }}
      >
        {step.detail}
      </motion.p>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Desktop: Master-Detail Stepper                                     */
/* ------------------------------------------------------------------ */

function DesktopPipeline({
  activeStep,
  setActiveStep,
  hoveredStep,
  onHover,
}: {
  activeStep: number;
  setActiveStep: (idx: number) => void;
  hoveredStep: number | null;
  onHover: (idx: number | null) => void;
}): JSX.Element {
  const step = STEPS[activeStep];
  const Illustration = ILLUSTRATIONS[step.id];
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="hidden lg:block">
      {/* ── SPINE: interactive progress bar ── */}
      <div className="relative mb-16">
        {/* Horizontal line */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 pointer-events-none" style={{ zIndex: 1 }}>
          <svg width="100%" height="12" preserveAspectRatio="none">
            <defs>
              <linearGradient id="spineLine" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                <stop offset="5%" stopColor="rgba(255,255,255,0.06)" />
                <stop offset="50%" stopColor="rgba(255,255,255,0.1)" />
                <stop offset="95%" stopColor="rgba(255,255,255,0.06)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
              </linearGradient>
            </defs>
            <line x1="0" y1="6" x2="100%" y2="6" stroke="url(#spineLine)" strokeWidth="1.5" />
          </svg>
        </div>

        {/* Step nodes */}
        <div className="relative flex justify-between items-start" style={{ zIndex: 2 }}>
          {STEPS.map((s, index) => {
            const isActive = activeStep === index;
            const isHovered = hoveredStep === index;

            return (
              <motion.button
                key={s.id}
                className="relative flex flex-col items-center text-center cursor-pointer bg-transparent border-none p-0"
                onClick={() => setActiveStep(index)}
                onMouseEnter={() => onHover(index)}
                onMouseLeave={() => onHover(null)}
                whileTap={{ scale: 0.95 }}
              >
                {/* Number circle */}
                <motion.div
                  className="relative flex items-center justify-center mb-3"
                  animate={{
                    scale: isActive ? 1.15 : isHovered ? 1.08 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Glow ring for active */}
                  <motion.div
                    className="absolute rounded-full"
                    style={{
                      width: '52px',
                      height: '52px',
                    }}
                    animate={{
                      borderColor: isActive
                        ? 'rgba(255,255,255,0.35)'
                        : isHovered
                          ? 'rgba(255,255,255,0.2)'
                          : 'rgba(255,255,255,0.08)',
                      boxShadow: isActive
                        ? '0 0 40px rgba(255,255,255,0.08)'
                        : '0 0 0px rgba(255,255,255,0)',
                      border: '1px solid',
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  {/* Number */}
                  <span
                    className="relative font-mono text-xs font-bold flex items-center justify-center"
                    style={{
                      color: isActive
                        ? '#FFFFFF'
                        : isHovered
                          ? 'rgba(255,255,255,0.7)'
                          : 'rgba(255,255,255,0.35)',
                      fontFamily: 'var(--font-mono)',
                      letterSpacing: '-0.02em',
                      width: '52px',
                      height: '52px',
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {s.number}
                  </span>
                </motion.div>

                {/* Stage label */}
                <span
                  className="text-xs font-semibold mt-1"
                  style={{
                    color: isActive
                      ? 'rgba(255,255,255,0.9)'
                      : isHovered
                        ? 'rgba(255,255,255,0.6)'
                        : 'rgba(255,255,255,0.3)',
                    fontFamily: 'var(--font-headline)',
                    letterSpacing: '-0.01em',
                    transition: 'color 0.3s ease',
                    maxWidth: '90px',
                  }}
                >
                  {s.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* ── CONTENT AREA: spacious detail view ── */}
      <div className="relative" style={{ minHeight: '420px' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -16 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="grid grid-cols-12 gap-12 items-center"
          >
            {/* Left: Large illustration */}
            <div className="col-span-5">
              <div
                className="relative w-full flex items-center justify-center"
                style={{ height: '360px' }}
              >
                {/* Subtle backdrop glow */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.03) 0%, transparent 70%)',
                  }}
                />
                {/* Illustration */}
                <div className="relative w-full h-full p-8">
                  {Illustration && <Illustration active={true} />}
                </div>
              </div>
            </div>

            {/* Right: Text content */}
            <div className="col-span-7 flex flex-col gap-5">
              {/* Header: number + label */}
              <div className="flex items-center gap-4">
                <span
                  className="font-mono text-sm font-bold"
                  style={{
                    color: 'rgba(255,255,255,0.25)',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  {step.number}
                </span>
                <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
              </div>

              {/* Title */}
              <h3
                className="text-3xl font-semibold"
                style={{
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-headline)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.2,
                  margin: 0,
                }}
              >
                {step.label}
              </h3>

              {/* Description */}
              <p
                className="text-base font-medium"
                style={{
                  color: 'rgba(255,255,255,0.7)',
                  fontFamily: 'var(--font-body)',
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                {step.description}
              </p>

              {/* Detail */}
              <p
                className="text-sm"
                style={{
                  color: 'rgba(255,255,255,0.45)',
                  fontFamily: 'var(--font-body)',
                  lineHeight: 1.6,
                  margin: 0,
                  maxWidth: '480px',
                }}
              >
                {step.detail}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-1">
                {step.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-md text-sm font-mono"
                    style={{
                      color: 'rgba(255,255,255,0.5)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      background: 'rgba(255,255,255,0.03)',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Mobile: Vertical Flow Layout                                       */
/* ------------------------------------------------------------------ */

function MobilePipeline({
  hoveredStep,
  onHover,
}: {
  hoveredStep: number | null;
  onHover: (idx: number | null) => void;
}): JSX.Element {
  return (
    <div className="lg:hidden relative">
      {/* Vertical spine */}
      <div
        className="absolute left-6 top-0 bottom-0 w-px"
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.08), rgba(255,255,255,0.02))',
        }}
      />

      <div className="relative flex flex-col gap-16" style={{ zIndex: 2 }}>
        {STEPS.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={() => onHover(index)}
            onMouseLeave={() => onHover(null)}
            className="flex items-start gap-5"
          >
            {/* Number + dot */}
            <div className="relative flex-shrink-0">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-xs font-bold font-mono"
                style={{
                  border: hoveredStep === index
                    ? '1px solid rgba(255,255,255,0.25)'
                    : '1px solid rgba(255,255,255,0.08)',
                  color: hoveredStep === index ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.4)',
                  background: hoveredStep === index ? 'rgba(255,255,255,0.04)' : 'transparent',
                  transition: 'all 0.3s ease',
                }}
              >
                {step.number}
              </div>
              {/* Connector dot on spine */}
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: hoveredStep === index ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.15)',
                  marginLeft: '-24px',
                  transition: 'all 0.3s ease',
                }}
              />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-4 mb-3">
                <h3
                  className="text-base font-semibold"
                  style={{
                    color: hoveredStep === index ? '#FFFFFF' : 'rgba(255,255,255,0.85)',
                    fontFamily: 'var(--font-headline)',
                    transition: 'color 0.3s ease',
                  }}
                >
                  {step.label}
                </h3>
                <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
              </div>

              {/* Illustration */}
              <div className="w-full h-28 mb-3">
                {(() => {
                  const MobileIllustration = ILLUSTRATIONS[step.id];
                  return MobileIllustration ? <MobileIllustration active={hoveredStep === index} /> : null;
                })()}
              </div>

              <p
                className="text-sm mb-2"
                style={{
                  color: 'rgba(255,255,255,0.5)',
                  fontFamily: 'var(--font-body)',
                  lineHeight: 1.4,
                }}
              >
                {step.description}
              </p>

              <p
                className="text-xs mb-3"
                style={{
                  color: 'rgba(255,255,255,0.3)',
                  fontFamily: 'var(--font-body)',
                  lineHeight: 1.5,
                }}
              >
                {step.detail}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {step.tags.map((tag) => (
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
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Section                                                       */
/* ------------------------------------------------------------------ */

export default function ArchitectureSection(): JSX.Element {
  const prefersReducedMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  return (
    <section
      id="architecture"
      className="relative overflow-hidden"
      aria-labelledby="architecture-title"
      style={{
        paddingTop: 'clamp(80px, 10vw, 140px)',
        paddingBottom: 'clamp(80px, 10vw, 140px)',
        background: 'linear-gradient(180deg, #0A0A0A 0%, #080808 50%, #0A0A0A 100%)',
      }}
    >
      {/* Ambient glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: '800px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(255,255,255,0.025) 0%, transparent 70%)',
          top: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          filter: 'blur(60px)',
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
          className="text-center mb-20 md:mb-28"
        >
          <h2
            id="architecture-title"
            className="font-semibold text-white"
            style={{
              fontSize: 'clamp(32px, 4vw, 52px)',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              margin: '0 0 20px 0',
              fontFamily: 'var(--font-headline)',
            }}
          >
            From understanding to execution
          </h2>
          <p
            className="font-normal"
            style={{
              fontSize: 'clamp(16px, 1.8vw, 20px)',
              color: 'rgba(255,255,255,0.45)',
              maxWidth: '560px',
              margin: '0 auto',
              lineHeight: 1.5,
              fontFamily: 'var(--font-body)',
            }}
          >
            A structured pipeline that turns company context into real work.
          </p>
        </motion.div>

        {/* Pipeline */}
        <DesktopPipeline
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          hoveredStep={hoveredStep}
          onHover={setHoveredStep}
        />
        <MobilePipeline hoveredStep={hoveredStep} onHover={setHoveredStep} />

        {/* Bottom statement */}
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.6,
            delay: 0.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="text-center mt-20 md:mt-28"
        >
          <div
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full"
            style={{
              border: '1px solid rgba(255,255,255,0.08)',
              background: 'rgba(255,255,255,0.02)',
            }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
            <p
              className="font-mono text-sm"
              style={{
                color: 'rgba(255,255,255,0.45)',
                fontFamily: 'var(--font-mono)',
                letterSpacing: '0.01em',
                margin: 0,
              }}
            >
              State = Projection(Event Log)
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
