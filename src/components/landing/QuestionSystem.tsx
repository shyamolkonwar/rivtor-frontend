'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { X } from 'lucide-react';
import type { JSX } from 'react';

// ===== TYPES =====

type QuestionLabel = 'Context' | 'Product' | 'Goal' | 'Focus';

type AnswerType = 'single-select' | 'multi-select' | 'text' | 'mixed';

type AnswerOption = {
  id: string;
  title: string;
  subtext?: string;
};

type Question = {
  id: string;
  label: QuestionLabel;
  question: string;
  context?: string;
  type: AnswerType;
  options?: AnswerOption[];
  allowCustomInput?: boolean;
  placeholder?: string;
};

// ===== QUESTION DATA =====

const ONBOARDING_QUESTIONS: Question[] = [
  {
    id: 'role',
    label: 'Context',
    question: "What's your role?",
    type: 'single-select',
    options: [
      { id: 'founder', title: 'Founder' },
      { id: 'cto', title: 'CTO / Tech Lead' },
      { id: 'pm', title: 'Product Manager' },
      { id: 'engineer', title: 'Engineer' },
    ],
  },
  {
    id: 'company-stage',
    label: 'Context',
    question: 'What stage is your company?',
    type: 'single-select',
    options: [
      { id: 'idea', title: 'Idea / Pre-seed', subtext: 'Still validating' },
      { id: 'seed', title: 'Seed', subtext: 'Product built, some traction' },
      { id: 'series-a', title: 'Series A+', subtext: 'Established market fit' },
    ],
    allowCustomInput: true,
    placeholder: 'Describe your stage...',
  },
  {
    id: 'primary-goal',
    label: 'Goal',
    question: "What's your primary goal right now?",
    type: 'single-select',
    options: [
      { id: 'ship-faster', title: 'Ship features faster' },
      { id: 'reduce-tech-debt', title: 'Reduce technical debt' },
      { id: 'improve-quality', title: 'Improve code quality' },
      { id: 'scale-team', title: 'Scale engineering team' },
    ],
  },
  {
    id: 'focus-areas',
    label: 'Focus',
    question: 'What areas should Rivtor focus on?',
    context: 'Select all that apply',
    type: 'multi-select',
    options: [
      { id: 'frontend', title: 'Frontend' },
      { id: 'backend', title: 'Backend' },
      { id: 'infrastructure', title: 'Infrastructure' },
      { id: 'data', title: 'Data / Analytics' },
    ],
  },
  {
    id: 'biggest-challenge',
    label: 'Goal',
    question: "What's your biggest execution challenge?",
    type: 'text',
    placeholder: 'Describe your challenge...',
  },
];

// ===== COMPONENTS =====

interface ContextBarProps {
  currentStep: number;
  totalSteps: number;
  onSkip: () => void;
}

function ContextBar({ currentStep, totalSteps, onSkip }: ContextBarProps): JSX.Element {
  return (
    <div
      style={{
        height: '64px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
        background: '#0A0A0A',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 32px',
      }}
    >
      {/* Logo */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{
          fontFamily: 'Inter',
          fontSize: '15px',
          fontWeight: 600,
          color: 'rgba(255, 255, 255, 0.9)',
          letterSpacing: '-0.02em',
        }}
      >
        Rivtor
      </motion.span>

      {/* Progress */}
      <motion.span
        key={currentStep}
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        style={{
          fontFamily: 'Inter',
          fontSize: '13px',
          fontWeight: 500,
          color: 'rgba(255, 255, 255, 0.4)',
          letterSpacing: '0.02em',
        }}
      >
        Step {currentStep + 1} / {totalSteps}
      </motion.span>

      {/* Skip */}
      <button
        onClick={onSkip}
        style={{
          background: 'transparent',
          border: 'none',
          color: 'rgba(255, 255, 255, 0.4)',
          fontFamily: 'Inter',
          fontSize: '13px',
          fontWeight: 500,
          cursor: 'pointer',
          padding: '8px 12px',
          borderRadius: '6px',
          transition: 'all 0.15s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
          e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent';
          e.currentTarget.style.color = 'rgba(255, 255, 255, 0.4)';
        }}
      >
        Skip
      </button>
    </div>
  );
}

interface QuestionAreaProps {
  label: QuestionLabel;
  question: string;
  context?: string;
}

function QuestionArea({ label, question, context }: QuestionAreaProps): JSX.Element {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -10 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.25,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        maxWidth: '720px',
        margin: '0 auto',
        textAlign: 'center',
      }}
    >
      {/* Question Label */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        style={{
          fontFamily: 'Inter',
          fontSize: '12px',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: 'rgba(255, 255, 255, 0.4)',
          display: 'block',
          marginBottom: '16px',
        }}
      >
        {label}
      </motion.span>

      {/* Main Question */}
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.3 }}
        style={{
          fontFamily: 'Satoshi, "SF Pro Display", -apple-system, sans-serif',
          fontSize: 'clamp(28px, 4vw, 40px)',
          fontWeight: 600,
          lineHeight: 1.2,
          color: 'rgba(255, 255, 255, 0.95)',
          marginBottom: context ? '12px' : 0,
        }}
      >
        {question}
      </motion.h2>

      {/* Optional Context */}
      {context && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          style={{
            fontFamily: 'Inter',
            fontSize: '16px',
            lineHeight: 1.6,
            color: 'rgba(255, 255, 255, 0.6)',
            marginTop: '12px',
          }}
        >
          {context}
        </motion.p>
      )}
    </motion.div>
  );
}

interface OptionCardProps {
  option: AnswerOption;
  isSelected: boolean;
  isMultiSelect: boolean;
  onClick: () => void;
  delay: number;
}

function OptionCard({ option, isSelected, isMultiSelect, onClick, delay }: OptionCardProps): JSX.Element {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.button
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.3,
        delay: prefersReducedMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      onClick={onClick}
      style={{
        width: '100%',
        height: 'auto',
        minHeight: '56px',
        padding: '16px 20px',
        background: isSelected ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.02)',
        border: isSelected
          ? '1px solid rgba(255, 255, 255, 0.2)'
          : '1px solid rgba(255, 255, 255, 0.06)',
        borderRadius: '12px',
        cursor: 'pointer',
        transition: 'all 0.15s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={(e) => {
        if (!isSelected) {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isSelected) {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
        }
      }}
    >
      <div style={{ textAlign: 'left', flex: 1 }}>
        <div
          style={{
            fontFamily: 'Inter',
            fontSize: '15px',
            fontWeight: 500,
            color: 'rgba(255, 255, 255, 0.9)',
            lineHeight: 1.4,
          }}
        >
          {option.title}
        </div>
        {option.subtext && (
          <div
            style={{
              fontFamily: 'Inter',
              fontSize: '13px',
              color: 'rgba(255, 255, 255, 0.5)',
              marginTop: '4px',
            }}
          >
            {option.subtext}
          </div>
        )}
      </div>

      {/* Selection indicator */}
      {isMultiSelect && isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          style={{
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            marginLeft: '12px',
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M2 6L5 9L10 3"
              stroke="#0A0A0A"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      )}
    </motion.button>
  );
}

interface TextInputProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  delay: number;
}

function TextInput({ placeholder, value, onChange, delay }: TextInputProps): JSX.Element {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.textarea
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.3,
        delay: prefersReducedMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        width: '100%',
        minHeight: '120px',
        padding: '16px',
        fontFamily: 'Inter',
        fontSize: '15px',
        lineHeight: 1.6,
        color: 'rgba(255, 255, 255, 0.9)',
        background: '#111',
        border: '1px solid #1F1F23',
        borderRadius: '12px',
        resize: 'none',
        outline: 'none',
        transition: 'border-color 0.15s ease',
      }}
      onFocus={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
      }}
      onBlur={(e) => {
        e.currentTarget.style.borderColor = '#1F1F23';
      }}
    />
  );
}

interface AnswerAreaProps {
  question: Question;
  selectedAnswers: string[];
  customInput: string;
  onAnswerSelect: (answerId: string) => void;
  onCustomInputChange: (value: string) => void;
}

function AnswerArea({
  question,
  selectedAnswers,
  customInput,
  onAnswerSelect,
  onCustomInputChange,
}: AnswerAreaProps): JSX.Element {
  const isMultiSelect = question.type === 'multi-select';
  const isSelected = (id: string) => selectedAnswers.includes(id);

  return (
    <div
      style={{
        maxWidth: '480px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}
    >
      {question.options?.map((option, index) => (
        <OptionCard
          key={option.id}
          option={option}
          isSelected={isSelected(option.id)}
          isMultiSelect={isMultiSelect}
          onClick={() => onAnswerSelect(option.id)}
          delay={index * 0.05}
        />
      ))}

      {question.type === 'text' && (
        <TextInput
          placeholder={question.placeholder || ''}
          value={customInput}
          onChange={onCustomInputChange}
          delay={0}
        />
      )}

      {question.allowCustomInput && question.type !== 'text' && (
        <TextInput
          placeholder={question.placeholder || 'Other...'}
          value={customInput}
          onChange={onCustomInputChange}
          delay={(question.options?.length || 0) * 0.05}
        />
      )}
    </div>
  );
}

interface ActionAreaProps {
  canGoBack: boolean;
  canContinue: boolean;
  onBack: () => void;
  onContinue: () => void;
  continueText?: string;
}

function ActionArea({
  canGoBack,
  canContinue,
  onBack,
  onContinue,
  continueText = 'Continue',
}: ActionAreaProps): JSX.Element {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.3,
        delay: 0.2,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        maxWidth: '480px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <button
        onClick={onBack}
        disabled={!canGoBack}
        style={{
          background: 'transparent',
          border: 'none',
          color: canGoBack ? 'rgba(255, 255, 255, 0.6)' : 'rgba(255, 255, 255, 0.2)',
          fontFamily: 'Inter',
          fontSize: '14px',
          fontWeight: 500,
          cursor: canGoBack ? 'pointer' : 'not-allowed',
          padding: '12px 16px',
          borderRadius: '8px',
          transition: 'all 0.15s ease',
        }}
        onMouseEnter={(e) => {
          if (canGoBack) {
            e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)';
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
          }
        }}
        onMouseLeave={(e) => {
          if (canGoBack) {
            e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)';
            e.currentTarget.style.background = 'transparent';
          }
        }}
      >
        Back
      </button>

      <button
        onClick={onContinue}
        disabled={!canContinue}
        style={{
          height: '48px',
          padding: '0 24px',
          background: canContinue ? '#FFFFFF' : 'rgba(255, 255, 255, 0.1)',
          color: canContinue ? '#0A0A0A' : 'rgba(255, 255, 255, 0.4)',
          fontFamily: 'Inter',
          fontSize: '14px',
          fontWeight: 600,
          border: 'none',
          borderRadius: '10px',
          cursor: canContinue ? 'pointer' : 'not-allowed',
          transition: 'all 0.15s ease',
        }}
        onMouseEnter={(e) => {
          if (canContinue) {
            e.currentTarget.style.transform = 'scale(1.02)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(255, 255, 255, 0.15)';
          }
        }}
        onMouseLeave={(e) => {
          if (canContinue) {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = 'none';
          }
        }}
      >
        {continueText}
      </button>
    </motion.div>
  );
}

// ===== MAIN QUESTION SYSTEM =====

interface QuestionSystemProps {
  onClose: () => void;
  onComplete: (answers: Record<string, string[] | string>) => void;
}

export default function QuestionSystem({ onClose, onComplete }: QuestionSystemProps): JSX.Element {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[] | string>>({});
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [customInput, setCustomInput] = useState('');

  const currentQuestion = ONBOARDING_QUESTIONS[currentStep];
  const totalSteps = ONBOARDING_QUESTIONS.length;
  const isLastStep = currentStep === totalSteps - 1;
  const isMultiSelect = currentQuestion.type === 'multi-select';

  const canContinue = !!(
    selectedAnswers.length > 0 || (currentQuestion.allowCustomInput && customInput.trim().length > 0)
  );

  const handleAnswerSelect = useCallback(
    (answerId: string) => {
      if (isMultiSelect) {
        setSelectedAnswers((prev) =>
          prev.includes(answerId) ? prev.filter((id) => id !== answerId) : [...prev, answerId]
        );
      } else {
        setSelectedAnswers([answerId]);
        // Auto-advance for single select
        setTimeout(() => {
          handleContinue();
        }, 300);
      }
    },
    [isMultiSelect]
  );

  const handleContinue = useCallback(() => {
    // Save current answer
    const answerToSave = customInput.trim() ? [...selectedAnswers, customInput.trim()] : selectedAnswers;
    const finalAnswer = currentQuestion.type === 'multi-select' ? answerToSave : answerToSave[0];

    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: finalAnswer,
    }));

    // Clear state for next question
    setSelectedAnswers([]);
    setCustomInput('');

    if (isLastStep) {
      // Complete
      onComplete({ ...answers, [currentQuestion.id]: finalAnswer });
    } else {
      // Move to next question
      setCurrentStep((prev) => prev + 1);
    }
  }, [selectedAnswers, customInput, currentQuestion, isLastStep, answers, onComplete]);

  const handleBack = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      // Could restore previous answers here if needed
    }
  }, [currentStep]);

  const handleSkip = useCallback(() => {
    // Skip remaining questions and complete with current answers
    onComplete(answers);
  }, [answers, onComplete]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          background: '#0A0A0A',
        }}
      >
        {/* Context Bar */}
        <ContextBar
          currentStep={currentStep}
          totalSteps={totalSteps}
          onSkip={handleSkip}
        />

        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            color: 'rgba(255, 255, 255, 0.6)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.15s ease',
            zIndex: 1001,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
            e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)';
          }}
        >
          <X size={20} />
        </button>

        {/* Main Content */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '40px 24px',
            gap: '40px',
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{
                duration: 0.25,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '40px',
              }}
            >
              {/* Question Area */}
              <QuestionArea
                label={currentQuestion.label}
                question={currentQuestion.question}
                context={currentQuestion.context}
              />

              {/* Answer Area */}
              <AnswerArea
                question={currentQuestion}
                selectedAnswers={selectedAnswers}
                customInput={customInput}
                onAnswerSelect={handleAnswerSelect}
                onCustomInputChange={setCustomInput}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Action Area */}
        <div style={{ padding: '24px', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
          <ActionArea
            canGoBack={currentStep > 0}
            canContinue={canContinue}
            onBack={handleBack}
            onContinue={handleContinue}
            continueText={isLastStep ? 'Complete' : 'Continue'}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
