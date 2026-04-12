'use client';

import Link from 'next/link';
import type { JSX, ReactNode } from 'react';
import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
}

interface NavbarProps {
  navItems?: NavItem[];
  ctaText?: string;
  ctaHref?: string;
  children?: ReactNode;
}

const DEFAULT_NAV_ITEMS: NavItem[] = [
  { label: 'Product', href: '#overview' },
  { label: 'Execution', href: '#execution' },
  { label: 'Vision', href: '#vision' },
];

export default function Navbar({
  navItems = DEFAULT_NAV_ITEMS,
  ctaText = 'Get Access',
  ctaHref = '/register',
  children,
}: NavbarProps): JSX.Element {
  const [menuOpen, setMenuOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  return (
    <header className="rv-nav-v4">
      <nav className="rv-nav__inner" aria-label="Primary navigation">
        <Link href="/" className="rv-brand-v4">
          Rivtor
        </Link>

        <div className="rv-nav-links-v4" aria-label="Desktop navigation">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} className="rv-nav-link-v4">
              {item.label}
            </Link>
          ))}
          <Link href={ctaHref} className="rv-btn-v4 rv-btn-v4--primary" style={{ height: '40px', padding: '0 20px', fontSize: '14px' }}>
            {ctaText}
          </Link>
          {children}
        </div>

        <button
          type="button"
          className="rv-menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="rv-mobile-nav"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id="rv-mobile-nav"
            className="rv-mobile-nav"
            role="dialog"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : -8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -8, height: 0 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.24,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="rv-mobile-nav-link"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link href={ctaHref} className="rv-btn-v4 rv-btn-v4--primary rv-mobile-cta" onClick={() => setMenuOpen(false)}>
              {ctaText}
            </Link>
            {children}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
