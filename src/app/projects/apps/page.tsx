"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import elegentLogo from "@/assets/company logos/elegenthospitality.png";
import elegentProjectImg from "@/assets/project/elegenthospitality_project.png";

const projects = [
  {
    name: "Elegent Hospitality",
    logo: elegentLogo,
    image: elegentProjectImg,
    logoSize: 90,
    tag: "Hospitality & Workforce Management",
    description:
      "Elegant Hospitality by Exoft is a premium hospitality and catering workforce management platform designed specifically for hospitality professionals, catering staff, and event teams. The application simplifies the complexity of event-based staffing by connecting businesses with verified, high-quality talent in real time, streamlining shift bookings, roster management, and communication.",
    googlePlayLink: "https://play.google.com/store/apps/details?id=com.exoft.elegent",
    appStoreLink: "https://apps.apple.com/in/app/elegent-hospitality/id6764536902",
  },
];

export default function AppsProjectPage() {
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
            Apps
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
                      }}
                    />
                  </div>

                  {/* Name */}
                  <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(22px, 3vw, 36px)", fontWeight: 800, color: "#ffffff", textTransform: "uppercase", letterSpacing: "-0.01em", margin: "0 0 20px", lineHeight: 1.1 }}>
                    {project.name}
                  </h2>

                  {/* Description */}
                  <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(14px, 1.2vw, 15px)", fontWeight: 300, lineHeight: 1.8, color: "rgba(255,255,255,0.6)", margin: "0 0 24px", maxWidth: "460px" }}>
                    {project.description}
                  </p>



                  <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "12px" }}>
                    {/* Google Play */}
                    <a
                      href={project.googlePlayLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "12px",
                        padding: "10px 20px",
                        border: "1px solid rgba(255,255,255,0.12)",
                        borderRadius: "12px",
                        background: "rgba(255,255,255,0.03)",
                        textDecoration: "none",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLAnchorElement;
                        el.style.background = "rgba(239,68,68,0.08)";
                        el.style.borderColor = "rgba(239,68,68,0.4)";
                        el.style.transform = "translateY(-2px)";
                        el.style.boxShadow = "0 8px 20px rgba(239,68,68,0.12)";
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLAnchorElement;
                        el.style.background = "rgba(255,255,255,0.03)";
                        el.style.borderColor = "rgba(255,255,255,0.12)";
                        el.style.transform = "translateY(0)";
                        el.style.boxShadow = "none";
                      }}
                    >
                      <svg viewBox="0 0 24 24" width="22" height="22">
                        <path d="M5.0001 3.06456C4.82193 3.24273 4.72266 3.51877 4.72266 3.86456V20.1352C4.72266 20.481 4.82193 20.7571 5.0001 20.9352L5.07417 21.0093L13.8344 12.2491V12.0001L5.07417 3.24003L5.0001 3.06456Z" fill="#00F0FF" />
                        <path d="M16.7366 15.1513L13.834 12.2487V12.0001L16.7366 9.09756L16.8093 9.13886L20.2524 11.097C21.2361 11.6565 21.2361 12.5746 20.2524 13.1341L16.8093 15.0922L16.7366 15.1513Z" fill="#FFC700" />
                        <path d="M13.834 12.0001L5.0001 20.9352C5.30567 21.2408 5.8009 21.2584 6.36034 20.939L16.8092 15.002L13.834 12.0001Z" fill="#FF007F" />
                        <path d="M13.834 12.0001L16.8092 9.00282L6.36034 3.06121C5.8009 2.74179 5.30567 2.75936 5.0001 3.06493L13.834 12.0001Z" fill="#00E676" />
                      </svg>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                        <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 500, fontFamily: "'Outfit', sans-serif" }}>GET IT ON</span>
                        <span style={{ fontSize: "14px", color: "#ffffff", fontWeight: 700, fontFamily: "'Outfit', sans-serif", letterSpacing: "0.02em" }}>Google Play</span>
                      </div>
                    </a>

                    {/* App Store */}
                    <a
                      href={project.appStoreLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "12px",
                        padding: "10px 20px",
                        border: "1px solid rgba(255,255,255,0.12)",
                        borderRadius: "12px",
                        background: "rgba(255,255,255,0.03)",
                        textDecoration: "none",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLAnchorElement;
                        el.style.background = "rgba(239,68,68,0.08)";
                        el.style.borderColor = "rgba(239,68,68,0.4)";
                        el.style.transform = "translateY(-2px)";
                        el.style.boxShadow = "0 8px 20px rgba(239,68,68,0.12)";
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLAnchorElement;
                        el.style.background = "rgba(255,255,255,0.03)";
                        el.style.borderColor = "rgba(255,255,255,0.12)";
                        el.style.transform = "translateY(0)";
                        el.style.boxShadow = "none";
                      }}
                    >
                      <svg viewBox="0 0 24 24" width="22" height="22" fill="#ffffff">
                        <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,22C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.1,16.67C20.08,16.74 19.67,18.11 18.71,19.5M15.97,4.17C16.63,3.37 17.07,2.28 16.95,1C16,1.04 14.9,1.6 14.24,2.38C13.68,3.04 13.19,4.14 13.34,5.39C14.39,5.47 15.4,4.88 15.97,4.17Z" />
                      </svg>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                        <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 500, fontFamily: "'Outfit', sans-serif" }}>Download on the</span>
                        <span style={{ fontSize: "14px", color: "#ffffff", fontWeight: 700, fontFamily: "'Outfit', sans-serif", letterSpacing: "0.02em" }}>App Store</span>
                      </div>
                    </a>
                  </div>
                </div>

                {/* Right: Image */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", borderRadius: "16px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)", background: "#0d0d0d", boxShadow: "0 32px 80px rgba(0,0,0,0.6)" }}>
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
          grid-template-columns: 1fr 1.3fr;
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
