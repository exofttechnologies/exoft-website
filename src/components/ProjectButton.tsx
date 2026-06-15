"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import noiseImg from "@/assets/noise background (2).jpg";

export default function ProjectButton() {
  return (
    <section className="project-btn-section">
      {/* Noise background image */}
      <div className="project-btn-bg">
        <Image
          src={noiseImg}
          alt=""
          fill
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center" }}
          priority={false}
        />
      </div>

      {/* Dark overlay for blending */}
      <div className="project-btn-overlay" />

      <div className="project-btn-container">
        <motion.a
          href="#"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="project-btn"
        >
          {/* Glowing red/orange organic background inside the pill */}
          <div className="project-btn-glow-inner">
            <Image
              src={noiseImg}
              alt=""
              fill
              sizes="700px"
              style={{
                objectFit: "cover",
                objectPosition: "center left",
                opacity: 0.85,
              }}
            />
          </div>

          {/* Outer glow ring */}
          <div className="project-btn-outer-glow" />

          {/* Text */}
          <span className="project-btn-text">More about our project</span>

          {/* Arrow */}
          <span className="project-btn-arrow">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </motion.a>
      </div>

      <style jsx>{`
        .project-btn-section {
          position: relative;
          background: #060606;
          padding: 100px 0;
          overflow: hidden;
        }

        .project-btn-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          opacity: 0.06;
        }

        .project-btn-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          background: radial-gradient(
            ellipse at center,
            transparent 0%,
            rgba(6, 6, 6, 0.7) 70%,
            #060606 100%
          );
        }

        .project-btn-container {
          position: relative;
          z-index: 2;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0 24px;
        }

        .project-btn {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
          width: 100%;
          max-width: 580px;
          padding: 28px 32px 28px 48px;
          border-radius: 999px;
          border: 1px solid rgba(255, 80, 30, 0.25);
          background: rgba(20, 5, 2, 0.9);
          cursor: pointer;
          text-decoration: none;
          overflow: hidden;
          box-shadow:
            0 0 60px rgba(255, 60, 20, 0.15),
            0 0 120px rgba(255, 60, 20, 0.08),
            inset 0 0 40px rgba(255, 60, 20, 0.05);
          transition: box-shadow 0.5s ease, border-color 0.5s ease;
        }

        .project-btn:hover {
          border-color: rgba(255, 80, 30, 0.4);
          box-shadow:
            0 0 80px rgba(255, 60, 20, 0.25),
            0 0 160px rgba(255, 60, 20, 0.12),
            inset 0 0 60px rgba(255, 60, 20, 0.08);
        }

        /* Organic red/orange glow inside the button */
        .project-btn-glow-inner {
          position: absolute;
          inset: 0;
          border-radius: 999px;
          overflow: hidden;
          z-index: 0;
          opacity: 0.7;
          mix-blend-mode: screen;
        }

        /* Outer glow ring effect */
        .project-btn-outer-glow {
          position: absolute;
          inset: -3px;
          border-radius: 999px;
          z-index: -1;
          background: transparent;
          box-shadow:
            0 0 30px rgba(255, 60, 20, 0.2),
            0 0 60px rgba(255, 40, 10, 0.1);
          pointer-events: none;
        }

        .project-btn-text {
          position: relative;
          z-index: 2;
          font-family: 'Inter', sans-serif;
          font-size: clamp(18px, 2.5vw, 24px);
          font-weight: 400;
          color: #ffffff;
          letter-spacing: 0.01em;
          white-space: nowrap;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
        }

        .project-btn-arrow {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          flex-shrink: 0;
          opacity: 0.9;
          transition: transform 0.3s ease, opacity 0.3s ease;
        }

        .project-btn:hover .project-btn-arrow {
          transform: translateX(4px);
          opacity: 1;
        }

        /* ── Responsive ── */
        @media (max-width: 640px) {
          .project-btn-section {
            padding: 64px 0;
          }
          .project-btn {
            gap: 20px;
            padding: 22px 24px 22px 32px;
          }
          .project-btn-text {
            font-size: 16px;
          }
        }
      `}</style>
    </section>
  );
}
