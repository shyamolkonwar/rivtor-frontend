'use client';

import type { JSX, ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import OrbitalTraceAnimation from '@/components/landing/OrbitalTraceAnimation';
import { AnnouncementBadge } from '@/components/landing/AnnouncementBadge';
import SystemBackground from '@/components/landing/SystemBackground';

import ArchitectureSection from '@/components/landing/ArchitectureSection';
import RealTimeAwarenessSection from '@/components/landing/RealTimeAwarenessSection';
import AutonomousExecutionSection from '@/components/landing/AutonomousExecutionSection';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import ProblemSection from '@/components/landing/ProblemSection';

// SEO/GEO Components
import { FAQDisplay, HowToSchema } from '@/components/seo';
import { rivtorHowTo } from '@/data/rivtorGEO';
import { rivtorFAQs } from '@/data/rivtorSEO';

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

function Reveal({ children, className = '', delay = 0 }: RevealProps): JSX.Element {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
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

export default function Page(): JSX.Element {
  const prefersReducedMotion = useReducedMotion();

  return (
    <main className="rv-landing-v4">
      <SystemBackground />
      <Navbar />

      {/* Navbar spacer */}
      <div style={{ height: '72px' }} aria-hidden="true" />

      {/* ===== HERO SECTION ===== */}
      <section id="overview" className="rv-hero-v4" aria-labelledby="hero-title">
        <div className="rv-ambient-glow rv-ambient-glow--hero" />
        <div className="rv-container-v4 rv-hero-v4__grid">
          {/* Left: Text */}
          <div className="rv-hero-v4__content">
            <motion.div
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.6,
                delay: prefersReducedMotion ? 0 : 0,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mb-8"
            >
              <AnnouncementBadge />
            </motion.div>

            <motion.h1
              id="hero-title"
              className="rv-h1-v4 rv-h1-v4--hero-name"
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.7,
                delay: prefersReducedMotion ? 0 : 0,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <span className="sm:hidden">Meet </span>01
            </motion.h1>

            <motion.p
              className="rv-hero-v4__copy"
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.7,
                delay: prefersReducedMotion ? 0 : 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              An autonomous agent that perceives, decides, and acts.
              The end of tools. The beginning of agency.
            </motion.p>

            <motion.div
              className="rv-hero-v4__actions"
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.7,
                delay: prefersReducedMotion ? 0 : 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <a href="/demo" className="rv-btn-v4 rv-btn-v4--primary">
                Try the Agent
              </a>
              <a href="#how-it-works" className="rv-hero-v4__link">
                See how it works
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M6 12L10 8L6 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </motion.div>
          </div>

          {/* Right: Animation */}
          <div className="rv-hero-v4__visual">
            <OrbitalTraceAnimation />
          </div>
        </div>
      </section>

      {/* ===== PROBLEM SECTION ===== */}
      <ProblemSection />

      {/* ===== HOW IT WORKS SECTION ===== */}
      <HowItWorksSection />

      {/* ===== ARCHITECTURE SECTION ===== */}
      <ArchitectureSection />

      {/* ===== REAL-TIME AWARENESS SECTION ===== */}
      <RealTimeAwarenessSection />

      {/* ===== AUTONOMOUS EXECUTION SECTION ===== */}
      <AutonomousExecutionSection />

      {/* ===== SEO: FAQ SECTION ===== */}
      <Reveal>
        <div className="rv-container-v4" style={{ paddingBottom: '80px' }}>
          <FAQDisplay
            questions={rivtorFAQs}
            title="Frequently Asked Questions"
            maxItems={3}
          />
        </div>
      </Reveal>

      <Footer />

      {/* ===== SEO: SCHEMA MARKUP ===== */}
      <HowToSchema
        name={rivtorHowTo.name}
        description={rivtorHowTo.description}
        steps={rivtorHowTo.steps}
        totalTime={rivtorHowTo.totalTime}
      />
    </main>
  );
}
