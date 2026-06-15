"use client";

import { motion } from "framer-motion";

const reasons = [
  {
    title: "Fast Delivery",
    description: "We ship fast without compromising quality. Agile sprints ensure rapid, iterative delivery.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    glowColor: "rgba(234, 179, 8, 0.15)",
    accentColor: "#eab308",
  },
  {
    title: "Scalable Architecture",
    description: "Built to grow. Our systems handle increasing loads effortlessly with cloud-native design.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
      </svg>
    ),
    glowColor: "rgba(59, 130, 246, 0.15)",
    accentColor: "#3b82f6",
  },
  {
    title: "Modern UI Design",
    description: "Pixel-perfect interfaces with thoughtful micro-interactions that users remember.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
      </svg>
    ),
    glowColor: "rgba(168, 85, 247, 0.15)",
    accentColor: "#a855f7",
  },
  {
    title: "Long-Term Support",
    description: "We don't disappear after launch. Ongoing maintenance, updates, and dedicated support.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    glowColor: "rgba(16, 185, 129, 0.15)",
    accentColor: "#10b981",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="section-padding relative overflow-hidden bg-[#060606]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Dark background block */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-[#0f172a] rounded-[32px] px-6 sm:px-10 lg:px-16 py-20 relative overflow-hidden">
          {/* Noise/grain texture overlay */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none rounded-[32px]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Glow orbs */}
          <div className="absolute top-0 left-1/4 w-80 h-80 bg-blue-500/[0.07] rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-60 h-60 bg-purple-500/[0.05] rounded-full blur-[80px] pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 relative z-10"
          >
            <span className="text-xs font-semibold text-blue-400 uppercase tracking-[0.2em] mb-4 block">
              Why Us
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Why Exofttechnologies
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              We deliver more than code — we deliver competitive advantage.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 relative z-10">
            {reasons.map((reason, i) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.1,
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{
                  y: -6,
                  transition: { duration: 0.35 },
                }}
                className="group relative cursor-pointer"
              >
                {/* Card with sandblasted glass effect */}
                <div className="relative rounded-2xl p-7 bg-white/[0.04] border border-white/[0.06] backdrop-blur-sm overflow-hidden transition-all duration-500 group-hover:bg-white/[0.07] group-hover:border-white/[0.12]">
                  {/* Glow spot on hover */}
                  <div
                    className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{ background: reason.glowColor }}
                  />
                  <div
                    className="absolute -bottom-10 -left-10 w-24 h-24 rounded-full blur-[50px] opacity-0 group-hover:opacity-60 transition-opacity duration-700"
                    style={{ background: reason.glowColor }}
                  />

                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110"
                    style={{
                      background: `${reason.glowColor}`,
                      color: reason.accentColor,
                    }}
                  >
                    {reason.icon}
                  </div>

                  {/* Title */}
                  <h3
                    className="text-lg font-bold text-white mb-3 transition-colors duration-300"
                    style={
                      {
                        "--hover-color": reason.accentColor,
                      } as React.CSSProperties
                    }
                  >
                    {reason.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {reason.description}
                  </p>

                  {/* Bottom glow line on hover */}
                  <div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] group-hover:w-3/4 transition-all duration-500 rounded-full"
                    style={{ background: reason.accentColor }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
