'use client';

import type { JSX, ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';

import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';

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
      viewport={{ once: true, amount: 0.1 }}
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

const sections = [
  {
    title: 'You Define the Direction',
    number: '1',
    content: `Everything starts with intent.

You tell Rivtor what you want:

<strong>"Launch a product"</strong>
<strong>"Increase revenue"</strong>
<strong>"Improve conversions"</strong>
<strong>"Fix growth bottlenecks"</strong>

Rivtor doesn't treat this as a task.
It treats it as a business objective.

It builds a structured understanding of:

• Your company
• Your products
• Your customers
• Your constraints

This becomes the living model of your business.`
  },
  {
    title: 'It Thinks Before It Acts',
    number: '2',
    content: `Unlike automation tools that jump straight into execution, Rivtor makes decisions first.

For every objective, it:

• Generates multiple approaches
• Evaluates trade-offs
• Simulates possible outcomes
• Selects the best path

Every action is backed by a clear decision, not guesswork.`
  },
  {
    title: 'It Plans Like an Operator',
    number: '3',
    content: `Once a decision is made, Rivtor converts it into execution.

It:

• Breaks strategy into structured plans
• Creates dependencies and timelines
• Assigns responsibilities across systems
• Prepares everything needed for execution

This is not a to-do list.
It's a coordinated execution system.`
  },
  {
    title: 'It Executes Across Your Stack',
    number: '4',
    content: `Rivtor connects with your tools, systems, and workflows.

Then it:

• Builds
• Launches
• Updates
• Monitors

— automatically.

It doesn't just suggest actions.
It actually gets things done.`
  },
  {
    title: 'It Learns From Every Outcome',
    number: '5',
    content: `Every result feeds back into the system.

Rivtor continuously:

• Tracks what worked and what didn't
• Updates its internal understanding
• Improves future decisions

Over time, it becomes:

• More accurate
• More aligned
• More effective`
  },
  {
    title: 'It Operates With Control & Accountability',
    number: '6',
    content: `Autonomy without control is dangerous.

Rivtor is built with:

• Clear decision ownership
• Risk-aware execution
• Approval layers when needed

You can:

• Stay fully in control
• Or let it operate autonomously`
  },
  {
    title: 'It Runs as a Company, Not a Feature',
    number: '7',
    content: `Rivtor is structured like a real organization.

It behaves like:

• A strategist
• An operator
• A builder
• A growth team

Working together — continuously.`
  }
];

export default function HowItWorksPage(): JSX.Element {
  return (
    <main className="rv-landing-v4">
      <Navbar />

      {/* Navbar spacer */}
      <div style={{ height: '72px' }} aria-hidden="true" />

      {/* Header */}
      <section className="rv-section-v4" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="rv-container-v4">
          <Reveal>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <p
                style={{
                  fontSize: '12px',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: 'rgba(255, 255, 255, 0.4)',
                  marginBottom: '24px',
                  fontFamily: 'var(--font-body)',
                }}
              >
                How It Works
              </p>
              <h1
                style={{
                  fontSize: '48px',
                  fontWeight: 600,
                  lineHeight: '1.2',
                  letterSpacing: '-1%',
                  color: 'var(--rv-text-primary)',
                  marginBottom: '24px',
                  fontFamily: 'var(--font-headline)',
                }}
              >
                Rivtor is not a tool. It's a system that runs your company.
              </h1>
              <p
                style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: 'rgba(255, 255, 255, 0.6)',
                  marginBottom: '16px',
                  margin: 0,
                  fontFamily: 'var(--font-body)',
                }}
              >
                Most software helps you do work.
              </p>
              <p
                style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: 'rgba(255, 255, 255, 0.6)',
                  margin: 0,
                  fontFamily: 'var(--font-body)',
                }}
              >
                Rivtor is designed to own outcomes.
              </p>
            </div>
          </Reveal>

          {/* Hero Subtitle */}
          <Reveal delay={0.1}>
            <div
              style={{
                maxWidth: '800px',
                margin: '48px auto 0',
                padding: '32px',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: '12px',
              }}
            >
              <p
                style={{
                  fontSize: '16px',
                  lineHeight: '1.6',
                  color: 'rgba(255, 255, 255, 0.7)',
                  marginBottom: 0,
                  fontFamily: 'var(--font-body)',
                }}
              >
                It doesn't just automate tasks — it understands goals, makes decisions, and executes across your business.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* What This Means */}
      <section className="rv-section-v4" style={{ paddingBottom: '80px' }}>
        <div className="rv-container-v4">
          <Reveal>
            <div
              style={{
                maxWidth: '720px',
                margin: '0 auto',
                textAlign: 'center',
                padding: '48px 32px',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: '12px',
              }}
            >
              <h3
                style={{
                  fontSize: '20px',
                  fontWeight: 600,
                  color: 'var(--rv-text-primary)',
                  marginBottom: '24px',
                  marginTop: 0,
                  fontFamily: 'var(--font-headline)',
                }}
              >
                What This Means for You
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left' }}>
                <p
                  style={{
                    fontSize: '16px',
                    lineHeight: '1.6',
                    color: 'rgba(255, 255, 255, 0.7)',
                    margin: 0,
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  No more fragmented tools
                </p>
                <p
                  style={{
                    fontSize: '16px',
                    lineHeight: '1.6',
                    color: 'rgba(255, 255, 255, 0.7)',
                    margin: 0,
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  No more manual coordination
                </p>
                <p
                  style={{
                    fontSize: '16px',
                    lineHeight: '1.6',
                    color: 'rgba(255, 255, 255, 0.7)',
                    margin: 0,
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  No more guess-based decisions
                </p>
              </div>
              <div
                style={{
                  marginTop: '32px',
                  paddingTop: '24px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <p
                  style={{
                    fontSize: '18px',
                    fontWeight: 500,
                    color: 'var(--rv-text-primary)',
                    margin: 0,
                    fontFamily: 'var(--font-headline)',
                  }}
                >
                  You move from managing work → defining outcomes
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* The Shift */}
      <section className="rv-section-v4" style={{ paddingBottom: '80px' }}>
        <div className="rv-container-v4">
          <Reveal>
            <div style={{ maxWidth: '720px', margin: '0 auto' }}>
              <h2
                style={{
                  fontSize: '32px',
                  fontWeight: 600,
                  lineHeight: '1.2',
                  letterSpacing: '-1%',
                  color: 'var(--rv-text-primary)',
                  marginBottom: '32px',
                  textAlign: 'center',
                  fontFamily: 'var(--font-headline)',
                }}
              >
                The Shift
              </h2>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '24px',
                }}
              >
                <div
                  style={{
                    padding: '24px',
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    borderRadius: '8px',
                  }}
                >
                  <p
                    style={{
                      fontSize: '12px',
                      fontWeight: 500,
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      color: 'rgba(255, 255, 255, 0.4)',
                      marginBottom: '16px',
                      margin: 0,
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    Traditional Software
                  </p>
                  <p
                    style={{
                      fontSize: '16px',
                      color: 'rgba(255, 255, 255, 0.7)',
                      margin: 0,
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    Input → Task → Output
                  </p>
                </div>
                <div
                  style={{
                    padding: '24px',
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    borderRadius: '8px',
                  }}
                >
                  <p
                    style={{
                      fontSize: '12px',
                      fontWeight: 500,
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      color: 'rgba(255, 255, 255, 0.4)',
                      marginBottom: '16px',
                      margin: 0,
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    Rivtor
                  </p>
                  <p
                    style={{
                      fontSize: '16px',
                      color: 'rgba(255, 255, 255, 0.7)',
                      margin: 0,
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    Objective → Decision → Execution → Learning → Growth
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Content */}
      <section className="rv-section-v4" style={{ paddingBottom: '80px' }}>
        <div className="rv-container-v4">
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            {sections.map((section, index) => (
              <SectionContent key={index} section={section} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Final Statement */}
      <section className="rv-section-v4" style={{ paddingBottom: '120px' }}>
        <div className="rv-container-v4">
          <Reveal>
            <div
              style={{
                maxWidth: '720px',
                margin: '0 auto',
                textAlign: 'center',
              }}
            >
              <p
                style={{
                  fontSize: '32px',
                  fontWeight: 600,
                  lineHeight: '1.2',
                  letterSpacing: '-1%',
                  color: 'var(--rv-text-primary)',
                  marginBottom: '16px',
                  marginTop: 0,
                  fontFamily: 'var(--font-headline)',
                }}
              >
                You don't run the system.
              </p>
              <p
                style={{
                  fontSize: '20px',
                  fontWeight: 400,
                  lineHeight: '1.4',
                  color: 'rgba(255, 255, 255, 0.6)',
                  margin: 0,
                  fontFamily: 'var(--font-body)',
                }}
              >
                The system runs the work — for you.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div
              style={{
                marginTop: '64px',
                paddingTop: '32px',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                textAlign: 'center',
              }}
            >
              <Link
                href="/"
                style={{
                  fontSize: '14px',
                  color: 'rgba(255, 255, 255, 0.6)',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-body)',
                }}
              >
                ← Back to Home
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function SectionContent({ section, index }: { section: any; index: number }) {
  return (
    <Reveal delay={index * 0.05}>
      <div style={{ marginBottom: '64px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', marginBottom: '24px' }}>
          <div
            style={{
              fontSize: '48px',
              fontWeight: 600,
              lineHeight: '1',
              color: 'rgba(255, 255, 255, 0.1)',
              fontFamily: 'var(--font-headline)',
              minWidth: '60px',
            }}
          >
            {section.number}
          </div>
          <div style={{ flex: 1 }}>
            <h2
              style={{
                fontSize: '28px',
                fontWeight: 600,
                lineHeight: '1.3',
                letterSpacing: '-0.5%',
                color: 'var(--rv-text-primary)',
                marginBottom: 0,
                marginTop: 0,
                fontFamily: 'var(--font-headline)',
              }}
            >
              {section.title}
            </h2>
          </div>
        </div>
        <div
          style={{
            fontSize: '16px',
            lineHeight: '1.7',
            color: 'rgba(255, 255, 255, 0.7)',
            fontFamily: 'var(--font-body)',
          }}
          dangerouslySetInnerHTML={{ __html: section.content.replace(/•/g, '<br>•') }}
        />
      </div>
    </Reveal>
  );
}
