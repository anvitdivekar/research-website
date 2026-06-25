"use client";

import { useEffect, useState } from "react";

const links = [
  { label: "About",      href: "#about",      id: "about" },
  { label: "Research",   href: "#research",   id: "research" },
  { label: "Mentorship", href: "#mentorship", id: "mentorship" },
  { label: "FAQ",        href: "#faq",        id: "faq" },
  { label: "Contact",    href: "#contact",    id: "contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);

      // Find which section is currently in view
      const offset = 120; // nav height + buffer
      let current = "";
      for (const link of links) {
        const el = document.getElementById(link.id);
        if (el && el.getBoundingClientRect().top <= offset) {
          current = link.id;
        }
      }
      setActive(current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
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
                className={`text-sm tracking-wide transition-colors duration-200 relative ${
                  active === l.id
                    ? "text-white"
                    : "text-white/50 hover:text-white/80"
                }`}
              >
                {l.label}
                {active === l.id && (
                  <span className="absolute -bottom-1 left-0 right-0 h-px bg-sky-400/70 rounded-full" />
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="/login"
            className="text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full border border-white/20 text-white/50 hover:text-white/80 hover:border-white/40 transition-all duration-200"
          >
            Login
          </a>
          <a
            href="#apply"
            className="text-xs font-semibold uppercase tracking-widest px-5 py-2.5 rounded-full border border-sky-400/50 text-sky-400 hover:bg-sky-400/10 hover:border-sky-400 transition-all duration-200"
          >
            Apply
          </a>
        </div>
      </nav>
    </header>
  );
}
