import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Subprocessors | Rivtor',
  description: 'Information about third-party service providers (Subprocessors) that Rivtor uses to process data as part of delivering our services.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function SubprocessorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
