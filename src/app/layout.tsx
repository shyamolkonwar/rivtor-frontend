import type { Metadata } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';

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
    default: 'Rivtor | Autonomous Agentic Model',
    template: '%s | Rivtor'
  },
  description: 'Rivtor-01 is an autonomous agentic model that handles execution without bottlenecks. Turn intent into execution with intelligent agents.',
  keywords: ['autonomous agents', 'Rivtor-01', 'AI execution', 'agentic model', 'intelligent automation'],
  authors: [{ name: 'Rivtor' }],
  creator: 'Rivtor',
  publisher: 'Rivtor',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://rivtor.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_APP_URL || 'https://rivtor.com',
    title: 'Rivtor | Autonomous Agentic Model',
    description: 'Rivtor-01 is an autonomous agentic model that handles execution without bottlenecks.',
    siteName: 'Rivtor',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rivtor | Autonomous Agentic Model',
    description: 'Rivtor-01 is an autonomous agentic model that handles execution without bottlenecks.',
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
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-body bg-[#F0F2F5] text-[#111827] antialiased selection-bg-[#007aff] selection-text-white`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
