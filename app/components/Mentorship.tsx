"use client";

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
      "You're matched with a mentor — a researcher at a top university whose work aligns with your interests and goals.",
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
        <div className="text-center mb-20">
          <p className="text-xs uppercase tracking-[0.4em] text-sky-400/80 mb-6 font-medium">
            The Program
          </p>
          <h2 className="text-4xl md:text-5xl font-extralight tracking-tight text-white leading-tight">
            From idea to
            <br />
            <span className="text-white/50">peer-reviewed publication.</span>
          </h2>
        </div>

        {/* Process timeline */}
        <div className="relative mb-24">
          <div className="absolute left-[18px] top-0 bottom-0 w-px bg-gradient-to-b from-sky-400/40 via-sky-400/20 to-transparent md:left-1/2" />

          <div className="space-y-12">
            {steps.map((step, i) => (
              <div
                key={step.number}
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
              </div>
            ))}
          </div>
        </div>

        {/* Who qualifies */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-light text-white mb-6">Who should apply</h3>
            <ul className="space-y-3">
              {who.map((w) => (
                <li key={w} className="flex items-start gap-3">
                  <span className="text-sky-400 mt-0.5 flex-shrink-0">—</span>
                  <span className="text-sm text-white/60 font-light leading-relaxed">{w}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-card glow-border rounded-2xl p-8">
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
          </div>
        </div>
      </div>

      <div className="section-divider mt-32" />
    </section>
  );
}
