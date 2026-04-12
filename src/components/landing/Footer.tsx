'use client';

import Link from 'next/link';
import type { JSX } from 'react';

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
  bottomText?: string;
  tagline?: string;
  legalLinks?: FooterLink[];
}

const DEFAULT_FOOTER_GROUPS: FooterGroup[] = [
  {
    title: 'Product',
    links: [
      { label: 'Overview', href: '#product' },
      { label: 'How It Works', href: '#' },
      { label: 'Use Cases', href: '#' },
      { label: 'Architecture', href: '#' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { label: 'For Startups', href: '#' },
      { label: 'For Agencies', href: '#' },
      { label: 'For Operations', href: '#' },
      { label: 'For Enterprises', href: '#' },
    ],
  },
  {
    title: 'Programs',
    links: [
      { label: 'Design Partner', href: '/design-partner' },
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
    ],
  },
];

const DEFAULT_LEGAL_LINKS: FooterLink[] = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Data Processing Agreement', href: '/dpa' },
  { label: 'Acceptable Use Policy', href: '/aup' },
  { label: 'Cookie Policy', href: '/cookie-policy' },
  { label: 'Subprocessors', href: '/subprocessors' },
  { label: 'SLA', href: '/sla' },
];

export default function Footer({
  footerGroups = DEFAULT_FOOTER_GROUPS,
  bottomText = '',
  tagline = 'Execution, without coordination.',
  legalLinks = DEFAULT_LEGAL_LINKS,
}: FooterProps): JSX.Element {
  return (
    <footer className="rv-footer-v4" aria-labelledby="footer-brand">
      <div className="rv-container-v4">
        <div className="rv-footer-v4__content">
          <div className="rv-footer-v4__brand">
            <h2 id="footer-brand" className="rv-footer-v4__brand-name">
              Rivtor
            </h2>
            <p className="rv-footer-v4__tagline">{tagline}</p>
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

        <div className="rv-footer-v4__bottom">
          <div className="rv-footer-v4__legal-links">
            {legalLinks.map((link) => (
              <Link key={link.label} href={link.href} className="rv-footer-v4__legal-link">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="rv-footer-v4__copyright-section">
          <p className="rv-footer-v4__copyright">© 2026 Rivtor. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
