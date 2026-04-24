import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How It Works | Rivtor',
  description: 'Learn how Rivtor turns your goals into finished work. Set a goal. Rivtor plans, drives, and finishes the execution—without constant follow-ups.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function HowItWorksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
