'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { storeQualificationData, type QualificationData } from '@/lib/application-flow';

export default function QualifyPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<QualificationData>({
    stage: '',
    activelyBuilding: '',
    urgency: '',
    problem: '',
  });

  const canContinue = formData.stage && formData.activelyBuilding && formData.urgency && formData.problem.length > 0;

  // Auto-reject logic
  const shouldReject = formData.activelyBuilding === 'No' || formData.urgency === 'Not urgent';

  const handleContinue = () => {
    // Store qualification data using shared utility
    storeQualificationData(formData, calculateQualificationScore(formData));

    if (shouldReject) {
      router.push('/apply/not-fit');
    } else {
      router.push('/apply/application');
    }
  };

  const calculateQualificationScore = (data: QualificationData): number => {
    let score = 0;

    // Stage scoring
    const stageScores: Record<string, number> = {
      'Revenue': 3,
      'Early users': 2,
      'MVP': 1,
      'Idea': 0,
    };
    score += stageScores[data.stage] || 0;

    // Actively building
    if (data.activelyBuilding === 'Yes') score += 2;

    // Urgency scoring
    const urgencyScores: Record<string, number> = {
      'Urgent': 3,
      'Important': 2,
      'Not urgent': 0,
    };
    score += urgencyScores[data.urgency] || 0;

    return score;
  };

  return (
    <main className="rv-landing-v4">
      <div className="rv-apply-container">
        <motion.div
          className="rv-apply-content rv-apply-content--wide"
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
            Quick qualification
          </motion.h1>

          <motion.p
            className="rv-apply-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            4 questions to see if we're a fit
          </motion.p>

          <motion.div
            className="rv-apply-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Q1: Stage */}
            <div className="rv-apply-field">
              <label className="rv-apply-label">1. What stage are you at?</label>
              <div className="rv-apply-options">
                {['Idea', 'MVP', 'Early users', 'Revenue'].map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={`rv-apply-option ${formData.stage === option ? 'rv-apply-option--active' : ''}`}
                    onClick={() => setFormData({ ...formData, stage: option })}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Q2: Actively building */}
            <div className="rv-apply-field">
              <label className="rv-apply-label">2. Are you actively building right now?</label>
              <div className="rv-apply-options">
                {['Yes', 'No'].map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={`rv-apply-option ${formData.activelyBuilding === option ? 'rv-apply-option--active' : ''}`}
                    onClick={() => setFormData({ ...formData, activelyBuilding: option })}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Q3: Urgency (NEW - VERY IMPORTANT) */}
            <div className="rv-apply-field">
              <label className="rv-apply-label">3. How urgent is this for you?</label>
              <div className="rv-apply-options">
                {['Not urgent', 'Important', 'Urgent'].map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={`rv-apply-option ${formData.urgency === option ? 'rv-apply-option--active' : ''}`}
                    onClick={() => setFormData({ ...formData, urgency: option })}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Q4: Problem */}
            <div className="rv-apply-field">
              <label className="rv-apply-label">4. What's breaking right now?</label>
              <input
                type="text"
                className="rv-apply-input"
                placeholder="Brief description..."
                value={formData.problem}
                onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                maxLength={100}
              />
              <p className="rv-apply-hint">What problem keeps you up at night?</p>
            </div>

            <motion.button
              className="rv-btn-v4 rv-btn-v4--primary rv-apply-button"
              onClick={handleContinue}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              disabled={!canContinue}
              type="button"
            >
              Continue application
            </motion.button>
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
        }

        .rv-apply-content {
          max-width: 600px;
          text-align: center;
        }

        .rv-apply-content--wide {
          max-width: 700px;
        }

        .rv-apply-title {
          font-size: 40px;
          font-weight: 600;
          color: var(--rv-text-primary);
          font-family: var(--font-headline);
          letter-spacing: -1%;
          line-height: 1.1;
          margin: 0 0 16px 0;
        }

        .rv-apply-subtitle {
          font-size: 18px;
          color: var(--rv-text-secondary);
          font-family: var(--font-body);
          line-height: 1.5;
          margin: 0 0 48px 0;
        }

        .rv-apply-form {
          text-align: left;
        }

        .rv-apply-field {
          margin-bottom: 32px;
        }

        .rv-apply-label {
          display: block;
          font-size: 16px;
          font-weight: 500;
          color: var(--rv-text-primary);
          font-family: var(--font-body);
          margin-bottom: 12px;
        }

        .rv-apply-options {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .rv-apply-option {
          flex: 1;
          min-width: 100px;
          padding: 14px 20px;
          background: transparent;
          border: 1px solid var(--rv-border-soft);
          border-radius: 10px;
          font-size: 15px;
          font-weight: 500;
          color: var(--rv-text-secondary);
          font-family: var(--font-body);
          cursor: pointer;
          transition: all 150ms ease;
        }

        .rv-apply-option:hover {
          border-color: var(--rv-border-strong);
          background: rgba(255, 255, 255, 0.03);
        }

        .rv-apply-option--active {
          background: var(--rv-text-primary);
          border-color: var(--rv-text-primary);
          color: var(--rv-bg-primary);
        }

        .rv-apply-input {
          width: 100%;
          padding: 14px 16px;
          background: transparent;
          border: 1px solid var(--rv-border-soft);
          border-radius: 10px;
          font-size: 15px;
          color: var(--rv-text-primary);
          font-family: var(--font-body);
          outline: none;
          transition: all 150ms ease;
        }

        .rv-apply-input:focus {
          border-color: var(--rv-border-strong);
        }

        .rv-apply-input::placeholder {
          color: var(--rv-text-muted);
        }

        .rv-apply-input:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .rv-apply-hint {
          font-size: 13px;
          color: var(--rv-text-muted);
          font-family: var(--font-body);
          margin: 8px 0 0 0;
        }

        .rv-apply-button {
          width: 100%;
          margin-top: 24px;
          min-width: auto;
        }

        .rv-apply-button:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        @media (max-width: 640px) {
          .rv-apply-title {
            font-size: 28px;
          }

          .rv-apply-subtitle {
            font-size: 16px;
          }

          .rv-apply-content--wide {
            max-width: 100%;
          }

          .rv-apply-options {
            flex-direction: column;
          }

          .rv-apply-option {
            width: 100%;
            min-width: auto;
          }
        }
      `}</style>
    </main>
  );
}
