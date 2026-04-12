'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function NotFitPage() {
  const router = useRouter();

  return (
    <main className="rv-landing-v4">
      <div className="rv-apply-container">
        <motion.div
          className="rv-apply-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="rv-apply-icon rv-apply-icon--reject"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            ✕
          </motion.div>

          <motion.h1
            className="rv-apply-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            Not a fit right now.
          </motion.h1>

          <motion.p
            className="rv-apply-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            We're looking for companies actively building with urgent problems to solve.
            <br /><br />
            Feel free to apply again when circumstances change.
          </motion.p>

          <motion.button
            className="rv-btn-v4 rv-btn-v4--secondary rv-apply-button"
            onClick={() => router.push('/')}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            type="button"
          >
            Back to homepage
          </motion.button>
        </motion.div>
      </div>

      <style>{`
        .rv-apply-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }

        .rv-apply-content {
          max-width: 600px;
          text-align: center;
        }

        .rv-apply-icon {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 36px;
          margin: 0 auto 32px auto;
        }

        .rv-apply-icon--reject {
          background: rgba(239, 68, 68, 0.2);
          color: #EF4444;
          border: 2px solid rgba(239, 68, 68, 0.3);
        }

        .rv-apply-title {
          font-size: 40px;
          font-weight: 600;
          color: var(--rv-text-primary);
          font-family: var(--font-headline);
          letter-spacing: -1%;
          line-height: 1.1;
          margin: 0 0 20px 0;
        }

        .rv-apply-subtitle {
          font-size: 18px;
          color: var(--rv-text-secondary);
          font-family: var(--font-body);
          line-height: 1.6;
          margin: 0 0 40px 0;
        }

        .rv-apply-button {
          min-width: 180px;
        }

        @media (max-width: 640px) {
          .rv-apply-title {
            font-size: 28px;
          }

          .rv-apply-subtitle {
            font-size: 16px;
          }

          .rv-apply-icon {
            width: 64px;
            height: 64px;
            font-size: 28px;
          }

          .rv-apply-button {
            width: 100%;
          }
        }
      `}</style>
    </main>
  );
}
