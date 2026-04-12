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
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.8,
        delay: prefersReducedMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

export default function ExecutionSection(): JSX.Element {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section 
      id="execution" 
      className="bg-[#0A0A0A]" 
      aria-labelledby="execution-title"
      style={{ 
        paddingTop: 'clamp(100px, 12vw, 140px)',
        paddingBottom: 'clamp(100px, 12vw, 140px)',
      }}
    >
      <div 
        className="px-6 md:px-8 flex justify-center"
        style={{ maxWidth: '100%' }}
      >
        {/* System Definition Panel */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="w-full max-w-2xl"
          style={{
            backgroundColor: 'rgba(17, 17, 17, 0.5)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '14px',
            padding: 'clamp(32px, 6vw, 40px)',
            backdropFilter: 'blur(4px)',
          }}
        >
          {/* Headline - 32-36px medium */}
          <Reveal delay={0}>
            <h2
              id="execution-title"
              className="text-white"
              style={{
                fontSize: 'clamp(32px, 4vw, 36px)',
                fontWeight: 500,
                letterSpacing: '-0.01em',
                lineHeight: 1.25,
                marginBottom: '24px',
                fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
              }}
            >
              Execution is becoming autonomous.
            </h2>
          </Reveal>

          {/* Problem Lines Group - small gap between them */}
          <Reveal delay={0.08}>
            <div 
              style={{
                marginBottom: '28px',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
              }}
            >
              <p 
                className="text-[#A1A1AA]"
                style={{
                  fontSize: 'clamp(16px, 1.8vw, 18px)',
                  fontWeight: 400,
                  letterSpacing: '-0.005em',
                  lineHeight: 1.5,
                }}
              >
                Coordination slows it down.
              </p>
              <p 
                className="text-[#A1A1AA]"
                style={{
                  fontSize: 'clamp(16px, 1.8vw, 18px)',
                  fontWeight: 400,
                  letterSpacing: '-0.005em',
                  lineHeight: 1.5,
                }}
              >
                Alignment creates delay.
              </p>
            </div>
          </Reveal>

          {/* Subtle Divider - anchors the shift */}
          <Reveal delay={0.14}>
            <div 
              style={{
                marginBottom: '28px',
                display: 'flex',
                justifyContent: 'flex-start',
              }}
            >
              <div 
                style={{
                  height: '1px',
                  width: '60px',
                  backgroundColor: 'rgba(255, 255, 255, 0.12)',
                }}
              />
            </div>
          </Reveal>

          {/* Turning Point - the shift (dimmer for emphasis) */}
          <Reveal delay={0.20}>
            <div 
              style={{
                marginBottom: '24px',
              }}
            >
              <p 
                className="leading-relaxed"
                style={{
                  fontSize: 'clamp(16px, 1.8vw, 18px)',
                  fontWeight: 400,
                  color: 'rgba(255, 255, 255, 0.4)',
                  letterSpacing: '-0.005em',
                  lineHeight: 1.5,
                }}
              >
                That model is breaking.
              </p>
            </div>
          </Reveal>

          {/* System Definition - brighter, stronger */}
          <Reveal delay={0.26}>
            <div 
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <p 
                className="text-white"
                style={{
                  fontSize: 'clamp(16px, 1.8vw, 18px)',
                  fontWeight: 500,
                  letterSpacing: '-0.005em',
                  lineHeight: 1.5,
                  color: '#E4E4E7',
                }}
              >
                Systems now execute continuously.
              </p>
              <p 
                className="text-white"
                style={{
                  fontSize: 'clamp(16px, 1.8vw, 18px)',
                  fontWeight: 600,
                  letterSpacing: '-0.005em',
                  lineHeight: 1.5,
                  color: '#FFFFFF',
                }}
              >
                Rivtor is that system.
              </p>
            </div>
          </Reveal>
        </motion.div>
      </div>
    </section>
  );
}
