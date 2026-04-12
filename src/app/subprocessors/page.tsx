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
    title: '1. What Are Subprocessors?',
    content: `Subprocessors are third-party vendors engaged by Rivtor to support the delivery of our platform.

These providers may process data on our behalf for purposes such as:

• Cloud infrastructure and hosting
• Data storage and databases
• AI and machine learning processing
• Analytics and monitoring

We carefully select subprocessors based on their security, reliability, and compliance practices.`
  },
  {
    title: '2. Our Approach to Subprocessors',
    content: `We follow these principles:

<strong>Data Minimization:</strong> Subprocessors only access data necessary for their function
<strong>Security:</strong> We use providers with strong security standards
<strong>Contractual Safeguards:</strong> Subprocessors are bound by data protection obligations
<strong>Transparency:</strong> We disclose subprocessors used in our services`
  },
  {
    title: '3. Categories of Subprocessors',
    content: `Rivtor may use subprocessors across the following categories:`,
    subsections: [
      {
        title: '3.1 Cloud Infrastructure Providers',
        content: `Used to host and operate the platform.

Examples may include:

• Amazon Web Services (AWS)
• Microsoft Azure
• Google Cloud Platform (GCP)`
      },
      {
        title: '3.2 Database & Storage Providers',
        content: `Used for storing and managing application data.

Examples may include:

• Supabase
• Managed database services`
      },
      {
        title: '3.3 AI / LLM Providers',
        content: `Used to power AI-driven analysis and insights.

Examples may include:

• External large language model (LLM) providers
• AI inference services`
      },
      {
        title: '3.4 Analytics & Monitoring Tools',
        content: `Used to monitor performance and improve system reliability.

Examples may include:

• Analytics platforms
• Logging and monitoring systems`
      }
    ]
  },
  {
    title: '4. Demo Environment Notice',
    content: `The system available at <strong>app.rivtor.com</strong> is a <strong>demo and evaluation environment</strong>.

• It may rely more heavily on third-party subprocessors
• It may not reflect the architecture of production or private deployments
• Users should avoid submitting sensitive or regulated data`
  },
  {
    title: '5. Deployment-Based Differences',
    subsections: [
      {
        title: 'Hosted by Rivtor',
        content: `• Subprocessors are used to deliver and operate the platform
• Data may be processed through third-party infrastructure`
      },
      {
        title: 'Private / On-Premise Deployment',
        content: `• Subprocessors may be minimized or eliminated
• Data remains within the client's infrastructure
• Clients may choose their own providers`
      },
      {
        title: 'Hybrid Deployment',
        content: `• Some subprocessors may still be used depending on configuration
• Data flow depends on architecture and permissions`
      }
    ]
  },
  {
    title: '6. Updates to Subprocessors',
    content: `We may update our list of subprocessors from time to time.

Changes may include:

• Adding new providers
• Replacing existing providers
• Removing providers

Updated information will be reflected on this page.`
  },
  {
    title: '7. Contact Information',
    content: `For questions regarding subprocessors or data handling practices:

<strong>Email:</strong> legal@rivtor.com
<strong>Company Name:</strong> Rivtor Technologies Private Limited`
  },
  {
    title: '8. Relationship to Other Documents',
    content: `This page should be read alongside:

• Privacy Policy
• Terms of Service
• Data Processing Agreement (DPA)`
  },
  {
    title: '9. Commitment to Transparency',
    content: `We aim to provide clear visibility into how data is handled across our system.

If you require more detailed information for compliance or enterprise use, please contact us.`
  }
];

export default function SubprocessorsPage(): JSX.Element {
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
                Subprocessors
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
                This page provides information about third-party service providers ("Subprocessors") that Rivtor uses to process data as part of delivering our services.
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
