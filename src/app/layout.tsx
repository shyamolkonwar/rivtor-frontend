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
    default: 'Rivtor | Set a Goal. Get It Done.',
    template: '%s | Rivtor'
  },
  description: 'Rivtor turns your goals into finished work across your team and tools—without constant follow-ups. Set a goal. Rivtor plans, drives, and finishes the execution.',
  keywords: [
    'goal execution',
    'work completion',
    'execution ownership',
    'finish what you start',
    'execution without follow-ups',
    'business execution',
    'operations automation',
    'team productivity',
    'goal management',
    'project completion'
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
    title: 'Rivtor | Set a Goal. Get It Done.',
    description: 'Rivtor turns your goals into finished work across your team and tools—without constant follow-ups. No coordination. No overhead. Just completed work.',
    siteName: 'Rivtor',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rivtor | Set a Goal. Get It Done.',
    description: 'Rivtor turns your goals into finished work across your team and tools—without constant follow-ups. Stop following up. Start setting goals.',
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
