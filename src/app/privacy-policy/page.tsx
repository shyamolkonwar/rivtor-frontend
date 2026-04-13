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
    title: '1. Introduction',
    content: `This Privacy Policy describes how Rivtor ("we," "our," or "us") collects, uses, processes, and protects information when you access our website, platform, and services, including:

• Landing pages and marketing website
• The Rivtor application (including demo environments at app.rivtor.com)
• Design Partner Program and related services

By accessing or using our services, you agree to the terms outlined in this Privacy Policy.`
  },
  {
    title: '2. Scope of Services',
    content: `Rivtor provides AI-assisted systems for business analysis, workflow insights, and operational recommendations.

Our services may be delivered through different deployment models:

• Hosted (Rivtor-managed infrastructure)
• Private / On-Premise Deployment (client-managed infrastructure)
• Hybrid configurations combining both approaches

This Privacy Policy applies to all such environments, with specific distinctions outlined below.`
  },
  {
    title: '3. Information We Collect',
    subsections: [
      {
        title: '3.1 Information You Provide',
        content: `We may collect information that you voluntarily provide, including:

• Name, email address, and contact details
• Company name, role, and business information
• Responses submitted through forms (e.g., design partner applications)
• Feedback, communications, and onboarding inputs`
      },
      {
        title: '3.2 Automatically Collected Information',
        content: `When you use our website or platform, we may automatically collect:

• IP address and device information
• Browser type and operating system
• Usage logs, session activity, and interaction data
• Performance and diagnostic data`
      },
      {
        title: '3.3 Data from Integrations',
        content: `With your authorization, Rivtor may access data from third-party services, including but not limited to:

• Analytics platforms (e.g., Google Analytics)
• Databases and tools connected by the user
• External APIs and business systems

We only access such data as permitted by you and necessary for service functionality.`
      },
      {
        title: '3.4 Demo Environment',
        content: `The system available at app.rivtor.com is currently a demo and evaluation environment.

• It may use third-party infrastructure (e.g., external LLM providers, external databases)
• It is not a fully isolated or enterprise deployment
• Users should avoid submitting highly sensitive or regulated data in this environment`
      }
    ]
  },
  {
    title: '4. Deployment Models & Data Handling',
    subsections: [
      {
        title: '4.1 Hosted by Rivtor',
        content: `When Rivtor is hosted on our infrastructure:

• Data may be processed and stored on cloud services managed by us or our providers
• We implement logical and access-based controls to protect data
• Data may pass through third-party services required for functionality (e.g., LLM APIs)`
      },
      {
        title: '4.2 Private / On-Premise Deployment',
        content: `When Rivtor is deployed within a client's infrastructure:

• Data remains within the client's environment
• Rivtor does not directly access or store raw business data unless explicitly authorized
• Processing occurs within systems controlled by the client`
      },
      {
        title: '4.3 Hybrid Deployment',
        content: `In hybrid configurations:

• Certain components may run on Rivtor-managed infrastructure
• Other components may run within the client's infrastructure
• Data flow is determined by deployment configuration and user consent`
      }
    ]
  },
  {
    title: '5. How We Use Information',
    content: `We use collected information to:

• Provide and operate our services
• Analyze workflows and generate insights or recommendations
• Improve system performance, reliability, and user experience
• Communicate with users regarding updates, features, or support
• Evaluate and improve experimental features

We do not sell personal data.`
  },
  {
    title: '6. Experimental & Design Partner Usage',
    content: `Rivtor may offer access to early-stage, experimental, or limited features through:

• Demo environments
• Design Partner Program

In such cases:

• Data may be used to test, evaluate, and improve system performance
• Features may not be fully optimized, secure, or production-ready
• Users participate with the understanding of early-stage system limitations`
  },
  {
    title: '7. Data Sharing and Disclosure',
    content: `We may share data in the following situations:

• With service providers (e.g., hosting, analytics, infrastructure providers)
• With third-party integrations authorized by the user
• To comply with legal obligations or regulatory requirements
• To protect the security, integrity, or rights of Rivtor and its users

We do not sell or trade personal data.`
  },
  {
    title: '8. Data Retention',
    content: `We retain information:

• As long as necessary to provide services
• For legitimate business purposes (e.g., analytics, system improvement)
• As required by legal or regulatory obligations

Users may request deletion of their data, subject to technical and legal constraints.`
  },
  {
    title: '9. Data Security',
    content: `We implement reasonable administrative, technical, and organizational measures, including:

• Access control and authentication systems
• Encryption where applicable
• Infrastructure-level security practices

However, no system is completely secure, and we cannot guarantee absolute security.`
  },
  {
    title: '10. User Rights',
    content: `Depending on applicable laws, users may have rights to:

• Access their data
• Request correction or updates
• Request deletion of their data
• Withdraw consent for certain data processing

Requests can be made via the contact details below.`
  },
  {
    title: '11. Cookies and Tracking',
    content: `We may use cookies and similar technologies to:

• Improve user experience
• Analyze traffic and usage patterns
• Support marketing and analytics efforts

Users can control cookies through browser settings.`
  },
  {
    title: '12. Third-Party Services',
    content: `Rivtor may rely on third-party services, including:

• Cloud infrastructure providers
• AI/LLM providers
• Analytics tools
• Database providers

Use of such services is subject to their respective privacy policies.`
  },
  {
    title: '13. Changes to This Policy',
    content: `We may update this Privacy Policy from time to time.

Changes will be posted on this page with an updated "Last Updated" date.

Continued use of the service constitutes acceptance of the updated policy.`
  },
  {
    title: '14. Contact Information',
    content: `For questions, requests, or concerns regarding this Privacy Policy, please contact:

• Email: legal@rivtor.com
• Company Name: Rivtor Technologies Private Limited
• Address: [Insert Address]`
  },
  {
    title: '15. Consent',
    content: `By using our services, you acknowledge that:

• You have read and understood this Privacy Policy
• You agree to the collection and use of information as described
• You explicitly accept this policy when prompted during account creation or first login`
  }
];

export default function PrivacyPolicyPage(): JSX.Element {
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
                Privacy Policy
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
                    whiteSpace: 'pre-line',
                  }}
                  dangerouslySetInnerHTML={{ __html: subsection.content }}
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
              whiteSpace: 'pre-line',
            }}
            dangerouslySetInnerHTML={{ __html: section.content }}
          />
        )}
      </div>
    </Reveal>
  );
}
