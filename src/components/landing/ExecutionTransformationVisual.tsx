'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import type { JSX } from 'react';

interface Node {
  id: string;
  x: number;
  y: number;
  opacity: number;
  isConnected: boolean;
}

export default function ExecutionTransformationVisual(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const animationRef = useRef<{
    phase: number;
    progress: number;
    startTime: number;
  }>({ phase: 0, progress: 0, startTime: Date.now() });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      const rect = parent.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);

      return { width: rect.width, height: rect.height };
    };

    const size = setCanvasSize();
    if (!size) return;

    const { width, height } = size;
    const centerX = width / 2;
    const centerY = height / 2;

    // Timing constants (in milliseconds)
    const PHASE_1_DURATION = 1000; // Left visible, right dim
    const PHASE_2_DURATION = 1500; // Transition
    const PHASE_3_DURATION = 1500; // Right active
    const TOTAL_CYCLE = PHASE_1_DURATION + PHASE_2_DURATION + PHASE_3_DURATION;

    // Create nodes for left and right
    const createNodes = (side: 'left' | 'right', count: number): Node[] => {
      const nodes: Node[] = [];
      const sideX = side === 'left' ? centerX * 0.3 : centerX * 1.7;

      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        const radius = 40 + Math.random() * 30;

        nodes.push({
          id: `${side}-${i}`,
          x: sideX + Math.cos(angle) * radius,
          y: centerY + Math.sin(angle) * radius - 30,
          opacity: 0.6 + Math.random() * 0.3,
          isConnected: Math.random() > 0.5,
        });
      }

      return nodes;
    };

    const leftNodes = createNodes('left', 5);
    const rightNodes = createNodes('right', 5);

    const drawNode = (x: number, y: number, opacity: number) => {
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.5})`;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(x, y, 6, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.8})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    const drawLine = (x1: number, y1: number, x2: number, y2: number, opacity: number, isFragmented: boolean) => {
      if (isFragmented) {
        const segments = 8;
        for (let i = 0; i < segments; i++) {
          if (i % 2 === 0) continue; // Skip every other segment for jitter effect
          const t1 = i / segments;
          const t2 = (i + 1) / segments;
          const px1 = x1 + (x2 - x1) * t1;
          const py1 = y1 + (y2 - y1) * t1;
          const px2 = x1 + (x2 - x1) * t2;
          const py2 = y1 + (y2 - y1) * t2;

          ctx.beginPath();
          ctx.moveTo(px1, py1);
          ctx.lineTo(px2, py2);
          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.3})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      } else {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.5})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
    };

    const drawDivider = (opacity: number) => {
      const x = centerX;
      const y1 = centerY - 80;
      const y2 = centerY + 80;

      const gradient = ctx.createLinearGradient(x, y1, x, y2);
      gradient.addColorStop(0, `rgba(255, 255, 255, 0)`);
      gradient.addColorStop(0.5, `rgba(255, 255, 255, ${opacity * 0.08})`);
      gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);

      ctx.beginPath();
      ctx.moveTo(x, y1);
      ctx.lineTo(x, y2);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2;
      ctx.stroke();
    };

    const animate = () => {
      const now = Date.now();
      const elapsed = (now - animationRef.current.startTime) % TOTAL_CYCLE;

      // Determine current phase and progress
      let phase = 0;
      let phaseProgress = 0;

      if (elapsed < PHASE_1_DURATION) {
        phase = 0;
        phaseProgress = elapsed / PHASE_1_DURATION;
      } else if (elapsed < PHASE_1_DURATION + PHASE_2_DURATION) {
        phase = 1;
        phaseProgress = (elapsed - PHASE_1_DURATION) / PHASE_2_DURATION;
      } else {
        phase = 2;
        phaseProgress = (elapsed - PHASE_1_DURATION - PHASE_2_DURATION) / PHASE_3_DURATION;
      }

      animationRef.current = { phase, progress: phaseProgress, startTime: animationRef.current.startTime };

      // Clear canvas
      ctx.fillStyle = 'rgba(10, 10, 10, 1)';
      ctx.fillRect(0, 0, width, height);

      // Determine opacities based on phase
      let leftOpacity = 0.8;
      let rightOpacity = 0.2;

      if (phase === 0) {
        leftOpacity = 0.8;
        rightOpacity = 0.1;
      } else if (phase === 1) {
        leftOpacity = Math.max(0.1, 0.8 - phaseProgress * 0.7);
        rightOpacity = 0.1 + phaseProgress * 0.6;
      } else {
        leftOpacity = 0.1;
        rightOpacity = 0.7;
      }

      // Draw center divider
      drawDivider(0.8);

      // Draw left side (old system - broken)
      leftNodes.forEach((node) => {
        drawNode(node.x, node.y, leftOpacity);
      });

      // Draw fragmented connections on left
      for (let i = 0; i < leftNodes.length - 1; i++) {
        const from = leftNodes[i];
        const to = leftNodes[i + 1];
        drawLine(from.x, from.y, to.x, to.y, leftOpacity, true);
      }

      // Draw right side (new system - smooth)
      rightNodes.forEach((node) => {
        drawNode(node.x, node.y, rightOpacity);
      });

      // Draw smooth connections on right
      for (let i = 0; i < rightNodes.length - 1; i++) {
        const from = rightNodes[i];
        const to = rightNodes[i + 1];
        drawLine(from.x, from.y, to.x, to.y, rightOpacity, false);
      }

      // Draw connecting lines between nodes on right (only when active)
      if (rightOpacity > 0.4) {
        for (let i = 0; i < rightNodes.length; i++) {
          for (let j = i + 1; j < rightNodes.length; j++) {
            const from = rightNodes[i];
            const to = rightNodes[j];
            const distance = Math.sqrt((from.x - to.x) ** 2 + (from.y - to.y) ** 2);

            if (distance < 120) {
              const lineOpacity = (1 - distance / 120) * rightOpacity * 0.3;
              drawLine(from.x, from.y, to.x, to.y, lineOpacity, false);
            }
          }
        }
      }

      // Draw label rectangles
      const drawLabel = (x: number, y: number, label: string, opacity: number) => {
        const width = 80;
        const height = 24;

        ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.08})`;
        ctx.fillRect(x - width / 2, y, width, height);

        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.15})`;
        ctx.lineWidth = 1;
        ctx.strokeRect(x - width / 2, y, width, height);

        ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.6})`;
        ctx.font = 'bold 11px -apple-system, BlinkMacSystemFont, "Segoe UI"';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(label, x, y + height / 2);
      };

      drawLabel(centerX * 0.3, centerY + 100, 'Old System', leftOpacity);
      drawLabel(centerX * 1.7, centerY + 100, 'New System', rightOpacity);

      if (!prefersReducedMotion) {
        requestAnimationFrame(animate);
      }
    };

    if (!prefersReducedMotion) {
      animate();

      const handleResize = () => {
        setCanvasSize();
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }

    return undefined;
  }, [prefersReducedMotion]);

  return (
    <div className="rv-execution-visual">
      <canvas
        ref={canvasRef}
        className="rv-execution-visual__canvas"
        aria-hidden="true"
      />
    </div>
  );
}
