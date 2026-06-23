"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewport } from "./animations";

const steps = [
  {
    number: "01",
    title: "Application",
    description:
      "Submit a short application describing your research interests, academic background, and what you hope to accomplish. No prior experience required.",
  },
  {
    number: "02",
    title: "Matching",
    description:
      "You're matched with a PhD student or postdoctoral researcher at an R1 university whose work aligns with your interests. Every mentor is vetted and works directly with you — not through intermediaries.",
  },
  {
    number: "03",
    title: "Research Design",
    description:
      "Together, you define a research question, methodology, and timeline. We help you scope a project that's both rigorous and achievable.",
  },
  {
    number: "04",
    title: "Weekly Sessions",
    description:
      "1-on-1 weekly meetings with your mentor to discuss findings, get feedback, and iterate. You own the work; we guide the science.",
  },
  {
    number: "05",
    title: "Write & Submit",
    description:
      "We support you through drafting, peer review preparation, and journal submission — all the way to publication.",
  },
];

const who = [
  "Current high school students (grades 9–12)",
  "Strong academic record and genuine intellectual curiosity",
  "Ability to commit ~5–8 hours per week",
  "No prior research experience necessary",
  "Students from all countries and backgrounds welcome",
];

export default function Mentorship() {
  return (
    <section id="mentorship" className="relative py-32 px-6" style={{ background: "rgba(3,3,14,0.35)" }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-20"
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <motion.p variants={fadeUp} className="text-xs uppercase tracking-[0.4em] text-sky-400/80 mb-6 font-medium">
            The Program
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-extralight tracking-tight text-white leading-tight">
            From idea to
            <br />
            <span className="text-white/50">peer-reviewed publication.</span>
          </motion.h2>
        </motion.div>

        {/* Process timeline */}
        <div className="relative mb-24">
          <div className="absolute left-[18px] top-0 bottom-0 w-px bg-gradient-to-b from-sky-400/40 via-sky-400/20 to-transparent md:left-1/2" />

          <motion.div
            className="space-y-12"
            variants={staggerContainer(0.15)}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
          >
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                variants={fadeUp}
                className={`flex gap-8 ${i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"} items-start`}
              >
                {/* Number node */}
                <div className="flex-shrink-0 w-9 h-9 rounded-full border border-sky-400/40 bg-[#05050f] flex items-center justify-center relative z-10">
                  <span className="text-[10px] font-mono text-sky-400">{step.number}</span>
                </div>

                <div
                  className={`glass-card rounded-2xl p-6 max-w-md ${
                    i % 2 === 1 ? "md:mr-auto md:ml-0" : "md:ml-auto md:mr-0"
                  } w-full`}
                >
                  <h3 className="text-base font-medium text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed font-light">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Who qualifies */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
          >
            <motion.h3 variants={fadeUp} className="text-2xl font-light text-white mb-6">Who should apply</motion.h3>
            <ul className="space-y-3">
              {who.map((w) => (
                <motion.li key={w} variants={fadeUp} className="flex items-start gap-3">
                  <span className="text-sky-400 mt-0.5 flex-shrink-0">—</span>
                  <span className="text-sm text-white/60 font-light leading-relaxed">{w}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="glass-card glow-border rounded-2xl p-8"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-sky-400/70 mb-4">
              Program Details
            </p>
            <div className="space-y-5">
              {[
                ["Cost", "Free — always"],
                ["Format", "1-on-1 mentorship"],
                ["Duration", "3–6 months typically"],
                ["Commitment", "5–8 hours/week"],
                ["Outcome", "Peer-reviewed publication"],
                ["Location", "Remote, worldwide"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between items-center border-b border-white/5 pb-4 last:border-0 last:pb-0">
                  <span className="text-xs text-white/40 uppercase tracking-wider">{k}</span>
                  <span className="text-sm text-white font-light">{v}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="section-divider mt-32" />
    </section>
  );
}
