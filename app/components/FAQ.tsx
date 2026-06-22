"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "Is this actually free?",
    a: "Yes — completely. There are no application fees, program fees, or hidden costs. The program has always been free and will remain free. If anyone ever asks you to pay, that is not this program.",
  },
  {
    q: "Do I need prior research experience?",
    a: "No. Most students who apply have never done formal research before. What matters is genuine curiosity and the ability to commit time each week. Your mentor will guide you from scratch.",
  },
  {
    q: "Who are the mentors?",
    a: "Mentors are PhD students and postdoctoral researchers at R1 research universities, including Harvard, Brown, Emory, and Georgia Tech. They are vetted researchers who work directly with you — every session, every week.",
  },
  {
    q: "What subjects can I research?",
    a: "The program focuses on health sciences and STEM: neuroscience, molecular biology, health systems, clinical research, biomedical engineering, and computer science / AI. If your interest is adjacent, apply anyway and we'll see if there's a fit.",
  },
  {
    q: "How long does it take to publish?",
    a: "Most projects take between 3 and 6 months from research design to submission. The timeline depends on your topic, your pace, and the journal. Some students publish faster; some projects take longer. We stay with you through the full process.",
  },
  {
    q: "What kind of journals do students publish in?",
    a: "We target legitimate peer-reviewed journals appropriate to the research topic and level. We do not submit to predatory journals. The goal is a publication you can stand behind and that will be recognized by universities.",
  },
  {
    q: "What if my mentor isn't a good fit?",
    a: "We take matching seriously, but if something isn't working, you can reach out and we'll reassign you. The relationship needs to work for both sides.",
  },
  {
    q: "How competitive is the application?",
    a: "We review applications on a rolling basis and accept students as mentor availability opens. There is no fixed cohort or cutoff date. A strong application shows genuine interest in a specific topic — not a perfect GPA.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="relative py-32 px-6"
      style={{ background: "rgba(3,3,14,0.35)" }}
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.4em] text-sky-400/80 mb-6 font-medium">
            FAQ
          </p>
          <h2 className="text-4xl md:text-5xl font-extralight tracking-tight text-white leading-tight">
            Common questions.
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((item, i) => (
            <div
              key={i}
              className="glass-card rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left group"
              >
                <span className="text-sm font-light text-white/80 group-hover:text-white transition-colors pr-4">
                  {item.q}
                </span>
                <span
                  className="text-sky-400/60 text-lg flex-shrink-0 transition-transform duration-200"
                  style={{ transform: open === i ? "rotate(45deg)" : "rotate(0deg)" }}
                >
                  +
                </span>
              </button>

              {open === i && (
                <div className="px-6 pb-5">
                  <p className="text-sm text-white/50 font-light leading-relaxed border-t border-white/5 pt-4">
                    {item.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="section-divider mt-32" />
    </section>
  );
}
