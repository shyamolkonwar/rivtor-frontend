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

const PANELS = [
  {
    label: 'Software',
    main: 'Helps you work',
    sub: 'Interfaces, dashboards, manual input',
    isHighlight: false,
  },
  {
    label: 'Tools',
    main: 'Help you build',
    sub: 'APIs, workflows, integrations',
    isHighlight: false,
  },
  {
    label: 'Rivtor',
    main: 'Executes.',
    sub: 'Plans, acts, and improves continuously.',
    highlight: 'Not a tool. A system.',
    isHighlight: true,
  },
];

export default function CategorySection(): JSX.Element {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="rv-section-v4 rv-category-section" aria-labelledby="category-title">
      <div className="rv-container-v4">
        <Reveal>
          <h2 id="category-title" className="rv-category-headline">
            A new category: Execution Intelligence
          </h2>
        </Reveal>

        <div className="rv-category-panels">
          {PANELS.map((panel, index) => (
            <Reveal key={panel.label} delay={panel.isHighlight ? 0.2 : index * 0.1}>
              <motion.div
                className={`rv-category-panel ${panel.isHighlight ? 'rv-category-panel--highlight' : ''}`}
                initial={
                  !prefersReducedMotion && panel.isHighlight
                    ? { opacity: 0, scale: 0.98 }
                    : { opacity: 0, y: 20 }
                }
                whileInView={
                  !prefersReducedMotion && panel.isHighlight
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 1, y: 0 }
                }
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : panel.isHighlight ? 0.8 : 0.6,
                  delay: prefersReducedMotion ? 0 : panel.isHighlight ? 0.2 : index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="rv-category-panel__label">{panel.label}</div>
                <h3 className="rv-category-panel__main">{panel.main}</h3>
                <p className="rv-category-panel__sub">{panel.sub}</p>
                {panel.highlight && (
                  <div className="rv-category-panel__highlight">{panel.highlight}</div>
                )}
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
