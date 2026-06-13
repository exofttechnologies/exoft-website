"use client";

import { motion } from "framer-motion";

const projects = [
  {
    title: "Restaurant Ordering Platform",
    description: "A full-stack digital ordering system with real-time order tracking, payment integration, and admin dashboard.",
    tags: ["Next.js", "Node.js", "MongoDB", "Stripe"],
    bg: "bg-gradient-to-br from-blue-50 to-indigo-50",
  },
  {
    title: "Warehouse Management SaaS",
    description: "Enterprise-grade warehouse management with inventory tracking, barcode scanning, and analytics dashboards.",
    tags: ["React", "Python", "PostgreSQL", "Docker"],
    bg: "bg-gradient-to-br from-purple-50 to-pink-50",
  },
  {
    title: "Invoice Generator App",
    description: "Automated invoicing platform with PDF generation, client management, recurring billing, and payment reminders.",
    tags: ["TypeScript", "React", "Firebase", "PDF.js"],
    bg: "bg-gradient-to-br from-emerald-50 to-teal-50",
  },
];

export default function FeaturedProjects() {
  return (
    <section id="work" className="section-padding relative bg-gray-50/50">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-medium text-[#2563eb] uppercase tracking-[0.2em] mb-4 block">
            Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0f172a] mb-4">
            Selected Work
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            A glimpse into the digital products we&apos;ve brought to life.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card group cursor-pointer overflow-hidden"
            >
              <div className={`relative h-52 ${project.bg} overflow-hidden`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-4/5 h-4/5 rounded-xl bg-white/80 border border-gray-200/60 shadow-sm p-4 group-hover:scale-105 transition-transform duration-700">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 rounded-full bg-red-300" />
                      <div className="w-2 h-2 rounded-full bg-yellow-300" />
                      <div className="w-2 h-2 rounded-full bg-green-300" />
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 w-3/4 rounded bg-gray-200" />
                      <div className="h-2 w-1/2 rounded bg-gray-150" />
                      <div className="h-8 w-full rounded bg-gray-100 mt-3" />
                      <div className="grid grid-cols-3 gap-2 mt-2">
                        <div className="h-6 rounded bg-gray-100" />
                        <div className="h-6 rounded bg-gray-100" />
                        <div className="h-6 rounded bg-gray-100" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-4">
                  <motion.span
                    className="text-sm font-medium text-[#0f172a] px-4 py-2 rounded-full bg-white shadow-md border border-gray-200"
                    whileHover={{ scale: 1.05 }}
                  >
                    View Project →
                  </motion.span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-bold text-[#0f172a] mb-2 group-hover:text-[#2563eb] transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-500 border border-gray-200/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
