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
    title: 'Data Ownership & Control',
    content: `We follow a simple principle:

<strong>You own your data. Rivtor processes it on your behalf.</strong>

• We do not sell your data
• We do not claim ownership of your business data
• You control what data is connected and processed
• You can request deletion of your data

Rivtor operates as a <strong>data processor</strong>, while you remain the <strong>data controller</strong>.`
  },
  {
    title: 'Deployment Architecture',
    content: `Rivtor supports flexible deployment models to meet different trust and security requirements.`,
    subsections: [
      {
        title: 'Hosted by Rivtor',
        content: `• Fast setup and onboarding
• Managed infrastructure
• Suitable for early-stage and non-sensitive use cases`
      },
      {
        title: 'Private / On-Premise Deployment',
        content: `• Runs inside your cloud (AWS, Azure, GCP)
• Your data never leaves your environment
• Full control over infrastructure and access`
      },
      {
        title: 'Hybrid Deployment',
        content: `• Combines Rivtor-managed and client-managed components
• Flexible control over data flow and processing`
      }
    ]
  },
  {
    title: 'Demo vs Production',
    content: `The environment at <strong>app.rivtor.com</strong> is a <strong>demo system</strong>.

• Uses third-party infrastructure and services
• Not fully isolated or enterprise-configured
• Not recommended for sensitive or regulated data

Production deployments are configured differently based on your requirements.`
  },
  {
    title: 'Security Practices',
    content: `We implement industry-standard security measures, including:

• Access control and authentication
• Role-based permissions (where applicable)
• Encryption in transit and at rest (where supported)
• Monitoring, logging, and system observability

We continuously improve our security practices as the platform evolves.`
  },
  {
    title: 'Subprocessors & Third-Party Services',
    content: `Rivtor may rely on trusted third-party providers for:

• Cloud infrastructure
• Databases and storage
• AI / LLM processing
• Analytics and monitoring

We ensure:

• Limited and necessary data access
• Contractual safeguards
• Transparency in usage

View our <a href="/subprocessors" style="color: var(--rv-text-primary);">Subprocessors Page</a> for more details.`
  },
  {
    title: 'Data Processing & Compliance',
    content: `Rivtor processes data in accordance with:

• Data Processing Agreement (DPA)
• Privacy Policy
• Terms of Service

We are structured as a <strong>data processor</strong>, meaning:

• You determine how and why your data is used
• We process data only to provide our services`
  },
  {
    title: 'AI Transparency',
    content: `Rivtor uses AI to analyze data and generate insights.

Important considerations:

• Outputs are based on available data and system logic
• Results may not always be accurate or complete
• Human review is recommended for critical decisions

Rivtor is designed to <strong>assist decision-making, not replace it</strong>.`
  },
  {
    title: 'Access & Permissions',
    content: `• Access to systems and data is restricted
• Internal access is limited to necessary functions
• In private deployments, access is governed by your infrastructure`
  },
  {
    title: 'Data Retention & Deletion',
    content: `• Data is retained only as long as necessary
• Users may request deletion of their data
• In private deployments, retention policies are controlled by the client`
  },
  {
    title: 'Our Commitment',
    content: `We are building Rivtor for serious businesses.

That means:

• Respecting your data
• Giving you control over deployment
• Being transparent about system behavior
• Continuously improving security and reliability

If you have specific requirements, we're open to working with you.`
  }
];

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Data Processing Agreement', href: '/dpa' },
  { label: 'Acceptable Use Policy', href: '/aup' },
  { label: 'Cookie Policy', href: '/cookie-policy' },
  { label: 'Subprocessors', href: '/subprocessors' },
  { label: 'Security & Trust', href: '/trust' },
];

export default function TrustCenterPage(): JSX.Element {
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
                Trust Center
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
                Building Rivtor on Trust, Transparency, and Control
              </h1>
              <p
                style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: 'rgba(255, 255, 255, 0.6)',
                  margin: 0,
                  fontFamily: 'var(--font-body)',
                }}
              >
                Rivtor is designed for businesses that rely on data, decisions, and execution.{' '}
                We understand that trust is not a feature—it's the foundation.
              </p>
            </div>
          </Reveal>

          {/* What We Handle */}
          <Reveal delay={0.1}>
            <div
              style={{
                maxWidth: '800px',
                margin: '48px auto 0',
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '16px',
              }}
            >
              {['Data', 'Security', 'Infrastructure', 'Compliance'].map((item) => (
                <div
                  key={item}
                  style={{
                    padding: '20px',
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    borderRadius: '8px',
                    textAlign: 'center',
                  }}
                >
                  <p
                    style={{
                      fontSize: '14px',
                      fontWeight: 500,
                      color: 'var(--rv-text-primary)',
                      margin: 0,
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Content */}
      <section className="rv-section-v4" style={{ paddingBottom: '120px' }}>
        <div className="rv-container-v4">
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            {sections.map((section, index) => (
              <SectionContent key={index} section={section} index={index} />
            ))}

            {/* Legal & Policies */}
            <Reveal delay={0.3}>
              <div
                style={{
                  marginTop: '64px',
                  padding: '32px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: '12px',
                }}
              >
                <h3
                  style={{
                    fontSize: '18px',
                    fontWeight: 600,
                    color: 'var(--rv-text-primary)',
                    marginBottom: '24px',
                    marginTop: 0,
                    fontFamily: 'var(--font-headline)',
                  }}
                >
                  Legal & Policies
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                  {legalLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      style={{
                        fontSize: '14px',
                        color: 'rgba(255, 255, 255, 0.6)',
                        textDecoration: 'none',
                        fontFamily: 'var(--font-body)',
                        transition: 'color 0.2s',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'var(--rv-text-primary)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)';
                      }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Contact Section */}
            <Reveal delay={0.4}>
              <div
                style={{
                  marginTop: '32px',
                  padding: '32px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: '12px',
                  textAlign: 'center',
                }}
              >
                <p
                  style={{
                    fontSize: '14px',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    color: 'rgba(255, 255, 255, 0.4)',
                    marginBottom: '16px',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  Contact
                </p>
                <p
                  style={{
                    fontSize: '16px',
                    lineHeight: '1.6',
                    color: 'rgba(255, 255, 255, 0.7)',
                    marginBottom: '24px',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  For security, compliance, or data-related questions
                </p>
                <a
                  href="mailto:legal@rivtor.com"
                  style={{
                    fontSize: '16px',
                    color: 'var(--rv-text-primary)',
                    textDecoration: 'none',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 500,
                  }}
                >
                  legal@rivtor.com
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.5}>
              <div
                style={{
                  marginTop: '48px',
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
        </div>
      </section>

      <Footer />
    </main>
  );
}

function SectionContent({ section, index }: { section: any; index: number }) {
  return (
    <Reveal delay={index * 0.05}>
      <div style={{ marginBottom: '48px' }}>
        <h2
          style={{
            fontSize: '24px',
            fontWeight: 600,
            lineHeight: '1.3',
            letterSpacing: '-0.5%',
            color: 'var(--rv-text-primary)',
            marginBottom: '16px',
            fontFamily: 'var(--font-headline)',
          }}
        >
          {section.title}
        </h2>
        {section.subsections ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {section.subsections.map((subsection: any, subIndex: number) => (
              <div key={subIndex} style={{ paddingLeft: '20px', borderLeft: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <h3
                  style={{
                    fontSize: '18px',
                    fontWeight: 500,
                    lineHeight: '1.4',
                    color: 'var(--rv-text-primary)',
                    marginBottom: '12px',
                    fontFamily: 'var(--font-headline)',
                  }}
                >
                  {subsection.title}
                </h3>
                <div
                  style={{
                    fontSize: '16px',
                    lineHeight: '1.7',
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontFamily: 'var(--font-body)',
                  }}
                  dangerouslySetInnerHTML={{ __html: subsection.content.replace(/•/g, '<br>•') }}
                />
              </div>
            ))}
          </div>
        ) : (
          <div
            style={{
              fontSize: '16px',
              lineHeight: '1.7',
              color: 'rgba(255, 255, 255, 0.7)',
              fontFamily: 'var(--font-body)',
            }}
            dangerouslySetInnerHTML={{ __html: section.content.replace(/•/g, '<br>•') }}
          />
        )}
      </div>
    </Reveal>
  );
}
