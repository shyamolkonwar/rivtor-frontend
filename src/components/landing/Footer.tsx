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
}

const DEFAULT_FOOTER_GROUPS: FooterGroup[] = [
  {
    title: 'Product',
    links: [
      { label: 'Overview', href: '#product' },
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
    title: 'Legal',
    links: [
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
    ],
  },
];

export default function Footer({
  footerGroups = DEFAULT_FOOTER_GROUPS,
  bottomText = 'Built for execution.',
  tagline = 'Execution, without coordination.',
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
          <p>© 2026 Rivtor</p>
          <p>{bottomText}</p>
        </div>
      </div>
    </footer>
  );
}
