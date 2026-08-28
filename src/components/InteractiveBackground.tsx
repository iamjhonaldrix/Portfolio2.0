import React, { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  status: 'normal' | 'alert' | 'secure';
  radius: number;
}

interface Packet {
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  progress: number;
  speed: number;
  color: string;
}

export default function CybersecurityBackground() {
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

    // Mouse coordinates
    const mouse: { x: number; y: number; active: boolean } = {
      x: width / 2,
      y: height / 2,
      active: false,
    };

    // Radar rotation angle
    let radarAngle = 0;

    // Initialize Security Nodes
    const nodeCount = Math.floor((width * height) / 25000);
    const nodes: Node[] = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      status: Math.random() > 0.85 ? 'alert' : 'normal',
      radius: Math.random() * 2.5 + 1.5,
    }));

    // Data Packets traveling between nodes
    let packets: Packet[] = [];

    const spawnPacket = () => {
      if (nodes.length < 2) return;
      const startNode = nodes[Math.floor(Math.random() * nodes.length)];
      let targetNode = nodes[Math.floor(Math.random() * nodes.length)];
      
      while (targetNode === startNode) {
        targetNode = nodes[Math.floor(Math.random() * nodes.length)];
      }

      const isAlert = startNode.status === 'alert' || targetNode.status === 'alert';
      packets.push({
        startX: startNode.x,
        startY: startNode.y,
        targetX: targetNode.x,
        targetY: targetNode.y,
        progress: 0,
        speed: Math.random() * 0.015 + 0.005,
        color: isAlert ? '#ef4444' : '#06b6d4',
      });
    };

    // Draw grid background
    const drawGrid = () => {
      const gridSize = 60;
      ctx.strokeStyle = 'rgba(15, 23, 42, 0.8)';
      ctx.lineWidth = 1;

      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    };

    // Draw interactive mouse radar scanner
    const drawRadar = () => {
      const radarRadius = 160;

      // Outer targeting ring
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, radarRadius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.25)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([8, 6]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Rotating Radar Sweep
      radarAngle += 0.02;
      ctx.beginPath();
      ctx.moveTo(mouse.x, mouse.y);
      ctx.arc(
        mouse.x,
        mouse.y,
        radarRadius,
        radarAngle,
        radarAngle + Math.PI / 4
      );
      ctx.closePath();

      const gradient = ctx.createRadialGradient(
        mouse.x,
        mouse.y,
        0,
        mouse.x,
        mouse.y,
        radarRadius
      );
      gradient.addColorStop(0, 'rgba(6, 182, 212, 0.2)');
      gradient.addColorStop(1, 'rgba(6, 182, 212, 0)');
      ctx.fillStyle = gradient;
      ctx.fill();

      // Crosshair Reticle
      if (mouse.active) {
        ctx.strokeStyle = 'rgba(6, 182, 212, 0.5)';
        ctx.lineWidth = 1;

        ctx.beginPath();
        ctx.moveTo(mouse.x - 15, mouse.y);
        ctx.lineTo(mouse.x + 15, mouse.y);
        ctx.moveTo(mouse.x, mouse.y - 15);
        ctx.lineTo(mouse.x, mouse.y + 15);
        ctx.stroke();
      }
    };

    // Animation Loop
    const animate = () => {
      // Dark HUD canvas background
      ctx.fillStyle = '#030712';
      ctx.fillRect(0, 0, width, height);

      drawGrid();
      drawRadar();

      // Spawn packets periodically
      if (Math.random() < 0.08) spawnPacket();

      // Update & Draw Nodes
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Draw node point
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.status === 'alert' ? '#ef4444' : '#06b6d4';
        ctx.fill();

        // Pulsing alert ring for compromised nodes
        if (node.status === 'alert') {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius + 4, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(239, 68, 68, 0.4)';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      // Draw mesh links between close nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            const opacity = (1 - dist / 130) * 0.25;
            ctx.strokeStyle =
              nodes[i].status === 'alert' || nodes[j].status === 'alert'
                ? `rgba(239, 68, 68, ${opacity})`
                : `rgba(6, 182, 212, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Update & Draw Packets
      packets.forEach((packet, index) => {
        packet.progress += packet.speed;

        const currentX =
          packet.startX + (packet.targetX - packet.startX) * packet.progress;
        const currentY =
          packet.startY + (packet.targetY - packet.startY) * packet.progress;

        ctx.beginPath();
        ctx.arc(currentX, currentY, 2, 0, Math.PI * 2);
        ctx.fillStyle = packet.color;
        ctx.fill();

        if (packet.progress >= 1) {
          packets.splice(index, 1);
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    // Handlers
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

    const handleClick = (e: MouseEvent) => {
      // Click turns nearest node into a secure status/alert check
      nodes.forEach((node) => {
        const dx = node.x - e.clientX;
        const dy = node.y - e.clientY;
        if (Math.sqrt(dx * dx + dy * dy) < 80) {
          node.status = node.status === 'alert' ? 'normal' : 'alert';
        }
      });
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('click', handleClick);

    handleResize();
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleClick);
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
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}