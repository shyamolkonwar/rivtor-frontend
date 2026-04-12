'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function ReviewPage() {
  const router = useRouter();
  const [status, setStatus] = useState<'received' | 'reviewing' | 'result'>('received');
  const [outcome, setOutcome] = useState<'high' | 'mid' | 'low'>('high');

  useEffect(() => {
    // Get total score from sessionStorage
    const totalScore = parseInt(sessionStorage.getItem('totalScore') || '0');

    // Determine outcome based on score
    if (totalScore >= 10) {
      setOutcome('high');
    } else if (totalScore >= 6) {
      setOutcome('mid');
    } else {
      setOutcome('low');
    }

    // Step 1: Show "Application received"
    const timer1 = setTimeout(() => {
      setStatus('reviewing');
    }, 1500);

    // Step 2: Show "Reviewing your application..."
    const timer2 = setTimeout(() => {
      setStatus('result');
    }, 3500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  useEffect(() => {
    // After showing result, route accordingly
    if (status === 'result') {
      const timer = setTimeout(() => {
        if (outcome === 'high') {
          router.push('/apply/call');
        } else if (outcome === 'mid') {
          // Show manual review message
        } else {
          router.push('/apply/not-fit');
        }
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [status, outcome, router]);

  return (
    <main className="rv-landing-v4">
      <div className="rv-apply-container">
        <motion.div
          className="rv-apply-content"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <AnimatePresence mode="wait">
            {/* STAGE 1: Application received */}
            {status === 'received' && (
              <motion.div
                key="received"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="rv-apply-stage"
              >
                <div className="rv-apply-icon rv-apply-icon--success">✓</div>
                <h1 className="rv-apply-title">Application received.</h1>
              </motion.div>
            )}

            {/* STAGE 2: Reviewing */}
            {status === 'reviewing' && (
              <motion.div
                key="reviewing"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="rv-apply-stage"
              >
                <div className="rv-apply-icon rv-apply-icon--loading">
                  <div className="rv-apply-spinner" />
                </div>
                <h1 className="rv-apply-title">Reviewing your application…</h1>
              </motion.div>
            )}

            {/* STAGE 3: Result based on outcome */}
            {status === 'result' && outcome === 'high' && (
              <motion.div
                key="result-high"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="rv-apply-stage"
              >
                <div className="rv-apply-icon rv-apply-icon--fit">★</div>
                <h1 className="rv-apply-title">You look like a strong fit.</h1>
                <p className="rv-apply-subtitle">
                  Let's schedule a call to discuss how Rivtor can help execute on your vision.
                </p>
                <p className="rv-apply-redirect">Redirecting to calendar…</p>
              </motion.div>
            )}

            {status === 'result' && outcome === 'mid' && (
              <motion.div
                key="result-mid"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="rv-apply-stage"
              >
                <div className="rv-apply-icon rv-apply-icon--mid">⏱</div>
                <h1 className="rv-apply-title">We'll review your application.</h1>
                <p className="rv-apply-subtitle">
                  We'll get back to you within 24-48 hours with next steps.
                </p>
                <motion.button
                  className="rv-btn-v4 rv-btn-v4--secondary rv-apply-button-small"
                  onClick={() => router.push('/')}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  type="button"
                >
                  Back to homepage
                </motion.button>
              </motion.div>
            )}

            {status === 'result' && outcome === 'low' && (
              <motion.div
                key="result-low"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="rv-apply-stage"
              >
                <div className="rv-apply-icon rv-apply-icon--reject">✕</div>
                <h1 className="rv-apply-title">Not a fit right now.</h1>
                <p className="rv-apply-subtitle">
                  We're looking for companies actively building with urgent problems to solve.
                  <br /><br />
                  Feel free to apply again when circumstances change.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
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

        .rv-apply-stage {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .rv-apply-icon {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 36px;
          margin-bottom: 32px;
        }

        .rv-apply-icon--success {
          background: rgba(34, 197, 94, 0.2);
          color: #22C55E;
          border: 2px solid rgba(34, 197, 94, 0.3);
        }

        .rv-apply-icon--loading {
          background: rgba(255, 255, 255, 0.05);
          border: 2px solid rgba(255, 255, 255, 0.1);
        }

        .rv-apply-icon--fit {
          background: rgba(59, 130, 246, 0.2);
          color: #3B82F6;
          border: 2px solid rgba(59, 130, 246, 0.3);
        }

        .rv-apply-icon--mid {
          background: rgba(234, 179, 8, 0.2);
          color: #EAB308;
          border: 2px solid rgba(234, 179, 8, 0.3);
        }

        .rv-apply-icon--reject {
          background: rgba(239, 68, 68, 0.2);
          color: #EF4444;
          border: 2px solid rgba(239, 68, 68, 0.3);
        }

        .rv-apply-spinner {
          width: 32px;
          height: 32px;
          border: 3px solid rgba(255, 255, 255, 0.1);
          border-top-color: var(--rv-text-primary);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
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
          line-height: 1.5;
          margin: 0 0 40px 0;
        }

        .rv-apply-redirect {
          font-size: 14px;
          color: var(--rv-text-muted);
          font-family: var(--font-body);
          margin: 0 0 8px 0;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }

        .rv-apply-button-small {
          min-width: 180px;
          margin-top: 16px;
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
        }
      `}</style>
    </main>
  );
}
