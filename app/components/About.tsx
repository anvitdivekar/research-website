"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { sectionReveal, viewport } from "./animations";

const affiliations = [
  { school: "Harvard University", role: "Research", color: "#A51C30" },
  { school: "Brown University", role: "Research", color: "#4E3629" },
  { school: "Emory University", role: "Research", color: "#012169" },
  { school: "Georgia Tech", role: "Neuroscience", color: "#B3A369" },
];

const stats = [
  { value: "90+",    label: "Mentees Worldwide" },
  { value: "6",      label: "Continents" },
  { value: "1-on-1", label: "Every Session" },
  { value: "Free",   label: "Always" },
];

export default function About() {
  return (
    <section id="about" className="relative py-32 px-6" style={{ background: "rgba(3,3,14,0.35)" }}>
      <motion.div
        className="max-w-7xl mx-auto"
        variants={sectionReveal}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
      >
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left: bio */}
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-sky-400/80 mb-6 font-medium">
              About
            </p>
            <h2 className="text-4xl md:text-5xl font-extralight tracking-tight text-white mb-8 leading-tight">
              Bridging curiosity
              <br />
              <span className="text-white/50">and published science.</span>
            </h2>

            <div className="space-y-5 text-white/60 font-light leading-relaxed text-[15px]">
              <p>
                Anvit Divekar is an undergraduate researcher in Neuroscience at the Georgia
                Institute of Technology, with active research collaborations at Harvard,
                Brown, and Emory Universities spanning computational neuroscience, health
                systems, and translational medicine.
              </p>
              <p>
                As the founder of the{" "}
                <span className="text-white/80">Organ Access Initiative</span>, Anvit works
                at the intersection of health policy, bioethics, and patient advocacy—driving
                systemic change in how organ transplantation access is distributed.
              </p>
              <p>
                Through a global network of mentors at top-ranked universities, he has guided
                high school students across six continents from their first research idea to
                first-author publications in peer-reviewed journals—entirely free of charge.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              {affiliations.map((a) => (
                <div key={a.school} className="glass-card rounded-full px-4 py-2 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: a.color, boxShadow: `0 0 6px ${a.color}` }} />
                  <span className="text-xs text-white/70 tracking-wide">{a.role} @ {a.school}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: photo + stats */}
          <div className="space-y-6">
            <div className="glow-border rounded-2xl overflow-hidden">
              <Image src="/anvit.png" alt="Anvit Divekar" width={1368} height={1366} className="w-full h-auto block" priority />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s) => (
                <div key={s.label} className="glass-card rounded-xl p-5">
                  <p className="text-2xl font-light text-white tracking-tight">{s.value}</p>
                  <p className="text-xs text-white/40 mt-1 tracking-wide uppercase">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <div className="section-divider mt-32" />
    </section>
  );
}
