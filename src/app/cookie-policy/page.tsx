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
    title: '1. What Are Cookies?',
    content: `Cookies are small text files stored on your device (computer, tablet, or mobile) when you visit a website.

They help websites function properly, improve user experience, and provide information about how the site is used.`
  },
  {
    title: '2. How We Use Cookies',
    content: `We use cookies and similar technologies for the following purposes:`,
    subsections: [
      {
        title: '2.1 Essential Cookies',
        content: `These cookies are necessary for the website and platform to function properly.

They may include:

• Authentication and login functionality
• Security and session management
• Basic system operations

Without these cookies, certain features may not work.`
      },
      {
        title: '2.2 Analytics and Performance Cookies',
        content: `These cookies help us understand how users interact with our website and platform.

They may collect information such as:

• Pages visited
• Time spent on pages
• User interactions and navigation patterns

This helps us improve performance, usability, and system reliability.`
      },
      {
        title: '2.3 Functional Cookies',
        content: `These cookies enable enhanced functionality and personalization, such as:

• Remembering user preferences
• Improving user experience`
      },
      {
        title: '2.4 Third-Party Cookies',
        content: `We may use third-party services that set cookies on our behalf, including:

• Analytics providers
• Infrastructure and performance monitoring tools

These third parties may collect information in accordance with their own privacy policies.`
      }
    ]
  },
  {
    title: '3. Cookies in Demo vs Production Environments',
    content: `The environment at <strong>app.rivtor.com</strong> is a <strong>demo and evaluation system</strong>.

• It may use third-party tools and cookies for analytics and functionality
• Cookie behavior may differ from production or private deployments

In private or on-premise deployments, cookie usage may be controlled by the client's infrastructure.`
  },
  {
    title: '4. Managing Cookies',
    content: `You can control or disable cookies through your browser settings.

Most browsers allow you to:

• View stored cookies
• Delete cookies
• Block cookies from specific or all websites

Please note that disabling certain cookies may affect the functionality of the website or platform.`
  },
  {
    title: '5. Changes to This Policy',
    content: `We may update this Cookie Policy from time to time.

Changes will be posted on this page with an updated "Last Updated" date.`
  },
  {
    title: '6. Contact Information',
    content: `If you have any questions about this Cookie Policy, please contact:

<strong>Email:</strong> legal@rivtor.com
<strong>Company Name:</strong> Rivtor Technologies Private Limited
<strong>Address:</strong> [Insert Address]`
  },
  {
    title: '7. Relationship to Privacy Policy',
    content: `This Cookie Policy should be read alongside our Privacy Policy, which explains how we collect, use, and protect personal data.`
  },
  {
    title: '8. Consent',
    content: `By continuing to use our website and services, you consent to the use of cookies as described in this policy.

Where required, we may request explicit consent through cookie banners or settings.`
  }
];

export default function CookiePolicyPage(): JSX.Element {
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
                Cookie Policy
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
                This Cookie Policy explains how Rivtor uses cookies and similar technologies when you visit our website and use our services.
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
