import { auth, signOut } from "@/auth";
import { upsertUser } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.email) redirect("/login");

  const { email, name, image } = session.user;

  // Upsert user and get their current role from DB
  const role = await upsertUser(email, name ?? null, image ?? null);

  return (
    <div className="min-h-screen bg-[#03030e] flex items-center justify-center px-6">
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 40%, rgba(56,189,248,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="w-full max-w-lg relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            {image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={image} alt={name ?? ""} className="w-9 h-9 rounded-full ring-1 ring-white/10" />
            )}
            <div>
              <p className="text-sm text-white font-light">{name}</p>
              <p className="text-[10px] text-white/30 uppercase tracking-widest">{role}</p>
            </div>
          </div>

          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <button
              type="submit"
              className="text-xs text-white/30 hover:text-white/60 transition-colors px-3 py-1.5 border border-white/10 rounded-lg"
            >
              Sign out
            </button>
          </form>
        </div>

        {role === "admin"   && <AdminView   name={name ?? "Admin"} />}
        {role === "mentor"  && <MentorView  name={name ?? "Mentor"} />}
        {role === "mentee"  && <MenteeView  name={name ?? "Mentee"} />}
        {role === "pending" && <PendingView />}
      </div>
    </div>
  );
}

function AdminView({ name }: { name: string }) {
  return (
    <div className="glass-card glow-border rounded-3xl p-8">
      <p className="text-xs uppercase tracking-[0.4em] text-sky-400/80 mb-6 font-medium">Admin</p>
      <h2 className="text-2xl font-extralight text-white mb-2">Hey, {name.split(" ")[0]}.</h2>
      <p className="text-sm text-white/40 font-light mb-8">Full access.</p>
      <div className="space-y-3">
        {[
          ["Users",    "View accounts and assign roles",          "/dashboard/admin/users"],
          ["Pairings", "Assign mentors to mentees",               "/dashboard/admin/pairings"],
        ].map(([title, desc, href]) => (
          <a
            key={href}
            href={href}
            className="flex items-center justify-between p-4 rounded-xl border border-white/8 hover:border-sky-400/30 hover:bg-white/[0.02] transition-all group"
          >
            <div>
              <p className="text-sm text-white font-light">{title}</p>
              <p className="text-xs text-white/30 mt-0.5">{desc}</p>
            </div>
            <span className="text-white/20 group-hover:text-sky-400/60 transition-colors text-lg">→</span>
          </a>
        ))}
      </div>
    </div>
  );
}

function MentorView({ name }: { name: string }) {
  return (
    <div className="glass-card glow-border rounded-3xl p-8">
      <p className="text-xs uppercase tracking-[0.4em] text-sky-400/80 mb-6 font-medium">Mentor</p>
      <h2 className="text-2xl font-extralight text-white mb-2">Hey, {name.split(" ")[0]}.</h2>
      <p className="text-sm text-white/40 font-light mb-8">Your mentor dashboard is coming soon.</p>
      <div className="space-y-3 opacity-40 pointer-events-none">
        {["My Mentees", "Set Availability", "Upcoming Sessions"].map((t) => (
          <div key={t} className="p-4 rounded-xl border border-white/8">
            <p className="text-sm text-white font-light">{t}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function MenteeView({ name }: { name: string }) {
  return (
    <div className="glass-card glow-border rounded-3xl p-8">
      <p className="text-xs uppercase tracking-[0.4em] text-sky-400/80 mb-6 font-medium">Mentee</p>
      <h2 className="text-2xl font-extralight text-white mb-2">Hey, {name.split(" ")[0]}.</h2>
      <p className="text-sm text-white/40 font-light mb-8">Your mentee dashboard is coming soon.</p>
      <div className="space-y-3 opacity-40 pointer-events-none">
        {["My Mentor", "Book a Session", "Program Timeline"].map((t) => (
          <div key={t} className="p-4 rounded-xl border border-white/8">
            <p className="text-sm text-white font-light">{t}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function PendingView() {
  return (
    <div className="glass-card glow-border rounded-3xl p-8 text-center">
      <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mx-auto mb-6 text-white/30 text-xl">
        ⏳
      </div>
      <h2 className="text-xl font-extralight text-white mb-3">Account pending</h2>
      <p className="text-sm text-white/40 font-light leading-relaxed">
        Your account hasn&apos;t been assigned a role yet.
        <br />
        Reach out to{" "}
        <a href="mailto:divekar.anvit@gmail.com" className="text-sky-400/60 hover:text-sky-400 transition-colors">
          divekar.anvit@gmail.com
        </a>{" "}
        once you&apos;ve been accepted.
      </p>
    </div>
  );
}
