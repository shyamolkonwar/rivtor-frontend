'use client';

import type { JSX, ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import ExecutionAnimation from '@/components/landing/ExecutionAnimation';
import SystemBackground from '@/components/landing/SystemBackground';
import ExecutionSection from '@/components/landing/ExecutionSection';
import CategorySection from '@/components/landing/CategorySection';
import FutureSection from '@/components/landing/FutureSection';
import ChatExperience from '@/components/landing/ChatExperience';
import HowItWorksSection from '@/components/landing/HowItWorksSection';

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

const PROBLEM_ITEMS = [
  { text: 'Goals get set, but no one drives them', status: 'Stalled' },
  { text: 'Tasks get assigned, but no one follows up', status: 'Dropped' },
  { text: 'Projects start, but few get finished', status: 'Blocked' },
  { text: 'Everyone is busy, but nothing ships', status: 'Stuck' },
];

const CHAT_EXAMPLES = [
  {
    user: 'We need to increase signups by 50% this quarter.',
    rivtor: 'Got it. I will build a plan, assign the work, and drive it to completion. I will report back with progress.',
  },
  {
    user: 'We need revenue this month.',
    rivtor: 'Understood. I am identifying the fastest paths to revenue and getting the work done. You will see results, not status updates.',
  },
];

const CATEGORY_ITEMS = [
  { title: 'Software', description: 'helps you work' },
  { title: 'Tools', description: 'help you build' },
  { title: 'Rivtor', description: 'gets it done', highlight: true },
];

const WHO_ITS_FOR = [
  { title: 'Founders', description: 'Ship faster than teams.' },
  { title: 'Startups', description: 'Operate without overhead.' },
  { title: 'Companies', description: 'Scale execution without complexity.' },
];

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
        <div className="rv-container-v4">
          <motion.h1
            id="hero-title"
            className="rv-h1-v4"
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.6,
              delay: prefersReducedMotion ? 0 : 0,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            Set a goal. Rivtor gets it done for you.
          </motion.h1>

          <motion.p
            className="rv-hero-v4__copy"
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.6,
              delay: prefersReducedMotion ? 0 : 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            Turns your goals into finished work across your team and tools without constant follow-ups.
          </motion.p>

          <motion.div
            className="rv-hero-v4__actions"
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.6,
              delay: prefersReducedMotion ? 0 : 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <a href="/demo" className="rv-btn-v4 rv-btn-v4--primary">
              See It Work
            </a>
            <a href="#how-it-works" className="rv-btn-v4 rv-btn-v4--secondary">
              How It Works
            </a>
          </motion.div>

          <ExecutionAnimation />
        </div>
      </section>

      {/* ===== PROBLEM SECTION ===== */}
      <section className="rv-section-v4" aria-labelledby="problem-title" style={{ paddingTop: '140px', paddingBottom: '140px' }}>
        <div className="rv-container-v4">
          <div className="rv-problem-section">
            {/* LEFT SIDE - Statement */}
            <Reveal>
              <div className="rv-problem-left">
                <h2 id="problem-title" className="rv-problem-headline">
                  Work does not fail because people are lazy.
                </h2>
                <p className="rv-problem-subtext">
                  It fails because no one owns execution.
                </p>
              </div>
            </Reveal>

            {/* RIGHT SIDE - Problem Blocks */}
            <div className="rv-problem-blocks">
              {PROBLEM_ITEMS.map((item, index) => (
                <Reveal key={item.text} delay={index * 0.12}>
                  <div className="rv-problem-block">
                    <span className="rv-problem-block-icon">⚠</span>
                    <p className="rv-problem-block-text">{item.text}</p>
                    <span className="rv-problem-block-status">{item.status}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== EXECUTION SECTION ===== */}
      <ExecutionSection />

      {/* ===== EXPERIENCE SECTION ===== */}
      <section className="rv-section-v4" aria-labelledby="experience-title">
        <div className="rv-container-v4">
          <Reveal>
            <h2 id="experience-title" className="rv-h2-v4 rv-h2-v4--centered">
              It feels like work that actually gets finished.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <ChatExperience examples={CHAT_EXAMPLES} />
          </Reveal>
        </div>
      </section>

      {/* ===== CATEGORY SECTION ===== */}
      <CategorySection />

      {/* ===== FUTURE SECTION ===== */}
      <FutureSection />

      {/* ===== HOW IT WORKS SECTION ===== */}
      <HowItWorksSection />

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

      {/* ===== FINAL CTA SECTION ===== */}
      <section className="rv-section-v4 rv-section-v4--centered" aria-labelledby="cta-title">
        <div className="rv-container-v4">
          <Reveal>
            <h2 id="cta-title" className="rv-h2-v4 rv-h2-v4--centered">
              Stop following up.
              <br />
              Start setting goals.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div style={{ textAlign: 'center' }}>
              <a href="/demo" className="rv-btn-v4 rv-btn-v4--primary">
                See It Handle a Goal
              </a>
            </div>
          </Reveal>
        </div>
      </section>

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
