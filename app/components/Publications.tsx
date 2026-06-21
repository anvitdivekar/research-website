"use client";

export default function Publications() {
  return (
    <section id="publications" className="relative py-32 px-6" style={{ background: "rgba(3,3,14,0.35)" }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.4em] text-sky-400/80 mb-6 font-medium">
            Portfolio
          </p>
          <h2 className="text-4xl md:text-5xl font-extralight tracking-tight text-white leading-tight mb-6">
            Work &amp; presence.
          </h2>
          <p className="text-white/50 font-light text-lg max-w-xl mx-auto leading-relaxed">
            Research, projects, and more — all in one place.
          </p>
        </div>

        <div className="glass-card glow-border rounded-3xl overflow-hidden">
          <div className="p-6 border-b border-white/8 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            <p className="text-xs text-white/60 tracking-wide">anvitdivekar.carrd.co</p>
            <a
              href="https://anvitdivekar.carrd.co/"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto text-xs text-sky-400/60 hover:text-sky-400 transition-colors"
            >
              Open full site →
            </a>
          </div>

          <iframe
            src="https://anvitdivekar.carrd.co/"
            width="100%"
            height="700"
            frameBorder="0"
            title="Anvit Divekar — Portfolio"
            className="bg-white/[0.02]"
          >
            Loading…
          </iframe>
        </div>

        <p className="text-center text-xs text-white/30 mt-6">
          Having trouble viewing?{" "}
          <a
            href="https://anvitdivekar.carrd.co/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-400/60 hover:text-sky-400 transition-colors"
          >
            Open directly →
          </a>
        </p>
      </div>

      <div className="section-divider mt-32" />
    </section>
  );
}
