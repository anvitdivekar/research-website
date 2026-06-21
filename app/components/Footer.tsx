export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 px-6" style={{ background: "rgba(3,3,14,0.85)" }}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="text-sm font-semibold tracking-widest uppercase text-white/60">
            Anvit Divekar
          </p>
          <p className="text-xs text-white/25 mt-1">
            Research @ Harvard · Brown · Emory · Georgia Tech
          </p>
        </div>

        <nav className="flex items-center gap-6">
          {["About", "Research", "Mentorship", "Publications", "Apply", "Contact"].map(
            (item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-xs text-white/30 hover:text-white/60 transition-colors tracking-wide"
              >
                {item}
              </a>
            )
          )}
        </nav>

        <p className="text-xs text-white/20">
          © {new Date().getFullYear()} Anvit Divekar
        </p>
      </div>
    </footer>
  );
}
