"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import arrowImg from "@/assets/shapes/arrow.png";

const projectCategories = [
  { name: "Websites", href: "/projects/websites" },
  { name: "Apps", href: "/projects/apps" },
  { name: "SaaS", subtitle: "Under Development" },
];

export default function Projects() {
  return (
    <section id="projects" className="projects-section">
      <div className="projects-grid-bg" />
      <div className="projects-glow-orb-1" />
      <div className="projects-glow-orb-2" />

      <div className="projects-container">
        <div className="projects-header">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="projects-heading">
              <span className="projects-heading-solid">Our</span>{" "}
              <span className="projects-heading-outline">Project</span>
            </h2>
          </motion.div>
        </div>

        <div className="projects-list">
          {projectCategories.map((category, index) => {
            const itemContent = (
              <div className="projects-item">
                <div className="projects-item-content">
                  <span className="projects-number">0{index + 1}</span>
                  <span className="projects-name" style={{ display: "inline-flex", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>
                    <span>{category.name}</span>
                    {category.subtitle && (
                      <span
                        style={{
                          fontSize: "10px",
                          fontWeight: 600,
                          color: "#ef4444",
                          textTransform: "uppercase",
                          letterSpacing: "0.15em",
                          fontFamily: "'Orbitron', sans-serif",
                          border: "1px solid rgba(239, 68, 68, 0.35)",
                          padding: "2px 8px",
                          borderRadius: "4px",
                          background: "rgba(239, 68, 68, 0.05)",
                          display: "inline-block",
                          lineHeight: "1.4",
                        }}
                      >
                        {category.subtitle}
                      </span>
                    )}
                  </span>
                </div>
                <div className="projects-item-line" />
                <div className="projects-arrow-wrapper">
                  <Image
                    src={arrowImg}
                    alt="Arrow"
                    width={36}
                    height={36}
                    style={{
                      objectFit: "contain",
                      mixBlendMode: "screen",
                      filter: "url(#remove-black)",
                    }}
                    className="projects-arrow-img"
                  />
                </div>
              </div>
            );

            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.15,
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {category.href ? (
                  <Link href={category.href} style={{ textDecoration: "none", display: "block" }}>
                    {itemContent}
                  </Link>
                ) : (
                  itemContent
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

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

      <style jsx>{`
        .projects-section {
          position: relative;
          background: #060606;
          padding: 100px 0 120px;
          overflow: hidden;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }
        .projects-grid-bg {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
          background-size: 60px 60px;
          z-index: 1;
          pointer-events: none;
          animation: grid-shift 35s linear infinite;
          mask-image: radial-gradient(circle at 50% 50%, black 30%, transparent 85%);
          -webkit-mask-image: radial-gradient(circle at 50% 50%, black 30%, transparent 85%);
        }
        .projects-grid-bg::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent, rgba(239, 68, 68, 0.01) 45%, rgba(239, 68, 68, 0.05) 50%, rgba(239, 68, 68, 0.01) 55%, transparent);
          height: 100%;
          width: 100%;
          animation: grid-scan 15s infinite linear;
        }
        .projects-glow-orb-1 {
          position: absolute;
          top: 30%;
          left: 10%;
          width: 450px;
          height: 450px;
          background: radial-gradient(circle, rgba(239, 68, 68, 0.02) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
          z-index: 0;
          filter: blur(45px);
          animation: float-glow-1 20s infinite ease-in-out;
        }
        .projects-glow-orb-2 {
          position: absolute;
          bottom: 20%;
          right: 10%;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(239, 68, 68, 0.01) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
          z-index: 0;
          filter: blur(45px);
          animation: float-glow-2 18s infinite ease-in-out;
        }
        .projects-container {
          position: relative;
          z-index: 2;
          max-width: 1120px;
          margin: 0 auto;
          padding: 0 32px;
        }
        .projects-header {
          display: flex;
          align-items: flex-start;
          text-align: left;
        }
        .projects-heading {
          margin: 0;
          line-height: 1.1;
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
        }
        .projects-heading-solid {
          font-family: 'Orbitron', sans-serif;
          font-size: clamp(26px, 4.2vw, 50px);
          font-weight: 900;
          color: #ffffff;
          text-transform: uppercase;
          letter-spacing: -0.01em;
        }
        .projects-heading-outline {
          font-family: 'Orbitron', sans-serif;
          font-size: clamp(26px, 4.2vw, 50px);
          font-weight: 900;
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.95);
          text-transform: uppercase;
          letter-spacing: -0.01em;
        }
        .projects-list {
          margin-top: 56px;
          display: flex;
          flex-direction: column;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          z-index: 2;
          position: relative;
        }
        .projects-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 36px 12px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          cursor: pointer;
          position: relative;
          transition: background 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .projects-item:hover { background: rgba(255, 255, 255, 0.015); }
        .projects-item-content {
          display: flex;
          align-items: baseline;
          gap: 28px;
        }
        .projects-item-line {
          flex-grow: 1;
          height: 1px;
          background: #ef4444;
          margin: 0 32px;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .projects-item:hover .projects-item-line { transform: scaleX(1); }
        .projects-number {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(14px, 1.5vw, 18px);
          font-weight: 500;
          color: rgba(255, 255, 255, 0.25);
          transition: color 0.4s ease;
        }
        .projects-item:hover .projects-number { color: rgba(255, 255, 255, 0.6); }
        .projects-name {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(20px, 2.5vw, 32px);
          font-weight: 300;
          color: rgba(255, 255, 255, 0.65);
          text-transform: uppercase;
          transition: color 0.4s ease, letter-spacing 0.4s ease;
          letter-spacing: 0.04em;
        }
        .projects-item:hover .projects-name { color: #ffffff; letter-spacing: 0.08em; }
        .projects-arrow-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease;
          opacity: 0.5;
        }
        .projects-item:hover .projects-arrow-wrapper {
          transform: translateX(6px) rotate(-45deg);
          opacity: 1;
        }
        :global(.projects-arrow-img) { transition: filter 0.4s ease; }
        @keyframes grid-shift {
          0% { background-position: 0 0; }
          100% { background-position: 60px 60px; }
        }
        @keyframes grid-scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes float-glow-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, 15px) scale(1.05); }
        }
        @keyframes float-glow-2 {
          0%, 100% { transform: translate(0, 0) scale(1.05); }
          50% { transform: translate(-20px, -10px) scale(0.98); }
        }
        @media (max-width: 768px) {
          .projects-section { padding: 80px 0 80px; }
          .projects-list { margin-top: 40px; }
          .projects-item { padding: 28px 8px; }
          .projects-item-content { gap: 20px; }
          .projects-item-line { margin: 0 16px; }
        }
      `}</style>
    </section>
  );
}
