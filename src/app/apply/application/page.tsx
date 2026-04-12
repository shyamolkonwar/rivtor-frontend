'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  SESSION_KEYS,
  mapStageFromQualification,
  mapUrgencyFromQualification,
  mapStageToDatabase,
  mapUrgencyToDatabase,
  mapProblemAreaToDatabase,
  mapPaymentIntentToDatabase,
  mapIntentTypeToDatabase,
  getQualificationField,
} from '@/lib/application-flow';

interface ApplicationData {
  // Section A: Context
  name: string;
  email: string;
  company: string;
  website: string;
  // Section B: Product
  whatBuilding: string;
  stage: string;
  users: string;
  // Section C: Problem
  biggestProblem: string;
  whereBreaking: string;
  whatTried: string;
  // Section D: Urgency + Impact
  urgencyLevel: string;
  ifNotSolved: string;
  // Section E: Outcome Thinking
  outcomeNoBrainer: string;
  success14Days: string;
  // Section F: Collaboration
  willingToCollaborate: string;
  giveAccess: string;
  // Section G: Intent
  whyRivtor: string;
  openToPaid: string;
  // Section H: Final Signal
  whatExecuteFaster: string;
  // Extra Filter
  lookingToDo: string;
}

export default function ApplicationPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formData, setFormData] = useState<ApplicationData>({
    name: '',
    email: '',
    company: '',
    website: '',
    whatBuilding: '',
    stage: '',
    users: '',
    biggestProblem: '',
    whereBreaking: '',
    whatTried: '',
    urgencyLevel: '',
    ifNotSolved: '',
    outcomeNoBrainer: '',
    success14Days: '',
    willingToCollaborate: '',
    giveAccess: '',
    whyRivtor: '',
    openToPaid: '',
    whatExecuteFaster: '',
    lookingToDo: '',
  });

  // Load qualification data from sessionStorage on mount (client-side only)
  useEffect(() => {
    const qualStage = getQualificationField('QUALIFICATION_STAGE');
    const qualProblem = getQualificationField('QUALIFICATION_PROBLEM');
    const qualUrgency = getQualificationField('QUALIFICATION_URGENCY');

    setFormData(prev => ({
      ...prev,
      stage: qualStage ? mapStageFromQualification(qualStage || '') : '',
      biggestProblem: qualProblem || '',
      urgencyLevel: qualUrgency ? mapUrgencyFromQualification(qualUrgency || '') : '',
    }));
  }, []);

  const canSubmit = formData.name && formData.email && formData.whatBuilding && formData.biggestProblem && formData.whyRivtor && formData.outcomeNoBrainer && formData.willingToCollaborate;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Auto-reject filters (client-side for immediate feedback)
      if (formData.willingToCollaborate === 'No' || formData.giveAccess === 'No') {
        router.push('/apply/not-fit');
        return;
      }

      // Get qualification data from session storage
      const activelyBuilding = getQualificationField('QUALIFICATION_ACTIVELY_BUILDING') === 'Yes';

      // Transform form data to match API schema
      const requestData = {
        applicant: {
          full_name: formData.name,
          email: formData.email,
          company_name: formData.company || undefined,
          website: formData.website || undefined,
        },
        application: {
          stage: mapStageToDatabase(formData.stage),
          users_count: formData.users ? parseInt(formData.users) || null : null,
          actively_building: activelyBuilding,
          urgency: mapUrgencyToDatabase(formData.urgencyLevel),
          biggest_problem: formData.biggestProblem,
          problem_area: mapProblemAreaToDatabase(formData.whereBreaking),
          attempted_solutions: formData.whatTried,
          consequence_if_unsolved: formData.ifNotSolved,
          desired_outcome: formData.outcomeNoBrainer,
          success_7_14_days: formData.success14Days,
          willing_to_collaborate: formData.willingToCollaborate !== 'Need more info',
          can_provide_access: formData.giveAccess === 'Yes',
          reason_for_rivtor: formData.whyRivtor,
          payment_intent: mapPaymentIntentToDatabase(formData.openToPaid),
          execution_gap: formData.whatExecuteFaster,
          intent_type: mapIntentTypeToDatabase(formData.lookingToDo),
        },
      };

      // Submit to API
      const response = await fetch('/api/submit-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Submission failed');
      }

      // Store application data for review page
      sessionStorage.setItem(SESSION_KEYS.APPLICATION_DATA, JSON.stringify(formData));
      sessionStorage.setItem(SESSION_KEYS.APPLICATION_ID, data.data.applicationId);
      sessionStorage.setItem(SESSION_KEYS.TOTAL_SCORE, data.data.score.toString());
      sessionStorage.setItem(SESSION_KEYS.PRIORITY, data.data.priority);
      sessionStorage.setItem(SESSION_KEYS.STATUS, data.data.status);

      // Route based on server-side scoring
      if (data.data.status === 'shortlisted' && data.data.score >= 10) {
        router.push('/apply/call');
      } else if (data.data.status === 'reviewing' || data.data.status === 'new') {
        router.push('/apply/review');
      } else if (data.data.status === 'rejected') {
        router.push('/apply/not-fit');
      } else {
        router.push('/apply/review');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitError(error instanceof Error ? error.message : 'Failed to submit application');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="rv-landing-v4">
      <div className="rv-apply-container">
        <motion.div
          className="rv-apply-content rv-apply-content--form"
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
            Application
          </motion.h1>

          <motion.p
            className="rv-apply-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            Tell us about your company and what you're building
          </motion.p>

          <form onSubmit={handleSubmit} className="rv-apply-form">
            {/* SECTION A: CONTEXT */}
            <motion.div
              className="rv-apply-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="rv-apply-section-title">About you</h2>

              <div className="rv-apply-field">
                <label className="rv-apply-label">Name *</label>
                <input
                  type="text"
                  className="rv-apply-input"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="rv-apply-field">
                <label className="rv-apply-label">Email *</label>
                <input
                  type="email"
                  className="rv-apply-input"
                  placeholder="you@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="rv-apply-field">
                <label className="rv-apply-label">Company</label>
                <input
                  type="text"
                  className="rv-apply-input"
                  placeholder="Company name"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
              </div>

              <div className="rv-apply-field">
                <label className="rv-apply-label">Website</label>
                <input
                  type="url"
                  className="rv-apply-input"
                  placeholder="https://yourcompany.com"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                />
              </div>
            </motion.div>

            {/* SECTION B: PRODUCT */}
            <motion.div
              className="rv-apply-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="rv-apply-section-title">What you're building</h2>

              <div className="rv-apply-field">
                <label className="rv-apply-label">What are you building? *</label>
                <textarea
                  className="rv-apply-textarea"
                  placeholder="Describe your product, service, or idea..."
                  value={formData.whatBuilding}
                  onChange={(e) => setFormData({ ...formData, whatBuilding: e.target.value })}
                  rows={4}
                  required
                />
              </div>

              <div className="rv-apply-field">
                <label className="rv-apply-label">Current stage</label>
                <select
                  className="rv-apply-select"
                  value={formData.stage}
                  onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                >
                  <option value="">Select stage...</option>
                  <option value="Idea stage">Idea stage</option>
                  <option value="Building MVP">Building MVP</option>
                  <option value="Launched">Launched</option>
                  <option value="Have users">Have users</option>
                  <option value="Early users / Growing">Early users / Growing</option>
                  <option value="Revenue">Have revenue</option>
                  <option value="Funded">Funded</option>
                </select>
              </div>

              <div className="rv-apply-field">
                <label className="rv-apply-label">How many users/customers?</label>
                <input
                  type="text"
                  className="rv-apply-input"
                  placeholder="0, 10, 100, 1000+..."
                  value={formData.users}
                  onChange={(e) => setFormData({ ...formData, users: e.target.value })}
                />
              </div>
            </motion.div>

            {/* SECTION C: PROBLEM (MOST IMPORTANT) */}
            <motion.div
              className="rv-apply-section rv-apply-section--highlight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="rv-apply-section-title">The problem</h2>

              <div className="rv-apply-field">
                <label className="rv-apply-label">What's the biggest problem you're facing right now? *</label>
                <textarea
                  className="rv-apply-textarea"
                  placeholder="Be specific about what's blocking your progress..."
                  value={formData.biggestProblem}
                  onChange={(e) => setFormData({ ...formData, biggestProblem: e.target.value })}
                  rows={4}
                  required
                />
              </div>

              <div className="rv-apply-field">
                <label className="rv-apply-label">Where are things breaking? (Select all that apply)</label>
                <select
                  className="rv-apply-select"
                  value={formData.whereBreaking}
                  onChange={(e) => setFormData({ ...formData, whereBreaking: e.target.value })}
                >
                  <option value="">Select...</option>
                  <option value="Execution - can't get things done">Execution - can't get things done</option>
                  <option value="Hiring - can't find the right people">Hiring - can't find the right people</option>
                  <option value="Product - don't know what to build">Product - don't know what to build</option>
                  <option value="Growth - can't acquire users">Growth - can't acquire users</option>
                  <option value="Capital - need funding">Capital - need funding</option>
                  <option value="Strategy - don't know next steps">Strategy - don't know next steps</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="rv-apply-field">
                <label className="rv-apply-label">What have you tried to solve this?</label>
                <textarea
                  className="rv-apply-textarea"
                  placeholder="Previous attempts, tools, solutions..."
                  value={formData.whatTried}
                  onChange={(e) => setFormData({ ...formData, whatTried: e.target.value })}
                  rows={3}
                />
                <p className="rv-apply-hint">This helps us understand your resourcefulness</p>
              </div>
            </motion.div>

            {/* SECTION D: URGENCY + IMPACT */}
            <motion.div
              className="rv-apply-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="rv-apply-section-title">Urgency & impact</h2>

              <div className="rv-apply-field">
                <label className="rv-apply-label">How urgent is this?</label>
                <div className="rv-apply-options">
                  {['Not urgent', 'Important', 'Urgent'].map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={`rv-apply-option ${formData.urgencyLevel === option ? 'rv-apply-option--active' : ''}`}
                      onClick={() => setFormData({ ...formData, urgencyLevel: option })}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rv-apply-field">
                <label className="rv-apply-label">What happens if this isn't solved in the next 30 days?</label>
                <textarea
                  className="rv-apply-textarea"
                  placeholder="The cost of inaction..."
                  value={formData.ifNotSolved}
                  onChange={(e) => setFormData({ ...formData, ifNotSolved: e.target.value })}
                  rows={3}
                />
              </div>
            </motion.div>

            {/* SECTION E: OUTCOME THINKING (HIGH SIGNAL) */}
            <motion.div
              className="rv-apply-section rv-apply-section--highlight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="rv-apply-section-title">Success metrics</h2>

              <div className="rv-apply-field">
                <label className="rv-apply-label">If this works, what outcome makes this a no-brainer? *</label>
                <textarea
                  className="rv-apply-textarea"
                  placeholder="What does success look like? What would you achieve? Be specific..."
                  value={formData.outcomeNoBrainer}
                  onChange={(e) => setFormData({ ...formData, outcomeNoBrainer: e.target.value })}
                  rows={4}
                  required
                />
                <p className="rv-apply-hint">Example: "Ship 3 features, onboard 50 users, reduce my workload by 20 hours/week"</p>
              </div>

              <div className="rv-apply-field">
                <label className="rv-apply-label">What does success look like in 7-14 days?</label>
                <textarea
                  className="rv-apply-textarea"
                  placeholder="Short-term achievable outcomes..."
                  value={formData.success14Days}
                  onChange={(e) => setFormData({ ...formData, success14Days: e.target.value })}
                  rows={3}
                />
              </div>
            </motion.div>

            {/* SECTION F: COLLABORATION (FILTER HARD) */}
            <motion.div
              className="rv-apply-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="rv-apply-section-title">Collaboration</h2>

              <div className="rv-apply-field">
                <label className="rv-apply-label">Are you willing to actively collaborate and provide feedback?</label>
                <div className="rv-apply-options">
                  {['Yes, actively', 'Yes, occasionally', 'Need more info'].map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={`rv-apply-option ${formData.willingToCollaborate === option ? 'rv-apply-option--active' : ''}`}
                      onClick={() => setFormData({ ...formData, willingToCollaborate: option })}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                <p className="rv-apply-hint">Design partners work closely with us</p>
              </div>

              <div className="rv-apply-field">
                <label className="rv-apply-label">Are you willing to give Rivtor access to your systems/tools?</label>
                <div className="rv-apply-options">
                  {['Yes', 'Maybe', 'No'].map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={`rv-apply-option ${formData.giveAccess === option ? 'rv-apply-option--active' : ''}`}
                      onClick={() => setFormData({ ...formData, giveAccess: option })}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                <p className="rv-apply-hint">Required for effective execution</p>
              </div>
            </motion.div>

            {/* SECTION G: INTENT */}
            <motion.div
              className="rv-apply-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="rv-apply-section-title">About Rivtor</h2>

              <div className="rv-apply-field">
                <label className="rv-apply-label">Why do you want to work with Rivtor? *</label>
                <textarea
                  className="rv-apply-textarea"
                  placeholder="What appeals to you about our approach..."
                  value={formData.whyRivtor}
                  onChange={(e) => setFormData({ ...formData, whyRivtor: e.target.value })}
                  rows={3}
                  required
                />
              </div>

              <div className="rv-apply-field">
                <label className="rv-apply-label">Are you open to a paid engagement?</label>
                <div className="rv-apply-options">
                  {['Yes', 'Maybe', 'No'].map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={`rv-apply-option ${formData.openToPaid === option ? 'rv-apply-option--active' : ''}`}
                      onClick={() => setFormData({ ...formData, openToPaid: option })}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rv-apply-field">
                <label className="rv-apply-label">What are you looking to do with Rivtor?</label>
                <div className="rv-apply-options">
                  {['Work closely as a design partner', 'Explore usage', 'Not sure'].map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={`rv-apply-option ${formData.lookingToDo === option ? 'rv-apply-option--active' : ''}`}
                      onClick={() => setFormData({ ...formData, lookingToDo: option })}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* SECTION H: FINAL SIGNAL */}
            <motion.div
              className="rv-apply-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="rv-apply-section-title">Final question</h2>

              <div className="rv-apply-field">
                <label className="rv-apply-label">What do you want to execute faster?</label>
                <textarea
                  className="rv-apply-textarea"
                  placeholder="What tasks or outcomes take too long right now..."
                  value={formData.whatExecuteFaster}
                  onChange={(e) => setFormData({ ...formData, whatExecuteFaster: e.target.value })}
                  rows={3}
                />
              </div>
            </motion.div>

            {/* Submit button */}
            <motion.button
              type="submit"
              className="rv-btn-v4 rv-btn-v4--primary rv-apply-button"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              disabled={!canSubmit || isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </motion.button>

            {/* Error message */}
            {submitError && (
              <motion.div
                className="rv-apply-error"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {submitError}
              </motion.div>
            )}
          </form>
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
          max-width: 650px;
          text-align: center;
          width: 100%;
        }

        .rv-apply-content--form {
          text-align: left;
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
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        .rv-apply-section {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .rv-apply-section--highlight {
          padding: 24px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
        }

        .rv-apply-section-title {
          font-size: 18px;
          font-weight: 600;
          color: var(--rv-text-primary);
          font-family: var(--font-headline);
          margin: 0 0 8px 0;
          letter-spacing: -0.5%;
        }

        .rv-apply-field {
          display: flex;
          flex-direction: column;
        }

        .rv-apply-label {
          font-size: 14px;
          font-weight: 500;
          color: var(--rv-text-primary);
          font-family: var(--font-body);
          margin-bottom: 10px;
        }

        .rv-apply-input,
        .rv-apply-textarea,
        .rv-apply-select {
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

        .rv-apply-input:focus,
        .rv-apply-textarea:focus,
        .rv-apply-select:focus {
          border-color: var(--rv-border-strong);
        }

        .rv-apply-input::placeholder,
        .rv-apply-textarea::placeholder {
          color: var(--rv-text-muted);
        }

        .rv-apply-select {
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23A1A1AA' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 16px center;
          padding-right: 44px;
        }

        .rv-apply-textarea {
          resize: vertical;
          min-height: 100px;
        }

        .rv-apply-options {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .rv-apply-option {
          flex: 1;
          min-width: 120px;
          padding: 12px 16px;
          background: transparent;
          border: 1px solid var(--rv-border-soft);
          border-radius: 8px;
          font-size: 14px;
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

        .rv-apply-hint {
          font-size: 12px;
          color: var(--rv-text-muted);
          font-family: var(--font-body);
          margin: 6px 0 0 0;
        }

        .rv-apply-button {
          width: 100%;
          margin-top: 16px;
          min-width: auto;
        }

        .rv-apply-button:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .rv-apply-error {
          padding: 16px;
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          border-radius: 8px;
          color: #fca5a5;
          font-size: 14px;
          font-family: var(--font-body);
          text-align: center;
        }

        @media (max-width: 640px) {
          .rv-apply-container {
            padding: 16px;
            padding-top: 40px;
            padding-bottom: 40px;
            align-items: center;
          }

          .rv-apply-title {
            font-size: 28px;
          }

          .rv-apply-subtitle {
            font-size: 16px;
            margin-bottom: 32px;
          }

          .rv-apply-section--highlight {
            padding: 16px;
          }

          .rv-apply-options {
            flex-direction: column;
          }

          .rv-apply-option {
            width: 100%;
            min-width: auto;
          }

          .rv-apply-form {
            gap: 32px;
          }
        }
      `}</style>
    </main>
  );
}
