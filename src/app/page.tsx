'use client';

import Link from 'next/link';
import type { JSX, ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import ExecutionAnimation from '@/components/landing/ExecutionAnimation';
import SystemBackground from '@/components/landing/SystemBackground';
import AutonomousLoop from '@/components/landing/AutonomousLoop';
import TransformationVisual from '@/components/landing/TransformationVisual';
import ExecutionSection from '@/components/landing/ExecutionSection';
import ExecutionEndToEnd from '@/components/landing/ExecutionEndToEnd';
import CategorySection from '@/components/landing/CategorySection';
import FutureSection from '@/components/landing/FutureSection';
import ChatExperience from '@/components/landing/ChatExperience';

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

const HOW_IT_WORKS_STEPS = [
  {
    stage: '01',
    action: 'Define the goal',
    execution: 'You describe what you want to achieve.',
  },
  {
    stage: '02',
    action: 'Rivtor plans',
    execution: 'Breaks down strategy and priorities.',
  },
  {
    stage: '03',
    action: 'Rivtor executes',
    execution: 'Runs experiments, integrates with tools, ships changes.',
  },
  {
    stage: '04',
    action: 'Rivtor iterates',
    execution: 'Tracks results, adapts strategy, improves continuously.',
  },
];

const PROBLEM_ITEMS = [
  { text: 'Plans don\'t get executed', status: 'Stalled' },
  { text: 'Teams don\'t align', status: 'Unaligned' },
  { text: 'Experiments stall', status: 'Blocked' },
  { text: 'Decisions lag', status: 'Delayed' },
];

const CHAT_EXAMPLES = [
  {
    user: 'We\'re losing users after signup. How do we fix it?',
    rivtor: 'Analyzing your funnel. I\'m launching onboarding experiments and identifying drop-off points. I\'ll report back with results.',
  },
  {
    user: 'We need revenue this month.',
    rivtor: 'Understood. I\'m identifying fastest paths to revenue and deploying acquisition strategies. Tracking progress in real time.',
  },
];

const CATEGORY_ITEMS = [
  { title: 'Software', description: 'helps you work' },
  { title: 'Tools', description: 'help you build' },
  { title: 'Rivtor', description: 'executes', highlight: true },
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
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.6,
              delay: prefersReducedMotion ? 0 : 0,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ textAlign: 'center', marginBottom: '24px' }}
          >
            <Link
              href="/design-partner"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '100px',
                fontSize: '14px',
                fontWeight: 500,
                color: 'rgba(255,255,255,0.8)',
                textDecoration: 'none',
                transition: 'all 150ms ease',
                fontFamily: 'var(--font-body)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                e.currentTarget.style.color = 'rgba(255,255,255,1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.color = 'rgba(255,255,255,0.8)';
              }}
            >
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '6px',
                  height: '6px',
                  background: '#22C55E',
                  borderRadius: '50%',
                }}
              />
              We're onboarding design partners →
            </Link>
          </motion.div>

          <motion.h1
            id="hero-title"
            className="rv-h1-v4"
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.6,
              delay: prefersReducedMotion ? 0 : 0.05,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            We are building the first autonomous companies.
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
            Rivtor is execution intelligence. Give it a goal — it plans, executes, and iterates until results are achieved.
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
            <a href="/design-partner" className="rv-btn-v4 rv-btn-v4--primary">
              Work With Rivtor
            </a>
            <a href="#execution" className="rv-btn-v4 rv-btn-v4--secondary">
              See how it works
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
                   Execution is the bottleneck.
                 </h2>
                 <p className="rv-problem-subtext">
                   Not strategy. Not ideas. Execution.
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

       {/* ===== EXECUTION END-TO-END SECTION ===== */}
       <ExecutionEndToEnd />

       {/* ===== EXPERIENCE SECTION ===== */}
       <section className="rv-section-v4" aria-labelledby="experience-title">
         <div className="rv-container-v4">
           <Reveal>
             <h2 id="experience-title" className="rv-h2-v4 rv-h2-v4--centered">
               It feels like a team that never stops.
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
               Stop managing execution.
               <br />
               Start delegating outcomes.
             </h2>
           </Reveal>

           <Reveal delay={0.1}>
             <div style={{ textAlign: 'center' }}>
              <button className="rv-btn-v4 rv-btn-v4--primary" type="button">
                  Work With Rivtor
                </button>
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
