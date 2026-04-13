import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Rivtor',
  description: 'Terms governing your use of Rivtor\'s platform and services. Learn about your rights, responsibilities, and our service commitments.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
