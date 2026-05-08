'use client';

import type { JSX } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { AnnouncementBadge } from '@/components/landing/AnnouncementBadge';
import SystemBackground from '@/components/landing/SystemBackground';
import ProductUIMockup from '@/components/landing/ProductUIMockup';

import HowItWorksSection from '@/components/landing/HowItWorksSection';
import ProblemSection from '@/components/landing/ProblemSection';
import SolutionSection from '@/components/landing/SolutionSection';
import WhatChangesSection from '@/components/landing/WhatChangesSection';
import CapabilitiesSection from '@/components/landing/CapabilitiesSection';
import LandingUseCasesSection from '@/components/landing/LandingUseCasesSection';
import InteractionSection from '@/components/landing/InteractionSection';
import FinalCTASection from '@/components/landing/FinalCTASection';

// SEO/GEO Components
import { FAQDisplay, HowToSchema } from '@/components/seo';
import { rivtorHowTo } from '@/data/rivtorGEO';
import { rivtorFAQs } from '@/data/rivtorSEO';

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
              Meet Rivtor 01
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
              Plans engineering work, executes across tools, and keeps teams shipping.
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
              <a href="https://app.rivtor.com" className="rv-btn-v4 rv-btn-v4--primary">
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

          <motion.div
            className="rv-hero-v4__ui-mockup"
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.9,
              delay: prefersReducedMotion ? 0 : 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <ProductUIMockup />
          </motion.div>
        </div>
      </section>

      {/* ===== PROBLEM SECTION ===== */}
      <ProblemSection />

      {/* ===== SOLUTION SECTION ===== */}
      <SolutionSection />

      {/* ===== HOW IT WORKS SECTION ===== */}
      <HowItWorksSection />

      {/* ===== WHAT CHANGES SECTION ===== */}
      <WhatChangesSection />

      {/* ===== CAPABILITIES SECTION ===== */}
      <CapabilitiesSection />

      {/* ===== USE CASES SECTION ===== */}
      <LandingUseCasesSection />

      {/* ===== INTERACTION SECTION ===== */}
      <InteractionSection />

      {/* ===== FAQ SECTION ===== */}
      <FAQDisplay
        questions={rivtorFAQs}
        title="Questions"
        subtitle="Architecture, execution, and reliability."
        maxItems={3}
      />

      {/* ===== FINAL CTA SECTION ===== */}
      <FinalCTASection />

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
