"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const navLinks = [
  { name: "HOME", href: "#hero" },
  { name: "SERVICE", href: "#services" },
  { name: "PROJECTS", href: "#projects" },
  { name: "CONTACT", href: "#contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

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
        {/* Logo */}
        <Link
          href="/"
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
              color: "#ff3b30",
              textShadow:
                "0 0 8px rgba(255, 59, 48, 0.7), 0 0 20px rgba(255, 59, 48, 0.4)",
            }}
          >
            o
          </span>
          <span>f</span>
          <span>t</span>
        </Link>

        {/* Desktop nav links */}
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
              <Link
                href={isHome ? link.href : `/${link.href}`}
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
              </Link>
            </span>
          ))}
        </div>

        {/* Hamburger button */}
        <button
          className="nav-menu-button-mobile"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle Menu"
          style={{
            border: "none",
            background: "transparent",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "5px",
            cursor: "pointer",
            position: "relative",
            padding: "8px",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = "0.7";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = "1";
          }}
        >
          <span
            style={{
              width: "22px",
              height: "3px",
              background: "#ffffff",
              borderRadius: "2px",
              transition: "all 0.3s ease",
              transform: mobileOpen
                ? "translateY(8px) rotate(45deg)"
                : "none",
            }}
          />
          <span
            style={{
              width: "16px",
              height: "3px",
              background: "#ffffff",
              borderRadius: "2px",
              transition: "all 0.3s ease",
              opacity: mobileOpen ? 0 : 1,
            }}
          />
          <span
            style={{
              width: "22px",
              height: "3px",
              background: "#ffffff",
              borderRadius: "2px",
              transition: "all 0.3s ease",
              transform: mobileOpen
                ? "translateY(-8px) rotate(-45deg)"
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
            <Link
              key={link.name}
              href={isHome ? link.href : `/${link.href}`}
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
            </Link>
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
