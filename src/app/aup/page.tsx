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
    title: '1. Purpose',
    content: `Rivtor is designed to support legitimate business analysis, decision-making, and operational workflows.

This Policy ensures that the platform is used responsibly, lawfully, and without harm to others.`
  },
  {
    title: '2. Prohibited Uses',
    content: `You may not use Rivtor to engage in, promote, or facilitate any of the following:`,
    subsections: [
      {
        title: '2.1 Illegal Activities',
        content: `• Violating any applicable laws or regulations
• Supporting or engaging in fraud, scams, or deceptive practices
• Money laundering or financial misconduct`
      },
      {
        title: '2.2 Harmful or Abusive Conduct',
        content: `• Generating or promoting harassment, hate speech, or abusive content
• Activities that harm individuals, organizations, or communities
• Coordinated manipulation or malicious campaigns`
      },
      {
        title: '2.3 Unauthorized Data Use',
        content: `• Uploading or processing data without proper authorization
• Accessing, storing, or analyzing data that you do not have rights to use
• Violating privacy or confidentiality obligations`
      },
      {
        title: '2.4 Security Violations',
        content: `• Attempting to gain unauthorized access to systems or data
• Reverse engineering, probing, or exploiting vulnerabilities
• Interfering with system integrity or performance`
      },
      {
        title: '2.5 Misuse of AI and Automation',
        content: `• Using Rivtor to generate misleading, deceptive, or harmful outputs
• Automating decisions in ways that may cause harm without human oversight
• Deploying outputs in critical systems without proper validation`
      },
      {
        title: '2.6 High-Risk or Sensitive Use Without Safeguards',
        content: `You must not use Rivtor for:

• Regulated or sensitive data (e.g., financial, healthcare, legal) in demo environments
• Critical decision-making without independent verification
• Situations where errors could result in significant harm`
      },
      {
        title: '2.7 Platform Abuse',
        content: `• Excessive usage that disrupts service availability
• Circumventing usage limits, controls, or safeguards
• Using the platform in a way that degrades performance for others`
      }
    ]
  },
  {
    title: '3. Data Responsibility',
    content: `You are responsible for:

• Ensuring you have the legal right to use any data you provide
• Maintaining confidentiality of sensitive information
• Complying with applicable data protection laws

Rivtor acts as a processor of data and relies on your authorization.`
  },
  {
    title: '4. Third-Party Integrations',
    content: `When connecting external systems:

• You must have permission to access and share that data
• You are responsible for compliance with third-party terms
• You must not use integrations to bypass restrictions or safeguards`
  },
  {
    title: '5. Monitoring and Enforcement',
    content: `Rivtor may:

• Monitor usage for compliance with this Policy
• Investigate suspected violations
• Restrict, suspend, or terminate access without prior notice

We reserve the right to take appropriate action to protect the platform and its users.`
  },
  {
    title: '6. Reporting Violations',
    content: `If you become aware of misuse or violations, please contact:

<strong>legal@rivtor.com</strong>`
  },
  {
    title: '7. Changes to This Policy',
    content: `We may update this Policy from time to time.

Continued use of the platform constitutes acceptance of the updated Policy.`
  },
  {
    title: '8. Relationship to Other Terms',
    content: `This Policy is part of and complements:

• Terms of Service
• Privacy Policy
• Data Processing Agreement

In case of conflict, the Terms of Service shall prevail.`
  },
  {
    title: '9. Acknowledgment',
    content: `By using Rivtor, you acknowledge that:

• You understand and agree to this Acceptable Use Policy
• You will use the platform responsibly and lawfully
• You accept that violations may result in loss of access`
  }
];

export default function AUPPage(): JSX.Element {
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
                Legal
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
                Acceptable Use Policy
              </h1>
              <p
                style={{
                  fontSize: '16px',
                  lineHeight: '1.6',
                  color: 'rgba(255, 255, 255, 0.5)',
                  margin: 0,
                  fontFamily: 'var(--font-body)',
                }}
              >
                Last Updated: January 2026
              </p>
            </div>
          </Reveal>

          {/* Notice */}
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
                This Acceptable Use Policy governs your use of Rivtor's website, platform, and services.{' '}
                By using Rivtor, you agree to comply with this Policy. Violations may result in suspension or termination of access.
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
