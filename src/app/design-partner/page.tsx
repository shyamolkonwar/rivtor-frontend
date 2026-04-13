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
  "You're actively building",
  'You have real problems now',
  'You move fast',
  'You want execution, not advice',
];

const NOT_FOR_YOU_ITEMS = [
  'Curious testers',
  'Exploratory use',
  'Slow-moving teams',
  'Low urgency',
];

const WHAT_YOU_GET_ITEMS = [
  {
    main: 'Direct access to the Rivtor team',
    support: 'Work directly with the people building the system.',
  },
  {
    main: 'Execution support, not recommendations',
    support: 'We act. Not just advise.',
  },
  {
    main: 'Rapid iteration on real problems',
    support: 'Changes happen in days, not weeks.',
  },
  {
    main: 'Early access to capabilities',
    support: 'Use features before they exist publicly.',
  },
  {
    main: 'Influence on system direction',
    support: 'Your problems shape what we build.',
  },
];

const HOW_WE_WORK_ITEMS = [
  {
    main: 'Close collaboration',
    support: "You're not a user. You're a partner.",
  },
  {
    main: 'Honest feedback',
    support: 'Direct input improves the system.',
  },
  {
    main: 'Fast communication',
    support: 'No delays, no bottlenecks.',
  },
  {
    main: 'Willingness to iterate',
    support: 'We test, adjust, and move forward.',
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
          .dp-cta-title {
            font-size: 28px !important;
            line-height: 1.2 !important;
          }
          .dp-section-title {
            font-size: 24px !important;
            line-height: 1.3 !important;
          }
          .dp-label {
            font-size: 11px !important;
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
      `}</style>
      <Navbar />

      {/* Navbar spacer */}
      <div style={{ height: '72px' }} aria-hidden="true" />

      {/* ===== HERO SECTION ===== */}
      <section className="rv-hero-v4" aria-labelledby="hero-title" style={{ paddingTop: '120px', paddingBottom: '120px' }}>
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
              letterSpacing: '-1.5%',
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
            Build With Rivtor
          </motion.h1>

          <motion.p
            className="dp-hero-subtitle"
            style={{
              fontSize: '18px',
              lineHeight: '28px',
              fontWeight: 400,
              color: 'rgba(255,255,255,0.7)',
              margin: '0 auto 32px auto',
              maxWidth: '600px',
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
            We're working with a small group of startups to build the first AI execution system that doesn't just think — it actually gets things done.
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
            <a
              href="/apply"
              className="rv-btn-v4 rv-btn-v4--primary"
            >
              Apply to Join
            </a>
          </motion.div>
        </div>
      </section>

      {/* ===== WHAT RIVTOR IS ===== */}
      <section className="rv-section-v4" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
        <div className="rv-container-v4">
          <Reveal>
            <div style={{ maxWidth: '700px' }}>
              <h2
                className="dp-section-title"
                style={{
                  fontSize: '32px',
                  fontWeight: 600,
                  lineHeight: '1.3',
                  letterSpacing: '-0.5%',
                  color: 'var(--rv-text-primary)',
                  margin: '0 0 16px 0',
                  fontFamily: 'var(--font-headline)',
                }}
              >
                Rivtor is an execution system.
              </h2>
              <p
                style={{
                  fontSize: '18px',
                  lineHeight: '28px',
                  color: 'rgba(255,255,255,0.6)',
                  margin: 0,
                  fontFamily: 'var(--font-body)',
                }}
              >
                It takes goals, plans actions, and drives outcomes across your company.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== WHY THIS EXISTS ===== */}
      <section className="rv-section-v4" style={{ paddingTop: '0', paddingBottom: '100px' }}>
        <div className="rv-container-v4">
          <Reveal>
            <div style={{ maxWidth: '800px' }}>
              <p
                className="dp-section-text"
                style={{
                  fontSize: '20px',
                  lineHeight: '1.5',
                  color: 'rgba(255,255,255,0.8)',
                  margin: '0 0 12px 0',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 400,
                }}
              >
                This isn't a typical launch.
              </p>
              <p
                className="dp-section-text"
                style={{
                  fontSize: '20px',
                  lineHeight: '1.5',
                  color: 'rgba(255,255,255,0.8)',
                  margin: '0 0 12px 0',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 400,
                }}
              >
                We're building it with a small group of companies.
              </p>
              <p
                className="dp-section-text"
                style={{
                  fontSize: '20px',
                  lineHeight: '1.5',
                  color: 'rgba(255,255,255,0.8)',
                  margin: 0,
                  fontFamily: 'var(--font-body)',
                  fontWeight: 400,
                }}
              >
                Through real execution.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== WHO THIS IS FOR (FILTER SECTION) ===== */}
      <section className="rv-section-v4" style={{ paddingTop: '0', paddingBottom: '100px' }}>
        <div className="rv-container-v4">
          <Reveal>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '24px',
                maxWidth: '900px',
              }}
            >
              {/* LEFT - FOR YOU */}
              <div
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '12px',
                  padding: '24px',
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
                        color: 'rgba(255,255,255,0.8)',
                        margin: 0,
                        fontFamily: 'var(--font-body)',
                      }}
                    >
                      {item}
                    </p>
                  ))}
                </div>
              </div>

              {/* RIGHT - NOT FOR YOU */}
              <div
                style={{
                  background: 'rgba(255,255,255,0.01)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  borderRadius: '12px',
                  padding: '24px',
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

      {/* ===== PARTNERSHIP GRID ===== */}
      <section className="rv-section-v4" style={{ paddingTop: '0', paddingBottom: '100px' }}>
        <div className="rv-container-v4">
          <Reveal>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1px 1fr',
                gap: '64px',
                alignItems: 'start',
              }}
            >
              {/* LEFT - WHAT YOU GET */}
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
                      whileHover={{ opacity: 0.8 }}
                      style={{ cursor: 'default' }}
                    >
                      <p
                        className="dp-item-main"
                        style={{
                          fontSize: '20px',
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
                          fontSize: '16px',
                          color: 'rgba(255,255,255,0.5)',
                          margin: 0,
                          fontFamily: 'var(--font-body)',
                          lineHeight: '1.6',
                        }}
                      >
                        → {item.support}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* VERTICAL DIVIDER */}
              <div
                style={{
                  width: '1px',
                  background: 'rgba(255,255,255,0.06)',
                  height: '100%',
                  minHeight: '400px',
                }}
              />

              {/* RIGHT - HOW WE WORK */}
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
                      whileHover={{ opacity: 0.8 }}
                      style={{ cursor: 'default' }}
                    >
                      <p
                        className="dp-item-main"
                        style={{
                          fontSize: '20px',
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
                          fontSize: '16px',
                          color: 'rgba(255,255,255,0.5)',
                          margin: 0,
                          fontFamily: 'var(--font-body)',
                          lineHeight: '1.6',
                        }}
                      >
                        → {item.support}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== ENTERPRISE DATA HANDLING ===== */}
      <section className="rv-section-v4" style={{ paddingTop: '0', paddingBottom: '100px' }}>
        <div className="rv-container-v4">
          <Reveal>
            <div
              style={{
                maxWidth: '700px',
                margin: '0 auto',
                padding: '32px',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '12px',
              }}
            >
              <div style={{ marginBottom: '24px' }}>
                <h3
                  style={{
                    fontSize: '22px',
                    fontWeight: 600,
                    lineHeight: '1.3',
                    letterSpacing: '-0.5%',
                    color: 'var(--rv-text-primary)',
                    margin: '0 0 12px 0',
                    fontFamily: 'var(--font-headline)',
                  }}
                >
                  Enterprise-Ready Data Handling
                </h3>
              </div>
              <ul
                style={{
                  margin: 0,
                  padding: 0,
                  listStyle: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                <li style={{ fontSize: '16px', color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-body)', lineHeight: '1.6' }}>
                  <span style={{ color: 'rgba(255,255,255,0.9)', fontWeight: 500 }}>Data Processing Agreement (DPA)</span> — Ready for legal review
                </li>
                <li style={{ fontSize: '16px', color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-body)', lineHeight: '1.6' }}>
                  <span style={{ color: 'rgba(255,255,255,0.9)', fontWeight: 500 }}>Hybrid deployment</span> — Your infrastructure, your control
                </li>
                <li style={{ fontSize: '16px', color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-body)', lineHeight: '1.6' }}>
                  <span style={{ color: 'rgba(255,255,255,0.9)', fontWeight: 500 }}>Full data ownership</span> — Your data stays yours
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== SCARCITY BLOCK ===== */}
      <section className="rv-section-v4" style={{ paddingTop: '0', paddingBottom: '100px' }}>
        <div className="rv-container-v4">
          <Reveal>
            <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
              <h2
                className="dp-section-title"
                style={{
                  fontSize: '28px',
                  fontWeight: 600,
                  lineHeight: '1.3',
                  letterSpacing: '-0.5%',
                  color: 'var(--rv-text-primary)',
                  margin: '0 0 16px 0',
                  fontFamily: 'var(--font-headline)',
                }}
              >
                We're onboarding a limited number of design partners.
              </h2>
              <p
                style={{
                  fontSize: '16px',
                  color: 'rgba(255,255,255,0.5)',
                  margin: 0,
                  fontFamily: 'var(--font-body)',
                }}
              >
                Applications are reviewed manually.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== TRANSPARENCY BLOCK ===== */}
      <section className="rv-section-v4" style={{ paddingTop: '0', paddingBottom: '100px' }}>
        <div className="rv-container-v4">
          <Reveal>
            <div
              style={{
                maxWidth: '700px',
                margin: '0 auto',
                padding: '24px',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '12px',
              }}
            >
              <p
                style={{
                  fontSize: '14px',
                  color: 'rgba(255,255,255,0.5)',
                  margin: 0,
                  textAlign: 'center',
                  fontFamily: 'var(--font-body)',
                  lineHeight: '1.6',
                }}
              >
                We're currently onboarding design partners and defining pilot scopes. Formal contracts and billing begin after entity setup.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section
        id="apply"
        className="rv-section-v4 rv-section-v4--centered"
        style={{ paddingTop: '0', paddingBottom: '120px' }}
        aria-labelledby="cta-title"
      >
        <div className="rv-container-v4">
          <Reveal>
            <h2
              id="cta-title"
              className="dp-cta-title"
              style={{
                fontSize: '40px',
                fontWeight: 600,
                lineHeight: '1.2',
                letterSpacing: '-1%',
                color: 'var(--rv-text-primary)',
                margin: '0 auto 32px auto',
                maxWidth: '700px',
                textAlign: 'center',
                fontFamily: 'var(--font-headline)',
              }}
            >
              Apply to become a design partner
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div style={{ textAlign: 'center' }}>
              <a
                href="/apply"
                className="rv-btn-v4 rv-btn-v4--primary"
              >
                Apply Now
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
