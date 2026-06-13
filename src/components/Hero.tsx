"use client";

import { useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import heroMountain from "@/assets/hero mountain new.png";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /* ── Grid Sky Canvas ── */
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let w = 0;
    let h = 0;
    const gridSize = 80;

    interface MovingPoint {
      x: number;
      y: number;
      targetX: number;
      targetY: number;
      speed: number;
      opacity: number;
      size: number;
    }

    let pts: MovingPoint[] = [];
    let animationFrameId = 0;

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(dpr, dpr);

      /* ── Pure black background (#050505) ── */
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, w, h);

      /* ── Very thin grid lines (10% opacity) ── */
      ctx.strokeStyle = "rgba(255, 255, 255, 0.10)";
      ctx.lineWidth = 0.5;

      // Vertical grid lines
      for (let x = 0; x < w; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }

      // Horizontal grid lines
      for (let y = 0; y < h; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      /* ── Animate points moving along grid lines ── */
      for (const pt of pts) {
        const dx = pt.targetX - pt.x;
        const dy = pt.targetY - pt.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < pt.speed) {
          // Snap to target intersection
          pt.x = pt.targetX;
          pt.y = pt.targetY;

          // Pick adjacent vertical grid coordinate: Down, Up
          const directions = [
            { dx: 0, dy: gridSize },
            { dx: 0, dy: -gridSize },
          ];

          // Filter directions that remain inside screen boundaries
          const valid = directions.filter((d) => {
            const nextX = pt.x + d.dx;
            const nextY = pt.y + d.dy;
            return nextX >= 0 && nextX <= w && nextY >= 0 && nextY <= h;
          });

          if (valid.length > 0) {
            const chosen = valid[Math.floor(Math.random() * valid.length)];
            pt.targetX = pt.x + chosen.dx;
            pt.targetY = pt.y + chosen.dy;
          }
        } else {
          // Move step towards target
          pt.x += (dx / dist) * pt.speed;
          pt.y += (dy / dist) * pt.speed;
        }

        // Draw glowing point
        const radGrad = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, 10);
        radGrad.addColorStop(0, `rgba(250, 90, 56, ${pt.opacity})`);
        radGrad.addColorStop(0.3, `rgba(250, 90, 56, ${pt.opacity * 0.4})`);
        radGrad.addColorStop(1, "rgba(250, 90, 56, 0)");
        ctx.fillStyle = radGrad;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 10, 0, Math.PI * 2);
        ctx.fill();

        // White core dot
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
      animationFrameId = requestAnimationFrame(tick);
    };

    const resize = () => {
      const parent = canvas.parentElement!;
      w = parent.clientWidth;
      h = parent.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";

      // Re-populate points on resize
      pts = [];
      const numPoints = Math.min(10, Math.max(4, Math.floor(w / 180)));
      for (let i = 0; i < numPoints; i++) {
        const gridX = Math.floor(Math.random() * Math.floor(w / gridSize)) * gridSize;
        const gridY = Math.floor(Math.random() * Math.floor(h / gridSize)) * gridSize;
        pts.push({
          x: gridX,
          y: gridY,
          targetX: gridX,
          targetY: gridY,
          speed: Math.random() * 0.8 + 0.6,
          opacity: Math.random() * 0.3 + 0.6,
          size: Math.random() * 0.8 + 1.2,
        });
      }
    };

    resize();
    window.addEventListener("resize", resize);
    tick();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    const cleanup = initCanvas();
    return cleanup;
  }, [initCanvas]);

  /* ── Subtle parallax on mountain on scroll ── */
  useEffect(() => {
    let rafId = 0;
    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (!sectionRef.current) return;
        const scrollY = window.scrollY;
        const mountain = sectionRef.current.querySelector(
          ".hero-mountain-wrapper"
        ) as HTMLElement | null;
        if (mountain) {
          mountain.style.transform = `translateY(${scrollY * 0.15}px)`;
        }
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section id="hero" className="hero-section" ref={sectionRef}>
      {/* ── Grid Sky Canvas ── */}
      <canvas ref={canvasRef} className="hero-sky-canvas" />

      {/* ── Noise Overlay ── */}
      <div className="hero-noise-overlay" />

      {/* ── Main Text — sits BEHIND the mountain ── */}
      <div className="hero-text-container">
        <h1 className="hero-title">
          <span className="hero-title-bold">BUILT FOR</span>
          <br className="hero-mobile-br" />
          {" "}
          <span className="hero-title-outline">WHATS NEXT!</span>
        </h1>
      </div>

      {/* ── Subtitle Layer — Left Bottom ── */}
      <div className="hero-subtitle-container">
        <p className="hero-subtitle">
          Engineering premium software, mobile apps, and custom web products for growing businesses.
        </p>
      </div>

      {/* ── Mountain Layer — sits IN FRONT of text to overlap ── */}
      <div className="hero-mountain-wrapper">
        <Image
          src={heroMountain}
          alt="Dramatic mountain landscape with orange glow"
          fill
          priority
          quality={95}
          className="hero-mountain-img"
        />
        {/* Bottom fade to black for seamless section transition */}
        <div className="hero-mountain-bottom-fade" />
      </div>

      {/* ── Scroll Indicator ── */}
      <div
        className="hero-scroll-indicator"
        onClick={() => {
          document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <span className="hero-scroll-text">SCROLL</span>
        <div className="hero-scroll-mouse">
          <svg width="24" height="38" viewBox="0 0 24 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="1" width="22" height="36" rx="11" stroke="rgba(255,100,50,0.5)" strokeWidth="1.5" />
            <circle className="hero-scroll-dot" cx="12" cy="10" r="2.5" fill="rgba(255,100,50,0.7)" />
          </svg>
        </div>
      </div>

      {/* ── Bottom Shadow for Hero-Services Transition ── */}
      <div className="hero-bottom-shadow" />

      {/* ── Edge Vignettes ── */}
      <div className="hero-vignette-top" />
      <div className="hero-vignette-left" />
      <div className="hero-vignette-right" />

      {/* ── Styles ── */}
      <style jsx>{`
        /* ── Section ── */
        .hero-section {
          position: relative;
          width: 100%;
          height: 100vh;
          min-height: 650px;
          background: #050505;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        /* ── Grid Sky Canvas ── */
        .hero-sky-canvas {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
        }

        /* ── Noise Overlay ── */
        .hero-noise-overlay {
          position: absolute;
          inset: 0;
          z-index: 12;
          pointer-events: none;
          opacity: 0.035;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }

        /* ── Text Layer (z-index BELOW mountain) ── */
        .hero-text-container {
          position: absolute;
          top: 25%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 5;
          text-align: center;
          pointer-events: none;
          padding: 0 24px;
          width: 100%;
        }

        .hero-title {
          font-family: 'Orbitron', sans-serif;
          font-size: clamp(32px, 5.5vw, 80px);
          line-height: 1.15;
          margin: 0;
          letter-spacing: 0.06em;
          color: #ffffff;
        }

        .hero-title-bold {
          font-family: 'Neue Montreal', sans-serif;
          font-weight: bold;
          color: #ffffff;
          text-shadow:
            0 0 30px rgba(255, 255, 255, 0.08),
            0 2px 4px rgba(0, 0, 0, 0.5);
        }

        .hero-title-outline {
          font-weight: 300;
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.8);
          letter-spacing: 0.08em;
          text-shadow: none;
        }

        .hero-subtitle-container {
          position: absolute;
          bottom: 120px;
          left: 48px;
          z-index: 25;
          max-width: 400px;
          text-align: left;
        }

        .hero-subtitle {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(14px, 1.8vw, 18px);
          font-weight: 300;
          color: #ffffff;
          margin: 0;
          line-height: 1.6;
          letter-spacing: 0.02em;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        }

        .hero-mobile-br {
          display: none;
        }

        /* ── Mountain Layer (z-index ABOVE text) ── */
        .hero-mountain-wrapper {
          position: absolute;
          bottom: -2%;
          left: -2%;
          right: -2%;
          height: 72%;
          z-index: 10;
          pointer-events: none;
          will-change: transform;
          -webkit-mask-image:
            linear-gradient(to bottom, transparent 0%, black 20%, black 100%);
          mask-image:
            linear-gradient(to bottom, transparent 0%, black 20%, black 100%);
        }

        .hero-mountain-bottom-fade {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 80px;
          background: linear-gradient(
            to bottom,
            transparent 0%,
            #050505 100%
          );
          z-index: 2;
        }

        /* ── Scroll Indicator ── */
        .hero-scroll-indicator {
          position: absolute;
          bottom: 32px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 20;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
          cursor: pointer;
          transition: opacity 0.4s ease, transform 0.4s ease;
        }

        .hero-scroll-indicator:hover {
          transform: translateX(-50%) translateY(-4px);
        }

        .hero-scroll-text {
          font-family: 'Orbitron', sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.35em;
          color: rgba(255, 255, 255, 0.4);
          writing-mode: vertical-rl;
          text-orientation: mixed;
          text-transform: uppercase;
          transition: color 0.3s ease;
        }

        .hero-scroll-indicator:hover .hero-scroll-text {
          color: rgba(255, 100, 50, 0.7);
        }

        .hero-scroll-mouse {
          opacity: 0.7;
          transition: opacity 0.3s ease;
        }

        .hero-scroll-indicator:hover .hero-scroll-mouse {
          opacity: 1;
        }

        /* ── Bottom Shadow for Section Transition ── */
        .hero-bottom-shadow {
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 150px;
          z-index: 15;
          background: linear-gradient(
            to bottom,
            transparent 0%,
            rgba(10, 10, 10, 0.3) 30%,
            rgba(10, 10, 10, 0.7) 60%,
            #0a0a0a 100%
          );
          pointer-events: none;
        }

        /* ── Vignettes ── */
        .hero-vignette-top {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 20%;
          z-index: 3;
          background: linear-gradient(
            to bottom,
            rgba(5, 5, 5, 0.5) 0%,
            transparent 100%
          );
          pointer-events: none;
        }

        .hero-vignette-left {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          width: 8%;
          z-index: 3;
          background: linear-gradient(
            to right,
            rgba(5, 5, 5, 0.4) 0%,
            transparent 100%
          );
          pointer-events: none;
        }

        .hero-vignette-right {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          width: 8%;
          z-index: 3;
          background: linear-gradient(
            to left,
            rgba(5, 5, 5, 0.4) 0%,
            transparent 100%
          );
          pointer-events: none;
        }

        /* ── Scroll dot animation ── */
        @keyframes scrollBounce {
          0%, 100% { cy: 10; opacity: 0.7; }
          50% { cy: 22; opacity: 0.3; }
        }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .hero-text-container {
            top: 22%;
          }
          .hero-mountain-wrapper {
            height: 60%;
          }
        }

        @media (max-width: 768px) {
          .hero-section {
            min-height: 550px;
          }
          .hero-text-container {
            top: 35%;
            text-align: center;
          }
          .hero-title {
            font-size: clamp(32px, 8vw, 48px);
            text-align: center;
          }
          .hero-title-outline {
            -webkit-text-stroke: 1px rgba(255, 255, 255, 0.8);
          }
          .hero-subtitle {
            text-align: left;
          }
          .hero-subtitle-container {
            bottom: 100px;
            left: 24px;
            max-width: 320px;
          }
          .hero-mobile-br {
            display: block;
          }
          .hero-mountain-wrapper {
            height: 55%;
          }
          .hero-scroll-indicator {
            bottom: 24px;
            gap: 10px;
          }
          .hero-scroll-text {
            font-size: 8px;
          }
          .hero-bottom-shadow {
            height: 100px;
          }
        }

        @media (max-width: 480px) {
          .hero-section {
            min-height: 500px;
          }
          .hero-text-container {
            top: 35%;
            padding: 0 16px;
          }
          .hero-title {
            font-size: clamp(30px, 9.5vw, 38px);
          }
          .hero-title-outline {
            -webkit-text-stroke: 0.8px rgba(255, 255, 255, 0.8);
          }
          .hero-mountain-wrapper {
            height: 50%;
          }
          .hero-subtitle-container {
            bottom: 80px;
            left: 16px;
            max-width: 280px;
          }
          .hero-scroll-indicator {
            bottom: 18px;
            gap: 8px;
          }
          .hero-scroll-text {
            font-size: 7px;
            letter-spacing: 0.25em;
          }
          .hero-scroll-mouse svg {
            width: 20px;
            height: 32px;
          }
          .hero-bottom-shadow {
            height: 80px;
          }
        }
      `}</style>

      {/* Global style overrides for next/image + scroll animation */}
      <style jsx global>{`
        .hero-mountain-img {
          object-fit: cover;
          object-position: center 30%;
          width: 100% !important;
          height: 100% !important;
        }
        .hero-scroll-dot {
          animation: scrollDotBounce 2s ease-in-out infinite;
        }
        @keyframes scrollDotBounce {
          0%, 100% {
            transform: translateY(0);
            opacity: 0.7;
          }
          50% {
            transform: translateY(14px);
            opacity: 0.2;
          }
        }
      `}</style>
    </section>
  );
}
