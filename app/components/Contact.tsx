"use client";

const links = [
  {
    label: "Email",
    value: "contact@anvitdivekar.com",
    href: "mailto:contact@anvitdivekar.com",
    icon: "✉",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/anvitdivekar",
    href: "https://linkedin.com/in/anvitdivekar",
    icon: "↗",
  },
  {
    label: "Google Scholar",
    value: "Scholar Profile",
    href: "https://scholar.google.com/citations?user=REPLACE_WITH_YOUR_SCHOLAR_ID",
    icon: "↗",
  },
  {
    label: "Organ Access Initiative",
    value: "organaccessinitiative.org",
    href: "https://organaccessinitiative.org",
    icon: "↗",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="relative py-32 px-6" style={{ background: "rgba(3,3,14,0.35)" }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-sky-400/80 mb-6 font-medium">
              Contact
            </p>
            <h2 className="text-4xl md:text-5xl font-extralight tracking-tight text-white leading-tight mb-8">
              Let&apos;s connect.
            </h2>
            <p className="text-white/50 font-light leading-relaxed max-w-sm">
              Whether you&apos;re a prospective mentee, a collaborating researcher, a journalist, or
              just curious — feel free to reach out.
            </p>

            <div className="mt-12 space-y-4">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-white/40 group-hover:border-sky-400/30 group-hover:text-sky-400 transition-all">
                    {l.icon}
                  </div>
                  <div>
                    <p className="text-xs text-white/30 uppercase tracking-widest mb-0.5">
                      {l.label}
                    </p>
                    <p className="text-sm text-white/70 group-hover:text-white transition-colors">
                      {l.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Quick contact form */}
          <div className="glass-card glow-border rounded-3xl p-8">
            <h3 className="text-lg font-light text-white mb-8">Send a message</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                // Replace with your form handler (e.g. Formspree, Resend, etc.)
                alert("Thanks for reaching out! I'll get back to you soon.");
              }}
              className="space-y-5"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-white/40 uppercase tracking-widest block mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-sky-400/40 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs text-white/40 uppercase tracking-widest block mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-sky-400/40 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-white/40 uppercase tracking-widest block mb-2">
                  Subject
                </label>
                <select className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white/80 focus:outline-none focus:border-sky-400/40 transition-colors appearance-none">
                  <option value="mentorship">Mentorship inquiry</option>
                  <option value="collaboration">Research collaboration</option>
                  <option value="media">Media / press</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-white/40 uppercase tracking-widest block mb-2">
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="What's on your mind?"
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-sky-400/40 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-sky-400 text-[#05050f] text-sm font-semibold tracking-wide hover:bg-sky-300 transition-all duration-200 hover:shadow-lg hover:shadow-sky-400/30"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
