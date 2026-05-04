"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Priya Mehta",
    role: "Growth Lead, D2C Brand",
    quote:
      "Ad-Vision AI helped us launch multi-language ads in hours instead of days. CTR lifted by 29% within the first week.",
  },
  {
    name: "James Carter",
    role: "Performance Marketer",
    quote:
      "The video prompts and fallback flows are fantastic. Even without keys, we show previews to clients instantly.",
  },
  {
    name: "Alisha Singh",
    role: "Agency Founder",
    quote:
      "Templates + dashboard = superpower. My team collaborates faster and we ship more winning creatives.",
  },
];

export function Testimonials() {
  return (
    <section className="container mx-auto px-6 py-16 max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <p className="text-sm uppercase tracking-[0.2em] text-primary/80">Loved by teams</p>
        <h2 className="text-3xl md:text-4xl font-bold mt-2 gradient-text">
          Results marketers care about
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((item, idx) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 glass shadow-lg shadow-black/20"
          >
            <div className="text-left space-y-3">
              <p className="text-gray-200 leading-relaxed text-sm">“{item.quote}”</p>
              <div>
                <p className="font-semibold text-white">{item.name}</p>
                <p className="text-xs text-gray-400">{item.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}


