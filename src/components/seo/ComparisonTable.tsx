/**
 * ComparisonTable Component
 *
 * Purpose: Show competitive advantages in structured format
 * Table format is ideal for LLM parsing and clear competitive positioning
 *
 * Features:
 * - Boolean values render as icons (check/X)
 * - String values render as text
 * - Responsive table layout
 * - Visual highlighting for Rivtor column
 */

import React from 'react';
import { Check, X, Minus } from 'lucide-react';

interface ComparisonRow {
  feature: string;
  rivtor: string | boolean;
  competitorA: string | boolean;
  competitorB: string | boolean;
}

interface ComparisonTableProps {
  title?: string;
  competitorAName: string;
  competitorBName: string;
  rows: ComparisonRow[];
  className?: string;
}

function renderCellValue(value: string | boolean): React.ReactNode {
  if (typeof value === 'boolean') {
    if (value === true) {
      return <Check className="w-5 h-5 text-green-600" />;
    }
    return <X className="w-5 h-5 text-red-500" />;
  }

  if (value === '-' || value === 'N/A') {
    return <Minus className="w-5 h-5 text-gray-400" />;
  }

  return <span className="text-sm">{value}</span>;
}

export default function ComparisonTable({
  title = 'Feature Comparison',
  competitorAName,
  competitorBName,
  rows,
  className = ''
}: ComparisonTableProps) {
  return (
    <section className={`comparison-table-section ${className}`}>
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
          <p className="text-gray-600">See how Rivtor compares to other solutions</p>
        </div>

        {/* Comparison table */}
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-lg border border-gray-200 overflow-hidden">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Feature
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-blue-600 bg-blue-50">
                  Rivtor
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">
                  {competitorAName}
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">
                  {competitorBName}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr
                  key={index}
                  className={`border-b border-gray-100 ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  }`}
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {row.feature}
                  </td>
                  <td className="px-6 py-4 text-center bg-blue-50/50">
                    {renderCellValue(row.rivtor)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {renderCellValue(row.competitorA)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {renderCellValue(row.competitorB)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Hidden structured data for LLMs */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Table',
              about: `${title} - Rivtor vs ${competitorAName} vs ${competitorBName}`,
              caption: title,
              rows: rows.map(row => ({
                '@type': 'TableRow',
                cells: [
                  { '@type': 'TableCell', labelText: row.feature },
                  {
                    '@type': 'TableCell',
                    labelText: typeof row.rivtor === 'boolean' ? (row.rivtor ? 'Yes' : 'No') : String(row.rivtor)
                  },
                  {
                    '@type': 'TableCell',
                    labelText: typeof row.competitorA === 'boolean' ? (row.competitorA ? 'Yes' : 'No') : String(row.competitorA)
                  },
                  {
                    '@type': 'TableCell',
                    labelText: typeof row.competitorB === 'boolean' ? (row.competitorB ? 'Yes' : 'No') : String(row.competitorB)
                  }
                ]
              }))
            })
          }}
        />
      </div>
    </section>
  );
}
