"use client";

import { useEffect, useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

import cloudImg from "@/assets/shapes/cloud.png";
import lightningImg from "@/assets/shapes/lightnig.png";
import mountainImg from "@/assets/shapes/mountain service.png";
import sphereImg from "@/assets/shapes/sphere.png";

/* ── Interfaces ── */
interface Star {
  x: number;
  y: number;
  r: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinkleOffset: number;
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

/* ── Service Data ── */
const services = [
  {
    title: "Software\nDevelopment",
    description:
      "Custom software solutions engineered for performance, scalability, and reliability.",
    iconPath: "M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5",
    shapeImg: lightningImg,
    containerStyle: {
      width: "80%",
      height: "105%",
      right: "-10%",
      bottom: "-5%",
    },
  },
  {
    title: "Mobile App\nDevelopment",
    description:
      "User-centric mobile apps that deliver seamless experiences across devices.",
    iconPath: "M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3",
    shapeImg: sphereImg,
    containerStyle: {
      width: "85%",
      height: "85%",
      right: "-20%",
      bottom: "-10%",
    },
  },
  {
    title: "Cloud\nSolutions",
    description:
      "Scalable cloud architecture and migration to optimize cost, security, and speed.",
    iconPath: "M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z",
    shapeImg: cloudImg,
    containerStyle: {
      width: "80%",
      height: "80%",
      right: "-10%",
      bottom: "0%",
    },
  },
  {
    title: "UI/UX\nDesign",
    description:
      "Crafting intuitive interfaces and engaging experiences that users love.",
    iconPath: "M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941",
    shapeImg: mountainImg,
    containerStyle: {
      width: "75%",
      height: "75%",
      right: "-5%",
      bottom: "-10%",
    },
  },
];

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  /* ── Animated Stars Canvas ── */
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let stars: Star[] = [];
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
      }

      ctx.restore();
      const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
      if (!isMobile) {
        rafRef.current = requestAnimationFrame(draw);
      }
    };

    window.addEventListener("resize", resize);
    resize();
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
    return () => {
      if (cleanup) cleanup();
    };
  }, [initCanvas]);

  return (
    <section id="services" className="svc-section">
      {/* ── Animated Stars Canvas ── */}
      <canvas ref={canvasRef} className="svc-stars-canvas" />

      {/* ── Top Shadow Transition ── */}
      <div className="svc-top-shadow" />

      {/* ── Background Grid & Glow Animations ── */}
      <div className="svc-grid-bg" />
      <div className="svc-glow-orb-1" />
      <div className="svc-glow-orb-2" />

      <div className="svc-container">
        {/* ── Header ── */}
        <div className="svc-header">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="svc-heading">
              Our Services
            </h2>
          </motion.div>
        </div>

        {/* ── Cards Grid ── */}
        <div ref={ref} className="svc-grid">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50, scale: 0.96 }}
              animate={
                isInView
                  ? { opacity: 1, y: 0, scale: 1 }
                  : { opacity: 0, y: 50, scale: 0.96 }
              }
              transition={{
                delay: i * 0.1,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{
                y: -6,
                transition: { duration: 0.35, ease: [0.33, 1, 0.68, 1] },
              }}
              className="svc-card-outer"
            >
              <div className="svc-card">
                {/* Abstract glowing shape */}
                <div
                  className="svc-card-shape"
                  style={{
                    position: "absolute",
                    ...service.containerStyle,
                    zIndex: 0,
                  }}
                >
                  <Image
                    src={service.shapeImg}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{
                      objectFit: "contain",
                      objectPosition: "bottom right",
                      mixBlendMode: "screen",
                      filter: "url(#remove-black)",
                    }}
                    priority={i < 3}
                  />
                </div>

                {/* Ambient glow behind shape */}
                <div className="svc-card-glow" />

                {/* Title */}
                <h3 className="svc-card-title">
                  {service.title.split("\n").map((line, j) => (
                    <span key={j}>
                      {line}
                      {j < service.title.split("\n").length - 1 && <br />}
                    </span>
                  ))}
                </h3>

                {/* Description */}
                <p className="svc-card-desc">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* SVG filter to key out solid black backgrounds from shape images */}
      <svg width="0" height="0" style={{ position: "absolute", pointerEvents: "none" }}>
        <defs>
          <filter id="remove-black" colorInterpolationFilters="sRGB">
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      1.5 1.5 1.5 0 -0.05"
            />
          </filter>
        </defs>
      </svg>

      {/* ── Bottom shadow: Services → About ── */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "220px",
          pointerEvents: "none",
          zIndex: 20,
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(6,6,6,0.7) 50%, #060606 100%)",
        }}
      />

      <style jsx>{`
         /* ── Section ── */
        .svc-section {
          position: relative;
          background: #060606;
          padding: 100px 0 120px;
          overflow: hidden;
        }

        /* ── Background Grid & Glow ── */
        .svc-grid-bg {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
          background-size: 60px 60px;
          z-index: 1;
          pointer-events: none;
          animation: grid-shift 35s linear infinite;
          
          /* Mask to fade out grid at the edges */
          mask-image: radial-gradient(circle at 50% 50%, black 30%, transparent 85%);
          -webkit-mask-image: radial-gradient(circle at 50% 50%, black 30%, transparent 85%);
        }

        /* Laser Sweep Line */
        .svc-grid-bg::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            transparent,
            rgba(239, 68, 68, 0.01) 45%,
            rgba(239, 68, 68, 0.05) 50%,
            rgba(239, 68, 68, 0.01) 55%,
            transparent
          );
          height: 100%;
          width: 100%;
          animation: grid-scan 15s infinite linear;
        }

        .svc-glow-orb-1 {
          position: absolute;
          top: 20%;
          left: 15%;
          width: 450px;
          height: 450px;
          background: radial-gradient(circle, rgba(239, 68, 68, 0.02) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
          z-index: 0;
          filter: blur(40px);
          animation: float-glow-1 20s infinite ease-in-out;
        }

        .svc-glow-orb-2 {
          position: absolute;
          bottom: 10%;
          right: 15%;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(239, 68, 68, 0.01) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
          z-index: 0;
          filter: blur(40px);
          animation: float-glow-2 18s infinite ease-in-out;
        }

        @keyframes grid-shift {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 60px 60px;
          }
        }

        @keyframes grid-scan {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }

        @keyframes float-glow-1 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(40px, 20px) scale(1.05);
          }
        }

        @keyframes float-glow-2 {
          0%, 100% {
            transform: translate(0, 0) scale(1.05);
          }
          50% {
            transform: translate(-30px, -15px) scale(0.98);
          }
        }

        /* ── Animated Stars Canvas ── */
        .svc-stars-canvas {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
        }

        /* ── Top Shadow Transition ── */
        .svc-top-shadow {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 140px;
          z-index: 2;
          pointer-events: none;
          background: linear-gradient(
            to bottom,
            #0a0a0a 0%,
            rgba(10, 10, 10, 0.8) 25%,
            rgba(6, 6, 6, 0.4) 65%,
            transparent 100%
          );
        }

        .svc-container {
          position: relative;
          z-index: 2;
          max-width: 1120px;
          margin: 0 auto;
          padding: 0 32px;
        }

        /* ── Header ── */
        .svc-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          margin-bottom: 56px;
        }

        .svc-heading {
          font-family: 'Orbitron', sans-serif;
          font-size: clamp(18px, 2.2vw, 26px);
          font-weight: 700;
          color: #e5e5e5; /* Off-white color */
          margin: 0;
          line-height: 1.1;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        /* ── Grid ── */
        .svc-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        /* ── Card ── */
        .svc-card-outer {
          cursor: pointer;
        }

        .svc-card {
          position: relative;
          background: linear-gradient(145deg, #121212 0%, #0c0c0c 100%);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 32px; /* Increased card corner curve to 32px */
          padding: 28px 28px 32px;
          min-height: 350px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: border-color 0.4s ease, box-shadow 0.4s ease;
        }

        .svc-card-outer:hover .svc-card {
          border-color: rgba(255, 255, 255, 0.12);
          box-shadow:
            0 10px 40px rgba(0, 0, 0, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }

        /* Abstract shape */
        .svc-card-shape {
          z-index: 0;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          pointer-events: none;
          mix-blend-mode: screen;
        }

        .svc-card-outer:hover .svc-card-shape {
          transform: scale(1.06) translateY(-2px);
        }

        /* Ambient glow */
        .svc-card-glow {
          position: absolute;
          bottom: 10%;
          right: 10%;
          width: 50%;
          height: 50%;
          border-radius: 50%;
          background: radial-gradient(
            ellipse at center,
            rgba(255, 80, 20, 0.08) 0%,
            transparent 70%
          );
          z-index: 0;
          pointer-events: none;
        }

        /* Icon */
        .svc-card-icon {
          position: relative;
          z-index: 3;
          width: 42px;
          height: 42px;
          border-radius: 11px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(255, 255, 255, 0.04);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255, 255, 255, 0.65);
          margin-bottom: auto;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          transition: border-color 0.3s ease;
        }

        .svc-card-outer:hover .svc-card-icon {
          border-color: rgba(255, 255, 255, 0.2);
        }

        /* Title */
        .svc-card-title {
          position: relative;
          z-index: 3;
          font-family: 'Inter', sans-serif;
          font-size: 22px;
          font-weight: 700;
          color: #ffffff;
          line-height: 1.3;
          margin: auto 0 10px; /* Centered auto margin at top to push content down */
          letter-spacing: -0.01em;
        }

        /* Description */
        .svc-card-desc {
          position: relative;
          z-index: 3;
          font-family: 'Inter', sans-serif;
          font-size: 13.5px;
          color: rgba(255, 255, 255, 0.38);
          line-height: 1.65;
          margin: 0;
          max-width: 220px;
        }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .svc-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }
          .svc-card {
            min-height: 310px;
          }
        }

        @media (max-width: 640px) {
          .svc-section {
            padding: 64px 0 80px;
          }
          .svc-grid {
            grid-template-columns: 1fr;
            gap: 14px;
          }
          .svc-header {
            margin-bottom: 40px;
          }
          .svc-heading {
            font-size: 22px;
          }
          .svc-card {
            min-height: 280px;
            padding: 24px;
          }
          .svc-card-title {
            font-size: 20px;
          }
        }
      `}</style>
    </section>
  );
}
