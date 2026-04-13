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

const useCases = [
  {
    title: 'Launch a Product, End to End',
    flow: 'Objective → Product → Execution → Launch → Growth',
    prompt: 'Launch a new product',
    actions: [
      'Define product structure',
      'Build required assets',
      'Set up infrastructure',
      'Launch go-to-market campaigns',
      'Track performance'
    ],
    result: 'A complete product launch, without coordinating multiple teams.'
  },
  {
    title: 'Fix Growth Bottlenecks',
    flow: 'Traffic → Conversion → Drop-offs → Optimization',
    prompt: 'Why is growth slowing down?',
    actions: [
      'Analyze funnels and metrics',
      'Identify bottlenecks',
      'Test improvements',
      'Implement changes'
    ],
    result: 'Continuous growth optimization, not just reports.'
  },
  {
    title: 'Run Marketing Operations',
    flow: 'Strategy → Campaigns → Execution → Iteration',
    prompt: 'Run our marketing',
    actions: [
      'Plan campaigns',
      'Create and launch assets',
      'Manage distribution',
      'Track performance',
      'Adjust based on results'
    ],
    result: 'A fully operating marketing engine.'
  },
  {
    title: 'Build and Ship Features',
    flow: 'Idea → Plan → Build → Deploy → Monitor',
    prompt: 'Build this feature',
    actions: [
      'Break down requirements',
      'Plan execution',
      'Build and deploy',
      'Monitor outcomes'
    ],
    result: 'Faster product development, with less coordination overhead.'
  },
  {
    title: 'Automate Business Operations',
    flow: 'Workflow → Execution → Monitoring → Improvement',
    prompt: 'Automate our operations',
    actions: [
      'Internal workflows',
      'Process execution',
      'Task coordination',
      'Continuous optimization'
    ],
    result: 'Operations run without constant manual management.'
  },
  {
    title: 'Scale Without Hiring More Teams',
    flow: 'More Work, Not More Headcount',
    prompt: 'Scale our operations',
    actions: [
      'Takes ownership of execution',
      'Scales with your workload',
      'Maintains consistency'
    ],
    result: 'Growth without proportional team expansion.'
  },
  {
    title: 'Run Experiments Continuously',
    flow: 'Hypothesis → Test → Outcome → Learn → Repeat',
    prompt: 'Run experiments to improve',
    actions: [
      'Generates hypotheses',
      'Runs experiments',
      'Measures results',
      'Updates strategy'
    ],
    result: 'A company that continuously improves itself.'
  },
  {
    title: 'Maintain Full Visibility and Control',
    flow: 'Execution → Tracking → Insights → Control',
    prompt: 'Show me what is happening',
    actions: [
      'See every decision',
      'Track every execution',
      'Step in when needed'
    ],
    result: 'Autonomy with transparency.'
  }
];

export default function UseCasesPage(): JSX.Element {
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
                Use Cases
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
                Rivtor does not automate tasks.
              </h1>
              <h2
                style={{
                  fontSize: '32px',
                  fontWeight: 600,
                  lineHeight: '1.2',
                  letterSpacing: '-1%',
                  color: 'rgba(255, 255, 255, 0.7)',
                  marginBottom: '16px',
                  marginTop: 0,
                  fontFamily: 'var(--font-headline)',
                }}
              >
                It executes outcomes.
              </h2>
              <p
                style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: 'rgba(255, 255, 255, 0.6)',
                  margin: 0,
                  fontFamily: 'var(--font-body)',
                }}
              >
                From launching products to scaling growth, Rivtor operates across your entire company.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Use Cases */}
      <section className="rv-section-v4" style={{ paddingBottom: '80px' }}>
        <div className="rv-container-v4">
          {useCases.map((useCase, index) => (
            <UseCaseSection key={index} useCase={useCase} index={index} />
          ))}
        </div>
      </section>

      {/* Across All Use Cases */}
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
                Across all use cases
              </h2>
              <div
                style={{
                  padding: '32px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: '12px',
                }}
              >
                <p
                  style={{
                    fontSize: '20px',
                    lineHeight: '1.6',
                    color: 'rgba(255, 255, 255, 0.7)',
                    margin: 0,
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  Objective → Decision → Plan → Execute → Learn
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Who It's For */}
      <section className="rv-section-v4" style={{ paddingBottom: '80px' }}>
        <div className="rv-container-v4">
          <Reveal>
            <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
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
                Who it's for
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <p
                  style={{
                    fontSize: '18px',
                    lineHeight: '1.6',
                    color: 'rgba(255, 255, 255, 0.7)',
                    margin: 0,
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  Startups: Move faster with fewer people
                </p>
                <p
                  style={{
                    fontSize: '18px',
                    lineHeight: '1.6',
                    color: 'rgba(255, 255, 255, 0.7)',
                    margin: 0,
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  Agencies: Deliver more with less operational overhead
                </p>
                <p
                  style={{
                    fontSize: '18px',
                    lineHeight: '1.6',
                    color: 'rgba(255, 255, 255, 0.7)',
                    margin: 0,
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  Companies: Replace fragmented systems with unified execution
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* What Makes This Different */}
      <section className="rv-section-v4" style={{ paddingBottom: '80px' }}>
        <div className="rv-container-v4">
          <Reveal>
            <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
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
                What makes this different
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
                      marginBottom: '12px',
                      margin: 0,
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    Most tools
                  </p>
                  <ul style={{ margin: 0, paddingLeft: '20px', fontFamily: 'var(--font-body)' }}>
                    <li style={{ color: 'rgba(255, 255, 255, 0.5)', marginBottom: '8px' }}>Require constant input</li>
                    <li style={{ color: 'rgba(255, 255, 255, 0.5)', marginBottom: '8px' }}>Operate in isolation</li>
                    <li style={{ color: 'rgba(255, 255, 255, 0.5)', margin: 0 }}>Do not learn</li>
                  </ul>
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
                      marginBottom: '12px',
                      margin: 0,
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    Rivtor
                  </p>
                  <ul style={{ margin: 0, paddingLeft: '20px', fontFamily: 'var(--font-body)' }}>
                    <li style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: '8px' }}>Understands context</li>
                    <li style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: '8px' }}>Makes decisions</li>
                    <li style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: '8px' }}>Executes continuously</li>
                    <li style={{ color: 'rgba(255, 255, 255, 0.7)', margin: 0 }}>Improves over time</li>
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Closing */}
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
                  fontSize: '28px',
                  fontWeight: 600,
                  lineHeight: '1.3',
                  letterSpacing: '-0.5%',
                  color: 'var(--rv-text-primary)',
                  marginBottom: '16px',
                  margin: 0,
                  fontFamily: 'var(--font-headline)',
                }}
              >
                You do not use Rivtor for one task.
              </p>
              <p
                style={{
                  fontSize: '28px',
                  fontWeight: 600,
                  lineHeight: '1.3',
                  letterSpacing: '-0.5%',
                  color: 'var(--rv-text-primary)',
                  margin: 0,
                  fontFamily: 'var(--font-headline)',
                }}
              >
                You use it to run entire functions of your company.
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
                Back to Home
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function UseCaseSection({ useCase, index }: { useCase: any; index: number }) {
  return (
    <Reveal delay={index * 0.05}>
      <div
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          marginBottom: index < useCases.length - 1 ? '80px' : '0',
          paddingBottom: index < useCases.length - 1 ? '80px' : '0',
          borderBottom: index < useCases.length - 1 ? '1px solid rgba(255, 255, 255, 0.06)' : 'none',
        }}
      >
        <p
          style={{
            fontSize: '12px',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: 'rgba(255, 255, 255, 0.4)',
            marginBottom: '8px',
            fontFamily: 'var(--font-body)',
          }}
        >
          Use case {index + 1}
        </p>
        <h2
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
          {useCase.title}
        </h2>

        <div
          style={{
            marginBottom: '24px',
            padding: '16px',
            background: 'rgba(0, 0, 0, 0.3)',
            borderRadius: '6px',
          }}
        >
          <p
            style={{
              fontSize: '14px',
              color: 'rgba(255, 255, 255, 0.5)',
              margin: 0,
              fontFamily: 'monospace',
            }}
          >
            {useCase.flow}
          </p>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <p
            style={{
              fontSize: '12px',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'rgba(255, 255, 255, 0.4)',
              marginBottom: '8px',
              fontFamily: 'var(--font-body)',
            }}
          >
            Tell Rivtor:
          </p>
          <p
            style={{
              fontSize: '18px',
              color: 'var(--rv-text-primary)',
              fontStyle: 'italic',
              margin: '0 0 16px 16px',
              fontFamily: 'var(--font-headline)',
            }}
          >
            "{useCase.prompt}"
          </p>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <p
            style={{
              fontSize: '12px',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'rgba(255, 255, 255, 0.4)',
              marginBottom: '12px',
              fontFamily: 'var(--font-body)',
            }}
          >
            It will:
          </p>
          <ul style={{ margin: 0, paddingLeft: '20px', fontFamily: 'var(--font-body)' }}>
            {useCase.actions.map((action: string, i: number) => (
              <li key={i} style={{ color: 'rgba(255, 255, 255, 0.6)', marginBottom: '8px' }}>
                {action}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p
            style={{
              fontSize: '12px',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'rgba(255, 255, 255, 0.4)',
              marginBottom: '8px',
              fontFamily: 'var(--font-body)',
            }}
          >
            Result:
          </p>
          <p
            style={{
              fontSize: '16px',
              color: 'rgba(255, 255, 255, 0.7)',
              margin: 0,
              fontFamily: 'var(--font-body)',
            }}
          >
            {useCase.result}
          </p>
        </div>
      </div>
    </Reveal>
  );
}
