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
    title: 'Your Data, Your Control',
    content: `We follow a simple principle:

<strong>You own your data. Rivtor processes it on your behalf.</strong>

• We do not sell your data
• We do not claim ownership of your business data
• You control what data is connected, processed, or removed`
  },
  {
    title: 'Hybrid Deployment Model',
    subsections: [
      {
        title: 'Hosted by Rivtor',
        subtitle: 'Fast Setup',
        content: `Best for:

• Early-stage teams
• Testing and evaluation
• Non-sensitive workflows

<strong>What this means:</strong>

• We manage infrastructure
• Faster onboarding
• Uses trusted third-party services where required`
      },
      {
        title: 'Private / On-Premise Deployment',
        subtitle: 'Enterprise-Ready',
        content: `Best for:

• Sensitive business data
• Compliance-heavy environments
• Enterprises and high-trust use cases

<strong>What this means:</strong>

• Rivtor runs inside your cloud (AWS / Azure / GCP)
• Your data never leaves your environment
• Full control over infrastructure and access`
      },
      {
        title: 'Hybrid Deployment',
        subtitle: 'Flexible Control',
        content: `Best for:

• Teams balancing flexibility and control

<strong>What this means:</strong>

• Some components run in your environment
• Some run on Rivtor infrastructure
• Data flow depends on configuration and permissions`
      }
    ]
  },
  {
    title: 'Demo vs Production Environments',
    content: `The system available at <strong>app.rivtor.com</strong> is a <strong>demo and evaluation environment</strong>.

• It may use external infrastructure (e.g., third-party AI models, external databases)
• It is not a fully isolated enterprise deployment
• We recommend avoiding sensitive or regulated data in demo environments

Production deployments are configured differently based on your chosen model.`
  },
  {
    title: 'Third-Party Services & Integrations',
    content: `Rivtor may interact with external systems to provide functionality, including:

• AI / LLM providers
• Cloud infrastructure providers
• Databases and analytics tools

We only access data:

• With your authorization
• To the extent required to deliver the service`
  },
  {
    title: 'Security Practices',
    content: `We implement industry-standard safeguards, including:

• Access control and authentication systems
• Role-based access where applicable
• Encryption in transit and at rest (where supported)
• Monitoring and logging of system activity

We continuously improve our security practices as the platform evolves.`
  },
  {
    title: 'Access & Permissions',
    content: `• Access to data is restricted to authorized systems and personnel
• Internal access is limited to what is necessary for service delivery
• In private deployments, access is governed by your infrastructure policies`
  },
  {
    title: 'Data Processing & Compliance',
    content: `Rivtor operates as a <strong>data processor</strong>, meaning:

• You (the customer) control your data
• We process it only to provide our services

We provide:

• Data Processing Agreement (DPA)
• Clear data handling practices
• Transparency in how data flows through the system`
  },
  {
    title: 'AI Transparency',
    content: `Rivtor uses AI to analyze data and generate insights.

Important to know:

• Outputs are generated based on available data and system logic
• Results may not always be accurate or complete
• Human review is recommended before making critical decisions`
  },
  {
    title: 'Design Partner & Early Access',
    content: `For early users and design partners:

• Some features may be experimental
• Systems may evolve rapidly
• Data may be used to improve system performance

We work closely with partners to ensure transparency and control.`
  },
  {
    title: 'Data Retention & Deletion',
    content: `• You can request deletion of your data
• Data is retained only as long as necessary for service delivery
• In private deployments, you control retention policies`
  },
  {
    title: 'Our Commitment',
    content: `We're building Rivtor for serious businesses.

That means:

• Respecting your data
• Giving you control
• Being transparent about how things work

If you have specific requirements, we're open to working with you.`
  }
];

export default function TrustPage(): JSX.Element {
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
                Security & Trust
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
                Built for Businesses That Care About Data
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
                Rivtor is designed from the ground up to handle business-critical data responsibly.{' '}
                Whether you're testing ideas or running sensitive operations, our architecture gives you control,{' '}
                flexibility, and transparency.
              </p>
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

            {/* Contact Section */}
            <Reveal delay={0.3}>
              <div
                style={{
                  marginTop: '64px',
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
                  Contact & Security Questions
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
                  If you have questions about security, data handling, or deployment options, we're here to help.
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

            <Reveal delay={0.4}>
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
                    marginBottom: '4px',
                    fontFamily: 'var(--font-headline)',
                  }}
                >
                  {subsection.title}
                </h3>
                {subsection.subtitle && (
                  <p
                    style={{
                      fontSize: '13px',
                      fontWeight: 500,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      color: 'rgba(255, 255, 255, 0.4)',
                      marginBottom: '12px',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    {subsection.subtitle}
                  </p>
                )}
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
