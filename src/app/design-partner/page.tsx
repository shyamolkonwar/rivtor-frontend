'use client';

import type { JSX, ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

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

const FOR_YOU_ITEMS = [
  "You're actively shipping product",
  'Your engineering team moves fast',
  'Execution slows down because of coordination overhead',
  'You want measurable operational leverage',
  "You're willing to work closely with us",
];

const NOT_FOR_YOU_ITEMS = [
  'Passive exploration',
  'Teams looking for generic AI chat tools',
  'Low-urgency environments',
  'Companies without active engineering workflows',
];

const WHAT_YOU_GET_ITEMS = [
  {
    main: 'Direct access to the Rivtor team',
    support: 'Work directly with the people building 01.',
  },
  {
    main: 'Fast iteration on real workflows',
    support: 'We improve the system around real engineering problems, not demos.',
  },
  {
    main: 'Early access to new capabilities',
    support: 'Use features before public release.',
  },
  {
    main: 'Priority support',
    support: 'Fast communication and rapid issue resolution.',
  },
  {
    main: 'Influence on the product roadmap',
    support: 'Your workflows and bottlenecks directly shape what we build next.',
  },
];

const HOW_WE_WORK_ITEMS = [
  {
    main: 'Collaborative deployment',
    support: 'We work closely with your team to integrate 01 into real workflows.',
  },
  {
    main: 'Weekly feedback loops',
    support: 'Fast iteration based on actual execution results.',
  },
  {
    main: 'Focus on measurable outcomes',
    support: 'We care about faster execution, reduced overhead, better throughput, and less coordination friction.',
  },
];

export default function DesignPartnerPage(): JSX.Element {
  const prefersReducedMotion = useReducedMotion();

  return (
    <main className="rv-landing-v4">
      <style>{`
        @media (max-width: 640px) {
          .dp-hero-title {
            font-size: 36px !important;
            line-height: 1.2 !important;
          }
          .dp-hero-subtitle {
            font-size: 16px !important;
            line-height: 1.6 !important;
          }
          .dp-section-title {
            font-size: 24px !important;
            line-height: 1.3 !important;
          }
          .dp-for-not-for-title {
            font-size: 16px !important;
          }
          .dp-item-main {
            font-size: 17px !important;
          }
          .dp-item-support {
            font-size: 14px !important;
          }
          .dp-section-header {
            font-size: 18px !important;
          }
          .dp-section-text {
            font-size: 17px !important;
            line-height: 1.6 !important;
          }
        }
        @media (max-width: 768px) {
          .dp-two-col {
            grid-template-columns: 1fr !important;
          }
          .dp-divider {
            display: none !important;
          }
          .dp-for-not-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
      <Navbar />

      <div style={{ height: '72px' }} aria-hidden="true" />

      {/* ===== HERO ===== */}
      <section className="rv-hero-v4" aria-labelledby="hero-title" style={{ paddingTop: '120px', paddingBottom: '100px' }}>
        <div className="rv-container-v4">
          <Reveal>
            <span
              style={{
                display: 'block',
                fontSize: '12px',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'rgba(255,255,255,0.4)',
                marginBottom: '24px',
                fontFamily: 'var(--font-body)',
                textAlign: 'center',
              }}
            >
              Design Partner Program
            </span>
          </Reveal>

          <motion.h1
            id="hero-title"
            className="dp-hero-title"
            style={{
              fontSize: '64px',
              fontWeight: 600,
              lineHeight: '1.1',
              letterSpacing: '-0.015em',
              color: 'var(--rv-text-primary)',
              margin: '0 auto 24px auto',
              maxWidth: '800px',
              textAlign: 'center',
              fontFamily: 'var(--font-headline)',
            }}
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.6,
              delay: prefersReducedMotion ? 0 : 0.05,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            Build with Rivtor 01
          </motion.h1>

          <motion.p
            className="dp-hero-subtitle"
            style={{
              fontSize: '18px',
              lineHeight: '28px',
              fontWeight: 400,
              color: 'rgba(255,255,255,0.7)',
              margin: '0 auto 32px auto',
              maxWidth: '640px',
              textAlign: 'center',
              fontFamily: 'var(--font-body)',
            }}
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.6,
              delay: prefersReducedMotion ? 0 : 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            We're partnering with a small group of engineering teams to shape the future of execution.
          </motion.p>

          <motion.div
            style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.6,
              delay: prefersReducedMotion ? 0 : 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <a href="/apply" className="rv-btn-v4 rv-btn-v4--primary">
              Apply to Join
            </a>
          </motion.div>
        </div>
      </section>

      {/* ===== WHAT 01 IS ===== */}
      <section className="rv-section-v4" style={{ paddingTop: '0', paddingBottom: '100px' }}>
        <div className="rv-container-v4">
          <Reveal>
            <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
              <p
                className="dp-section-text"
                style={{
                  fontSize: '20px',
                  lineHeight: '1.6',
                  color: 'rgba(255,255,255,0.75)',
                  margin: '0 0 16px 0',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 400,
                }}
              >
                Rivtor 01 is not another copilot or workflow tool.
              </p>
              <p
                className="dp-section-text"
                style={{
                  fontSize: '20px',
                  lineHeight: '1.6',
                  color: 'rgba(255,255,255,0.75)',
                  margin: '0 0 32px 0',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 400,
                }}
              >
                It plans engineering work, executes across tools, and keeps teams shipping.
              </p>
              <p
                style={{
                  fontSize: '17px',
                  lineHeight: '1.6',
                  color: 'rgba(255,255,255,0.5)',
                  margin: 0,
                  fontFamily: 'var(--font-body)',
                }}
              >
                We're looking for fast-moving startups that want to reduce coordination overhead, move faster, and turn plans into completed work.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== WHY TEAMS ARE JOINING ===== */}
      <section className="rv-section-v4" style={{ paddingTop: '0', paddingBottom: '100px' }}>
        <div className="rv-container-v4">
          <Reveal>
            <div style={{ maxWidth: '720px' }}>
              <h2
                className="dp-section-title"
                style={{
                  fontSize: '32px',
                  fontWeight: 600,
                  lineHeight: '1.3',
                  letterSpacing: '-0.5%',
                  color: 'var(--rv-text-primary)',
                  margin: '0 0 24px 0',
                  fontFamily: 'var(--font-headline)',
                }}
              >
                Why teams are joining
              </h2>
              <p
                className="dp-section-text"
                style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: 'rgba(255,255,255,0.6)',
                  margin: '0 0 20px 0',
                  fontFamily: 'var(--font-body)',
                }}
              >
                Engineering teams are overloaded with coordination, repetitive operational work, tracking tasks across tools, and execution bottlenecks.
              </p>
              <p
                className="dp-section-text"
                style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: 'rgba(255,255,255,0.6)',
                  margin: '0 0 20px 0',
                  fontFamily: 'var(--font-body)',
                }}
              >
                The problem is not lack of talent. The problem is that too much engineering time is spent managing work instead of shipping it.
              </p>
              <p
                className="dp-section-text"
                style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: 'rgba(255,255,255,0.8)',
                  margin: 0,
                  fontFamily: 'var(--font-body)',
                  fontWeight: 500,
                }}
              >
                Rivtor 01 is built to change that.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== WHAT 01 HELPS WITH ===== */}
      <section className="rv-section-v4" style={{ paddingTop: '0', paddingBottom: '100px' }}>
        <div className="rv-container-v4">
          <Reveal>
            <div style={{ maxWidth: '720px' }}>
              <h2
                className="dp-section-title"
                style={{
                  fontSize: '32px',
                  fontWeight: 600,
                  lineHeight: '1.3',
                  letterSpacing: '-0.5%',
                  color: 'var(--rv-text-primary)',
                  margin: '0 0 24px 0',
                  fontFamily: 'var(--font-headline)',
                }}
              >
                What 01 helps with
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {[
                  'Turning goals into execution plans',
                  'Coordinating work across engineering tools',
                  'Managing tasks and follow-through',
                  'Reducing manual operational overhead',
                  'Keeping execution moving without constant input',
                ].map((item) => (
                  <div key={item} style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
                    <span
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.4)',
                        flexShrink: 0,
                        marginTop: '10px',
                      }}
                    />
                    <p
                      style={{
                        fontSize: '17px',
                        color: 'rgba(255,255,255,0.7)',
                        margin: 0,
                        fontFamily: 'var(--font-body)',
                        lineHeight: '1.6',
                      }}
                    >
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== FOR / NOT FOR ===== */}
      <section className="rv-section-v4" style={{ paddingTop: '0', paddingBottom: '100px' }}>
        <div className="rv-container-v4">
          <Reveal>
            <div
              className="dp-for-not-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '24px',
                maxWidth: '900px',
              }}
            >
              <div
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '16px',
                  padding: '32px',
                }}
              >
                <h3
                  className="dp-for-not-for-title"
                  style={{
                    fontSize: '18px',
                    fontWeight: 600,
                    color: 'var(--rv-text-primary)',
                    margin: '0 0 20px 0',
                    fontFamily: 'var(--font-headline)',
                  }}
                >
                  This is for you if
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {FOR_YOU_ITEMS.map((item) => (
                    <p
                      key={item}
                      style={{
                        fontSize: '16px',
                        color: 'rgba(255,255,255,0.75)',
                        margin: 0,
                        fontFamily: 'var(--font-body)',
                        lineHeight: '1.5',
                      }}
                    >
                      {item}
                    </p>
                  ))}
                </div>
              </div>

              <div
                style={{
                  background: 'rgba(255,255,255,0.01)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  borderRadius: '16px',
                  padding: '32px',
                }}
              >
                <h3
                  className="dp-for-not-for-title"
                  style={{
                    fontSize: '18px',
                    fontWeight: 600,
                    color: 'rgba(255,255,255,0.5)',
                    margin: '0 0 20px 0',
                    fontFamily: 'var(--font-headline)',
                  }}
                >
                  This is not for
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {NOT_FOR_YOU_ITEMS.map((item) => (
                    <p
                      key={item}
                      style={{
                        fontSize: '16px',
                        color: 'rgba(255,255,255,0.4)',
                        margin: 0,
                        fontFamily: 'var(--font-body)',
                        lineHeight: '1.5',
                      }}
                    >
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== WHAT YOU GET / HOW WE WORK ===== */}
      <section className="rv-section-v4" style={{ paddingTop: '0', paddingBottom: '100px' }}>
        <div className="rv-container-v4">
          <Reveal>
            <div
              className="dp-two-col"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1px 1fr',
                gap: '64px',
                alignItems: 'start',
              }}
            >
              <div>
                <h3
                  className="dp-section-header"
                  style={{
                    fontSize: '22px',
                    fontWeight: 600,
                    lineHeight: '1.3',
                    letterSpacing: '-0.5%',
                    color: 'var(--rv-text-primary)',
                    margin: '0 0 32px 0',
                    fontFamily: 'var(--font-headline)',
                  }}
                >
                  What you get
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {WHAT_YOU_GET_ITEMS.map((item, index) => (
                    <motion.div
                      key={item.main}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                    >
                      <p
                        className="dp-item-main"
                        style={{
                          fontSize: '18px',
                          fontWeight: 500,
                          color: 'rgba(255,255,255,0.9)',
                          margin: '0 0 6px 0',
                          fontFamily: 'var(--font-headline)',
                          letterSpacing: '-0.3%',
                          lineHeight: '1.4',
                        }}
                      >
                        {item.main}
                      </p>
                      <p
                        className="dp-item-support"
                        style={{
                          fontSize: '15px',
                          color: 'rgba(255,255,255,0.45)',
                          margin: 0,
                          fontFamily: 'var(--font-body)',
                          lineHeight: '1.6',
                        }}
                      >
                        {item.support}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div
                className="dp-divider"
                style={{
                  width: '1px',
                  background: 'rgba(255,255,255,0.06)',
                  height: '100%',
                  minHeight: '400px',
                }}
              />

              <div>
                <h3
                  className="dp-section-header"
                  style={{
                    fontSize: '22px',
                    fontWeight: 600,
                    lineHeight: '1.3',
                    letterSpacing: '-0.5%',
                    color: 'var(--rv-text-primary)',
                    margin: '0 0 32px 0',
                    fontFamily: 'var(--font-headline)',
                  }}
                >
                  How we work
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {HOW_WE_WORK_ITEMS.map((item, index) => (
                    <motion.div
                      key={item.main}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                    >
                      <p
                        className="dp-item-main"
                        style={{
                          fontSize: '18px',
                          fontWeight: 500,
                          color: 'rgba(255,255,255,0.9)',
                          margin: '0 0 6px 0',
                          fontFamily: 'var(--font-headline)',
                          letterSpacing: '-0.3%',
                          lineHeight: '1.4',
                        }}
                      >
                        {item.main}
                      </p>
                      <p
                        className="dp-item-support"
                        style={{
                          fontSize: '15px',
                          color: 'rgba(255,255,255,0.45)',
                          margin: 0,
                          fontFamily: 'var(--font-body)',
                          lineHeight: '1.6',
                        }}
                      >
                        {item.support}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== SECURITY & INFRASTRUCTURE ===== */}
      <section className="rv-section-v4" style={{ paddingTop: '0', paddingBottom: '100px' }}>
        <div className="rv-container-v4">
          <Reveal>
            <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 48px auto' }}>
              <span
                style={{
                  display: 'inline-block',
                  fontSize: '12px',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: 'rgba(255,255,255,0.4)',
                  marginBottom: '16px',
                  fontFamily: 'var(--font-body)',
                }}
              >
                Security & Infrastructure
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '24px',
                justifyContent: 'center',
                maxWidth: '960px',
                margin: '0 auto',
              }}
            >
              {[
                {
                  title: 'Deployment flexibility',
                  desc: 'Cloud or private infrastructure options available.',
                },
                {
                  title: 'Data ownership',
                  desc: 'Your data remains fully under your control.',
                },
                {
                  title: 'Enterprise-ready foundation',
                  desc: 'Security, access control, and deployment support built from day one.',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  style={{
                    flex: '1 1 260px',
                    maxWidth: '320px',
                    background:
                      'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '20px',
                    padding: '36px 28px',
                    textAlign: 'center',
                  }}
                >
                  <h3
                    style={{
                      fontSize: '17px',
                      fontWeight: 600,
                      color: 'var(--rv-text-primary)',
                      margin: '0 0 10px 0',
                      fontFamily: 'var(--font-headline)',
                      letterSpacing: '-0.3%',
                      lineHeight: '1.3',
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '15px',
                      color: 'rgba(255,255,255,0.5)',
                      margin: 0,
                      fontFamily: 'var(--font-body)',
                      lineHeight: '1.6',
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== LIMITED ACCESS + FINAL CTA ===== */}
      <section className="rv-section-v4" style={{ paddingTop: '0', paddingBottom: '140px' }}>
        <div className="rv-container-v4">
          <Reveal>
            <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
              <h2
                className="dp-section-title"
                style={{
                  fontSize: '32px',
                  fontWeight: 600,
                  lineHeight: '1.2',
                  letterSpacing: '-0.5%',
                  color: 'var(--rv-text-primary)',
                  margin: '0 0 16px 0',
                  fontFamily: 'var(--font-headline)',
                }}
              >
                Limited Design Partner Access
              </h2>
              <p
                style={{
                  fontSize: '17px',
                  color: 'rgba(255,255,255,0.6)',
                  margin: '0 0 32px 0',
                  fontFamily: 'var(--font-body)',
                  lineHeight: '1.6',
                }}
              >
                We're onboarding a limited number of engineering teams for the initial rollout. Applications are reviewed manually to ensure strong alignment and fast execution.
              </p>
              <p
                style={{
                  fontSize: '18px',
                  color: 'rgba(255,255,255,0.85)',
                  margin: '0 0 32px 0',
                  fontFamily: 'var(--font-body)',
                  lineHeight: '1.5',
                  fontWeight: 500,
                }}
              >
                Help shape the first execution agent built for engineering teams.
              </p>
              <a
                href="/apply"
                className="rv-btn-v4 rv-btn-v4--primary"
                style={{ fontSize: '16px', padding: '0 32px', height: '52px' }}
              >
                Apply to Become a Design Partner
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
