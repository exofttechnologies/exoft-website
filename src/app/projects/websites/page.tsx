"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import tummyProjectImg from "@/assets/project/tummy_and_me_project.png";
import tummyLogo from "@/assets/company logos/tummy_and_me_logo.png";

export default function WebsitesProjectPage() {
  return (
    <main className="tummy-page-root">
      <Navbar />

      {/* ── Background Grid & Glow Animations ── */}
      <div className="tummy-grid-bg" />
      <div className="tummy-glow-orb-1" />
      <div className="tummy-glow-orb-2" />

      <div className="tummy-container">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="tummy-back-link"
        >
          <Link href="/">
            <span className="back-arrow">←</span> BACK TO HOME
          </Link>
        </motion.div>

        {/* ── Content Grid ── */}
        <div className="tummy-grid">
          {/* Left Column: Details */}
          <div className="tummy-details-col">
            {/* Logo and Name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="tummy-brand-header"
            >
              <div className="tummy-brand-logo">
                <Image
                  src={tummyLogo}
                  alt="Tummy & Me Logo"
                  fill
                  style={{ objectFit: "contain" }}
                  priority
                />
              </div>
              <h1 className="tummy-brand-title">
                <span className="brand-title-solid">Tummy</span>{" "}
                <span className="brand-title-outline">&amp; Me</span>
              </h1>
            </motion.div>

            {/* Description Paragraph (Style same as AboutUs details) */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="tummy-description"
            >
              Tummy &amp; Me is a Kerala-based fast-food brand known for its signature crispy fried chicken wraps, shawarmas, and loaded snack boxes. Built around the tagline &quot;Eat. Sleep. Repeat.&quot;, the brand focuses on delivering a fun, family-friendly food experience with bold flavors, premium ingredients, fresh bread, and house-made sauces.
            </motion.p>
          </div>

          {/* Right Column: Project Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="tummy-image-col"
          >
            <div className="tummy-project-img-wrapper">
              <Image
                src={tummyProjectImg}
                alt="Tummy & Me Project Screen"
                fill
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />

      <style jsx>{`
        .tummy-page-root {
          position: relative;
          background: #060606;
          min-height: 100vh;
          overflow: hidden;
          padding-top: 130px; /* offset navbar height */
        }

        /* ── Background Grid & Glow ── */
        .tummy-grid-bg {
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
          mask-image: radial-gradient(circle at 50% 50%, black 40%, transparent 90%);
          -webkit-mask-image: radial-gradient(circle at 50% 50%, black 40%, transparent 90%);
        }

        .tummy-glow-orb-1 {
          position: absolute;
          top: 25%;
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

        .tummy-glow-orb-2 {
          position: absolute;
          bottom: 25%;
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

        .tummy-container {
          position: relative;
          z-index: 2;
          max-width: 1120px;
          margin: 0 auto;
          padding: 0 32px 100px;
        }

        /* ── Back Link ── */
        .tummy-back-link {
          margin-bottom: 48px;
        }

        .tummy-back-link :global(a) {
          font-family: 'Orbitron', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.45);
          letter-spacing: 0.15em;
          text-decoration: none;
          transition: color 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .tummy-back-link :global(a:hover) {
          color: #ef4444;
        }

        .back-arrow {
          transition: transform 0.3s ease;
        }

        .tummy-back-link :global(a:hover) .back-arrow {
          transform: translateX(-4px);
        }

        /* ── Grid Layout ── */
        .tummy-grid {
          display: grid;
          grid-template-columns: 1.1fr 1.2fr;
          gap: 64px;
          align-items: center;
        }

        /* ── Brand Header ── */
        .tummy-brand-header {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 32px;
        }

        .tummy-brand-logo {
          position: relative;
          width: 70px;
          height: 70px;
          flex-shrink: 0;
        }

        .tummy-brand-title {
          margin: 0;
          line-height: 1.1;
        }

        .brand-title-solid {
          font-family: 'Orbitron', sans-serif;
          font-size: clamp(28px, 4vw, 48px);
          font-weight: 800;
          color: #ffffff;
          text-transform: uppercase;
          letter-spacing: -0.01em;
        }

        .brand-title-outline {
          font-family: 'Orbitron', sans-serif;
          font-size: clamp(28px, 4vw, 48px);
          font-weight: 800;
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.95);
          text-transform: uppercase;
          letter-spacing: -0.01em;
        }

        /* ── Description ── */
        .tummy-description {
          font-family: 'Outfit', sans-serif; /* Style same as AboutUs details */
          font-size: clamp(14px, 1.3vw, 16.5px);
          font-weight: 300; /* Thin font weight */
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.6);
          margin: 0;
          max-width: 500px;
          letter-spacing: 0.01em;
        }

        /* ── Image Wrapper ── */
        .tummy-project-img-wrapper {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 10;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          overflow: hidden;
          background: #111;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
          transition: border-color 0.4s ease, transform 0.4s ease;
        }

        .tummy-project-img-wrapper:hover {
          border-color: rgba(255, 255, 255, 0.16);
          transform: translateY(-4px);
        }

        /* ── Animations ── */
        @keyframes grid-shift {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 60px 60px;
          }
        }

        @keyframes float-glow-1 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(30px, 15px) scale(1.05);
          }
        }

        @keyframes float-glow-2 {
          0%, 100% {
            transform: translate(0, 0) scale(1.05);
          }
          50% {
            transform: translate(-20px, -10px) scale(0.98);
          }
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .tummy-page-root {
            padding-top: 110px;
          }
          .tummy-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .tummy-description {
            max-width: 100%;
          }
        }

        @media (max-width: 480px) {
          .tummy-brand-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }
          .tummy-container {
            padding: 0 20px 60px;
          }
        }
      `}</style>
    </main>
  );
}
