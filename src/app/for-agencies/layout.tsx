import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Solutions for Agencies | Rivtor',
  description: 'Agencies don\'t break because of lack of clients. They break because delivery doesn\'t scale. Learn how Rivtor helps agencies scale delivery without lowering margins.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function ForAgenciesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
