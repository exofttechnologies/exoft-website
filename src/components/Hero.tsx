"use client";

import { useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import heroMountain from "@/assets/hero mountain new.png";

/* ── Interfaces ── */
interface Star {
  x: number;
  y: number;
  r: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinkleOffset: number;
}

interface Nebula {
  x: number;
  y: number;
  rx: number;
  ry: number;
  r: number;
  g: number;
  b: number;
  alpha: number;
  driftSpeedX: number;
  driftSpeedY: number;
  pulseSpeed: number;
  pulseOffset: number;
  rotation: number;
  rotationSpeed: number;
}

interface ShootingStar {
  x: number;
  y: number;
  len: number;
  speed: number;
  angle: number;
  alpha: number;
  life: number;
  maxLife: number;
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  /* ── Animated Sky Canvas ── */
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let stars: Star[] = [];
    let nebulae: Nebula[] = [];
    let shootingStars: ShootingStar[] = [];
    let w = 0;
    let h = 0;

    const resize = () => {
      const parent = canvas.parentElement!;
      w = parent.clientWidth;
      h = parent.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";

      /* Generate stars */
      const starCount = Math.floor((w * h) / 800);
      stars = [];
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 1.2 + 0.15,
          baseAlpha: Math.random() * 0.6 + 0.15,
          twinkleSpeed: Math.random() * 0.003 + 0.0008,
          twinkleOffset: Math.random() * Math.PI * 2,
        });
      }

      /* Generate nebula clouds */
      nebulae = [];
      const nebulaCount = 6;
      const nebulaColors = [
        { r: 80, g: 20, b: 10 },    // deep red-brown
        { r: 120, g: 40, b: 10 },   // warm orange-brown
        { r: 50, g: 15, b: 30 },    // dark maroon
        { r: 30, g: 10, b: 5 },     // almost black warm
        { r: 90, g: 30, b: 5 },     // rust
        { r: 40, g: 15, b: 20 },    // dark wine
      ];
      for (let i = 0; i < nebulaCount; i++) {
        const color = nebulaColors[i % nebulaColors.length];
        nebulae.push({
          x: Math.random() * w,
          y: Math.random() * h * 0.7,
          rx: Math.random() * 300 + 200,
          ry: Math.random() * 200 + 120,
          ...color,
          alpha: Math.random() * 0.06 + 0.02,
          driftSpeedX: (Math.random() - 0.5) * 0.08,
          driftSpeedY: (Math.random() - 0.5) * 0.03,
          pulseSpeed: Math.random() * 0.0008 + 0.0003,
          pulseOffset: Math.random() * Math.PI * 2,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.00005,
        });
      }
    };

    const spawnShootingStar = () => {
      if (shootingStars.length > 2) return;
      shootingStars.push({
        x: Math.random() * w * 0.8,
        y: Math.random() * h * 0.3,
        len: Math.random() * 100 + 60,
        speed: Math.random() * 3 + 2,
        angle: Math.PI / 6 + Math.random() * 0.3,
        alpha: 0,
        life: 0,
        maxLife: Math.random() * 100 + 60,
      });
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(dpr, dpr);

      /* ── Deep space gradient background ── */
      const bgGrad = ctx.createRadialGradient(
        w * 0.7, h * 0.2, 0,
        w * 0.5, h * 0.5, w * 0.9
      );
      bgGrad.addColorStop(0, "#0d0805");
      bgGrad.addColorStop(0.3, "#080404");
      bgGrad.addColorStop(0.7, "#050303");
      bgGrad.addColorStop(1, "#030202");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      /* ── Nebula clouds ── */
      for (const neb of nebulae) {
        const driftX = Math.sin(time * 0.0001 + neb.pulseOffset) * 30;
        const driftY = Math.cos(time * 0.00007 + neb.pulseOffset) * 15;
        const pulse = Math.sin(time * neb.pulseSpeed + neb.pulseOffset) * 0.3 + 0.7;
        const cx = neb.x + neb.driftSpeedX * time * 0.01 + driftX;
        const cy = neb.y + neb.driftSpeedY * time * 0.01 + driftY;

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(neb.rotation + time * neb.rotationSpeed);

        const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, neb.rx);
        const a = neb.alpha * pulse;
        grad.addColorStop(0, `rgba(${neb.r}, ${neb.g}, ${neb.b}, ${a})`);
        grad.addColorStop(0.4, `rgba(${neb.r}, ${neb.g}, ${neb.b}, ${a * 0.6})`);
        grad.addColorStop(1, `rgba(${neb.r}, ${neb.g}, ${neb.b}, 0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.ellipse(0, 0, neb.rx, neb.ry, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      /* ── Warm ambient glow (upper right area to match the sky mood) ── */
      const ambGrad = ctx.createRadialGradient(
        w * 0.75, h * 0.15, 0,
        w * 0.75, h * 0.15, w * 0.5
      );
      const ambPulse = Math.sin(time * 0.0003) * 0.008 + 0.025;
      ambGrad.addColorStop(0, `rgba(100, 40, 10, ${ambPulse})`);
      ambGrad.addColorStop(0.5, `rgba(60, 20, 5, ${ambPulse * 0.5})`);
      ambGrad.addColorStop(1, "rgba(30, 10, 3, 0)");
      ctx.fillStyle = ambGrad;
      ctx.fillRect(0, 0, w, h);

      /* ── Stars with twinkle ── */
      for (const star of stars) {
        const twinkle =
          Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.4 + 0.6;
        const alpha = star.baseAlpha * twinkle;

        /* Star glow */
        if (star.r > 0.8) {
          const glowGrad = ctx.createRadialGradient(
            star.x, star.y, 0,
            star.x, star.y, star.r * 4
          );
          glowGrad.addColorStop(0, `rgba(255, 230, 210, ${alpha * 0.3})`);
          glowGrad.addColorStop(1, "rgba(255, 230, 210, 0)");
          ctx.fillStyle = glowGrad;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.r * 4, 0, Math.PI * 2);
          ctx.fill();
        }

        /* Star core */
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 245, 235, ${alpha})`;
        ctx.fill();
      }

      /* ── Shooting stars ── */
      if (Math.random() < 0.003) spawnShootingStar();

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        ss.life++;
        ss.x += Math.cos(ss.angle) * ss.speed;
        ss.y += Math.sin(ss.angle) * ss.speed;

        /* Fade in then out */
        const lifeRatio = ss.life / ss.maxLife;
        if (lifeRatio < 0.2) {
          ss.alpha = lifeRatio / 0.2;
        } else if (lifeRatio > 0.7) {
          ss.alpha = (1 - lifeRatio) / 0.3;
        } else {
          ss.alpha = 1;
        }

        if (ss.life >= ss.maxLife || ss.x > w + 100 || ss.y > h + 100) {
          shootingStars.splice(i, 1);
          continue;
        }

        const tailX = ss.x - Math.cos(ss.angle) * ss.len;
        const tailY = ss.y - Math.sin(ss.angle) * ss.len;

        const grad = ctx.createLinearGradient(tailX, tailY, ss.x, ss.y);
        grad.addColorStop(0, `rgba(255, 200, 150, 0)`);
        grad.addColorStop(0.7, `rgba(255, 220, 180, ${ss.alpha * 0.3})`);
        grad.addColorStop(1, `rgba(255, 255, 255, ${ss.alpha * 0.8})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(ss.x, ss.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        /* Head glow */
        const headGrad = ctx.createRadialGradient(
          ss.x, ss.y, 0, ss.x, ss.y, 4
        );
        headGrad.addColorStop(0, `rgba(255, 255, 255, ${ss.alpha * 0.6})`);
        headGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.fillStyle = headGrad;
        ctx.beginPath();
        ctx.arc(ss.x, ss.y, 4, 0, Math.PI * 2);
        ctx.fill();
      }

      /* ── Subtle floating dust particles ── */
      for (let i = 0; i < 15; i++) {
        const t = time * 0.00004 + i * 137.5;
        const dx = (Math.sin(t * 2.3 + i) * 0.5 + 0.5) * w;
        const dy = (Math.cos(t * 1.7 + i * 0.7) * 0.5 + 0.5) * h * 0.6;
        const dustAlpha = Math.sin(t * 3 + i) * 0.04 + 0.05;
        const dustR = Math.random() * 1 + 0.3;
        ctx.beginPath();
        ctx.arc(dx, dy, dustR, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 180, 120, ${Math.max(0, dustAlpha)})`;
        ctx.fill();
      }

      ctx.restore();
      const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
      if (!isMobile) {
        rafRef.current = requestAnimationFrame(draw);
      }
    };

    resize();
    window.addEventListener("resize", resize);
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    if (isMobile) {
      draw(0);
    } else {
      rafRef.current = requestAnimationFrame(draw);
    }

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
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
      {/* ── Animated Sky Canvas ── */}
      <canvas ref={canvasRef} className="hero-sky-canvas" />

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

        /* ── Animated Sky Canvas ── */
        .hero-sky-canvas {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
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
