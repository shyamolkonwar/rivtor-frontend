import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Data Processing Agreement | Rivtor',
  description: 'Rivtor\'s Data Processing Agreement (DPA) governing the processing of personal data. Learn about data security, confidentiality, and compliance.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function DPALayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
