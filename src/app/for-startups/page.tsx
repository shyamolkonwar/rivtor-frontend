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
    title: 'From Idea to Execution — Without Breakdown',
    number: '1',
    theReality: `Most founders can define what they want:

"Let's build this product"
"Let's test this idea"

But execution breaks:

unclear scope
missing steps
no coordination
delayed launches`,
    withRivtor: `Idea → Structured Objective → Plan → Execution → Launch

Rivtor:

converts ideas into structured objectives
defines what needs to be built
creates execution flow
runs the process end-to-end

You don't manage tasks.
You define direction.`,
  },
  {
    title: 'Replace Guesswork With Real Decisions',
    number: '2',
    theReality: `Most startup decisions are:

rushed
based on incomplete data
influenced by bias

And once taken:

not tracked
not evaluated
not improved`,
    withRivtor: `Context → Options → Evaluation → Decision → Outcome Tracking

Rivtor:

generates multiple approaches
evaluates trade-offs
selects a path with reasoning
tracks outcomes of every decision

Over time:

decisions become more accurate
mistakes don't repeat`,
  },
  {
    title: 'Build Faster Without Coordination Overhead',
    number: '3',
    theReality: `Execution slows down because:

dependencies are unclear
tasks block each other
communication overhead increases

You spend more time coordinating than building.`,
    withRivtor: `Decision → Structured Plan → Dependency Mapping → Parallel Execution

Rivtor:

breaks work into structured flows
manages dependencies automatically
runs multiple processes in parallel
ensures nothing is missed

Execution becomes system-driven — not people-driven.`,
  },
  {
    title: 'Growth That Actually Learns',
    number: '4',
    theReality: `Startups try growth like this:

run campaigns
check metrics
move on

No real learning loop.`,
    withRivtor: `Experiment → Execution → Outcome → Learning → Better Experiment

Rivtor:

identifies growth opportunities
runs structured experiments
tracks performance
updates future strategies

Growth becomes:

a system — not random attempts`,
  },
  {
    title: 'One System Across Product, Growth, and Operations',
    number: '5',
    theReality: `Everything is disconnected:

product decisions don't inform growth
growth doesn't inform operations
operations slow everything down`,
    withRivtor: `Product ↔ Growth ↔ Operations (Connected System)

Rivtor:

connects all functions
shares context across decisions
aligns execution across domains

This creates:

consistency
speed
clarity`,
  },
  {
    title: 'Scale Without Breaking Your System',
    number: '6',
    theReality: `As startups grow:

complexity increases
processes break
execution slows

You start hiring just to manage chaos.`,
    withRivtor: `More Work → Same System → Scaled Execution

Rivtor:

scales execution without increasing complexity
maintains structure as workload increases
keeps decisions and execution aligned

You scale output — not chaos.`,
  },
  {
    title: 'Continuous Learning as a Core System',
    number: '7',
    theReality: `Startups repeat mistakes because:

outcomes are not tracked properly
learnings are not structured
knowledge doesn't compound`,
    withRivtor: `Every Outcome → Captured → Evaluated → Applied

Rivtor:

records outcomes of every action
compares expected vs actual
feeds learning into future decisions

Over time:

your system becomes smarter than your initial intuition`,
  },
];

export default function ForStartupsPage(): JSX.Element {
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
                Solutions for Startups
              </p>
              <h1
                style={{
                  fontSize: '48px',
                  fontWeight: 600,
                  lineHeight: '1.2',
                  letterSpacing: '-1%',
                  color: 'var(--rv-text-primary)',
                  marginBottom: '16px',
                  fontFamily: 'var(--font-headline)',
                }}
              >
                Startups don't fail because of lack of ideas.
              </h1>
              <p
                style={{
                  fontSize: '32px',
                  fontWeight: 400,
                  lineHeight: '1.2',
                  letterSpacing: '-1%',
                  color: 'rgba(255, 255, 255, 0.6)',
                  marginBottom: '24px',
                  marginTop: 0,
                  fontFamily: 'var(--font-headline)',
                }}
              >
                They fail because execution breaks.
              </p>
            </div>
          </Reveal>

        </div>
      </section>

      {/* The Real Problem */}
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
                  marginTop: 0,
                  fontFamily: 'var(--font-headline)',
                }}
              >
                The Real Problem: Fragmented Execution
              </h2>
              <p
                style={{
                  fontSize: '14px',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: 'rgba(255, 255, 255, 0.4)',
                  marginBottom: '16px',
                  textAlign: 'center',
                  fontFamily: 'var(--font-body)',
                }}
              >
                In an early-stage startup, everything looks like this:
              </p>
              <div
                style={{
                  padding: '32px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: '12px',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <p
                    style={{
                      fontSize: '16px',
                      lineHeight: '1.6',
                      color: 'rgba(255, 255, 255, 0.7)',
                      margin: 0,
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    Strategy lives in your head
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
                    Tasks are scattered across tools
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
                    Execution depends on people switching contexts
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
                    Decisions are reactive, not structured
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
                    Learnings are lost between iterations
                  </p>
                </div>
              </div>
              <p
                style={{
                  fontSize: '14px',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: 'rgba(255, 255, 255, 0.4)',
                  marginBottom: '16px',
                  marginTop: '32px',
                  textAlign: 'center',
                  fontFamily: 'var(--font-body)',
                }}
              >
                You're constantly:
              </p>
              <div
                style={{
                  padding: '24px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: '12px',
                  textAlign: 'center',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <p
                    style={{
                      fontSize: '16px',
                      lineHeight: '1.6',
                      color: 'rgba(255, 255, 255, 0.7)',
                      margin: 0,
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    jumping between product, growth, ops
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
                    firefighting instead of building
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
                    guessing instead of knowing
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* What Rivtor Changes */}
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
              <h2
                style={{
                  fontSize: '32px',
                  fontWeight: 600,
                  lineHeight: '1.2',
                  letterSpacing: '-1%',
                  color: 'var(--rv-text-primary)',
                  marginBottom: '24px',
                  marginTop: 0,
                  fontFamily: 'var(--font-headline)',
                }}
              >
                What Rivtor Changes
              </h2>
              <p
                style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: 'rgba(255, 255, 255, 0.6)',
                  marginBottom: '24px',
                  margin: 0,
                  fontFamily: 'var(--font-body)',
                }}
              >
                Rivtor turns your startup into a continuous execution system.
              </p>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '24px',
                  textAlign: 'left',
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
                      marginBottom: '12px',
                      margin: 0,
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    Instead of:
                  </p>
                  <p
                    style={{
                      fontSize: '16px',
                      color: 'rgba(255, 255, 255, 0.5)',
                      margin: 0,
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    Idea → chaos → partial execution
                  </p>
                </div>
                <div
                  style={{
                    padding: '24px',
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid ' + 'rgba(255, 255, 255, 0.06)',
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
                      marginBottom: '12px',
                      margin: 0,
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    You get:
                  </p>
                  <p
                    style={{
                      fontSize: '16px',
                      fontWeight: 500,
                      color: 'var(--rv-text-primary)',
                      margin: 0,
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    Objective → Decision → Execution → Learning → Improvement
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

      {/* What This Actually Feels Like */}
      <section className="rv-section-v4" style={{ paddingBottom: '80px' }}>
        <div className="rv-container-v4">
          <Reveal>
            <div
              style={{
                maxWidth: '720px',
                margin: '0 auto',
                textAlign: 'center',
              }}
            >
              <h2
                style={{
                  fontSize: '32px',
                  fontWeight: 600,
                  lineHeight: '1.2',
                  letterSpacing: '-1%',
                  color: 'var(--rv-text-primary)',
                  marginBottom: '32px',
                  marginTop: 0,
                  fontFamily: 'var(--font-headline)',
                }}
              >
                What This Actually Feels Like
              </h2>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '24px',
                  textAlign: 'left',
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
                    Before Rivtor:
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <p
                      style={{
                        fontSize: '16px',
                        color: 'rgba(255, 255, 255, 0.5)',
                        margin: 0,
                        fontFamily: 'var(--font-body)',
                      }}
                    >
                      You are the system
                    </p>
                    <p
                      style={{
                        fontSize: '16px',
                        color: 'rgba(255, 255, 255, 0.5)',
                        margin: 0,
                        fontFamily: 'var(--font-body)',
                      }}
                    >
                      Everything depends on you
                    </p>
                    <p
                      style={{
                        fontSize: '16px',
                        color: 'rgba(255, 255, 255, 0.5)',
                        margin: 0,
                        fontFamily: 'var(--font-body)',
                      }}
                    >
                      Execution is fragile
                    </p>
                  </div>
                </div>
                <div
                  style={{
                    padding: '24px',
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid ' + 'rgba(255, 255, 255, 0.06)',
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
                    After Rivtor:
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <p
                      style={{
                        fontSize: '16px',
                        fontWeight: 500,
                        color: 'var(--rv-text-primary)',
                        margin: 0,
                        fontFamily: 'var(--font-body)',
                      }}
                    >
                      The system supports you
                    </p>
                    <p
                      style={{
                        fontSize: '16px',
                        fontWeight: 500,
                        color: 'var(--rv-text-primary)',
                        margin: 0,
                        fontFamily: 'var(--font-body)',
                      }}
                    >
                      Execution becomes consistent
                    </p>
                    <p
                      style={{
                        fontSize: '16px',
                        fontWeight: 500,
                        color: 'var(--rv-text-primary)',
                        margin: 0,
                        fontFamily: 'var(--font-body)',
                      }}
                    >
                      You focus on direction, not coordination
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="rv-section-v4" style={{ paddingBottom: '80px' }}>
        <div className="rv-container-v4">
          <Reveal>
            <div
              style={{
                maxWidth: '720px',
                margin: '0 auto',
                textAlign: 'center',
              }}
            >
              <h2
                style={{
                  fontSize: '32px',
                  fontWeight: 600,
                  lineHeight: '1.2',
                  letterSpacing: '-1%',
                  color: 'var(--rv-text-primary)',
                  marginBottom: '32px',
                  marginTop: 0,
                  fontFamily: 'var(--font-headline)',
                }}
              >
                Who This Is For
              </h2>
              <div
                style={{
                  padding: '32px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: '12px',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <p
                    style={{
                      fontSize: '16px',
                      lineHeight: '1.6',
                      color: 'rgba(255, 255, 255, 0.7)',
                      margin: 0,
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    Founders building from 0 → 1
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
                    Teams struggling with execution speed
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
                    Startups stuck in chaos between product and growth
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
                    Anyone trying to do too much with too few people
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* What You Stop/Start Doing */}
      <section className="rv-section-v4" style={{ paddingBottom: '80px' }}>
        <div className="rv-container-v4">
          <Reveal>
            <div
              style={{
                maxWidth: '720px',
                margin: '0 auto',
              }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '24px',
                }}
              >
                <div>
                  <p
                    style={{
                      fontSize: '12px',
                      fontWeight: 500,
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      color: 'rgba(255, 255, 255, 0.4)',
                      marginBottom: '16px',
                      textAlign: 'center',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    What You Stop Doing
                  </p>
                  <div
                    style={{
                      padding: '24px',
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      borderRadius: '8px',
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <p
                        style={{
                          fontSize: '16px',
                          lineHeight: '1.6',
                          color: 'rgba(255, 255, 255, 0.5)',
                          margin: 0,
                          fontFamily: 'var(--font-body)',
                        }}
                      >
                        managing tasks manually
                      </p>
                      <p
                        style={{
                          fontSize: '16px',
                          lineHeight: '1.6',
                          color: 'rgba(255, 255, 255, 0.5)',
                          margin: 0,
                          fontFamily: 'var(--font-body)',
                        }}
                      >
                        coordinating across tools
                      </p>
                      <p
                        style={{
                          fontSize: '16px',
                          lineHeight: '1.6',
                          color: 'rgba(255, 255, 255, 0.5)',
                          margin: 0,
                          fontFamily: 'var(--font-body)',
                        }}
                      >
                        repeating the same mistakes
                      </p>
                      <p
                        style={{
                          fontSize: '16px',
                          lineHeight: '1.6',
                          color: 'rgba(255, 255, 255, 0.5)',
                          margin: 0,
                          fontFamily: 'var(--font-body)',
                        }}
                      >
                        guessing your way forward
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <p
                    style={{
                      fontSize: '12px',
                      fontWeight: 500,
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      color: 'rgba(255, 255, 255, 0.4)',
                      marginBottom: '16px',
                      textAlign: 'center',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    What You Start Doing
                  </p>
                  <div
                    style={{
                      padding: '24px',
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid ' + 'rgba(255, 255, 255, 0.06)',
                      borderRadius: '8px',
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <p
                        style={{
                          fontSize: '16px',
                          lineHeight: '1.6',
                          fontWeight: 500,
                          color: 'var(--rv-text-primary)',
                          margin: 0,
                          fontFamily: 'var(--font-body)',
                        }}
                      >
                        defining outcomes
                      </p>
                      <p
                        style={{
                          fontSize: '16px',
                          lineHeight: '1.6',
                          fontWeight: 500,
                          color: 'var(--rv-text-primary)',
                          margin: 0,
                          fontFamily: 'var(--font-body)',
                        }}
                      >
                        making better decisions
                      </p>
                      <p
                        style={{
                          fontSize: '16px',
                          lineHeight: '1.6',
                          fontWeight: 500,
                          color: 'var(--rv-text-primary)',
                          margin: 0,
                          fontFamily: 'var(--font-body)',
                        }}
                      >
                        scaling execution
                      </p>
                      <p
                        style={{
                          fontSize: '16px',
                          lineHeight: '1.6',
                          fontWeight: 500,
                          color: 'var(--rv-text-primary)',
                          margin: 0,
                          fontFamily: 'var(--font-body)',
                        }}
                      >
                        building with clarity
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
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
                Startups don't need more tools.
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
                They need a system that can execute like a team — and learn like a founder.
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
      <div style={{ marginBottom: '80px' }}>
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
                marginBottom: '12px',
                margin: 0,
                fontFamily: 'var(--font-body)',
              }}
            >
              The Reality
            </p>
            <div
              style={{
                fontSize: '16px',
                lineHeight: '1.7',
                color: 'rgba(255, 255, 255, 0.6)',
                whiteSpace: 'pre-line',
                fontFamily: 'var(--font-body)',
              }}
            >
              {section.theReality}
            </div>
          </div>

          <div
            style={{
              padding: '24px',
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid ' + 'rgba(255, 255, 255, 0.08)',
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
                marginBottom: '12px',
                margin: 0,
                fontFamily: 'var(--font-body)',
              }}
            >
              With Rivtor
            </p>
            <div
              style={{
                fontSize: '16px',
                lineHeight: '1.7',
                color: 'rgba(255, 255, 255, 0.8)',
                whiteSpace: 'pre-line',
                fontFamily: 'var(--font-body)',
              }}
            >
              {section.withRivtor}
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
