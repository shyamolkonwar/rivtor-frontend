'use client';

import Link from 'next/link';
import type { JSX } from 'react';
import { Github, Linkedin } from 'lucide-react';

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterGroup {
  title: string;
  links: FooterLink[];
}

interface FooterProps {
  footerGroups?: FooterGroup[];
  tagline?: string;
  legalLinks?: FooterLink[];
}

const DEFAULT_FOOTER_GROUPS: FooterGroup[] = [
  {
    title: 'Agent',
    links: [
      { label: 'Overview', href: '#overview' },
      { label: 'Reasoning', href: '#how-it-reasons' },
      { label: 'Capabilities', href: '#execution' },
    ],
  },
  {
    title: 'Research',
    links: [
      { label: 'Founder Psychology', href: '/research/founder-psychology' },
      { label: 'Cognitive Load', href: '/research/cognitive-load' },
      { label: 'Delegation Science', href: '/research/delegation' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#about' },
      { label: 'Contact', href: 'mailto:hello@rivtor.com' },
    ],
  },
  {
    title: 'Trust',
    links: [
      { label: 'Trust Center', href: '/trust-center' },
      { label: 'Security', href: '/trust' },
      { label: 'System Status', href: '/status' },
    ],
  },
];

const DEFAULT_LEGAL_LINKS: FooterLink[] = [
  { label: 'Privacy', href: '/privacy-policy' },
  { label: 'Terms', href: '/terms' },
  { label: 'Cookies', href: '/cookie-policy' },
];

function XIcon({ className = '' }: { className?: string }): JSX.Element {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export default function Footer({
  footerGroups = DEFAULT_FOOTER_GROUPS,
  tagline = 'The first agent that owns your outcomes.',
  legalLinks = DEFAULT_LEGAL_LINKS,
}: FooterProps): JSX.Element {
  return (
    <footer className="rv-footer-v4" aria-labelledby="footer-brand">
      <div className="rv-footer-v4__ambient" aria-hidden="true" />

      <div className="rv-container-v4">
        {/* Brand Statement */}
        <div className="rv-footer-v4__statement">
          <h2 id="footer-brand" className="rv-footer-v4__statement-text">
            {tagline}
          </h2>
        </div>

        {/* Divider */}
        <div className="rv-footer-v4__divider" />

        {/* Main Content */}
        <div className="rv-footer-v4__content">
          <div className="rv-footer-v4__brand">
            <span className="rv-footer-v4__brand-name">Rivtor</span>
            <div className="rv-footer-v4__status">
              <span className="rv-footer-v4__status-dot" aria-hidden="true" />
              <span className="rv-footer-v4__status-label">All systems operational</span>
            </div>
            <div className="rv-footer-v4__social">
              <a
                href="https://x.com/rivtor"
                target="_blank"
                rel="noopener noreferrer"
                className="rv-footer-v4__social-link"
                aria-label="X (formerly Twitter)"
              >
                <XIcon className="rv-footer-v4__social-icon" />
              </a>
              <a
                href="https://github.com/rivtor"
                target="_blank"
                rel="noopener noreferrer"
                className="rv-footer-v4__social-link"
                aria-label="GitHub"
              >
                <Github className="rv-footer-v4__social-icon" strokeWidth={1.5} />
              </a>
              <a
                href="https://linkedin.com/company/rivtor"
                target="_blank"
                rel="noopener noreferrer"
                className="rv-footer-v4__social-link"
                aria-label="LinkedIn"
              >
                <Linkedin className="rv-footer-v4__social-icon" strokeWidth={1.5} />
              </a>
            </div>
            <div className="rv-footer-v4__sponsor">
              <span className="rv-footer-v4__sponsor-label">Supported by</span>
              <a
                href="https://e2b.dev/startups"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="E2B for Startups"
              >
                <img
                  src="/White-1.png"
                  alt="E2B for Startups"
                  className="rv-footer-v4__sponsor-img"
                />
              </a>
              <a
                href="https://www.microsoft.com/en-us/startups"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Microsoft for Startups"
              >
                <img
                  src="/MS_Startups_Badge.png"
                  alt="Microsoft for Startups"
                  className="rv-footer-v4__sponsor-img"
                />
              </a>
            </div>
          </div>

          <div className="rv-footer-v4__links">
            {footerGroups.map((group) => (
              <div key={group.title} className="rv-footer-v4__column">
                <h4>{group.title}</h4>
                <ul>
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="rv-footer-v4__link">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="rv-footer-v4__bottom">
          <p className="rv-footer-v4__copyright">
            © {new Date().getFullYear()} Rivtor
          </p>
          <div className="rv-footer-v4__legal-links">
            {legalLinks.map((link) => (
              <Link key={link.label} href={link.href} className="rv-footer-v4__legal-link">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
