"use client";

import { useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";

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

export default function About() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

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

      /* Deep space bg */
      ctx.fillStyle = "#060606";
      ctx.fillRect(0, 0, w, h);

      /* Stars */
      for (const star of stars) {
        const twinkle =
          Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.4 + 0.6;
        const alpha = star.baseAlpha * twinkle;

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

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 245, 235, ${alpha})`;
        ctx.fill();
      }

      /* Shooting stars */
      if (Math.random() < 0.003) spawnShootingStar();

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        ss.life++;
        ss.x += Math.cos(ss.angle) * ss.speed;
        ss.y += Math.sin(ss.angle) * ss.speed;

        const lifeRatio = ss.life / ss.maxLife;
        if (lifeRatio < 0.2) ss.alpha = lifeRatio / 0.2;
        else if (lifeRatio > 0.7) ss.alpha = (1 - lifeRatio) / 0.3;
        else ss.alpha = 1;

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
      rafRef.current = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    resize();
    rafRef.current = requestAnimationFrame(draw);

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
    <section id="about" className="about-section">
      {/* ── Animated Stars Canvas ── */}
      <canvas ref={canvasRef} className="about-stars-canvas" />

      {/* ── Top Shadow (Services → About transition) ── */}
      <div className="about-top-shadow" />

      {/* ── Bottom Shadow (About → Process transition) ── */}
      <div className="about-bottom-shadow" />

      <div className="about-container">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="about-header"
        >
          <span className="about-label">ABOUT EXOFT</span>
          <div className="about-line-divider" />
          <h2 className="about-heading">
            Built for <br className="about-mobile-br" />{" "}
            <span className="highlight-text">what's next.</span>
          </h2>
        </motion.div>

        {/* ── Intro Paragraphs ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="about-intro"
        >
          <p>
            We create websites, mobile apps, and custom software that help
            businesses move faster, work smarter, and stay ready for what's
            coming.
          </p>
          <p>
            From early concepts to production-ready products, we focus on
            building solutions that are reliable, scalable, and easy to use.
          </p>
        </motion.div>

        <div className="about-line-divider my-16" />

        {/* ── Sections List ── */}
        <div className="about-sections-list">
          {/* WHAT WE DO */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="about-section-item"
          >
            <h3 className="section-title">WHAT WE DO</h3>
            <p className="section-desc">
              We design and develop digital products that solve real problems.
              Whether you need a website, a mobile app, or a custom system, we
              build solutions that fit your goals and your users.
            </p>
          </motion.div>

          {/* HOW WE WORK */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="about-section-item"
          >
            <h3 className="section-title">HOW WE WORK</h3>
            <p className="section-desc">
              We keep things simple and transparent. We listen, plan, build, and
              deliver—working closely with you at every step. No confusion, no
              delays—just a smooth process from start to finish.
            </p>
          </motion.div>

          {/* WHO WE WORK WITH */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="about-section-item"
          >
            <h3 className="section-title">WHO WE WORK WITH</h3>
            <p className="section-desc">
              Startups, growing businesses, and established brands across
              different industries. If you're building something important,
              we're here to help you build it right.
            </p>
          </motion.div>
        </div>

        <div className="about-line-divider my-16" />

        {/* ── Footer Quote ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="about-footer-quote"
        >
          <p className="quote-text-white">
            We believe good software should be useful, reliable, and easy to use.
          </p>
          <p className="quote-text-highlight">
            That's what we focus on, every single time.
          </p>
        </motion.div>
      </div>

      <style jsx>{`
        .about-section {
          position: relative;
          background: #060606;
          padding: 180px 0 180px;
          overflow: hidden;
          color: #ffffff;
        }

        /* ── Stars Canvas ── */
        .about-stars-canvas {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
        }

        /* ── Top Shadow: Services → About ── */
        .about-top-shadow {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 200px;
          z-index: 2;
          pointer-events: none;
          background: linear-gradient(
            to bottom,
            #060606 0%,
            rgba(6, 6, 6, 0.85) 40%,
            transparent 100%
          );
        }

        /* ── Bottom Shadow: About → Process ── */
        .about-bottom-shadow {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 200px;
          z-index: 2;
          pointer-events: none;
          background: linear-gradient(
            to top,
            #060606 0%,
            rgba(6, 6, 6, 0.85) 40%,
            transparent 100%
          );
        }

        .about-container {
          position: relative;
          z-index: 3;
          max-width: 820px;
          margin: 0 auto;
          padding: 0 24px;
          text-align: center;
        }

        .about-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 56px;
        }

        .about-label {
          font-family: 'Inter', sans-serif;
          font-size: 13.5px;
          font-weight: 500;
          color: #fa5a38;
          letter-spacing: 0.25em;
          text-transform: uppercase;
        }

        .about-line-divider {
          width: 42px;
          height: 1px;
          background-color: #fa5a38;
          margin: 24px auto;
          opacity: 0.8;
        }

        .about-heading {
          font-family: 'Inter', sans-serif;
          font-size: clamp(44px, 7.5vw, 68px);
          font-weight: 700;
          color: #ffffff;
          line-height: 1.15;
          letter-spacing: -0.025em;
          margin-top: 10px;
        }

        .about-mobile-br {
          display: none;
        }

        .highlight-text {
          color: #fa5a38;
          background: linear-gradient(135deg, #fa7e54 0%, #e04526 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .about-intro {
          display: flex;
          flex-direction: column;
          gap: 28px;
          max-width: 680px;
          margin: 0 auto;
        }

        .about-intro p {
          font-family: 'Inter', sans-serif;
          font-size: clamp(16px, 1.8vw, 19px);
          color: rgba(255, 255, 255, 0.65);
          line-height: 1.75;
          margin: 0;
          font-weight: 400;
        }

        .about-sections-list {
          display: flex;
          flex-direction: column;
          gap: 68px;
          margin: 64px 0;
        }

        .about-section-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
          max-width: 680px;
          margin: 0 auto;
        }

        .section-title {
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: #fa5a38;
          letter-spacing: 0.25em;
          text-transform: uppercase;
        }

        .section-desc {
          font-family: 'Inter', sans-serif;
          font-size: clamp(15px, 1.6vw, 16.5px);
          color: rgba(255, 255, 255, 0.65);
          line-height: 1.7;
          margin: 0;
          font-weight: 400;
        }

        .about-footer-quote {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 56px;
        }

        .quote-text-white {
          font-family: 'Inter', sans-serif;
          font-size: clamp(16px, 1.8vw, 18px);
          color: rgba(255, 255, 255, 0.85);
          line-height: 1.6;
          margin: 0;
          font-weight: 400;
        }

        .quote-text-highlight {
          font-family: 'Inter', sans-serif;
          font-size: clamp(16px, 1.8vw, 18px);
          color: #fa5a38;
          font-weight: 500;
          line-height: 1.6;
          margin: 0;
        }

        .my-16 {
          margin-top: 64px;
          margin-bottom: 64px;
        }

        @media (max-width: 768px) {
          .about-section {
            padding: 100px 0 100px;
          }
          .about-sections-list {
            gap: 48px;
            margin: 48px 0;
          }
          .about-mobile-br {
            display: block;
          }
        }
      `}</style>
    </section>
  );
}
