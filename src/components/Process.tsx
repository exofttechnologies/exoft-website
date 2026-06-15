"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import noiseBg from "@/assets/noise background (2).jpg";

const steps = [
  {
    number: "01",
    title: "Discovery",
    description: "We dive deep into your business goals, audience, and technical requirements to craft a winning strategy.",
  },
  {
    number: "02",
    title: "Design",
    description: "Our designers create stunning, user-centered interfaces with wireframes and interactive prototypes.",
  },
  {
    number: "03",
    title: "Development",
    description: "Clean, scalable code brought to life using modern frameworks and agile development methodology.",
  },
  {
    number: "04",
    title: "Launch",
    description: "Rigorous testing, performance optimization, and seamless deployment to production environments.",
  },
  {
    number: "05",
    title: "Support",
    description: "Ongoing maintenance, monitoring, and iterative improvements to keep your product ahead of the curve.",
  },
];

export default function Process() {
  return (
    <section id="process" className="process-section">
      {/* ── Noise background image ── */}
      <div className="process-bg">
        <Image
          src={noiseBg}
          alt=""
          fill
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center" }}
          priority={false}
        />
      </div>

      {/* ── Dark overlay for readability ── */}
      <div className="process-overlay" />

      {/* ── Top shadow transition ── */}
      <div className="process-top-shadow" />
      {/* ── Bottom shadow transition ── */}
      <div className="process-bottom-shadow" />

      <div className="process-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="process-header"
        >
          <span className="process-label">Our Process</span>
          <h2 className="process-heading">How We Work</h2>
          <p className="process-subheading">
            A proven methodology that turns ideas into exceptional digital products.
          </p>
        </motion.div>

        <div className="process-timeline">
          {/* Timeline vertical line */}
          <div className="process-line" />

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className={`process-step ${i % 2 === 0 ? "process-step-left" : "process-step-right"}`}
            >
              {/* Dot */}
              <div className="process-dot">
                <div className="process-dot-ping" />
              </div>

              {/* Card */}
              <div className="process-card-wrapper">
                <div className="process-card">
                  <div className="process-card-header">
                    <span className="process-card-number">{step.number}</span>
                    <h3 className="process-card-title">{step.title}</h3>
                  </div>
                  <p className="process-card-desc">{step.description}</p>
                </div>
              </div>

              {/* Spacer for alternating layout */}
              <div className="process-spacer" />
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .process-section {
          position: relative;
          padding: 120px 0 140px;
          overflow: hidden;
          background: #060606;
        }

        /* ── Noise Background ── */
        .process-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          opacity: 0.35;
        }

        .process-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          background: radial-gradient(
            ellipse at 30% 40%,
            rgba(6, 6, 6, 0.3) 0%,
            rgba(6, 6, 6, 0.65) 50%,
            rgba(6, 6, 6, 0.85) 100%
          );
        }

        /* ── Section Transitions ── */
        .process-top-shadow {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 160px;
          z-index: 2;
          pointer-events: none;
          background: linear-gradient(
            to bottom,
            #060606 0%,
            rgba(6, 6, 6, 0.7) 50%,
            transparent 100%
          );
        }

        .process-bottom-shadow {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 160px;
          z-index: 2;
          pointer-events: none;
          background: linear-gradient(
            to top,
            #060606 0%,
            rgba(6, 6, 6, 0.7) 50%,
            transparent 100%
          );
        }

        .process-container {
          position: relative;
          z-index: 3;
          max-width: 900px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* ── Header ── */
        .process-header {
          text-align: center;
          margin-bottom: 80px;
        }

        .process-label {
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          font-weight: 600;
          color: #fa5a38;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          display: block;
          margin-bottom: 16px;
        }

        .process-heading {
          font-family: 'Orbitron', sans-serif;
          font-size: clamp(28px, 4vw, 44px);
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 16px;
          letter-spacing: 0.05em;
        }

        .process-subheading {
          font-family: 'Inter', sans-serif;
          font-size: clamp(14px, 1.5vw, 17px);
          color: rgba(255, 255, 255, 0.45);
          line-height: 1.6;
          max-width: 520px;
          margin: 0 auto;
        }

        /* ── Timeline ── */
        .process-timeline {
          position: relative;
        }

        .process-line {
          position: absolute;
          left: 24px;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(
            to bottom,
            rgba(250, 90, 56, 0.05) 0%,
            rgba(250, 90, 56, 0.3) 20%,
            rgba(250, 90, 56, 0.3) 80%,
            rgba(250, 90, 56, 0.05) 100%
          );
        }

        /* ── Step ── */
        .process-step {
          position: relative;
          display: flex;
          align-items: flex-start;
          gap: 32px;
          margin-bottom: 48px;
        }

        .process-step:last-child {
          margin-bottom: 0;
        }

        /* ── Dot ── */
        .process-dot {
          position: absolute;
          left: 24px;
          transform: translateX(-50%);
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #fa5a38;
          z-index: 10;
          margin-top: 8px;
          box-shadow: 0 0 12px rgba(250, 90, 56, 0.4);
        }

        .process-dot-ping {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: #fa5a38;
          animation: dotPing 2s ease-in-out infinite;
          opacity: 0.2;
        }

        @keyframes dotPing {
          0%, 100% { transform: scale(1); opacity: 0.2; }
          50% { transform: scale(2.5); opacity: 0; }
        }

        /* ── Card ── */
        .process-card-wrapper {
          margin-left: 48px;
          flex: 1;
        }

        .process-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 16px;
          padding: 24px 28px;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          transition: border-color 0.4s ease, background 0.4s ease;
        }

        .process-card:hover {
          border-color: rgba(250, 90, 56, 0.15);
          background: rgba(255, 255, 255, 0.05);
        }

        .process-card-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 10px;
        }

        .process-card-number {
          font-family: 'Orbitron', sans-serif;
          font-size: 22px;
          font-weight: 700;
          color: #fa5a38;
        }

        .process-card-title {
          font-family: 'Inter', sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: #ffffff;
          margin: 0;
          transition: color 0.3s ease;
        }

        .process-card:hover .process-card-title {
          color: #fa5a38;
        }

        .process-card-desc {
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.4);
          line-height: 1.7;
          margin: 0;
        }

        .process-spacer {
          display: none;
        }

        /* ── Desktop alternating layout ── */
        @media (min-width: 769px) {
          .process-line {
            left: 50%;
            transform: translateX(-50%);
          }

          .process-dot {
            left: 50%;
          }

          .process-step {
            gap: 0;
          }

          .process-card-wrapper {
            margin-left: 0;
            width: calc(50% - 32px);
          }

          .process-spacer {
            display: block;
            width: calc(50% - 32px);
          }

          .process-step-left {
            flex-direction: row;
          }

          .process-step-left .process-card-wrapper {
            margin-right: 32px;
            text-align: right;
          }

          .process-step-left .process-card-header {
            justify-content: flex-end;
          }

          .process-step-left .process-spacer {
            order: 2;
            margin-left: 32px;
          }

          .process-step-right {
            flex-direction: row-reverse;
          }

          .process-step-right .process-card-wrapper {
            margin-left: 32px;
          }

          .process-step-right .process-spacer {
            order: 0;
            margin-right: 32px;
          }
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .process-section {
            padding: 80px 0 100px;
          }
          .process-header {
            margin-bottom: 56px;
          }
          .process-step {
            margin-bottom: 32px;
          }
        }

        @media (max-width: 480px) {
          .process-section {
            padding: 64px 0 80px;
          }
          .process-card {
            padding: 20px 22px;
          }
          .process-card-number {
            font-size: 18px;
          }
          .process-card-title {
            font-size: 16px;
          }
        }
      `}</style>
    </section>
  );
}
