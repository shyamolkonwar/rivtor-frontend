import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy | Rivtor',
  description: 'Rivtor\'s Cookie Policy explaining how we use cookies and similar technologies on our website and platform.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function CookiePolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
