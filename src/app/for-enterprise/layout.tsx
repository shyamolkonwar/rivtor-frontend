import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Solutions for Enterprise | Rivtor',
  description: 'Operate complex organizations with controlled intelligence. Learn how Rivtor enables enterprises to move from fragmented execution to decision-driven, governed, and continuously improving systems.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function ForEnterpriseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
