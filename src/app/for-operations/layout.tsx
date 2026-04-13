import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Solutions for Operations Teams | Rivtor',
  description: 'Operations isn\'t about doing more work. It\'s about making sure nothing breaks. Learn how Rivtor helps operations teams build reliable, self-improving systems.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function ForOperationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
