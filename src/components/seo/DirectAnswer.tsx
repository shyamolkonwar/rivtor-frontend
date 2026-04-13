/**
 * DirectAnswer Component
 *
 * Purpose: Provide immediate, LLM-parseable answer to "What is [entity]?"
 * Renders a complete, citable sentence that AI crawlers can extract for Q&A
 *
 * Pattern: Entity + Category + Definition + Key Benefit + Target Audience
 * Example: "Rivtor is an Execution Intelligence system that [definition]. [benefit]. For [audience]."
 */

import React from 'react';

interface DirectAnswerProps {
  entity: string;
  category: string;
  definition: string;
  keyBenefit: string;
  targetAudience?: string;
  className?: string;
}

export default function DirectAnswer({
  entity,
  category,
  definition,
  keyBenefit,
  targetAudience,
  className = ''
}: DirectAnswerProps) {
  // Construct the direct answer sentence
  const answerParts = [
    `${entity} is a ${category} that ${definition}`,
    keyBenefit,
    targetAudience ? `For ${targetAudience}.` : ''
  ].filter(Boolean);

  const answerText = answerParts.join(' ');

  return (
    <section className={`direct-answer-section ${className}`}>
      <div className="rv-container-v4">
        {/* Header for humans */}
        <h2
          style={{
            fontSize: '12px',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: 'rgba(255, 255, 255, 0.4)',
            marginBottom: '20px',
            fontFamily: 'var(--font-body)',
          }}
        >
          What is {entity}?
        </h2>

        {/* The direct answer - optimized for LLM extraction */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            borderRadius: '12px',
            padding: '24px',
          }}
        >
          <p
            style={{
              fontSize: '18px',
              lineHeight: '1.6',
              color: 'var(--rv-text-primary)',
              margin: 0,
              fontFamily: 'var(--font-body)',
            }}
          >
            {answerText}
          </p>
        </div>

        {/* Hidden structured data for LLMs */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'DefinedTerm',
              name: entity,
              category: category,
              description: `${definition}. ${keyBenefit}${targetAudience ? ` For ${targetAudience}` : ''}`
            })
          }}
        />
      </div>
    </section>
  );
}
