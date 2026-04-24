'use client';

import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Tendril {
  angle: number;
  length: number;
  curvature: number;
  pulseOffset: number;
  speed: number;
  opacity: number;
}

interface Orbiter {
  angle: number;
  radiusX: number;
  radiusY: number;
  speed: number;
  size: number;
  opacity: number;
  phase: number;
}

interface AmbientParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  targetOpacity: number;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function HeroCoreAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReducedMotion) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let startTime = Date.now();

    // Configuration
    const TENDRIL_COUNT = 10;
    const ORBITER_COUNT = 6;
    const AMBIENT_COUNT = 40;

    // State
    const tendrils: Tendril[] = [];
    const orbiters: Orbiter[] = [];
    const ambientParticles: AmbientParticle[] = [];

    const initElements = (width: number, height: number) => {
      const centerX = width / 2;
      const centerY = height / 2;
      const maxRadius = Math.min(width, height) * 0.42;

      // Initialize tendrils
      tendrils.length = 0;
      for (let i = 0; i < TENDRIL_COUNT; i++) {
        const angle = (Math.PI * 2 / TENDRIL_COUNT) * i + Math.random() * 0.3;
        tendrils.push({
          angle,
          length: maxRadius * (0.7 + Math.random() * 0.3),
          curvature: (Math.random() - 0.5) * 40,
          pulseOffset: Math.random() * 3000,
          speed: 0.8 + Math.random() * 0.6,
          opacity: 0.08 + Math.random() * 0.12,
        });
      }

      // Initialize orbiters
      orbiters.length = 0;
      for (let i = 0; i < ORBITER_COUNT; i++) {
        const isHorizontal = i % 2 === 0;
        orbiters.push({
          angle: Math.random() * Math.PI * 2,
          radiusX: isHorizontal ? maxRadius * (0.6 + Math.random() * 0.3) : maxRadius * (0.3 + Math.random() * 0.2),
          radiusY: isHorizontal ? maxRadius * (0.3 + Math.random() * 0.2) : maxRadius * (0.6 + Math.random() * 0.3),
          speed: (0.15 + Math.random() * 0.25) * (Math.random() > 0.5 ? 1 : -1),
          size: 1.5 + Math.random() * 2,
          opacity: 0.3 + Math.random() * 0.4,
          phase: Math.random() * Math.PI * 2,
        });
      }

      // Initialize ambient particles
      ambientParticles.length = 0;
      for (let i = 0; i < AMBIENT_COUNT; i++) {
        ambientParticles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          size: 0.5 + Math.random() * 1.5,
          opacity: 0,
          targetOpacity: 0.03 + Math.random() * 0.08,
        });
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initElements(rect.width, rect.height);
    };

    resize();

    const draw = () => {
      const elapsed = Date.now() - startTime;
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const centerX = width / 2;
      const centerY = height / 2;

      ctx.clearRect(0, 0, width, height);

      // Background radial gradient
      const bgGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, Math.max(width, height) * 0.6);
      bgGradient.addColorStop(0, 'rgba(255, 255, 255, 0.015)');
      bgGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.005)');
      bgGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // --- AMBIENT PARTICLES ---
      ambientParticles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Smooth opacity transition
        if (p.opacity < p.targetOpacity) p.opacity += 0.001;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.fill();
      });

      // --- TENDRILS ---
      tendrils.forEach((tendril) => {
        const endX = centerX + Math.cos(tendril.angle) * tendril.length;
        const endY = centerY + Math.sin(tendril.angle) * tendril.length;

        // Control point for curve
        const midX = (centerX + endX) / 2;
        const midY = (centerY + endY) / 2;
        const perpX = -Math.sin(tendril.angle) * tendril.curvature;
        const perpY = Math.cos(tendril.angle) * tendril.curvature;
        const cpX = midX + perpX;
        const cpY = midY + perpY;

        // Draw base path
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.quadraticCurveTo(cpX, cpY, endX, endY);
        ctx.strokeStyle = `rgba(255, 255, 255, ${tendril.opacity})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // Traveling pulse
        const pulseTime = (elapsed + tendril.pulseOffset) % (4000 / tendril.speed);
        const pulseProgress = pulseTime / (4000 / tendril.speed);

        if (pulseProgress < 1) {
          // Calculate position on quadratic bezier
          const t = pulseProgress;
          const invT = 1 - t;
          const px = invT * invT * centerX + 2 * invT * t * cpX + t * t * endX;
          const py = invT * invT * centerY + 2 * invT * t * cpY + t * t * endY;

          // Glow
          const glowGradient = ctx.createRadialGradient(px, py, 0, px, py, 12);
          glowGradient.addColorStop(0, `rgba(255, 255, 255, ${0.6 * (1 - pulseProgress * 0.3)})`);
          glowGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
          ctx.beginPath();
          ctx.arc(px, py, 12, 0, Math.PI * 2);
          ctx.fillStyle = glowGradient;
          ctx.fill();

          // Core dot
          ctx.beginPath();
          ctx.arc(px, py, 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${0.9 * (1 - pulseProgress * 0.5)})`;
          ctx.fill();

          // Trail dots
          for (let i = 1; i <= 3; i++) {
            const trailT = Math.max(0, t - i * 0.04);
            const trailInvT = 1 - trailT;
            const tx = trailInvT * trailInvT * centerX + 2 * trailInvT * trailT * cpX + trailT * trailT * endX;
            const ty = trailInvT * trailInvT * centerY + 2 * trailInvT * trailT * cpY + trailT * trailT * endY;
            ctx.beginPath();
            ctx.arc(tx, ty, 1.5 - i * 0.3, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${0.3 * (1 - trailT * 0.5)})`;
            ctx.fill();
          }
        }
      });

      // --- ORBITERS ---
      orbiters.forEach((orbiter) => {
        const orbitAngle = orbiter.angle + elapsed * 0.0003 * orbiter.speed;
        const ox = centerX + Math.cos(orbitAngle) * orbiter.radiusX;
        const oy = centerY + Math.sin(orbitAngle + orbiter.phase) * orbiter.radiusY;

        // Glow
        const orbGlow = ctx.createRadialGradient(ox, oy, 0, ox, oy, orbiter.size * 4);
        orbGlow.addColorStop(0, `rgba(255, 255, 255, ${orbiter.opacity * 0.3})`);
        orbGlow.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.beginPath();
        ctx.arc(ox, oy, orbiter.size * 4, 0, Math.PI * 2);
        ctx.fillStyle = orbGlow;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(ox, oy, orbiter.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${orbiter.opacity})`;
        ctx.fill();
      });

      // --- CENTRAL CORE ---
      const breathe = Math.sin(elapsed * 0.0015) * 0.15 + 1;
      const breatheFast = Math.sin(elapsed * 0.003) * 0.08 + 1;

      // Outer ring (rotating dashed)
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(elapsed * 0.0001);
      ctx.beginPath();
      ctx.arc(0, 0, 65 * breathe, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
      ctx.lineWidth = 1;
      ctx.setLineDash([6, 8]);
      ctx.stroke();
      ctx.restore();

      // Middle ring (breathing)
      ctx.beginPath();
      ctx.arc(centerX, centerY, 42 * breatheFast, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Inner glow
      const coreGlow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 30);
      coreGlow.addColorStop(0, 'rgba(255, 255, 255, 0.15)');
      coreGlow.addColorStop(0.4, 'rgba(255, 255, 255, 0.05)');
      coreGlow.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.beginPath();
      ctx.arc(centerX, centerY, 30, 0, Math.PI * 2);
      ctx.fillStyle = coreGlow;
      ctx.fill();

      // Core dot
      ctx.beginPath();
      ctx.arc(centerX, centerY, 5 * breathe, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
      ctx.fill();

      // Inner ring pulse
      const ringPulse = (Math.sin(elapsed * 0.002) + 1) / 2;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 18 + ringPulse * 8, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255, 255, 255, ${0.08 + ringPulse * 0.12})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => resize();
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [prefersReducedMotion]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 1,
        delay: prefersReducedMotion ? 0 : 0.4,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="rv-hero-animation rv-hero-animation--new"
      aria-label="Autonomous intelligence core visualization"
    >
      <canvas
        ref={canvasRef}
        className="rv-canvas rv-canvas--new"
        style={{ width: '100%', height: '100%' }}
      />
    </motion.div>
  );
}
