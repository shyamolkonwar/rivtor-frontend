import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Design Partner Program | Rivtor',
  description: 'Join Rivtor\'s Design Partner Program. Get early access, direct collaboration with the team, and help build the execution system that gets work done.',
  keywords: [
    'design partner program',
    'execution ownership',
    'goal completion',
    'early access',
    'build with Rivtor',
    'execution system',
    'startup partnership'
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_APP_URL
      ? `${process.env.NEXT_PUBLIC_APP_URL}/design-partner`
      : 'https://rivtor.com/design-partner',
    title: 'Design Partner Program | Rivtor',
    description: 'Join a select group of startups building the execution system that gets work done. Get direct access to the Rivtor team and shape the future of goal completion.',
    siteName: 'Rivtor',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Design Partner Program | Rivtor',
    description: 'Build with Rivtor. Join our Design Partner Program for early access and direct collaboration with our team.',
    creator: '@rivtor',
  },
  alternates: {
    canonical: '/design-partner',
  },
};

export default function DesignPartnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
