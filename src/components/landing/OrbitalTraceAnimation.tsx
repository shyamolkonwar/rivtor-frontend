'use client';

import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/* ------------------------------------------------------------------ */
/*  3D Math Utilities                                                  */
/* ------------------------------------------------------------------ */

interface Vec3 {
  x: number;
  y: number;
  z: number;
}

function rotateX(v: Vec3, angle: number): Vec3 {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return {
    x: v.x,
    y: v.y * cos - v.z * sin,
    z: v.y * sin + v.z * cos,
  };
}

function rotateY(v: Vec3, angle: number): Vec3 {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return {
    x: v.x * cos + v.z * sin,
    y: v.y,
    z: -v.x * sin + v.z * cos,
  };
}

function project(v: Vec3, centerX: number, centerY: number, fov: number): { x: number; y: number; scale: number } {
  const dist = fov / (fov + v.z);
  return {
    x: centerX + v.x * dist,
    y: centerY + v.y * dist,
    scale: dist,
  };
}

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Ring {
  radius: number;
  speed: number;
  tiltX: number;
  tiltZ: number;
  phase: number;
  thickness: number;
  opacity: number;
  segments: number;
}

interface TracePoint {
  x: number;
  y: number;
  z: number;
  opacity: number;
  age: number;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function OrbitalTraceAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReducedMotion) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let startTime = Date.now();

    // Interaction state
    const mouse = { x: 0, y: 0, targetRotX: 0, targetRotY: 0, currentRotX: 0.3, currentRotY: 0 };
    const isHovering = { value: false };
    const pulseTime = { value: 0 };

    // Ring definitions in 3D space
    const rings: Ring[] = [
      { radius: 0.22, speed: 0.0003, tiltX: 0, tiltZ: 0, phase: 0, thickness: 2, opacity: 0.7, segments: 64 },
      { radius: 0.32, speed: -0.00022, tiltX: 0.5, tiltZ: 0.3, phase: 1.2, thickness: 1.5, opacity: 0.55, segments: 80 },
      { radius: 0.42, speed: 0.00015, tiltX: -0.3, tiltZ: -0.5, phase: 2.4, thickness: 1.2, opacity: 0.45, segments: 96 },
      { radius: 0.52, speed: -0.0001, tiltX: 0.8, tiltZ: 0.2, phase: 0.8, thickness: 1, opacity: 0.35, segments: 112 },
      { radius: 0.62, speed: 0.00006, tiltX: -0.6, tiltZ: -0.4, phase: 3.1, thickness: 0.8, opacity: 0.25, segments: 128 },
    ];

    const tracePoints: TracePoint[] = [];
    const MAX_TRAIL_LENGTH = 200;
    const TRAIL_FADE = 0.99;

    // Particle system for ambient dust
    const particles: { x: number; y: number; z: number; vx: number; vy: number; vz: number; size: number }[] = [];
    for (let i = 0; i < 60; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 0.3 + Math.random() * 0.5;
      particles.push({
        x: r * Math.sin(phi) * Math.cos(theta),
        y: r * Math.sin(phi) * Math.sin(theta),
        z: r * Math.cos(phi),
        vx: (Math.random() - 0.5) * 0.0002,
        vy: (Math.random() - 0.5) * 0.0002,
        vz: (Math.random() - 0.5) * 0.0002,
        size: 0.5 + Math.random() * 1.5,
      });
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();

    // Mouse events
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - rect.left) / rect.width;
      mouse.y = (e.clientY - rect.top) / rect.height;
      mouse.targetRotY = (mouse.x - 0.5) * 1.2;
      mouse.targetRotX = 0.3 + (mouse.y - 0.5) * 0.6;
      isHovering.value = true;
    };

    const handleMouseLeave = () => {
      isHovering.value = false;
      mouse.targetRotX = 0.3;
      mouse.targetRotY = 0;
    };

    const handleClick = () => {
      pulseTime.value = Date.now();
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('click', handleClick);

    const draw = () => {
      const elapsed = Date.now() - startTime;
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const centerX = width / 2;
      const centerY = height / 2;
      const baseRadius = Math.max(width, height) * 0.45;
      const fov = 800;

      // Smooth rotation interpolation
      const lerpSpeed = isHovering.value ? 0.06 : 0.02;
      mouse.currentRotX += (mouse.targetRotX - mouse.currentRotX) * lerpSpeed;
      mouse.currentRotY += (mouse.targetRotY - mouse.currentRotY) * lerpSpeed;

      ctx.clearRect(0, 0, width, height);

      // Background gradient
      const bgGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, Math.max(width, height) * 0.5);
      bgGradient.addColorStop(0, 'rgba(255, 255, 255, 0.015)');
      bgGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.005)');
      bgGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // Pulse effect on click
      const pulseAge = Date.now() - pulseTime.value;
      const pulseActive = pulseAge < 800;
      const pulseRadius = pulseActive ? (pulseAge / 800) * baseRadius * 1.5 : 0;
      const pulseOpacity = pulseActive ? 1 - pulseAge / 800 : 0;

      if (pulseActive) {
        const proj = project({ x: 0, y: 0, z: 0 }, centerX, centerY, fov);
        ctx.beginPath();
        ctx.arc(proj.x, proj.y, pulseRadius * proj.scale, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${pulseOpacity * 0.3})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // 3D rotation matrices
      const rotX = mouse.currentRotX;
      const rotY = mouse.currentRotY + elapsed * 0.00005;

      // Collect all drawable elements with depth for sorting
      interface Drawable {
        type: 'ring' | 'point' | 'trace' | 'particle';
        z: number;
        draw: () => void;
      }
      const drawables: Drawable[] = [];

      // --- RINGS ---
      rings.forEach((ring) => {
        const r = baseRadius * ring.radius;
        const ringPoints: Vec3[] = [];

        for (let i = 0; i <= ring.segments; i++) {
          const angle = (i / ring.segments) * Math.PI * 2;
          const base: Vec3 = {
            x: Math.cos(angle) * r,
            y: Math.sin(angle) * r,
            z: 0,
          };
          // Apply ring's intrinsic tilt
          const tilted = rotateX(rotateZ(base, ring.tiltZ), ring.tiltX);
          // Apply global rotation
          const rotated = rotateY(rotateX(tilted, rotX), rotY);
          ringPoints.push(rotated);
        }

        // Average Z for depth sorting
        const avgZ = ringPoints.reduce((sum, p) => sum + p.z, 0) / ringPoints.length;

        drawables.push({
          type: 'ring',
          z: avgZ,
          draw: () => {
            ctx.beginPath();
            ringPoints.forEach((p, i) => {
              const proj = project(p, centerX, centerY, fov);
              if (i === 0) ctx.moveTo(proj.x, proj.y);
              else ctx.lineTo(proj.x, proj.y);
            });
            ctx.closePath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${ring.opacity * 0.2})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          },
        });

        // Traveling point on ring
        const pointAngle = elapsed * ring.speed + ring.phase;
        const pointBase: Vec3 = {
          x: Math.cos(pointAngle) * r,
          y: Math.sin(pointAngle) * r,
          z: 0,
        };
        const pointTilted = rotateX(rotateZ(pointBase, ring.tiltZ), ring.tiltX);
        const pointRotated = rotateY(rotateX(pointTilted, rotX), rotY);
        const pointProj = project(pointRotated, centerX, centerY, fov);

        drawables.push({
          type: 'point',
          z: pointRotated.z,
          draw: () => {
            // Glow based on depth
            const depthFade = Math.max(0.3, (pointRotated.z + baseRadius) / (baseRadius * 2));
            const size = ring.thickness * pointProj.scale * (1 + depthFade * 0.5);

            // Outer glow
            const glow = ctx.createRadialGradient(pointProj.x, pointProj.y, 0, pointProj.x, pointProj.y, size * 8);
            glow.addColorStop(0, `rgba(255, 255, 255, ${ring.opacity * depthFade * 0.4})`);
            glow.addColorStop(1, 'rgba(255, 255, 255, 0)');
            ctx.beginPath();
            ctx.arc(pointProj.x, pointProj.y, size * 8, 0, Math.PI * 2);
            ctx.fillStyle = glow;
            ctx.fill();

            // Core dot
            ctx.beginPath();
            ctx.arc(pointProj.x, pointProj.y, size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${ring.opacity * depthFade})`;
            ctx.fill();
          },
        });
      });

      // --- TRACE / SPIROGRAPH ---
      // Compute trace position as weighted sum of ring positions
      let traceX = 0;
      let traceY = 0;
      let traceZ = 0;

      rings.forEach((ring) => {
        const r = baseRadius * ring.radius;
        const angle = elapsed * ring.speed + ring.phase;
        const base: Vec3 = {
          x: Math.cos(angle) * r,
          y: Math.sin(angle) * r,
          z: 0,
        };
        const tilted = rotateX(rotateZ(base, ring.tiltZ), ring.tiltX);
        traceX += tilted.x * 0.35;
        traceY += tilted.y * 0.35;
        traceZ += tilted.z * 0.35;
      });

      const traceRotated = rotateY(rotateX({ x: traceX, y: traceY, z: traceZ }, rotX), rotY);

      tracePoints.push({
        x: traceRotated.x,
        y: traceRotated.y,
        z: traceRotated.z,
        opacity: 1,
        age: 0,
      });

      // Age and fade trace
      for (let i = tracePoints.length - 1; i >= 0; i--) {
        const point = tracePoints[i];
        point.age++;
        point.opacity *= TRAIL_FADE;
        if (point.opacity < 0.005 || point.age > MAX_TRAIL_LENGTH) {
          tracePoints.splice(i, 1);
        }
      }

      // Draw trace segments with depth
      if (tracePoints.length > 2) {
        for (let i = 0; i < tracePoints.length - 1; i++) {
          const curr = tracePoints[i];
          const next = tracePoints[i + 1];
          const midZ = (curr.z + next.z) / 2;

          drawables.push({
            type: 'trace',
            z: midZ,
            draw: () => {
              const p1 = project(curr, centerX, centerY, fov);
              const p2 = project(next, centerX, centerY, fov);
              const depthFade = Math.max(0.2, (midZ + baseRadius) / (baseRadius * 2));

              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(255, 255, 255, ${curr.opacity * 0.6 * depthFade})`;
              ctx.lineWidth = 1.5 * ((p1.scale + p2.scale) / 2);
              ctx.lineCap = 'round';
              ctx.stroke();
            },
          });
        }
      }

      // --- AMBIENT PARTICLES ---
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        // Keep particles in bounds
        const dist = Math.sqrt(p.x * p.x + p.y * p.y + p.z * p.z);
        if (dist > 1.2) {
          p.x *= 0.99;
          p.y *= 0.99;
          p.z *= 0.99;
        }

        const rotated = rotateY(rotateX({ x: p.x * baseRadius, y: p.y * baseRadius, z: p.z * baseRadius }, rotX), rotY);
        const proj = project(rotated, centerX, centerY, fov);
        const depthFade = Math.max(0.1, (rotated.z + baseRadius) / (baseRadius * 2));

        drawables.push({
          type: 'particle',
          z: rotated.z,
          draw: () => {
            ctx.beginPath();
            ctx.arc(proj.x, proj.y, p.size * proj.scale, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${0.15 * depthFade})`;
            ctx.fill();
          },
        });
      });

      // --- CENTRAL CORE ---
      const coreRotated = rotateY(rotateX({ x: 0, y: 0, z: 0 }, rotX), rotY);
      const coreProj = project(coreRotated, centerX, centerY, fov);
      const breathe = Math.sin(elapsed * 0.001) * 0.1 + 1;

      drawables.push({
        type: 'point',
        z: coreRotated.z + 100, // Draw core on top
        draw: () => {
          // Core ring
          ctx.beginPath();
          ctx.arc(coreProj.x, coreProj.y, 6 * breathe * coreProj.scale, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
          ctx.lineWidth = 1;
          ctx.stroke();

          // Core dot
          ctx.beginPath();
          ctx.arc(coreProj.x, coreProj.y, 2.5 * coreProj.scale, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
          ctx.fill();

          // Core glow
          const coreGlow = ctx.createRadialGradient(coreProj.x, coreProj.y, 0, coreProj.x, coreProj.y, 25 * coreProj.scale);
          coreGlow.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
          coreGlow.addColorStop(1, 'rgba(255, 255, 255, 0)');
          ctx.beginPath();
          ctx.arc(coreProj.x, coreProj.y, 25 * coreProj.scale, 0, Math.PI * 2);
          ctx.fillStyle = coreGlow;
          ctx.fill();
        },
      });

      // Sort by Z (painter's algorithm — far to near)
      drawables.sort((a, b) => a.z - b.z);

      // Draw everything
      drawables.forEach((d) => d.draw());

      // Interaction hint (fades out after first interaction)
      if (!isHovering.value && elapsed < 10000) {
        const hintOpacity = Math.max(0, 0.3 - elapsed * 0.00002);
        ctx.fillStyle = `rgba(255, 255, 255, ${hintOpacity})`;
        ctx.font = '12px var(--font-body)';
        ctx.textAlign = 'center';
        ctx.fillText('Move to rotate', centerX, height - 24);
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => resize();
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('click', handleClick);
    };
  }, [prefersReducedMotion]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 1.2,
        delay: prefersReducedMotion ? 0 : 0.3,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="rv-hero-animation rv-hero-animation--orbital"
      aria-label="Interactive 3D orbital system"
      style={{ cursor: 'grab' }}
    >
      <canvas
        ref={canvasRef}
        className="rv-canvas rv-canvas--orbital"
        style={{ width: '100%', height: '100%', display: 'block' }}
      />
    </motion.div>
  );
}

// Helper for ring tilt around Z axis
function rotateZ(v: Vec3, angle: number): Vec3 {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return {
    x: v.x * cos - v.y * sin,
    y: v.x * sin + v.y * cos,
    z: v.z,
  };
}
