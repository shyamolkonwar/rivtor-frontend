'use client';

import { useState } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import type { JSX } from 'react';
import ExecutionSession from './ExecutionSession';

type ChatExample = {
  user: string;
  rivtor: string;
};

type ChatExperienceProps = {
  examples: ChatExample[];
};

function Avatar({ initials }: { initials: string }): JSX.Element {
  return (
    <div
      style={{
        width: '40px',
        height: '40px',
        borderRadius: '8px',
        background: '#1A1A1A',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#A1A1AA',
        fontSize: '14px',
        fontWeight: 600,
        flexShrink: 0,
      }}
    >
      {initials}
    </div>
  );
}

function MessageBubble({
  text,
}: {
  text: string;
}): JSX.Element {
  return (
    <div
      style={{
        maxWidth: '70%',
        padding: '12px 16px',
        borderRadius: '12px',
        backgroundColor: '#1A1A1A',
        border: '1px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      <p
        style={{
          fontSize: '14px',
          lineHeight: 1.6,
          margin: 0,
          color: '#E4E4E7',
          fontWeight: 400,
        }}
      >
        {text}
      </p>
    </div>
  );
}

function ChatMessage({
  name,
  text,
  isUser,
  delay,
}: {
  name: string;
  text: string;
  isUser: boolean;
  delay: number;
}): JSX.Element {
  const prefersReducedMotion = useReducedMotion();
  const initials = name === 'You' ? 'ME' : 'RV';

  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.5,
        delay: prefersReducedMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        display: 'flex',
        gap: '12px',
        marginBottom: '16px',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        alignItems: 'flex-end',
      }}
    >
      {!isUser && <Avatar initials={initials} />}
      <MessageBubble text={text} />
      {isUser && <Avatar initials={initials} />}
    </motion.div>
  );
}

export default function ChatExperience({ examples }: ChatExperienceProps): JSX.Element {
  const prefersReducedMotion = useReducedMotion();
  const [isSessionOpen, setIsSessionOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.6,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          backgroundColor: '#111111',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '16px',
          padding: '32px',
        }}
      >
        {examples.map((example, index) => {
          const baseDelay = index * 1.5;

          return (
            <div key={index}>
              <ChatMessage
                name="You"
                text={example.user}
                isUser={true}
                delay={baseDelay}
              />
              <ChatMessage
                name="Rivtor"
                text={example.rivtor}
                isUser={false}
                delay={baseDelay + 0.6}
              />
            </div>
          );
        })}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.6,
            delay: prefersReducedMotion ? 0 : 3.5,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            marginTop: '32px',
            textAlign: 'center',
          }}
        >
          <button
            onClick={() => setIsSessionOpen(true)}
            style={{
              padding: '16px 32px',
              backgroundColor: 'transparent',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '8px',
              color: '#FFFFFF',
              fontSize: '15px',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.24)';
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            See Rivtor in action
          </button>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {isSessionOpen && (
          <ExecutionSession
            onClose={() => setIsSessionOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
