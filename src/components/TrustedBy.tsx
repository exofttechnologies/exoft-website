"use client";

import { motion } from "framer-motion";

const logos = [
  "TechNova",
  "UrbanMart",
  "SwiftPay",
  "GrowLab",
  "NextCore",
  "VisionX",
];

const LogoItem = ({ name }: { name: string }) => (
  <div className="flex items-center gap-3 px-6 py-3 rounded-xl bg-gray-50 border border-gray-100 whitespace-nowrap select-none">
    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
      <span className="text-sm font-bold text-gray-400">{name[0]}</span>
    </div>
    <span className="text-sm font-semibold text-gray-400 tracking-wide">{name}</span>
  </div>
);

export default function TrustedBy() {
  return (
    <section className="relative py-16 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <span className="text-xs font-medium text-gray-400 uppercase tracking-[0.2em]">
          Trusted by innovative companies
        </span>
      </motion.div>
      <div className="marquee-container">
        <div className="marquee-track">
          {[...logos, ...logos, ...logos, ...logos].map((logo, i) => (
            <LogoItem key={`${logo}-${i}`} name={logo} />
          ))}
        </div>
      </div>
    </section>
  );
}
