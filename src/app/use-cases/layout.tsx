import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Use Cases | Rivtor',
  description: 'Rivtor executes outcomes across your entire company. From launching products to scaling growth, see how Rivtor operates real business functions.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function UseCasesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
