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
    default: 'Rivtor | An Agent That Executes Your Goals',
    template: '%s | Rivtor'
  },
  description: 'Rivtor is an autonomous agent that reasons about your objectives, plans the work, and drives it to completion across your team and tools. Not a tool. An agent.',
  keywords: [
    'AI agent',
    'autonomous execution',
    'goal execution agent',
    'AI company',
    'agentic AI',
    'autonomous agent',
    'founder productivity',
    'cognitive offloading',
    'delegation agent',
    'startup execution',
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
    title: 'Rivtor | An Agent That Executes Your Goals',
    description: 'Rivtor is an autonomous agent that reasons about your objectives, plans the work, and drives it to completion. Not a tool. An agent.',
    siteName: 'Rivtor',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rivtor | An Agent That Executes Your Goals',
    description: 'Rivtor is an autonomous agent that reasons about your objectives, plans the work, and drives it to completion. Stop executing. Start delegating to an agent.',
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
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-body antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
