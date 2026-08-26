'use client'; // Required if using Next.js App Router

import React, { useEffect, useRef } from 'react';

export default function InteractiveBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Respect reduced motion settings
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let particles = [];
    let ripples = [];
    let animationFrameId;
    let time = 0;

    const mouse = { x: null, y: null, radius: 180 };

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.baseX = this.x;
        this.baseY = this.y;
        this.size = Math.random() * 2 + 1;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
        this.waveOffset = Math.random() * Math.PI * 2;
        this.color = Math.random() > 0.5 ? '165, 180, 252' : '192, 132, 252';
      }

      update() {
        this.baseX += this.vx;
        this.baseY += this.vy;

        if (this.baseX < 0 || this.baseX > width) this.vx *= -1;
        if (this.baseY < 0 || this.baseY > height) this.vy *= -1;

        const waveX = Math.sin(time * 0.002 + this.waveOffset) * 15;
        const waveY = Math.cos(time * 0.002 + this.waveOffset) * 15;

        let targetX = this.baseX + waveX;
        let targetY = this.baseY + waveY;

        // Magnetic attraction to cursor
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - targetX;
          const dy = mouse.y - targetY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouse.radius) {
            const pull = (1 - distance / mouse.radius) * 35;
            const angle = Math.atan2(dy, dx);
            targetX += Math.cos(angle) * pull;
            targetY += Math.sin(angle) * pull;
          }
        }

        // Push effect from active ripples
        ripples.forEach((ripple) => {
          const dx = targetX - ripple.x;
          const dy = targetY - ripple.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const diff = Math.abs(dist - ripple.radius);

          if (diff < 30) {
            const force = (1 - diff / 30) * ripple.alpha * 15;
            const angle = Math.atan2(dy, dx);
            targetX += Math.cos(angle) * force;
            targetY += Math.sin(angle) * force;
          }
        });

        this.x = targetX;
        this.y = targetY;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color}, 0.7)`;
        ctx.fill();
      }
    }

    class Ripple {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 0;
        this.maxRadius = 250;
        this.alpha = 1;
        this.speed = 4;
      }

      update() {
        this.radius += this.speed;
        this.alpha = 1 - this.radius / this.maxRadius;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(165, 180, 252, ${Math.max(0, this.alpha * 0.5)})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }

    const initParticles = () => {
      particles = [];
      const count = Math.floor((width * height) / 10000);
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    };

    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            const opacity = (1 - distance / 120) * 0.3;
            ctx.strokeStyle = `rgba(129, 140, 248, ${opacity})`;
            ctx.lineWidth = 0.75;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = (timestamp) => {
      time = timestamp;
      ctx.clearRect(0, 0, width, height);

      // Handle click ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        ripples[i].update();
        ripples[i].draw();
        if (ripples[i].alpha <= 0) {
          ripples.splice(i, 1);
        }
      }

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      drawConnections();
      animationFrameId = requestAnimationFrame(animate);
    };

    // Listeners on window capture global mouse movement & clicks across the screen
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const handleClick = (e) => {
      ripples.push(new Ripple(e.clientX, e.clientY));
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
      className="fixed top-0 left-0 w-screen h-screen pointer-events-none z-0"
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