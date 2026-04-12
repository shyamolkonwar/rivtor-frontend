'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function ApplyPage() {
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
          <motion.h1
            className="rv-apply-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            This isn't for everyone.
          </motion.h1>

          <motion.p
            className="rv-apply-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            We work with a small number of companies at a time.
          </motion.p>

          <motion.button
            className="rv-btn-v4 rv-btn-v4--primary rv-apply-button"
            onClick={() => router.push('/apply/qualify')}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            type="button"
          >
            Continue
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

        .rv-apply-title {
          font-size: 48px;
          font-weight: 600;
          color: var(--rv-text-primary);
          font-family: var(--font-headline);
          letter-spacing: -1%;
          line-height: 1.1;
          margin: 0 0 24px 0;
        }

        .rv-apply-subtitle {
          font-size: 20px;
          color: var(--rv-text-secondary);
          font-family: var(--font-body);
          line-height: 1.5;
          margin: 0 0 48px 0;
        }

        .rv-apply-button {
          min-width: 200px;
        }

        @media (max-width: 640px) {
          .rv-apply-title {
            font-size: 32px;
          }

          .rv-apply-subtitle {
            font-size: 18px;
          }

          .rv-apply-button {
            width: 100%;
          }
        }
      `}</style>
    </main>
  );
}
