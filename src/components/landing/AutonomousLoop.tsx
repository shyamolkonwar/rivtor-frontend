'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

const LOOP_STAGES = [
  { id: 'goal', label: 'Goal', description: 'Define the outcome' },
  { id: 'plan', label: 'Plan', description: 'Break down strategy' },
  { id: 'execute', label: 'Execute', description: 'Run experiments' },
  { id: 'learn', label: 'Learn', description: 'Track results' },
  { id: 'iterate', label: 'Iterate', description: 'Improve continuously' },
];

export default function AutonomousLoop() {
  const [activeStage, setActiveStage] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % LOOP_STAGES.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  const getStagePosition = (index: number) => {
    const angle = (index * 72 - 90) * (Math.PI / 180);
    const radius = 100;
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    };
  };

  return (
    <div className="rv-autonomous-loop">
      <svg
        className="rv-autonomous-loop__svg"
        viewBox="0 0 300 300"
        aria-label="Autonomous execution loop showing continuous goal, plan, execute, learn, and iterate cycle"
      >
        {/* Base circle */}
        <circle
          cx="150"
          cy="150"
          r="100"
          fill="none"
          stroke="rgba(59, 130, 246, 0.08)"
          strokeWidth="1.5"
        />

        {/* Animated progress arc */}
        <motion.circle
          cx="150"
          cy="150"
          r="100"
          fill="none"
          stroke="#3B82F6"
          strokeWidth="2"
          strokeDasharray={`${(2 * Math.PI * 100) / 5} ${(2 * Math.PI * 100) * (4 / 5)}`}
          strokeLinecap="round"
          transform={`rotate(${activeStage * 72 - 90} 150 150)`}
          animate={{
            rotate: [`${activeStage * 72 - 90} 150 150`, `${(activeStage + 1) * 72 - 90} 150 150`],
          }}
          transition={{
            duration: prefersReducedMotion ? 0 : 2.5,
            ease: 'easeInOut',
          }}
        />

        {/* Stage nodes */}
        {LOOP_STAGES.map((stage, index) => {
          const pos = getStagePosition(index);
          const isActive = index === activeStage;
          const isPast = index < activeStage;

          return (
            <g key={stage.id} transform={`translate(${150 + pos.x}, ${150 + pos.y})`}>
              {/* Node glow when active */}
              {isActive && (
                <motion.circle
                  r="20"
                  fill="rgba(59, 130, 246, 0.15)"
                  initial={{ scale: 0 }}
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 2.5,
                    repeat: Infinity,
                  }}
                />
              )}

              {/* Node circle */}
              <motion.circle
                r="12"
                fill={isActive ? '#3B82F6' : isPast ? 'rgba(59, 130, 246, 0.4)' : 'rgba(255, 255, 255, 0.08)'}
                stroke={isActive ? '#3B82F6' : 'rgba(255, 255, 255, 0.15)'}
                strokeWidth="1.5"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.3,
                  delay: index * 0.1,
                }}
              />

              {/* Stage label */}
              <motion.text
                y="28"
                textAnchor="middle"
                fill={isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.6)'}
                fontSize="13"
                fontWeight={isActive ? '600' : '400'}
                fontFamily="Inter, sans-serif"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.3,
                  delay: index * 0.1 + 0.1,
                }}
              >
                {stage.label}
              </motion.text>
            </g>
          );
        })}

        {/* Center description text */}
        <motion.text
          x="150"
          y="150"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#FFFFFF"
          fontSize="12"
          fontWeight="500"
          fontFamily="Inter, sans-serif"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.5,
            delay: 0.5,
          }}
        >
          {LOOP_STAGES[activeStage].description}
        </motion.text>
      </svg>

      {/* Stage descriptions below */}
      <div className="rv-autonomous-loop__stages">
        {LOOP_STAGES.map((stage, index) => {
          const isActive = index === activeStage;
          return (
            <motion.div
              key={stage.id}
              className="rv-autonomous-loop__stage"
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: isActive ? 1 : 0.5,
                y: isActive ? 0 : 10,
              }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.3,
              }}
            >
              <span className="rv-autonomous-loop__stage-number">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="rv-autonomous-loop__stage-content">
                <h4 className="rv-autonomous-loop__stage-label">{stage.label}</h4>
                <p className="rv-autonomous-loop__stage-description">{stage.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
