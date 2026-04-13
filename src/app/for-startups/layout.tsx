import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Solutions for Startups | Rivtor',
  description: 'Startups don\'t fail because of lack of ideas. They fail because execution breaks. Learn how Rivtor helps startups build faster, scale better, and stop repeating mistakes.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function ForStartupsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
