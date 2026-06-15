"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    quote: "Professional team. Delivered beyond expectations. The quality of their work and attention to detail is unmatched.",
    author: "Client A",
    role: "Founder, TechNova",
    bg: "bg-blue-500",
  },
  {
    quote: "Our sales increased 3x after launch. The platform they built transformed our entire business operations.",
    author: "Client B",
    role: "CEO, UrbanMart",
    bg: "bg-purple-500",
  },
  {
    quote: "Highly recommended for custom systems. They understood our complex requirements and delivered a flawless solution.",
    author: "Client C",
    role: "Director, SwiftPay",
    bg: "bg-emerald-500",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="section-padding relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-medium text-[#2563eb] uppercase tracking-[0.2em] mb-4 block">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0f172a]">
            What Clients Say
          </h2>
        </motion.div>

        <div className="relative min-h-[280px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.96 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card p-10 md:p-14 text-center"
            >
              <div className="mb-6">
                <svg className="w-10 h-10 mx-auto text-blue-100" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609L9.978 5.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H0z" />
                </svg>
              </div>

              <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8 font-light italic">
                &ldquo;{testimonials[current].quote}&rdquo;
              </p>

              <div className="flex items-center justify-center gap-3">
                <div className={`w-10 h-10 rounded-full ${testimonials[current].bg} flex items-center justify-center text-white font-bold text-sm`}>
                  {testimonials[current].author[0]}
                </div>
                <div className="text-left">
                  <div className="text-sm font-semibold text-[#0f172a]">
                    {testimonials[current].author}
                  </div>
                  <div className="text-xs text-gray-400">
                    {testimonials[current].role}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-3 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === current
                  ? "w-8 bg-[#0f172a]"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
