'use client';

import type { JSX } from 'react';

import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import SystemBackground from '@/components/landing/SystemBackground';
import ArchitectureSection from '@/components/landing/ArchitectureSection';
import RealTimeAwarenessSection from '@/components/landing/RealTimeAwarenessSection';
import AutonomousExecutionSection from '@/components/landing/AutonomousExecutionSection';

export default function ArchitecturePage(): JSX.Element {
  return (
    <main className="rv-landing-v4">
      <SystemBackground />
      <Navbar />

      <div style={{ height: '72px' }} aria-hidden="true" />

      <ArchitectureSection />
      <RealTimeAwarenessSection />
      <AutonomousExecutionSection />

      <Footer />
    </main>
  );
}
