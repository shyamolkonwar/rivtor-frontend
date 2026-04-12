'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function CallPage() {
  useEffect(() => {
    // Load Calendly widget script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      document.body.removeChild(script);
    };
  }, []);

  return (
    <main className="rv-landing-v4">
      <div className="rv-apply-container">
        <motion.div
          className="rv-apply-content rv-apply-content--wide"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Context above calendar */}
          <motion.div
            className="rv-call-context"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="rv-call-title">Let's understand your system.</h1>
            <p className="rv-call-subtitle">
              This isn't a demo. We'll discuss your company and how Rivtor can execute.
            </p>
          </motion.div>

          {/* Calendly embed */}
          <motion.div
            className="rv-call-calendar"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="calendly-inline-widget"
              data-url="https://calendly.com/rivtor/work-with-rivtor"
              style={{ minWidth: '320px', height: '700px' }}
            />
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        .rv-apply-container {
          min-height: 100vh;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: 24px;
          padding-top: 80px;
          padding-bottom: 80px;
        }

        .rv-apply-content {
          max-width: 600px;
          text-align: center;
          width: 100%;
        }

        .rv-apply-content--wide {
          max-width: 900px;
        }

        .rv-call-context {
          margin-bottom: 48px;
        }

        .rv-call-title {
          font-size: 36px;
          font-weight: 600;
          color: var(--rv-text-primary);
          font-family: var(--font-headline);
          letter-spacing: -1%;
          line-height: 1.2;
          margin: 0 0 16px 0;
        }

        .rv-call-subtitle {
          font-size: 18px;
          color: var(--rv-text-secondary);
          font-family: var(--font-body);
          line-height: 1.5;
          margin: 0;
        }

        .rv-call-calendar {
          background: var(--rv-surface-1);
          border: 1px solid var(--rv-border-soft);
          border-radius: var(--rv-radius-lg);
          overflow: hidden;
        }

        /* Calendly widget overrides */
        .calendly-inline-widget {
          width: 100%;
        }

        .calendly-inline-widget iframe {
          border: none !important;
        }

        @media (max-width: 640px) {
          .rv-apply-container {
            padding: 16px;
            padding-top: 40px;
            padding-bottom: 40px;
          }

          .rv-call-title {
            font-size: 28px;
          }

          .rv-call-subtitle {
            font-size: 16px;
          }

          .rv-call-context {
            margin-bottom: 32px;
          }

          .calendly-inline-widget {
            height: 600px !important;
          }
        }
      `}</style>
    </main>
  );
}
