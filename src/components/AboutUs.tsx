"use client";

import { motion } from "framer-motion";

export default function AboutUs() {
  return (
    <section id="about" className="about-section">
      {/* ── Header (like services head) ── */}
      <div className="about-header">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="about-heading-text">
            About Us
          </h2>
        </motion.div>
      </div>

      {/* ── Main Content Area ── */}
      <div className="about-main">

        {/* Text overlay */}
        <div className="about-content">
          <h2 className="about-heading">
            WE ARE EXOFT, A SOFTWARE &amp; IT SOLUTIONS COMPANY HELPING BUSINESSES BUILD MODERN, SCALABLE, AND FUTURE-READY DIGITAL PRODUCTS.
          </h2>

          <p className="about-description">
            FROM CUSTOM SOFTWARE AND WEB DEVELOPMENT TO E-COMMERCE,
            <br />
            AUTOMATION, AND CLOUD SOLUTIONS, WE TURN COMPLEX IDEAS
            <br />
            INTO SIMPLE, POWERFUL EXPERIENCES THAT DRIVE REAL BUSINESS GROWTH.
          </p>

          <div className="about-details">
            <p className="about-detail-para">
              Our team combines creativity, strategy, and engineering excellence to deliver scalable solutions that solve real-world challenges. Whether you're a startup launching your first product or an established company modernizing operations, we build digital products designed for performance, reliability, and future expansion.
            </p>
            <p className="about-detail-para">
              We believe technology should be simple, impactful, and accessible. That's why every project we undertake focuses on user experience, innovation, and measurable business results.
            </p>
            <p className="about-detail-para">
              Our mission is to keep businesses ahead of the curve through continuous digital updates, modern technologies, and intelligent solutions that create lasting value.
            </p>
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div
        className="about-bottom-bar"
        onClick={() => {
          document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <span className="about-bottom-text">EXPLORE OUR SERVICES...</span>
        <span className="about-bottom-arrow">→</span>
      </div>

      {/* ── Styles ── */}
      <style jsx>{`
        .about-section {
          position: relative;
          width: 100%;
          background: #0a0a0a;
          overflow: hidden;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          padding: 80px 0 0px;
        }

        /* ── Header ── */
        .about-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          margin-bottom: 20px;
        }

        .about-heading-text {
          font-family: 'Orbitron', sans-serif;
          font-size: clamp(18px, 2.2vw, 26px);
          font-weight: 700;
          color: #e5e5e5;
          margin: 0;
          line-height: 1.1;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        /* ── Main Content Area ── */
        .about-main {
          position: relative;
          min-height: 500px;
          padding: 20px 48px 48px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
        }


        .about-content {
          position: relative;
          z-index: 2;
          max-width: 850px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .about-heading {
          font-family: 'Orbitron', sans-serif;
          font-size: clamp(16px, 2vw, 24px);
          font-weight: 800;
          line-height: 1.35;
          letter-spacing: 0.02em;
          color: rgba(255, 255, 255, 0.92);
          margin: 0 0 32px;
          text-transform: uppercase;
          max-width: 820px;
        }

        .about-description {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(11px, 1.1vw, 13.5px);
          font-weight: 400;
          letter-spacing: 0.08em;
          color: rgba(255, 255, 255, 0.45);
          text-transform: uppercase;
          line-height: 1.8;
          margin: 0;
          max-width: 620px;
          text-align: center;
        }

        .about-details {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-top: 32px;
          max-width: 760px;
        }

        .about-detail-para {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(13px, 1.2vw, 15px);
          font-weight: 300;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.6);
          margin: 0;
          text-transform: none; /* keep sentence case */
          text-align: center;
        }

        /* ── Bottom Bar ── */
        .about-bottom-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24px 48px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .about-bottom-bar:hover {
          background: rgba(255, 255, 255, 0.03);
        }

        .about-bottom-text {
          font-family: 'Orbitron', sans-serif;
          font-size: clamp(14px, 1.8vw, 20px);
          font-weight: 700;
          letter-spacing: 0.06em;
          color: rgba(255, 255, 255, 0.9);
          text-transform: uppercase;
        }

        .about-bottom-arrow {
          font-size: 24px;
          color: rgba(255, 255, 255, 0.7);
          transition: transform 0.3s ease, color 0.3s ease;
        }

        .about-bottom-bar:hover .about-bottom-arrow {
          transform: translateX(6px);
          color: #ffffff;
        }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .about-bg-image {
            width: 60%;
            right: -10%;
            opacity: 0.6;
          }
          .about-main {
            min-height: 420px;
            padding: 20px 32px 40px;
          }
        }

        @media (max-width: 768px) {
          .about-main {
            min-height: 380px;
            padding: 20px 24px 32px;
          }
          .about-bg-image {
            width: 70%;
            right: -15%;
            top: 10%;
            height: 90%;
            opacity: 0.45;
          }
          .about-heading {
            font-size: clamp(14px, 4vw, 20px);
          }
          .about-description br {
            display: none;
          }
          .about-bottom-bar {
            padding: 20px 24px;
          }
        }

        @media (max-width: 480px) {
          .about-main {
            min-height: 320px;
            padding: 16px 16px 24px;
          }
          .about-bg-image {
            width: 80%;
            right: -20%;
            opacity: 0.35;
          }
          .about-heading {
            font-size: clamp(13px, 4.5vw, 17px);
          }
          .about-bottom-bar {
            padding: 18px 16px;
          }
        }
      `}</style>

    </section>
  );
}
