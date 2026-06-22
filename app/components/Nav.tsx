"use client";

import { useEffect, useState } from "react";

const links = [
  { label: "About",      href: "#about" },
  { label: "Research",   href: "#research" },
  { label: "Mentorship", href: "#mentorship" },
  { label: "FAQ",        href: "#faq" },
  { label: "Contact",    href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass-card border-b border-white/8 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a
          href="#"
          className="text-sm font-semibold tracking-widest uppercase text-white/90 hover:text-sky-400 transition-colors"
        >
          Anvit Divekar
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm text-white/60 hover:text-white transition-colors duration-200 tracking-wide"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#apply"
          className="hidden md:block text-xs font-semibold uppercase tracking-widest px-5 py-2.5 rounded-full border border-sky-400/50 text-sky-400 hover:bg-sky-400/10 hover:border-sky-400 transition-all duration-200"
        >
          Apply
        </a>
      </nav>
    </header>
  );
}
