"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { fadeUp, fadeIn, staggerContainer, viewport } from "./animations";

const WorldMap = dynamic(() => import("./WorldMap"), { ssr: false });

const stats = [
  { value: "6",    label: "Continents" },
  { value: "15+",  label: "Countries" },
  { value: "90+",  label: "Mentees" },
  { value: "100%", label: "Remote" },
];

export default function GlobalReach() {
  return (
    <section
      id="global"
      className="relative py-32 px-6"
      style={{ background: "rgba(3,3,14,0.35)" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — text + stats */}
          <motion.div
            variants={staggerContainer(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
          >
            <motion.p variants={fadeUp} className="text-xs uppercase tracking-[0.4em] text-sky-400/80 mb-6 font-medium">
              Global Reach
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-extralight tracking-tight text-white leading-tight mb-6">
              Students across
              <br />
              <span className="text-white/50">every continent.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/50 font-light leading-relaxed max-w-md mb-12">
              The program spans 6 continents. Whether you&apos;re in Georgia
              or Gandhinagar, Dubai or Dublin — if you have the curiosity,
              geography is no barrier.
            </motion.p>

            <div className="grid grid-cols-2 gap-4">
              {stats.map((s) => (
                <motion.div key={s.label} variants={fadeUp} className="glass-card rounded-xl p-5">
                  <p className="text-2xl font-light text-white tracking-tight">{s.value}</p>
                  <p className="text-xs text-white/40 mt-1 tracking-wide uppercase">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — interactive globe */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="glass-card glow-border rounded-3xl overflow-hidden"
            style={{ height: 460 }}
          >
            <WorldMap />
          </motion.div>

        </div>
      </div>

      <div className="section-divider mt-32" />
    </section>
  );
}
