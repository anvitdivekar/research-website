import { auth } from "@/auth";
import { getAllUsers, getAllPairs, getUserRole } from "@/lib/db";
import { addPair, removePair } from "@/app/actions/admin";
import { redirect } from "next/navigation";

export default async function PairingsPage() {
  const session = await auth();
  if (!session?.user?.email) redirect("/login");
  const role = await getUserRole(session.user.email);
  if (role !== "admin") redirect("/dashboard");

  const [users, pairs] = await Promise.all([getAllUsers(), getAllPairs()]);

  const mentors = users.filter((u) => u.role === "mentor");
  const mentees = users.filter((u) => u.role === "mentee");

  return (
    <div className="min-h-screen bg-[#03030e] px-6 py-16">
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 40%, rgba(56,189,248,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-3xl mx-auto relative z-10">
        <div className="flex items-center gap-4 mb-10">
          <a href="/dashboard" className="text-xs text-white/30 hover:text-white/60 transition-colors">
            ← Dashboard
          </a>
          <span className="text-white/10">/</span>
          <p className="text-xs uppercase tracking-[0.3em] text-sky-400/80 font-medium">Pairings</p>
        </div>

        <h1 className="text-3xl font-extralight text-white mb-2">Pairings</h1>
        <p className="text-sm text-white/40 mb-10">Assign a mentor to a mentee.</p>

        {/* Create pair form */}
        <div className="glass-card glow-border rounded-2xl p-6 mb-8">
          <p className="text-xs uppercase tracking-[0.3em] text-sky-400/80 mb-5 font-medium">New pairing</p>
          <form action={addPair} className="flex flex-col sm:flex-row gap-3">
            <select
              name="mentor_email"
              required
              className="flex-1 bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-sky-400/40"
            >
              <option value="" disabled selected>Select mentor</option>
              {mentors.map((m) => (
                <option key={m.email} value={m.email}>{m.name ?? m.email}</option>
              ))}
            </select>

            <select
              name="mentee_email"
              required
              className="flex-1 bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-sky-400/40"
            >
              <option value="" disabled selected>Select mentee</option>
              {mentees.map((m) => (
                <option key={m.email} value={m.email}>{m.name ?? m.email}</option>
              ))}
            </select>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-sky-400 text-[#05050f] text-sm font-semibold hover:bg-sky-300 transition-colors whitespace-nowrap"
            >
              Add pair
            </button>
          </form>

          {mentors.length === 0 && (
            <p className="text-xs text-white/30 mt-4">
              No mentors yet — assign users the &ldquo;mentor&rdquo; role on the{" "}
              <a href="/dashboard/admin/users" className="text-sky-400/60 hover:text-sky-400">Users page</a> first.
            </p>
          )}
          {mentees.length === 0 && (
            <p className="text-xs text-white/30 mt-4">
              No mentees yet — assign users the &ldquo;mentee&rdquo; role on the{" "}
              <a href="/dashboard/admin/users" className="text-sky-400/60 hover:text-sky-400">Users page</a> first.
            </p>
          )}
        </div>

        {/* Existing pairs */}
        <div className="space-y-3">
          {pairs.length === 0 && (
            <p className="text-sm text-white/30 text-center py-12">No pairings yet.</p>
          )}
          {pairs.map((pair) => (
            <div key={pair.id} className="glass-card rounded-2xl p-5 flex items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] uppercase tracking-widest text-sky-400/60">Mentor</span>
                  <p className="text-sm text-white font-light">
                    {pair.mentor?.name ?? pair.mentor_email}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-widest text-white/30">Mentee</span>
                  <p className="text-sm text-white/60 font-light">
                    {pair.mentee?.name ?? pair.mentee_email}
                  </p>
                </div>
              </div>

              <span className={`text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full border ${
                pair.status === "active"
                  ? "text-emerald-400/70 border-emerald-400/20"
                  : "text-white/30 border-white/10"
              }`}>
                {pair.status}
              </span>

              <form
                action={async () => {
                  "use server";
                  await removePair(pair.id);
                }}
              >
                <button
                  type="submit"
                  className="text-xs text-white/20 hover:text-red-400/60 transition-colors px-3 py-1.5 border border-white/8 hover:border-red-400/20 rounded-lg"
                >
                  Remove
                </button>
              </form>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
