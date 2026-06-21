"use client";

export default function Apply() {
  return (
    <section id="apply" className="relative py-32 px-6" style={{ background: "rgba(3,3,14,0.35)" }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.4em] text-sky-400/80 mb-6 font-medium">
            Applications
          </p>
          <h2 className="text-4xl md:text-5xl font-extralight tracking-tight text-white leading-tight mb-6">
            Ready to begin?
          </h2>
          <p className="text-white/50 font-light text-lg max-w-xl mx-auto leading-relaxed">
            Applications are reviewed on a rolling basis. We accept students year-round
            and match them as mentor availability opens.
          </p>
        </div>

        {/* Form embed — replace the src with your Google Form or Typeform URL */}
        <div className="glass-card glow-border rounded-3xl overflow-hidden">
          <div className="p-8 border-b border-white/8 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white">Mentorship Application</p>
              <p className="text-xs text-white/40 mt-1">Takes ~5 minutes to complete</p>
            </div>
            <span className="text-[10px] uppercase tracking-widest text-sky-400/60 border border-sky-400/20 px-3 py-1.5 rounded-full">
              Free
            </span>
          </div>

          <iframe
            src="https://docs.google.com/forms/d/1eVXRdGM3Ah4Em_cKGho-E-9zrvsqLkvnvThEyYuPK9A/viewform?embedded=true"
            width="100%"
            height="700"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            className="bg-transparent"
            title="Mentorship Application Form"
          >
            Loading application form…
          </iframe>
        </div>

        <p className="text-center text-xs text-white/30 mt-6 leading-relaxed">
          Applications are typically reviewed within 1–2 weeks.
          <br />
          Questions? Reach out at{" "}
          <a
            href="mailto:contact@anvitdivekar.com"
            className="text-sky-400/60 hover:text-sky-400 transition-colors"
          >
            contact@anvitdivekar.com
          </a>
        </p>
      </div>

      <div className="section-divider mt-32" />
    </section>
  );
}
