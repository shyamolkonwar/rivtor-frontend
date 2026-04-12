import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Trust Center | Rivtor',
  description: 'Rivtor\'s Trust Center - Building on trust, transparency, and control. Learn about data ownership, security practices, deployment architecture, and compliance.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function TrustCenterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
