import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Security & Trust | Rivtor',
  description: 'Learn about Rivtor\'s security practices, data handling, deployment models, and commitment to protecting your business data.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function TrustLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
