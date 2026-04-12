import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Acceptable Use Policy | Rivtor',
  description: 'Rivtor\'s Acceptable Use Policy (AUP) governing responsible use of our platform and services.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function AUPLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
