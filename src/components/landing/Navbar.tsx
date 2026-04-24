'use client';

import Link from 'next/link';
import type { JSX } from 'react';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
}

const DEFAULT_NAV_ITEMS: NavItem[] = [
  { label: 'Architecture', href: '#architecture' },
  { label: 'Research', href: '/research' },
  { label: 'Status', href: '/status' },
  { label: 'Docs', href: '/docs' },
];

export default function Navbar(): JSX.Element {
  const [menuOpen, setMenuOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <header className="rv-nav-v4">
        <nav className="rv-nav__inner" aria-label="Primary navigation">
          <Link href="/" className="rv-brand-v4">
            Rivtor
          </Link>

          {/* Desktop links */}
          <div className="rv-nav-links-v4" aria-label="Desktop navigation">
            {DEFAULT_NAV_ITEMS.map((item) => (
              <Link key={item.label} href={item.href} className="rv-nav-link-v4">
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right side: CTA + hamburger */}
          <div className="rv-nav-actions">
            <Link
              href="https://app.rivtor.com"
              className="rv-btn-v4 rv-btn-v4--primary rv-nav-cta"
            >
              Try the Agent
            </Link>

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
          </div>
        </nav>
      </header>

      {/* Full-screen mobile overlay — rendered outside header to avoid clipping */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="rv-mobile-nav"
            className="rv-mobile-overlay"
            role="dialog"
            aria-label="Mobile navigation"
            aria-modal="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
            onClick={(e) => {
              if (e.target === e.currentTarget) setMenuOpen(false);
            }}
          >
            <div className="rv-mobile-overlay__content">
              <div className="rv-mobile-overlay__links">
                {DEFAULT_NAV_ITEMS.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
                    transition={{
                      duration: prefersReducedMotion ? 0 : 0.35,
                      delay: prefersReducedMotion ? 0 : index * 0.05,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Link
                      href={item.href}
                      className="rv-mobile-overlay__link"
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
