"use client";

import { motion } from "framer-motion";
import { sectionReveal, viewport } from "./animations";

const areas = [
  {
    title: "Neuroscience",
    description:
      "Computational modeling, neural circuits, cognitive neuroscience, and brain-behavior relationships. Projects span fMRI analysis, electrophysiology, and neural data science.",
    tags: ["Computational", "Cognitive", "Systems", "Data Science"],
    icon: "⬡",
  },
  {
    title: "Health Systems & Policy",
    description:
      "Translational research in health equity, organ transplantation access, public health infrastructure, and bioethics. Real-world policy implications.",
    tags: ["Bioethics", "Equity", "Policy", "Translational"],
    icon: "◈",
  },
  {
    title: "Molecular Biology",
    description:
      "Cellular mechanisms, gene expression, protein structure-function, and biochemical pathways. Wet-lab and dry-lab approaches to biological questions.",
    tags: ["Genomics", "Proteomics", "Biochemistry", "Cell Biology"],
    icon: "⬡",
  },
  {
    title: "Clinical Research",
    description:
      "Retrospective and prospective clinical studies, epidemiology, biostatistics, and evidence-based medicine. Hospital-affiliated research with IRB protocols.",
    tags: ["Epidemiology", "Biostatistics", "IRB", "EBM"],
    icon: "◈",
  },
  {
    title: "Biomedical Engineering",
    description:
      "Medical devices, diagnostic tools, biomechanics, and tissue engineering. Interdisciplinary projects bridging engineering and clinical medicine.",
    tags: ["Devices", "Diagnostics", "Biomechanics", "Tissue Eng."],
    icon: "⬡",
  },
  {
    title: "Computer Science & AI",
    description:
      "Machine learning applications in biomedicine, natural language processing for clinical notes, computer vision in pathology, and bioinformatics pipelines.",
    tags: ["ML/AI", "NLP", "Bioinformatics", "Computer Vision"],
    icon: "◈",
  },
];

export default function Research() {
  return (
    <section id="research" className="relative py-32 px-6" style={{ background: "rgba(3,3,14,0.35)" }}>
      <motion.div
        className="max-w-7xl mx-auto"
        variants={sectionReveal}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
      >
        <div className="text-center mb-20">
          <p className="text-xs uppercase tracking-[0.4em] text-sky-400/80 mb-6 font-medium">
            Research Areas
          </p>
          <h2 className="text-4xl md:text-5xl font-extralight tracking-tight text-white leading-tight">
            Where curiosity
            <br />
            <span className="text-white/50">becomes publication.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {areas.map((area) => (
            <div
              key={area.title}
              className="glass-card rounded-2xl p-7 hover:border-sky-400/20 transition-all duration-300 group hover:glow-border"
            >
              <div className="text-sky-400/40 text-2xl mb-5 group-hover:text-sky-400/70 transition-colors">
                {area.icon}
              </div>
              <h3 className="text-lg font-medium text-white mb-3">{area.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed font-light mb-5">
                {area.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {area.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] uppercase tracking-widest text-sky-400/60 border border-sky-400/15 px-2.5 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="section-divider mt-32" />
    </section>
  );
}
