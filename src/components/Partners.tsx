"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import elegentLogo from "@/assets/company logos/elegenthospitality.png";
import henzaLogo from "@/assets/company logos/henzaevents.png";
import plankraftLogo from "@/assets/company logos/plankraft.png";
import tummyLogo from "@/assets/company logos/tummy_and_me_logo.png";

const partners = [
  { name: "Elegent Hospitality", logo: elegentLogo },
  { name: "Henza Events", logo: henzaLogo },
  { name: "Plankraft", logo: plankraftLogo },
  { name: "Tummy and Me", logo: tummyLogo },
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="partners-heading">Trusted By</h2>
          </motion.div>
        </div>

        {/* ── Partners Cards Grid (Static Version) ── */}
        <div className="partners-grid">
          {partners.map((partner, i) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.15,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{
                y: -8,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
              className="partners-card-wrapper"
            >
              <div className="partners-card">
                {/* Logo wrapper */}
                <div className="partners-logo-container">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    style={{
                      objectFit: "contain",
                    }}
                    className="partners-logo-img"
                    priority={i < 2}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .partners-section {
          position: relative;
          background: #060606;
          padding: 100px 0 100px;
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

        /* Laser Sweep Line */
        .partners-grid-bg::before {
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
          animation: float-glow-1 20s infinite ease-in-out;
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
          animation: float-glow-2 18s infinite ease-in-out;
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
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          margin-bottom: 48px;
        }

        .partners-heading {
          font-family: 'Orbitron', sans-serif;
          font-size: clamp(18px, 2.2vw, 26px);
          font-weight: 700;
          color: #e5e5e5; /* Off-white color, matching Our Services */
          margin: 0;
          line-height: 1.1;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        /* ── Grid ── */
        .partners-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        .partners-card-wrapper {
          cursor: pointer;
        }

        /* ── Card ── */
        .partners-card {
          position: relative;
          background: #000000;
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 8px;
          height: 440px; /* Tall vertical cards like the reference image */
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 32px;
          transition: border-color 0.4s ease, box-shadow 0.4s ease;
        }

        .partners-card-wrapper:hover .partners-card {
          border-color: rgba(255, 255, 255, 0.12);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.6),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }

        /* ── Logo Container ── */
        .partners-logo-container {
          position: relative;
          width: 55%;
          height: 55%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.4s ease;
        }

        .partners-card-wrapper:hover .partners-logo-container {
          transform: scale(1.05);
        }

        :global(.partners-logo-img) {
          opacity: 0.8;
          transition: opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .partners-card-wrapper:hover :global(.partners-logo-img) {
          opacity: 1;
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

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .partners-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }
          .partners-card {
            height: 380px;
            padding: 24px;
          }
        }

        @media (max-width: 640px) {
          .partners-section {
            padding: 60px 0 60px;
          }
          .partners-grid {
            grid-template-columns: 1fr;
            gap: 14px;
          }
          .partners-header {
            margin-bottom: 32px;
          }
          .partners-card {
            height: 320px;
            padding: 20px;
          }
        }
      `}</style>
    </section>
  );
}
