import type { Metadata } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import OrganizationSchema from '@/components/seo/OrganizationSchema';
import ProductSchema from '@/components/seo/ProductSchema';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-label',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: {
    default: 'Rivtor | Execution Intelligence - Autonomous Execution System',
    template: '%s | Rivtor'
  },
  description: 'Rivtor is execution intelligence. Give it a goal — it plans, executes, and iterates autonomously. For founders who need to ship faster without team overhead.',
  keywords: [
    'execution intelligence',
    'autonomous execution',
    'AI agents for business',
    'agentic systems',
    'autonomous company',
    'AI execution platform',
    'goal-oriented AI',
    'autonomous operations',
    'AI automation',
    'business automation'
  ],
  authors: [{ name: 'Rivtor' }],
  creator: 'Rivtor',
  publisher: 'Rivtor',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://rivtor.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_APP_URL || 'https://rivtor.com',
    title: 'Rivtor | Execution Intelligence - Stop Managing, Start Delegating Outcomes',
    description: 'The first autonomous execution system. Give Rivtor a goal — it plans, executes, and iterates until results are achieved. No coordination. No overhead.',
    siteName: 'Rivtor',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rivtor | Execution Intelligence - Autonomous Execution System',
    description: 'Give Rivtor a goal — it plans, executes, and iterates autonomously. Stop managing execution. Start delegating outcomes.',
    creator: '@rivtor',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Schema.org markup for search engines */}
        <OrganizationSchema />
        <ProductSchema />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-body bg-[#F0F2F5] text-[#111827] antialiased selection-bg-[#007aff] selection-text-white`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
