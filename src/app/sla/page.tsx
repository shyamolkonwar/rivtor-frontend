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
    title: '1. Scope of Services',
    content: `Rivtor provides AI-assisted systems for business analysis, insights, and operational support.

Service availability and performance may vary based on:

• Deployment model (Hosted, Private, Hybrid)
• Infrastructure configuration
• Third-party dependencies`
  },
  {
    title: '2. Service Availability',
    subsections: [
      {
        title: '2.1 Target Uptime',
        content: `For hosted environments managed by Rivtor:

<strong>Target Uptime:</strong> 95% – 99% monthly availability

This is a <strong>target</strong>, not a guaranteed service level, unless defined in a separate enterprise agreement.`
      },
      {
        title: '2.2 Exclusions',
        content: `Uptime calculations exclude:

• Scheduled maintenance
• Emergency maintenance
• Downtime caused by third-party services (e.g., cloud providers, AI/LLM providers)
• Customer-side infrastructure issues (for private deployments)
• Force majeure events (e.g., natural disasters, internet outages)`
      }
    ]
  },
  {
    title: '3. Deployment-Based Responsibilities',
    subsections: [
      {
        title: '3.1 Hosted by Rivtor',
        content: `• Rivtor manages infrastructure and service availability
• Performance depends on internal systems and third-party providers`
      },
      {
        title: '3.2 Private / On-Premise Deployment',
        content: `• Customer is responsible for infrastructure availability
• Rivtor is responsible for application-level functionality (as agreed)`
      },
      {
        title: '3.3 Hybrid Deployment',
        content: `• Responsibilities are shared
• Availability depends on both Rivtor-managed and customer-managed components`
      }
    ]
  },
  {
    title: '4. Support & Response Times',
    content: `We provide reasonable support based on issue severity.`,
    subsections: [
      {
        title: 'Critical (Service Unavailable)',
        content: `• Description: Platform inaccessible or major failure
• Response Time: Within 24 hours`
      },
      {
        title: 'High (Major Functionality Impacted)',
        content: `• Description: Core features not working as expected
• Response Time: Within 48 hours`
      },
      {
        title: 'Medium (Partial Issues)',
        content: `• Description: Non-critical features affected
• Response Time: Within 3–5 business days`
      },
      {
        title: 'Low (General Questions / Minor Issues)',
        content: `• Description: General inquiries or minor bugs
• Response Time: Best effort`
      }
    ]
  },
  {
    title: '5. Maintenance',
    subsections: [
      {
        title: '5.1 Scheduled Maintenance',
        content: `• May be performed periodically to improve performance or stability
• Efforts will be made to minimize disruption`
      },
      {
        title: '5.2 Emergency Maintenance',
        content: `• May occur without prior notice to address critical issues`
      }
    ]
  },
  {
    title: '6. Performance & Limitations',
    content: `Rivtor provides AI-assisted outputs that:

• May vary in accuracy and reliability
• Depend on input data and system configuration

We do not guarantee:

• Specific business outcomes
• Accuracy of AI-generated insights
• Continuous uninterrupted service`
  },
  {
    title: '7. Service Credits',
    content: `At this stage, Rivtor does <strong>not provide automatic service credits</strong> for downtime unless explicitly agreed in a separate contract.`
  },
  {
    title: '8. Changes to SLA',
    content: `We may update this SLA from time to time as the platform evolves.

Continued use of the service constitutes acceptance of updated terms.`
  },
  {
    title: '9. Relationship to Other Agreements',
    content: `This SLA should be read alongside:

• Terms of Service
• Privacy Policy
• Data Processing Agreement (DPA)

In case of conflict, the Terms of Service shall prevail.`
  },
  {
    title: '10. Contact Information',
    content: `For support or SLA-related inquiries:

<strong>Email:</strong> legal@rivtor.com
<strong>Company Name:</strong> Rivtor Technologies Private Limited`
  },
  {
    title: '11. Acknowledgment',
    content: `By using Rivtor, you acknowledge that:

• Service availability may vary based on deployment and dependencies
• This SLA reflects current capabilities and may evolve over time`
  }
];

export default function SLAPage(): JSX.Element {
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
                Service Level Agreement
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
                This Service Level Agreement outlines the service availability, support, and performance commitments for Rivtor's platform.{' '}
                This SLA applies to customers using Rivtor under paid plans or formal agreements, unless otherwise specified.
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

            {/* Support Contact */}
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
                  Support Contact
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
