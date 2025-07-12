"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

interface ParticlesProps extends React.HTMLAttributes<HTMLDivElement> {
  quantity?: number;
  staticity?: number;
  ease?: number;
  refresh?: boolean;
  color?: string;
}

export function Particles({
  quantity = 50,
  staticity = 50,
  ease = 50,
  refresh = false,
  color = "#ffffff",
  ...props
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const parentElement = canvas.parentElement;
    if (!parentElement) return;

    const particlesQuantity = quantity;
    const particlesSeparation = 1000 / particlesQuantity;
    const particlesEase = ease / 100;
    const particlesStaticity = staticity / 100;

    let width = parentElement.offsetWidth;
    let height = parentElement.offsetHeight;

    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
    }[] = [];

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        width = entry.contentRect.width;
        height = entry.contentRect.height;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);
      }
      if (refresh) {
        particles.length = 0;
        initParticles();
      }
    });

    resizeObserver.observe(parentElement);

    const initParticles = () => {
      for (let i = 0; i < particlesQuantity; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: 0,
          vy: 0,
        });
      }
    };

    initParticles();

    let animationFrame: number;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = color;
      ctx.strokeStyle = color;

      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];
        const dx = (particle.x - width / 2) / (width / 2);
        const dy = (particle.y - height / 2) / (height / 2);
        const mouse = { x: 0.5, y: 0.5 };
        const distanceFromCenter = Math.sqrt(dx * dx + dy * dy);

        particle.vx +=
          ((-dx / 20) * particlesSeparation -
            particle.vx * particlesEase +
            (Math.random() - 0.5) * particlesStaticity) /
          deltaTime;
        particle.vy +=
          ((-dy / 20) * particlesSeparation -
            particle.vy * particlesEase +
            (Math.random() - 0.5) * particlesStaticity) /
          deltaTime;

        particle.x += particle.vx;
        particle.y += particle.vy;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 1, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const otherParticle = particles[j];
          const dx = otherParticle.x - particle.x;
          const dy = otherParticle.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 80) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        }
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animate(performance.now());

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrame);
    };
  }, [quantity, staticity, ease, refresh, color]);

  return (
    <div {...props}>
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}
