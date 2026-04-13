/**
 * StatisticsBlock Component
 *
 * Purpose: Display industry/credibility data with visual emphasis
 * LLMs can extract value-label pairs for citation
 *
 * Features:
 * - Grid layout (responsive: 2 cols mobile, 3 cols desktop)
 * - Large, bold value display
 * - Clear label-value pairs
 * - Optional context for each statistic
 */

import React from 'react';

interface Statistic {
  value: string;
  label: string;
  context?: string;
}

interface StatisticsBlockProps {
  title?: string;
  statistics: Statistic[];
  className?: string;
  showContext?: boolean;
}

export default function StatisticsBlock({
  title = 'Key Facts',
  statistics,
  className = '',
  showContext = false
}: StatisticsBlockProps) {
  return (
    <section className={`statistics-block-section ${className}`}>
      <div className="rv-container-v4">
        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2
            style={{
              fontSize: '32px',
              fontWeight: 600,
              lineHeight: '1.3',
              letterSpacing: '-0.5%',
              color: 'var(--rv-text-primary)',
              marginBottom: '12px',
              fontFamily: 'var(--font-headline)',
            }}
          >
            {title}
          </h2>
          <p
            style={{
              fontSize: '16px',
              color: 'rgba(255, 255, 255, 0.5)',
              margin: 0,
              fontFamily: 'var(--font-body)',
            }}
          >
            Data-driven insights
          </p>
        </div>

        {/* Statistics grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '24px',
          }}
        >
          {statistics.map((stat, index) => (
            <div
              key={index}
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: '12px',
                padding: '24px',
                transition: 'background 150ms ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
              }}
            >
              {/* Value */}
              <div
                style={{
                  fontSize: '48px',
                  fontWeight: 600,
                  lineHeight: '1',
                  color: 'var(--rv-text-primary)',
                  marginBottom: '12px',
                  fontFamily: 'var(--font-headline)',
                  letterSpacing: '-2%',
                }}
              >
                {stat.value}
              </div>

              {/* Label */}
              <div
                style={{
                  fontSize: '16px',
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontWeight: 500,
                  fontFamily: 'var(--font-body)',
                  lineHeight: '1.5',
                }}
              >
                {stat.label}
              </div>

              {/* Optional context */}
              {showContext && stat.context && (
                <div
                  style={{
                    marginTop: '12px',
                    fontSize: '14px',
                    color: 'rgba(255, 255, 255, 0.5)',
                    lineHeight: '1.5',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  {stat.context}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Hidden structured data for LLMs */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ItemList',
              itemListElement: statistics.map((stat, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                item: {
                  '@type': 'QuantitativeValue',
                  value: stat.value,
                  name: stat.label,
                  description: stat.context || stat.label
                }
              }))
            })
          }}
        />
      </div>
    </section>
  );
}
