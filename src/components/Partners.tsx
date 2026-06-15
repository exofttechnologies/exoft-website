"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import elegentLogo from "@/assets/company logos/elegenthospitality.png";
import henzaLogo from "@/assets/company logos/henzaevents.png";
import plankraftLogo from "@/assets/company logos/plankraft.png";
import tummyLogo from "@/assets/company logos/tummy_and_me_logo.png";

const partners = [
  { name: "Elegent Hospitality", logo: elegentLogo, whiteFilter: false, cssWidth: 200, cssHeight: 90 },
  { name: "Henza Events", logo: henzaLogo, whiteFilter: true, cssWidth: 180, cssHeight: 75 },
  { name: "Plankraft", logo: plankraftLogo, whiteFilter: false, cssWidth: 120, cssHeight: 50 },
  { name: "Tummy and Me", logo: tummyLogo, whiteFilter: false, cssWidth: 100, cssHeight: 100 },
];

export default function Partners() {
  return (
    <section id="partners" className="partners-section">
      {/* ── Background Grid & Glow Animations ── */}
      <div className="partners-grid-bg" />
      <div className="partners-glow-orb-1" />
      <div className="partners-glow-orb-2" />

      <div className="partners-container">
        {/* ── Header ── */}
        <div className="partners-header">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="partners-subtitle">Trusted By</p>
          </motion.div>
        </div>

        {/* ── Logos Row (Logos Only, Horizontal) ── */}
        <div className="partners-logos-row">
          {partners.map((partner, i) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.1,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="partners-logo-item"
            >
              <div
                className="logo-wrapper"
                style={{ width: partner.cssWidth, height: partner.cssHeight }}
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  sizes="(max-width: 768px) 120px, 220px"
                  style={{
                    objectFit: "contain",
                    filter: partner.whiteFilter
                      ? "brightness(0) invert(1) opacity(0.4)"
                      : "grayscale(1) opacity(0.4)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    const img = e.currentTarget as HTMLImageElement;
                    img.style.filter = partner.whiteFilter
                      ? "brightness(0) invert(1) opacity(1)"
                      : "grayscale(0) opacity(1)";
                  }}
                  onMouseLeave={(e) => {
                    const img = e.currentTarget as HTMLImageElement;
                    img.style.filter = partner.whiteFilter
                      ? "brightness(0) invert(1) opacity(0.4)"
                      : "grayscale(1) opacity(0.4)";
                  }}
                  className="partner-logo-image"
                  priority={i < 2}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .partners-section {
          position: relative;
          background: #060606;
          padding: 80px 0;
          overflow: hidden;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        /* ── Background Grid & Glow ── */
        .partners-grid-bg {
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

        .partners-glow-orb-1 {
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
        }

        .partners-glow-orb-2 {
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
        }

        .partners-container {
          position: relative;
          z-index: 2;
          max-width: 1120px;
          margin: 0 auto;
          padding: 0 32px;
        }

        /* ── Header ── */
        .partners-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .partners-subtitle {
          font-family: 'Orbitron', sans-serif;
          font-size: 11px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.35);
          letter-spacing: 0.25em;
          text-transform: uppercase;
          margin: 0;
        }

        /* ── Logos Grid ── */
        .partners-logos-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 64px;
          flex-wrap: wrap;
        }

        .partners-logo-item {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .logo-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s ease;
        }

        .logo-wrapper:hover {
          transform: scale(1.06);
        }

        /* ── Keyframes ── */
        @keyframes grid-shift {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 60px 60px;
          }
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .partners-section {
            padding: 60px 0;
          }
          .partners-logos-row {
            gap: 32px 24px;
          }
          .logo-wrapper {
            transform-origin: center;
            scale: 0.75;
          }
        }
      `}</style>
    </section>
  );
}
