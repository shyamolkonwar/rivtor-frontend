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
      viewport={{ once: true, amount: 0.3 }}
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

export default function FutureSection(): JSX.Element {
  return (
    <section id="vision" className="rv-section-v4 rv-future-section" aria-labelledby="future-title">
      <div className="rv-container-v4">
        <Reveal>
          <div className="rv-future-takeover">
            {/* Left Side - Old System */}
            <div className="rv-future-panel rv-future-panel--old">
              <div className="rv-future-panel__label">Human-operated</div>
              <div className="rv-future-panel__content">
                <p className="rv-future-panel__main">
                  Coordination<br />
                  Alignment<br />
                  Manual execution
                </p>
              </div>
              <div className="rv-future-panel__sub">Slows everything down.</div>
            </div>

            {/* Center Transition */}
            <div className="rv-future-transition" aria-hidden="true" />

            {/* Right Side - New System */}
            <div className="rv-future-panel rv-future-panel--new">
              <div className="rv-future-panel__label">Autonomous</div>
              <div className="rv-future-panel__content">
                <p className="rv-future-panel__main">Executes continuously.</p>
                <p className="rv-future-panel__sub">No coordination. No alignment. No delays.</p>
              </div>
              <div className="rv-future-panel__final">The system runs itself.</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
