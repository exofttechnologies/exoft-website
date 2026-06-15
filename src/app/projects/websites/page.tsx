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
    logo: tummyLogo,
    image: tummyProjectImg,
    whiteFilter: false,
    logoSize: 72,
    tag: "Food & Beverage",
    description:
      "Tummy & Me is a Kerala-based fast-food brand known for its signature crispy fried chicken wraps, shawarmas, and loaded snack boxes. Built around the tagline \"Eat. Sleep. Repeat.\", the brand focuses on delivering a fun, family-friendly food experience with bold flavors, premium ingredients, fresh bread, and house-made sauces.",
    link: "https://tummyandme.com/",
  },
  {
    name: "Plankraft",
    logo: plankraftLogo,
    image: plankraftProjectImg,
    whiteFilter: false,
    logoSize: 72,
    tag: "Architecture & Construction",
    description:
      "At Plankraft Engineers & Builders, we provide comprehensive construction and engineering services. From innovative designs to flawless execution, our team ensures the success of your residential, commercial, and infrastructure projects.",
    link: "https://plankraftarchitectures.com/",
  },
  {
    name: "Henza Events",
    logo: henzaLogo,
    image: henzaProjectImg,
    whiteFilter: true,
    logoSize: 100,
    tag: "Events & Hospitality",
    description:
      "Henza Events is a professional catering and events staffing team based in Kerala. We place skilled hospitality workers at weddings, corporate events, and private functions all over Kerala.",
    link: "https://henzaevents.com/",
  },
];

export default function WebsitesProjectPage() {
  return (
    <main style={{ position: "relative", background: "#060606", minHeight: "100vh", overflowX: "hidden" }}>
      <Navbar />

      {/* Ambient glow orbs */}
      <div style={{ position: "fixed", top: "10%", left: "-10%", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(239,68,68,0.04) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none", filter: "blur(60px)", zIndex: 0 }} />
      <div style={{ position: "fixed", bottom: "10%", right: "-10%", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(239,68,68,0.03) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none", filter: "blur(60px)", zIndex: 0 }} />

      <div className="page-container">

        {/* ── Back Button ── */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: "64px" }}
        >
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 22px",
              border: "1px solid rgba(239,68,68,0.35)",
              borderRadius: "999px",
              background: "rgba(239,68,68,0.05)",
              fontFamily: "'Orbitron', sans-serif",
              fontSize: "10px",
              fontWeight: 600,
              color: "#ef4444",
              letterSpacing: "0.2em",
              textDecoration: "none",
              textTransform: "uppercase",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = "rgba(239,68,68,0.12)";
              el.style.borderColor = "rgba(239,68,68,0.6)";
              el.style.boxShadow = "0 0 20px rgba(239,68,68,0.15)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = "rgba(239,68,68,0.05)";
              el.style.borderColor = "rgba(239,68,68,0.35)";
              el.style.boxShadow = "none";
            }}
          >
            <span>←</span> Back to Home
          </Link>
        </motion.div>

        {/* ── Page Hero ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: "100px", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "40px" }}
        >
          <p style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "11px", fontWeight: 600, color: "#ef4444", letterSpacing: "0.25em", textTransform: "uppercase", margin: "0 0 16px" }}>
            Our Work
          </p>
          <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(52px, 9vw, 110px)", fontWeight: 900, color: "rgba(255,255,255,0.08)", margin: 0, lineHeight: 0.9, letterSpacing: "-0.02em", textTransform: "uppercase", WebkitTextStroke: "1px rgba(255,255,255,0.15)" }}>
            Websites
          </h1>
        </motion.div>

        {/* ── Projects ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "120px" }}>
          {projects.map((project, i) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Project number + divider */}
              <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "40px" }}>
                <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "11px", fontWeight: 700, color: "#ef4444", letterSpacing: "0.2em" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.06)" }} />
                <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "11px", fontWeight: 400, color: "rgba(255,255,255,0.3)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                  {project.tag}
                </span>
              </div>

              {/* Two-column layout */}
              <div className="proj-grid" style={{ alignItems: "center" }}>

                {/* Left: Info */}
                <div>
                  {/* Logo */}
                  <div style={{ position: "relative", width: project.logoSize, height: project.logoSize, marginBottom: "28px" }}>
                    <Image
                      src={project.logo}
                      alt={`${project.name} logo`}
                      fill
                      style={{
                        objectFit: "contain",
                        filter: project.whiteFilter ? "brightness(0) invert(1)" : "none",
                      }}
                    />
                  </div>

                  {/* Name */}
                  <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(22px, 3vw, 36px)", fontWeight: 800, color: "#ffffff", textTransform: "uppercase", letterSpacing: "-0.01em", margin: "0 0 20px", lineHeight: 1.1 }}>
                    {project.name}
                  </h2>

                  {/* Description */}
                  <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(14px, 1.2vw, 16px)", fontWeight: 300, lineHeight: 1.8, color: "rgba(255,255,255,0.6)", margin: "0 0 36px", maxWidth: "420px" }}>
                    {project.description}
                  </p>

                  {/* Visit button */}
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "14px 28px",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: "999px",
                      background: "rgba(255,255,255,0.04)",
                      fontFamily: "'Orbitron', sans-serif",
                      fontSize: "10px",
                      fontWeight: 700,
                      color: "#ffffff",
                      letterSpacing: "0.2em",
                      textDecoration: "none",
                      textTransform: "uppercase",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLAnchorElement;
                      el.style.background = "rgba(239,68,68,0.1)";
                      el.style.borderColor = "rgba(239,68,68,0.5)";
                      el.style.color = "#ef4444";
                      el.style.boxShadow = "0 0 24px rgba(239,68,68,0.15)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLAnchorElement;
                      el.style.background = "rgba(255,255,255,0.04)";
                      el.style.borderColor = "rgba(255,255,255,0.12)";
                      el.style.color = "#ffffff";
                      el.style.boxShadow = "none";
                    }}
                  >
                    Visit Website
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "20px", height: "20px" }}>
                      <Image
                        src={arrowImg}
                        alt="arrow"
                        width={20}
                        height={20}
                        style={{ objectFit: "contain", mixBlendMode: "screen", filter: "url(#remove-black)" }}
                      />
                    </div>
                  </a>
                </div>

                {/* Right: Image */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div style={{ position: "relative", width: "100%", aspectRatio: "16/10", borderRadius: "16px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)", background: "#0d0d0d", boxShadow: "0 32px 80px rgba(0,0,0,0.6)" }}>
                    <Image
                      src={project.image}
                      alt={`${project.name} screenshot`}
                      fill
                      sizes="(max-width: 900px) 100vw, 55vw"
                      style={{ objectFit: "cover", transition: "transform 0.6s ease" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.03)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
                    />
                    {/* Subtle overlay gradient */}
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(0,0,0,0.15) 0%, transparent 60%)", pointerEvents: "none" }} />
                  </div>
                </motion.div>

              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* SVG filter to remove black from arrow image */}
      <svg width="0" height="0" style={{ position: "absolute", pointerEvents: "none" }}>
        <defs>
          <filter id="remove-black" colorInterpolationFilters="sRGB">
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  1.5 1.5 1.5 0 -0.05" />
          </filter>
        </defs>
      </svg>

      <Footer />

      <style jsx>{`
        .page-container {
          position: relative;
          z-index: 2;
          max-width: 1200px;
          margin: 0 auto;
          padding: 160px 40px 80px;
        }
        .proj-grid {
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          gap: 64px;
        }
        @media (max-width: 900px) {
          .proj-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .page-container {
            padding: 120px 24px 60px;
          }
        }
        @media (max-width: 480px) {
          .page-container {
            padding: 100px 16px 40px;
          }
        }
      `}</style>
    </main>
  );
}
