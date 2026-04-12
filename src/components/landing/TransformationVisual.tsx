'use client';

import { motion, useReducedMotion, useScroll } from 'framer-motion';
import { useRef } from 'react';

export default function TransformationVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const leftTransform = useScroll({
    target: containerRef,
    offset: ['start end', 'center center'],
  });

  const rightTransform = useScroll({
    target: containerRef,
    offset: ['center center', 'end start'],
  });

  return (
    <div ref={containerRef} className="rv-transformation" aria-label="Visual transformation from manual execution to autonomous systems">
      <div className="rv-transformation__panels">
        {/* Old World Panel */}
        <motion.div
          className="rv-transformation__panel rv-transformation__panel--old"
          style={{
            opacity: prefersReducedMotion ? 1 : 1 - leftTransform.scrollYProgress.get(),
          }}
        >
          <div className="rv-transformation__content">
            <h3 className="rv-transformation__title">Today</h3>
            <p className="rv-transformation__description">Manual coordination</p>

            <div className="rv-transformation__elements">
              {[
                { label: 'Task waiting', delay: 0 },
                { label: 'Approval needed', delay: 0.1 },
                { label: 'Blocked', delay: 0.2 },
                { label: 'Delayed', delay: 0.3 },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  className="rv-transformation__element rv-transformation__element--blocked"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: prefersReducedMotion ? 0 : item.delay }}
                >
                  <span className="rv-transformation__element-label">{item.label}</span>
                  <span className="rv-transformation__element-status" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* New World Panel */}
        <motion.div
          className="rv-transformation__panel rv-transformation__panel--new"
          style={{
            opacity: prefersReducedMotion ? 1 : rightTransform.scrollYProgress.get(),
          }}
        >
          <div className="rv-transformation__content">
            <h3 className="rv-transformation__title">With Rivtor</h3>
            <p className="rv-transformation__description">Autonomous execution</p>

            <div className="rv-transformation__elements">
              {[
                { label: 'Analyzing', delay: 0 },
                { label: 'Executing', delay: 0.1 },
                { label: 'Iterating', delay: 0.2 },
                { label: 'Completed', delay: 0.3 },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  className="rv-transformation__element rv-transformation__element--flowing"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: prefersReducedMotion ? 0 : item.delay }}
                >
                  <span className="rv-transformation__element-label">{item.label}</span>
                  <span className="rv-transformation__element-status" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Center divider line */}
      <motion.div
        className="rv-transformation__divider"
        style={{
          scaleX: prefersReducedMotion ? 1 : scrollYProgress,
        }}
      />
    </div>
  );
}
