import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Design Partner Program | Rivtor - Shape Autonomous Execution',
  description: 'Join Rivtor\'s Design Partner Program. Get early access to Execution Intelligence, direct collaboration with the team, and help build the first autonomous execution system.',
  keywords: [
    'design partner program',
    'execution intelligence',
    'autonomous execution',
    'AI for startups',
    'early access AI',
    'build with Rivtor',
    'AI execution system',
    'startup partnership'
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_APP_URL
      ? `${process.env.NEXT_PUBLIC_APP_URL}/design-partner`
      : 'https://rivtor.com/design-partner',
    title: 'Design Partner Program | Rivtor - Shape Autonomous Execution',
    description: 'Join a select group of startups building the first autonomous execution system. Get direct access to the Rivtor team and shape the future of Execution Intelligence.',
    siteName: 'Rivtor',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Design Partner Program | Rivtor - Shape Autonomous Execution',
    description: 'Build with Rivtor. Join our Design Partner Program for early access to autonomous execution and direct collaboration with our team.',
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
