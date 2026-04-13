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
    title: '1. Definitions',
    content: `<strong>Personal Data:</strong> Any information relating to an identified or identifiable individual.

<strong>Processing:</strong> Any operation performed on Personal Data (e.g., collection, storage, analysis).

<strong>Controller:</strong> The entity that determines the purposes and means of processing Personal Data.

<strong>Processor:</strong> Rivtor, which processes Personal Data on behalf of the Controller.

<strong>Subprocessor:</strong> Any third party engaged by Rivtor to process Personal Data.`
  },
  {
    title: '2. Scope and Purpose',
    content: `Rivtor provides AI-assisted systems that process data to:

• Analyze workflows and operations
• Generate insights and recommendations
• Support decision-making processes

Processing activities are limited to what is necessary to provide the services described in the Terms of Service.`
  },
  {
    title: '3. Roles and Responsibilities',
    subsections: [
      {
        title: '3.1 Controller Responsibilities',
        content: `The Controller:

• Determines the purpose and legal basis for processing Personal Data
• Ensures that all data provided to Rivtor is collected lawfully
• Is responsible for accuracy, quality, and legality of Personal Data`
      },
      {
        title: '3.2 Processor Responsibilities (Rivtor)',
        content: `Rivtor agrees to:

• Process Personal Data only on documented instructions from the Controller
• Not use Personal Data for purposes outside of service delivery
• Implement appropriate technical and organizational safeguards
• Ensure confidentiality of personnel accessing data`
      }
    ]
  },
  {
    title: '4. Nature of Data Processing',
    content: `Rivtor may process the following categories of data:

• User account data (name, email, role, company details)
• Business and operational data provided by the Controller
• Usage logs and interaction data
• Data accessed via third-party integrations authorized by the Controller

Processing activities may include:

• Storage
• Analysis
• Structuring and transformation
• AI-assisted interpretation`
  },
  {
    title: '5. Deployment Models and Data Handling',
    subsections: [
      {
        title: '5.1 Hosted by Rivtor',
        content: `When services are hosted by Rivtor:

• Data may be processed and stored on Rivtor-managed or third-party cloud infrastructure
• Processing may involve external service providers (e.g., AI/LLM providers, databases)`
      },
      {
        title: '5.2 Private / On-Premise Deployment',
        content: `When deployed within the Controller's infrastructure:

• Personal Data remains within the Controller's environment
• Rivtor does not access or store raw Personal Data unless explicitly authorized
• Processing occurs under the Controller's control`
      },
      {
        title: '5.3 Hybrid Deployment',
        content: `In hybrid configurations:

• Data may be processed across both Rivtor-managed and Controller-managed environments
• Data flow depends on deployment architecture and user configuration`
      }
    ]
  },
  {
    title: '6. Subprocessors',
    content: `The Controller acknowledges and agrees that Rivtor may engage Subprocessors, including but not limited to:

• Cloud infrastructure providers (e.g., AWS, Azure, GCP)
• Database providers (e.g., Supabase or equivalent)
• AI/LLM service providers
• Analytics and monitoring tools

Rivtor ensures that:

• Subprocessors are subject to appropriate data protection obligations
• Access is limited to what is necessary for service delivery

A list of subprocessors may be provided upon request or via a public page.`
  },
  {
    title: '7. Data Security',
    content: `Rivtor implements reasonable security measures, including:

• Access control and authentication
• Encryption where applicable
• Infrastructure-level safeguards
• Monitoring and logging

However, the Controller acknowledges that no system is completely secure.`
  },
  {
    title: '8. Confidentiality',
    content: `Rivtor ensures that:

• Personnel authorized to process Personal Data are bound by confidentiality obligations
• Access to Personal Data is limited to those necessary for service delivery`
  },
  {
    title: '9. Data Subject Rights',
    content: `Rivtor shall assist the Controller, where reasonably possible, in responding to requests related to:

• Access
• Correction
• Deletion
• Restriction of processing

The Controller remains responsible for handling such requests.`
  },
  {
    title: '10. Data Retention and Deletion',
    content: `Rivtor will:

• Retain Personal Data only as long as necessary to provide services
• Delete or return Personal Data upon request, subject to legal or technical constraints

In on-premise deployments, data retention is controlled by the Controller.`
  },
  {
    title: '11. International Data Transfers',
    content: `Where applicable:

• Data may be processed in jurisdictions where Rivtor or its Subprocessors operate
• Appropriate safeguards will be implemented where required`
  },
  {
    title: '12. Incident Management',
    content: `In the event of a data breach involving Personal Data:

• Rivtor will take reasonable steps to identify and mitigate the issue
• The Controller will be notified where required by applicable laws`
  },
  {
    title: '13. Liability',
    content: `Each party's liability under this DPA shall be subject to the limitations set forth in the Terms of Service.`
  },
  {
    title: '14. Term and Termination',
    content: `This DPA remains in effect for as long as Rivtor processes Personal Data on behalf of the Controller.

Upon termination:

• Processing activities will cease
• Data handling will follow the retention and deletion terms`
  },
  {
    title: '15. Audit Rights',
    content: `Where required and reasonable:

• The Controller may request information regarding Rivtor's data protection practices
• Formal audits may be subject to prior notice and mutual agreement`
  },
  {
    title: '16. Experimental Features and Design Partner Use',
    content: `For early-stage or experimental features:

• Processing may involve evolving systems and architectures
• Data may be used to test and improve performance

The Controller acknowledges participation in such programs carries inherent limitations.`
  },
  {
    title: '17. Governing Law',
    content: `This Agreement shall be governed by the laws of India, unless otherwise agreed in a separate contract.`
  },
  {
    title: '18. Contact Information',
    content: `For data protection inquiries:

• Email: legal@rivtor.com
• Company Name: Rivtor Technologies Private Limited
• Address: [Insert Address]`
  },
  {
    title: '19. Acceptance',
    content: `By using Rivtor's services, the Controller acknowledges and agrees to this Data Processing Agreement.`
  }
];

export default function DPAPage(): JSX.Element {
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
                Data Processing Agreement
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

          {/* Parties */}
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
                  fontSize: '14px',
                  color: 'rgba(255, 255, 255, 0.6)',
                  marginBottom: '24px',
                  fontFamily: 'var(--font-body)',
                  lineHeight: '1.6',
                }}
              >
                This Data Processing Agreement (&ldquo;Agreement&rdquo; or &ldquo;DPA&rdquo;) forms part of the Terms of Service between:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <p
                    style={{
                      fontSize: '14px',
                      color: 'rgba(255, 255, 255, 0.5)',
                      margin: '0 0 8px 0',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    Between:
                  </p>
                  <p
                    style={{
                      fontSize: '16px',
                      color: 'var(--rv-text-primary)',
                      margin: 0,
                      fontFamily: 'var(--font-headline)',
                      fontWeight: 500,
                    }}
                  >
                    Customer (&ldquo;Controller&rdquo;)
                  </p>
                </div>
                <div>
                  <p
                    style={{
                      fontSize: '14px',
                      color: 'rgba(255, 255, 255, 0.5)',
                      margin: '0 0 8px 0',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    And:
                  </p>
                  <p
                    style={{
                      fontSize: '16px',
                      color: 'var(--rv-text-primary)',
                      margin: 0,
                      fontFamily: 'var(--font-headline)',
                      fontWeight: 500,
                    }}
                  >
                    Rivtor (&ldquo;Processor&rdquo;)
                  </p>
                </div>
              </div>
              <p
                style={{
                  fontSize: '14px',
                  color: 'rgba(255, 255, 255, 0.6)',
                  marginTop: '24px',
                  marginBottom: 0,
                  fontFamily: 'var(--font-body)',
                  lineHeight: '1.6',
                }}
              >
                This Agreement governs the processing of personal data by Rivtor on behalf of the Controller.
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

            <Reveal delay={0.3}>
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
              <div key={subIndex}>
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
