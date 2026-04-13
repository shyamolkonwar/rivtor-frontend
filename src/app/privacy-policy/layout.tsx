import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Rivtor',
  description: 'Learn how Rivtor collects, uses, and protects your information. Our privacy policy covers data handling, deployment models, and user rights.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
