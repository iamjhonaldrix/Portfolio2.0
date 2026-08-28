import React, { useEffect, useRef } from 'react';

// Define strict TypeScript interfaces
interface CodeStream {
  x: number;
  y: number;
  speed: number;
  chars: string[];
  length: number;
  opacity: number;
  lastUpdate: number;
}

interface NetworkNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  targetRadius: number;
  baseRadius: number;
  glitchActive: boolean;
  type: 'binary' | 'hex';
}

export default function CyberSecurityGlitchBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let animationFrameId: number;

    const streams: CodeStream[] = [];
    const nodes: NetworkNode[] = [];
    const hexChars = '0123456789ABCDEF';
    const binaryChars = '01';

    const mouse: { x: number; y: number; active: boolean } = {
      x: 0,
      y: 0,
      active: false,
    };

    // --- STREAM LOGIC ---
    const initStreams = () => {
      const columnCount = Math.floor(width / 24);
      for (let i = 0; i < columnCount; i++) {
        const chars = Array.from({ length: Math.random() * 20 + 10 }, () =>
          hexChars[Math.floor(Math.random() * hexChars.length)]
        );
        streams.push({
          x: i * 24,
          y: Math.random() * height,
          speed: Math.random() * 2 + 1,
          chars: chars,
          length: chars.length,
          opacity: Math.random() * 0.4 + 0.1,
          lastUpdate: 0,
        });
      }
    };

    // --- NODE LOGIC ---
    const initNodes = () => {
      const count = Math.floor((width * height) / 25000);
      for (let i = 0; i < count; i++) {
        const baseRadius = Math.random() * 2 + 1.5;
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: baseRadius,
          targetRadius: baseRadius,
          baseRadius: baseRadius,
          glitchActive: false,
          type: Math.random() > 0.5 ? 'binary' : 'hex',
        });
      }
    };

    // --- ANIMATION LOOP ---
    const animate = (timestamp: number) => {
      // Setup fixed colors from image_2.png
      const bgDark = '#041014';
      const secureGreen = '20, 160, 120'; // Matching green glow
      const glitchCyan = '30, 180, 210'; // Matching cursor cyan

      ctx.fillStyle = bgDark;
      ctx.fillRect(0, 0, width, height);

      // 1. Draw Columns/Streams (background effect)
      ctx.font = '16px monospace';
      streams.forEach((stream) => {
        stream.y += stream.speed;
        if (stream.y > height + 200) stream.y = -200;

        // Change chars slightly over time
        if (timestamp - stream.lastUpdate > 100) {
          stream.chars.shift();
          stream.chars.push(
            hexChars[Math.floor(Math.random() * hexChars.length)]
          );
          stream.lastUpdate = timestamp;
        }

        stream.chars.forEach((char, index) => {
          const charOpacity =
            (index / stream.length) * stream.opacity * 0.7; // Fade tails
          const yPos = stream.y + index * 18;

          ctx.fillStyle = `rgba(${secureGreen}, ${charOpacity})`;
          ctx.fillText(char, stream.x, yPos);
        });
      });

      // 2. Draw Nodes and Connections
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        // Bounds check
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Mouse interaction: attract or 'glitch' nodes
        if (mouse.active) {
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            const angle = Math.atan2(dy, dx);
            const force = (1 - dist / 150) * 0.4;
            node.vx += Math.cos(angle) * force;
            node.vy += Math.sin(angle) * force;
            node.glitchActive = true;
            node.targetRadius = node.baseRadius * 1.8;
          } else {
            node.glitchActive = false;
            node.targetRadius = node.baseRadius;
          }
        }

        // Smooth radius transition
        node.radius += (node.targetRadius - node.radius) * 0.1;

        // Draw node content (binary or hex)
        ctx.fillStyle = node.glitchActive
          ? `rgba(${glitchCyan}, 0.9)`
          : `rgba(${secureGreen}, 0.8)`;
        ctx.beginPath();
        if (node.type === 'binary') {
          // Alternative to circle, draw '1' or '0'
          ctx.font = '10px monospace';
          ctx.fillText(
            Math.random() > 0.5 ? '1' : '0',
            node.x - 3,
            node.y + 3
          );
        } else {
          ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
          ctx.fill();
        }

        // Connections (Mesh)
        for (let j = 0; j < nodes.length; j++) {
          const other = nodes[j];
          if (node === other) continue;

          const dx2 = node.x - other.x;
          const dy2 = node.y - other.y;
          const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

          if (dist2 < 120) {
            const opacity = (1 - dist2 / 120) * 0.2;
            ctx.strokeStyle = node.glitchActive
              ? `rgba(${glitchCyan}, ${opacity})`
              : `rgba(${secureGreen}, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        }
      });

      // 3. Optional: Target Reticle (Cursor Replacement)
      if (mouse.active) {
        ctx.strokeStyle = `rgba(${glitchCyan}, 0.8)`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        // Crosshair
        ctx.moveTo(mouse.x - 15, mouse.y);
        ctx.lineTo(mouse.x + 15, mouse.y);
        ctx.moveTo(mouse.x, mouse.y - 15);
        ctx.lineTo(mouse.x, mouse.y + 15);
        // Outer glow circle
        ctx.arc(mouse.x, mouse.y, 25, 0, Math.PI * 2);
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    // --- EVENT HANDLERS ---
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    // Attach listeners to window for global interaction
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Initialize and Start
    handleResize();
    initStreams();
    initNodes();
    animationFrameId = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none', // Critical: Let clicks pass through
        zIndex: 0, // Lower than UI
      }}
    />
  );
}