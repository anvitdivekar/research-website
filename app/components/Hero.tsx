"use client";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6" style={{ zIndex: 1 }}>
      {/* Vignette so text is legible over the canvas */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#03030e]/40 via-transparent to-[#03030e]/30 pointer-events-none" />

      <div className="relative">
        <p className="text-xs uppercase tracking-[0.4em] text-sky-400/80 mb-8 font-medium">
          Research · Mentorship · Discovery
        </p>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extralight tracking-tight mb-6 leading-[1.05]">
          <span className="shimmer-text">Technology that redefines</span>
          <br />
          <span className="text-white/90">the nature of interaction.</span>
        </h1>

        <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mt-6 leading-relaxed font-light">
          Everything revolves around one thing&mdash;
          <span className="text-white/80">your growth.</span>
        </p>

        <div className="mt-14 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#apply"
            className="px-8 py-3.5 rounded-full bg-sky-400 text-[#05050f] text-sm font-semibold tracking-wide hover:bg-sky-300 transition-all duration-200 hover:shadow-lg hover:shadow-sky-400/30"
          >
            Apply for Mentorship
          </a>
          <a
            href="#about"
            className="px-8 py-3.5 rounded-full border border-white/20 text-white/70 text-sm font-medium tracking-wide hover:border-white/40 hover:text-white transition-all duration-200"
          >
            Learn More
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30">
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
