"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import arrowImg from "@/assets/shapes/arrow.png";

import tummyLogo from "@/assets/company logos/tummy_and_me_logo.png";
import tummyProjectImg from "@/assets/project/tummy_and_me_project.png";

import plankraftLogo from "@/assets/company logos/plankraft.png";
import plankraftProjectImg from "@/assets/project/plankraft_project.png";

import henzaLogo from "@/assets/company logos/henzaevents.png";
import henzaProjectImg from "@/assets/project/henzaevents_project.png";

const projects = [
  {
    name: "Tummy & Me",
    titleSolid: "Tummy",
    titleOutline: "& Me",
    logo: tummyLogo,
    image: tummyProjectImg,
    description: "Tummy & Me is a Kerala-based fast-food brand known for its signature crispy fried chicken wraps, shawarmas, and loaded snack boxes. Built around the tagline \"Eat. Sleep. Repeat.\", the brand focuses on delivering a fun, family-friendly food experience with bold flavors, premium ingredients, fresh bread, and house-made sauces.",
    link: "https://tummyandme.com/"
  },
  {
    name: "Plankraft",
    titleSolid: "Plan",
    titleOutline: "kraft",
    logo: plankraftLogo,
    image: plankraftProjectImg,
    description: "At Plankraft Engineers & Builders, we provide comprehensive construction and engineering services. From innovative designs to flawless execution, our team ensures the success of your residential, commercial, and infrastructure projects.",
    link: "https://plankraftarchitectures.com/"
  },
  {
    name: "Henza Events",
    titleSolid: "Henza",
    titleOutline: "Events",
    logo: henzaLogo,
    image: henzaProjectImg,
    description: "Henza Events is a professional catering and events staffing team based in Kerala. We place skilled hospitality hospitality workers at weddings, corporate events, and private functions all over Kerala.",
    link: "https://henzaevents.com/"
  }
];

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

        {/* ── Page Header ── */}
        <div className="tummy-page-header">
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="tummy-page-title"
          >
            Websites
          </motion.h1>
        </div>

        {/* ── Projects List ── */}
        <div className="tummy-projects-list">
          {projects.map((project, i) => (
            <div key={project.name} className="tummy-project-section">
              <div className="tummy-grid">
                {/* Left Column: Details */}
                <div className="tummy-details-col">
                  {/* Logo and Name */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6 }}
                    className="tummy-brand-header"
                  >
                    <div className="tummy-brand-logo">
                      <Image
                        src={project.logo}
                        alt={`${project.name} Logo`}
                        fill
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                    <h2 className="tummy-brand-title">
                      <span className="brand-title-solid">{project.titleSolid}</span>{" "}
                      <span className="brand-title-outline">{project.titleOutline}</span>
                    </h2>
                  </motion.div>

                  {/* Description Paragraph (Style same as AboutUs details but off-white) */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    className="tummy-description"
                  >
                    {project.description}
                  </motion.p>

                  {/* Visit Website Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="tummy-visit-btn-wrapper"
                  >
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="tummy-visit-btn">
                      VISIT WEBSITE
                      <div className="tummy-visit-arrow-wrapper">
                        <Image
                          src={arrowImg}
                          alt="Arrow"
                          width={24}
                          height={24}
                          style={{
                            objectFit: "contain",
                            mixBlendMode: "screen",
                            filter: "url(#remove-black)",
                          }}
                          className="tummy-visit-arrow"
                        />
                      </div>
                    </a>
                  </motion.div>
                </div>

                {/* Right Column: Project Image */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className="tummy-image-col"
                >
                  <div className="tummy-project-img-wrapper">
                    <Image
                      src={project.image}
                      alt={`${project.name} Project Screen`}
                      fill
                      sizes="(max-width: 900px) 100vw, 50vw"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </motion.div>
              </div>
            </div>
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

        /* Laser Sweep Line */
        .tummy-grid-bg::before {
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
          padding: 0 32px 60px;
        }

        /* ── Back Link ── */
        .tummy-back-link {
          margin-bottom: 40px;
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

        /* ── Page Header ── */
        .tummy-page-header {
          margin-bottom: 60px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding-bottom: 20px;
        }

        .tummy-page-title {
          font-family: 'Orbitron', sans-serif;
          font-size: clamp(24px, 3.5vw, 42px);
          font-weight: 800;
          color: #ffffff;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          margin: 0;
        }

        /* ── Project Sections ── */
        .tummy-project-section {
          padding-bottom: 100px;
          margin-bottom: 100px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .tummy-project-section:last-child {
          border-bottom: none;
          padding-bottom: 40px;
          margin-bottom: 0;
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
          margin-bottom: 24px;
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
          font-size: clamp(24px, 3.5vw, 42px);
          font-weight: 800;
          color: #ffffff;
          text-transform: uppercase;
          letter-spacing: -0.01em;
        }

        .brand-title-outline {
          font-family: 'Orbitron', sans-serif;
          font-size: clamp(24px, 3.5vw, 42px);
          font-weight: 800;
          color: #ffffff;
          -webkit-text-stroke: none;
          text-transform: uppercase;
          letter-spacing: -0.01em;
        }

        /* ── Description (Off-white) ── */
        .tummy-description {
          font-family: 'Outfit', sans-serif; /* Style same as AboutUs details */
          font-size: clamp(14px, 1.2vw, 16px);
          font-weight: 300; /* Thin font weight */
          line-height: 1.7;
          color: #ffffff; /* White font color */
          margin: 0;
          max-width: 500px;
          letter-spacing: 0.01em;
        }

        /* ── Visit Website Button ── */
        .tummy-visit-btn-wrapper {
          margin-top: 32px;
          display: inline-block;
        }

        .tummy-visit-btn {
          font-family: 'Orbitron', sans-serif;
          font-size: 13px;
          font-weight: 700;
          color: #ffffff;
          background: transparent;
          padding: 0;
          border-radius: 0;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          letter-spacing: 0.12em;
          box-shadow: none;
          transition: color 0.3s ease;
        }

        .tummy-visit-btn:hover {
          color: #ef4444;
          background: transparent;
          box-shadow: none;
        }

        .tummy-visit-arrow-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 8px;
          transition: transform 0.3s ease;
        }

        .tummy-visit-btn:hover .tummy-visit-arrow-wrapper {
          transform: translateX(6px);
        }

        /* ── Image Wrapper ── */
        .tummy-project-img-wrapper {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 10;
          border-radius: 0;
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
          .tummy-project-section {
            padding-bottom: 60px;
            margin-bottom: 60px;
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
