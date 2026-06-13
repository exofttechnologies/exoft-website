"use client";

import { useState } from "react";

const navLinks = [
  { name: "HOME", href: "#hero" },
  { name: "SERVICE", href: "#services" },
  { name: "PROCESS", href: "#process" },
  { name: "CONTACT", href: "#contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "18px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "rgba(6, 6, 6, 0.75)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
        }}
      >
        {/* Logo — lowercase "exoft" with purple glowing 'o' */}
        <a
          href="#"
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            fontFamily: "'Orbitron', sans-serif",
            fontWeight: 700,
            fontSize: "22px",
            letterSpacing: "0.05em",
            color: "#ffffff",
            gap: "0px",
          }}
        >
          <span>e</span>
          <span>x</span>
          <span
            style={{
              color: "#a78bfa",
              textShadow:
                "0 0 8px rgba(139,92,246,0.7), 0 0 20px rgba(139,92,246,0.4)",
            }}
          >
            o
          </span>
          <span>f</span>
          <span>t</span>
        </a>

        {/* Desktop nav links with star separators */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0px",
          }}
          className="nav-links-desktop"
        >
          {navLinks.map((link, i) => (
            <span
              key={link.name}
              style={{ display: "inline-flex", alignItems: "center" }}
            >
              {i > 0 && (
                <span
                  style={{
                    color: "rgba(255,255,255,0.35)",
                    fontSize: "10px",
                    margin: "0 18px",
                    userSelect: "none",
                  }}
                >
                  ✦
                </span>
              )}
              <a
                href={link.href}
                style={{
                  color: "rgba(255,255,255,0.75)",
                  fontFamily: "'Orbitron', sans-serif",
                  fontWeight: 500,
                  fontSize: "12px",
                  letterSpacing: "0.18em",
                  textDecoration: "none",
                  textTransform: "uppercase",
                  transition: "color 0.3s ease",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#ffffff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "rgba(255,255,255,0.75)";
                }}
              >
                {link.name}
              </a>
            </span>
          ))}
        </div>

        {/* Hamburger menu button — circle with purple accent */}
        <button
          className="nav-menu-button-mobile"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle Menu"
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            border: "1.5px solid rgba(255,255,255,0.2)",
            background: "rgba(0,0,0,0.3)",
            backdropFilter: "blur(10px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "4px",
            cursor: "pointer",
            position: "relative",
            overflow: "hidden",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(139,92,246,0.5)";
            e.currentTarget.style.boxShadow =
              "0 0 15px rgba(139,92,246,0.25)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          {/* Purple accent dot on top-right */}
          <span
            style={{
              position: "absolute",
              top: "6px",
              right: "8px",
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#7c3aed",
              boxShadow: "0 0 6px rgba(124,58,237,0.6)",
            }}
          />
          <span
            style={{
              width: "18px",
              height: "1.5px",
              background: mobileOpen ? "transparent" : "#ffffff",
              borderRadius: "2px",
              transition: "all 0.3s ease",
              transform: mobileOpen
                ? "rotate(45deg) translateY(5.5px)"
                : "none",
            }}
          />
          <span
            style={{
              width: "14px",
              height: "1.5px",
              background: "#ffffff",
              borderRadius: "2px",
              transition: "all 0.3s ease",
              opacity: mobileOpen ? 0 : 1,
            }}
          />
          <span
            style={{
              width: "18px",
              height: "1.5px",
              background: mobileOpen ? "transparent" : "#ffffff",
              borderRadius: "2px",
              transition: "all 0.3s ease",
              transform: mobileOpen
                ? "rotate(-45deg) translateY(-5.5px)"
                : "none",
            }}
          />
        </button>
      </nav>

      {/* Mobile overlay menu */}
      {mobileOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99,
            background: "rgba(0,0,0,0.95)",
            backdropFilter: "blur(20px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "32px",
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{
                color: "#ffffff",
                fontFamily: "'Orbitron', sans-serif",
                fontWeight: 700,
                fontSize: "24px",
                letterSpacing: "0.15em",
                textDecoration: "none",
                textTransform: "uppercase",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#a78bfa";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#ffffff";
              }}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}

      <style jsx>{`
        @media (max-width: 768px) {
          nav {
            justify-content: center !important;
            padding: 16px 24px !important;
          }
          .nav-links-desktop {
            display: none !important;
          }
          .nav-menu-button-mobile {
            position: absolute !important;
            left: 24px !important;
            top: 50% !important;
            transform: translateY(-50%) !important;
          }
        }
        @media (min-width: 769px) {
          .nav-menu-button-mobile {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
