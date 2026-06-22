"use client";

import { useState } from "react";

const RESEARCH_AREAS = [
  "Neuroscience",
  "Health Systems & Policy",
  "Molecular Biology",
  "Clinical Research",
  "Biomedical Engineering",
  "Computer Science & AI",
  "Other / Not sure yet",
];

const GRADES = ["Grade 9", "Grade 10", "Grade 11", "Grade 12", "Gap year / other"];

const HEAR_FROM = [
  "Friend or classmate",
  "Teacher or counselor",
  "Social media",
  "Google search",
  "Other",
];

type Status = "idle" | "submitting" | "success" | "error";

export default function Apply() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    name: "", email: "", grade: "", location: "",
    area: "", why: "", topic: "", hours: "", hear: "",
  });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("https://formsubmit.co/ajax/divekar.anvit@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...form, _subject: "New Mentorship Application" }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  const inputCls = "w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-sky-400/40 transition-colors";
  const labelCls = "text-xs text-white/40 uppercase tracking-widest block mb-2";

  return (
    <section id="apply" className="relative py-32 px-6" style={{ background: "rgba(3,3,14,0.35)" }}>
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.4em] text-sky-400/80 mb-6 font-medium">
            Applications
          </p>
          <h2 className="text-4xl md:text-5xl font-extralight tracking-tight text-white leading-tight mb-6">
            Ready to begin?
          </h2>
          <p className="text-white/50 font-light text-lg max-w-xl mx-auto leading-relaxed">
            Applications are reviewed on a rolling basis. Takes about 5 minutes.
          </p>
        </div>

        <div className="glass-card glow-border rounded-3xl p-8 md:p-10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-sm font-medium text-white">Mentorship Application</p>
              <p className="text-xs text-white/40 mt-1">Free — always</p>
            </div>
            <span className="text-[10px] uppercase tracking-widest text-sky-400/60 border border-sky-400/20 px-3 py-1.5 rounded-full">
              Open
            </span>
          </div>

          {status === "success" ? (
            <div className="text-center py-12">
              <div className="w-12 h-12 rounded-full border border-sky-400/40 flex items-center justify-center mx-auto mb-4 text-sky-400 text-xl">✓</div>
              <p className="text-white font-light text-lg mb-2">Application received.</p>
              <p className="text-white/40 text-sm">We&apos;ll be in touch within 1–2 weeks.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Full Name</label>
                  <input required placeholder="Your name" value={form.name} onChange={set("name")} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Email</label>
                  <input required type="email" placeholder="your@email.com" value={form.email} onChange={set("email")} className={inputCls} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Grade</label>
                  <select required value={form.grade} onChange={set("grade")} className={inputCls}>
                    <option value="" disabled>Select grade</option>
                    {GRADES.map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>City / Country</label>
                  <input required placeholder="e.g. Atlanta, USA" value={form.location} onChange={set("location")} className={inputCls} />
                </div>
              </div>

              <div>
                <label className={labelCls}>Research Area Interest</label>
                <select required value={form.area} onChange={set("area")} className={inputCls}>
                  <option value="" disabled>Select an area</option>
                  {RESEARCH_AREAS.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>

              <div>
                <label className={labelCls}>Why do you want to do research?</label>
                <textarea required rows={3} placeholder="What draws you to research? What do you hope to learn or accomplish?" value={form.why} onChange={set("why")} className={`${inputCls} resize-none`} />
              </div>

              <div>
                <label className={labelCls}>What topic would you like to research? (if you have one)</label>
                <textarea rows={2} placeholder="A question, problem, or area you're curious about. It's okay if you don't have one yet." value={form.topic} onChange={set("topic")} className={`${inputCls} resize-none`} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Hours available per week</label>
                  <input required placeholder="e.g. 6" value={form.hours} onChange={set("hours")} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>How did you hear about us?</label>
                  <select value={form.hear} onChange={set("hear")} className={inputCls}>
                    <option value="">Select one</option>
                    {HEAR_FROM.map(h => <option key={h} value={h}>{h}</option>)}
                  </select>
                </div>
              </div>

              {status === "error" && (
                <p className="text-red-400/80 text-xs text-center">
                  Something went wrong. Email us directly at{" "}
                  <a href="mailto:contact@anvitdivekar.com" className="underline">contact@anvitdivekar.com</a>
                </p>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full py-3.5 rounded-xl bg-sky-400 text-[#05050f] text-sm font-semibold tracking-wide hover:bg-sky-300 transition-all duration-200 hover:shadow-lg hover:shadow-sky-400/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "submitting" ? "Submitting…" : "Submit Application"}
              </button>

              <p className="text-center text-xs text-white/25">
                Reviewed within 1–2 weeks · Free · No spam
              </p>
            </form>
          )}
        </div>
      </div>

      <div className="section-divider mt-32" />
    </section>
  );
}
