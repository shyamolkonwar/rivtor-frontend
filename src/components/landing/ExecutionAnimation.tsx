'use client';

import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const NODE_LABELS = ['acquisition', 'pricing', 'onboarding', 'retention', 'experiments'];

interface Node {
  id: string;
  x: number;
  y: number;
  label: string;
  angle: number;
}

interface SignalParticle {
  nodeIndex: number;
  startTime: number;
  duration: number;
}

export default function ExecutionAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const startTimeRef = useRef<number>(0);
  const nodesRef = useRef<Node[]>([]);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReducedMotion) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    startTimeRef.current = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      // Set canvas size
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);

      // Clear canvas
      ctx.fillStyle = '#0A0A0A';
      ctx.fillRect(0, 0, rect.width, rect.height);

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Responsive configuration
      const isMobile = rect.width < 768;
      const nodeCount = isMobile ? 4 : 5;
      const baseRadius = isMobile
        ? Math.min(rect.width, rect.height) * 0.18
        : Math.min(rect.width, rect.height) * 0.28;

      // Initialize nodes once
      if (nodesRef.current.length === 0) {
        for (let i = 0; i < nodeCount; i++) {
          const angle = (Math.PI * 2 / nodeCount) * i;
          nodesRef.current.push({
            id: `node-${i}`,
            x: centerX + Math.cos(angle) * baseRadius,
            y: centerY + Math.sin(angle) * baseRadius,
            label: NODE_LABELS[i % NODE_LABELS.length],
            angle,
          });
        }
      }

      const nodes = nodesRef.current;

      // === TIMING ===
      const PHASE_0_DURATION = 1200; // Goal text visible + morph (0-1.2s)
      const PHASE_1_START = 1200; // Graph formation starts at 1.2s
      const PULSE_CYCLE = 2400;
      const SIGNAL_CYCLE = 1400;
      const OUTCOME_CYCLE = 2800;

      // === LAYER 1: Execution Field ===
      drawExecutionField(ctx, rect, elapsed);

      // === LAYER 2: Core Graph ===

      // PHASE 0: Goal text transformation (0-1.2s)
      if (elapsed < PHASE_0_DURATION) {
        const phase0Progress = elapsed / PHASE_0_DURATION;
        drawGoalInputTransformation(ctx, centerX, centerY, phase0Progress);
      }

      // PHASE 1: Graph formation and continuous animation (1.2s+)
      if (elapsed >= PHASE_1_START) {
        const graphTime = elapsed - PHASE_1_START;

        // Draw center node with layered pulse
        drawCenterNode(ctx, centerX, centerY, graphTime, PULSE_CYCLE);

        // Draw connection lines (curved)
        const lineAnimationDuration = 1000; // 1s to draw lines
        const lineProgress = Math.min(graphTime / lineAnimationDuration, 1);

        nodes.forEach((node) => {
          drawCurvedLine(ctx, centerX, centerY, node.x, node.y, lineProgress);
        });

        // Draw nodes and determine active state
        const activeNodeInterval = 3000; // 3s per active cycle
        const currentActiveIndex = Math.floor((graphTime / activeNodeInterval) * nodes.length) % nodes.length;

        nodes.forEach((node, index) => {
          const isActive = index === currentActiveIndex;
          drawNode(ctx, node, graphTime, isActive, PULSE_CYCLE);
        });

        // === LAYER 2B: Signal Flow ===
        nodes.forEach((node, index) => {
          drawSignal(ctx, centerX, centerY, node.x, node.y, graphTime, index, SIGNAL_CYCLE, nodes.length);
        });

        // === LAYER 3: Outcomes ===
        drawOutcome(ctx, nodes, graphTime, OUTCOME_CYCLE);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrameId);
  }, [prefersReducedMotion]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.8,
        delay: prefersReducedMotion ? 0 : 0.3,
      }}
      className="rv-hero-animation"
      aria-label="Execution field visualization with goal transformation and system outcomes"
    >
      <canvas
        ref={canvasRef}
        className="rv-canvas"
        style={{ width: '100%', height: '100%', minHeight: '420px' }}
      />
    </motion.div>
  );
}

// ============================================
// LAYER 1: Execution Field
// ============================================
function drawExecutionField(
  ctx: CanvasRenderingContext2D,
  rect: DOMRect,
  elapsed: number
) {
  const fieldLineCount = 25;
  const fieldCycleTime = 30000; // 30s slow loop
  const fieldProgress = (elapsed % fieldCycleTime) / fieldCycleTime;

  for (let i = 0; i < fieldLineCount; i++) {
    const yPos = (i / fieldLineCount) * rect.height;
    const xOffset = Math.sin(fieldProgress * Math.PI * 2 + i * 0.3) * 30;
    const opacity = 0.03 + Math.sin(fieldProgress * Math.PI * 2 + i) * 0.02;

    ctx.beginPath();
    ctx.moveTo(-50 + xOffset, yPos);
    ctx.lineTo(rect.width + 50 + xOffset, yPos);
    ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
    ctx.lineWidth = 0.5;
    ctx.stroke();
  }
}

// ============================================
// LAYER 2: Goal Input Transformation
// ============================================
function drawGoalInputTransformation(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  progress: number
) {
  // Text size shrinks from 32px to 14px over 0.4s, then stays for 0.8s
  const textDisplayDuration = 0.4; // First 40% of animation
  const textHoldDuration = 0.6; // Then hold for next 60%

  let fontSize = 32;
  let textOpacity = 1;
  let textY = centerY - 40;

  if (progress < textDisplayDuration) {
    // Collapse phase: text shrinks and moves to center
    const collapseProgress = progress / textDisplayDuration;
    fontSize = 32 - (32 - 14) * collapseProgress;
    textY = centerY - 40 + 40 * collapseProgress; // Move toward center
    textOpacity = 1 - collapseProgress * 0.2; // Slight fade as it collapses
  } else {
    // Hold phase: text visible at center
    fontSize = 14;
    textY = centerY;
    textOpacity = 0.8;
  }

  ctx.font = `400 ${fontSize}px Inter, sans-serif`;
  ctx.fillStyle = `rgba(255, 255, 255, ${textOpacity * 0.7})`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('Increase revenue', centerX, textY);
}

// ============================================
// LAYER 2: Center Node (Layered with pulse)
// ============================================
function drawCenterNode(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  graphTime: number,
  pulseCycle: number
) {
  const pulseProgress = (graphTime % pulseCycle) / pulseCycle;
  const pulseFactor = Math.sin(pulseProgress * Math.PI * 2);
  const scale = 1 + pulseFactor * 0.25; // 1 → 1.25 → 1

  // Inner solid core (always visible)
  ctx.beginPath();
  ctx.arc(centerX, centerY, 6, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.fill();

  // Outer breathing ring
  const ringScale = 1.5 + pulseFactor * 0.3;
  ctx.beginPath();
  ctx.arc(centerX, centerY, 6 * ringScale, 0, Math.PI * 2);
  ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 + pulseFactor * 0.1})`;
  ctx.lineWidth = 1;
  ctx.stroke();
}

// ============================================
// LAYER 2: Curved Connection Lines
// ============================================
function drawCurvedLine(
  ctx: CanvasRenderingContext2D,
  fromX: number,
  fromY: number,
  toX: number,
  toY: number,
  progress: number
) {
  if (progress <= 0) return;

  // Calculate control point (offset perpendicular to line)
  const dx = toX - fromX;
  const dy = toY - fromY;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const perpX = -dy / distance * 25;
  const perpY = dx / distance * 25;

  const midX = (fromX + toX) / 2;
  const midY = (fromY + toY) / 2;
  const cpX = midX + perpX;
  const cpY = midY + perpY;

  // Draw partial quadratic curve
  const endX = fromX + (toX - fromX) * progress;
  const endY = fromY + (toY - fromY) * progress;

  ctx.beginPath();
  ctx.moveTo(fromX, fromY);
  ctx.quadraticCurveTo(cpX, cpY, endX, endY);
  ctx.strokeStyle = `rgba(255, 255, 255, ${0.12 * progress})`;
  ctx.lineWidth = 1;
  ctx.stroke();
}

// ============================================
// LAYER 2: Node rendering with state
// ============================================
function drawNode(
  ctx: CanvasRenderingContext2D,
  node: Node,
  graphTime: number,
  isActive: boolean,
  pulseCycle: number
) {
  let opacity = 0.6;
  let scale = 1;

  if (isActive) {
    const pulseProgress = (graphTime % pulseCycle) / pulseCycle;
    const pulseFactor = Math.sin(pulseProgress * Math.PI * 2);
    opacity = 0.6 + pulseFactor * 0.4; // 0.6 → 1 → 0.6
    scale = 1 + pulseFactor * 0.15; // 1 → 1.15 → 1
  }

  // Draw node circle
  ctx.beginPath();
  ctx.arc(node.x, node.y, 4 * scale, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
  ctx.fill();

  // Draw label
  ctx.font = '10px Inter, sans-serif';
  ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.6})`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.fillText(node.label, node.x, node.y + 10);
}

// ============================================
// LAYER 2B: Signal Flow
// ============================================
function drawSignal(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  toX: number,
  toY: number,
  graphTime: number,
  nodeIndex: number,
  signalCycle: number,
  nodeCount: number
) {
  const signalDuration = 1200; // 1.2s travel
  const signalDelay = nodeIndex * 250; // Stagger by 250ms
  const signalTime = (graphTime - signalDelay) % (signalCycle + 200);

  if (signalTime >= 0 && signalTime < signalDuration) {
    const signalProgress = signalTime / signalDuration;

    // Main signal dot
    const pulseX = centerX + (toX - centerX) * signalProgress;
    const pulseY = centerY + (toY - centerY) * signalProgress;

    ctx.beginPath();
    ctx.arc(pulseX, pulseY, 2.5, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${0.9 * (1 - signalProgress * 0.3)})`;
    ctx.fill();

    // Tail blur (3 trailing dots)
    for (let i = 1; i <= 2; i++) {
      const tailProgress = signalProgress - i * 0.2;
      if (tailProgress > 0) {
        const tailX = centerX + (toX - centerX) * tailProgress;
        const tailY = centerY + (toY - centerY) * tailProgress;
        ctx.beginPath();
        ctx.arc(tailX, tailY, 1, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${0.3 * (1 - tailProgress * 0.5)})`;
        ctx.fill();
      }
    }
  }
}

// ============================================
// LAYER 3: Outcome Resolution
// ============================================
function drawOutcome(
  ctx: CanvasRenderingContext2D,
  nodes: Node[],
  graphTime: number,
  outcomeCycle: number
) {
  const outcomes = ['+18% conversion', 'Experiment deployed', 'Revenue increasing'];
  const outcomeCycleTime = graphTime % outcomeCycle;

  // Show outcome for 1.5s out of every 2.8s cycle
  if (outcomeCycleTime < 1500) {
    const outcomePhase = Math.floor(graphTime / outcomeCycle);
    const outcome = outcomes[outcomePhase % outcomes.length];
    const nodeIndex = outcomePhase % nodes.length;
    const node = nodes[nodeIndex];

    // Fade in/out
    let opacity = 0;
    if (outcomeCycleTime < 750) {
      opacity = outcomeCycleTime / 750; // Fade in
    } else {
      opacity = (1500 - outcomeCycleTime) / 750; // Fade out
    }

    // Upward drift (−12px)
    const upwardOffset = (outcomeCycleTime / 1500) * 12;

    ctx.font = '12px Inter, sans-serif';
    ctx.fillStyle = `rgba(255, 255, 255, ${0.7 * opacity})`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillText(outcome, node.x, node.y - 25 - upwardOffset);
  }
}
