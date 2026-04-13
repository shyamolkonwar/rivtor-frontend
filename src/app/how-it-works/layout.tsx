import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How It Works | Rivtor',
  description: 'Rivtor is execution intelligence. Learn how it plans, executes, and iterates autonomously to achieve your business goals.',
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
