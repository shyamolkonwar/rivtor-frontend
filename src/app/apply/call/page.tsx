'use client';

import { motion } from 'framer-motion';

export default function CallPage() {
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

          {/* Calendar placeholder */}
          <motion.div
            className="rv-call-calendar"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="rv-call-placeholder">
              <div className="rv-call-icon">📅</div>
              <h3 className="rv-call-placeholder-title">Calendar loading...</h3>
              <p className="rv-call-placeholder-text">
                We'll connect you with our team to discuss your specific needs and how Rivtor can help execute your vision.
              </p>
              <button
                className="rv-btn-v4 rv-btn-v4--secondary"
                type="button"
                onClick={() => window.location.href = 'mailto:apply@rivtor.com?subject=Design Partner Application - Call Request'}
              >
                Or email us to schedule
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        .rv-apply-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
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
          max-width: 800px;
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
          padding: 48px;
          min-height: 400px;
        }

        .rv-call-placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          min-height: 300px;
        }

        .rv-call-icon {
          font-size: 64px;
          margin-bottom: 24px;
          opacity: 0.8;
        }

        .rv-call-placeholder-title {
          font-size: 20px;
          font-weight: 600;
          color: var(--rv-text-primary);
          font-family: var(--font-headline);
          margin: 0 0 12px 0;
        }

        .rv-call-placeholder-text {
          font-size: 15px;
          color: var(--rv-text-secondary);
          font-family: var(--font-body);
          line-height: 1.6;
          margin: 0 0 32px 0;
          max-width: 400px;
          text-align: center;
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

          .rv-call-calendar {
            padding: 32px 24px;
          }

          .rv-call-placeholder-text {
            font-size: 14px;
          }
        }
      `}</style>
    </main>
  );
}
