'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { JSX } from 'react';

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
};

function Reveal({ children, delay = 0 }: RevealProps): JSX.Element {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.6,
        delay: prefersReducedMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

const EXECUTION_BLOCKS = [
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

export default function ExecutionEndToEnd(): JSX.Element {
  return (
    <section className="rv-section-v4 rv-execution-end-to-end" aria-labelledby="execution-e2e-title">
      <div className="rv-container-v4">
        <div className="rv-execution-e2e-wrapper">
          {/* Left Side - Anchor */}
          <Reveal>
            <div className="rv-execution-e2e-left">
              <h2 id="execution-e2e-title" className="rv-execution-e2e-headline">
                From goal to finished work.
              </h2>
              <p className="rv-execution-e2e-subtext">
                You set the direction. Rivtor handles the execution.
              </p>
            </div>
          </Reveal>

          {/* Right Side - Execution Stack */}
          <div className="rv-execution-e2e-right">
            {EXECUTION_BLOCKS.map((block, index) => (
              <Reveal key={block.number} delay={0.1 + index * 0.08}>
                <div className="rv-execution-block">
                  <span className="rv-execution-block__number">{block.number}</span>
                  <div className="rv-execution-block__content">
                    <h3 className="rv-execution-block__title">{block.title}</h3>
                    <p className="rv-execution-block__description">{block.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
