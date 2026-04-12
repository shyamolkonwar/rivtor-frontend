import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Service Level Agreement | Rivtor',
  description: 'Rivtor\'s Service Level Agreement (SLA) outlining service availability, support, and performance commitments.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function SLALayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
