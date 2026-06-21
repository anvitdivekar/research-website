"use client";

import { useEffect, useRef, useState } from "react";

type Star = {
  width: string;
  height: string;
  top: string;
  left: string;
  opacity: number;
  animation: string;
};

export default function VideoHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    setStars(
      Array.from({ length: 80 }).map(() => {
        const size = Math.random() * 2 + 0.5;
        return {
          width: size + "px",
          height: size + "px",
          top: Math.random() * 100 + "%",
          left: Math.random() * 100 + "%",
          opacity: Math.random() * 0.6 + 0.1,
          animation: `pulse-glow ${2 + Math.random() * 4}s ease-in-out ${Math.random() * 4}s infinite`,
        };
      })
    );
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    video.currentTime = 0;

    const handleScroll = () => {
      if (!video || !containerRef.current) return;
      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const scrollHeight = container.offsetHeight - window.innerHeight;
      const scrolled = Math.max(0, -rect.top);
      const progress = Math.min(1, scrolled / scrollHeight);

      if (video.duration) {
        video.currentTime = progress * video.duration;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: "300vh" }}
    >
      {/* Sticky container that pins the hero while scrolling */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Layer 1: dark base (shows if video fails to load) */}
        <div className="absolute inset-0 z-0 bg-[#03030e]" />

        {/* Layer 2: video */}
        <video
          ref={videoRef}
          className="absolute inset-0 z-10 w-full h-full object-cover"
          playsInline
          muted
          preload="auto"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>

        {/* Layer 3: dim overlay so text is readable over the video */}
        <div className="absolute inset-0 z-20 bg-gradient-to-b from-[#05050f]/60 via-[#05050f]/30 to-[#05050f]/70" />

        {/* Layer 4: star particles */}
        <div className="absolute inset-0 z-30 overflow-hidden pointer-events-none" aria-hidden>
          {stars.map((s, i) => (
            <div key={i} className="absolute rounded-full bg-white" style={s} />
          ))}
        </div>

        {/* Layer 5: radial glow behind text */}
        <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
          <div
            className="w-[600px] h-[600px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(56,189,248,0.08) 0%, transparent 70%)" }}
          />
        </div>

        {/* Hero content */}
        <div className="relative z-40 text-center px-6 max-w-5xl mx-auto">
          <p className="text-xs uppercase tracking-[0.4em] text-sky-400/80 mb-8 font-medium">
            Research · Mentorship · Discovery
          </p>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extralight tracking-tight mb-6 leading-[1.05]">
            <span className="shimmer-text">Technology that redefines</span>
            <br />
            <span className="text-white/90">the nature of interaction.</span>
          </h1>

          <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mt-8 leading-relaxed font-light">
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

          {/* Scroll indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30">
            <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
            <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
