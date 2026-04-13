import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Architecture | Rivtor',
  description: 'Rivtor is built as a continuous intelligence loop. Learn about our layered system architecture designed to think, act, and evolve.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function ArchitectureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
