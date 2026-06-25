import { auth } from "@/auth";
import { getUserRole, getAvailability, getMenteesForMentor } from "@/lib/db";
import { removeSlot } from "@/app/actions/mentor";
import { redirect } from "next/navigation";
import AvailabilityForm from "./AvailabilityForm";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function fmt12(time: string) {
  const [h, m] = time.split(":").map(Number);
  const ampm = h >= 12 ? "pm" : "am";
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, "0")}${ampm}`;
}

export default async function MentorAvailabilityPage() {
  const session = await auth();
  if (!session?.user?.email) redirect("/login");
  const role = await getUserRole(session.user.email);
  if (role !== "mentor") redirect("/dashboard");

  const email = session.user.email;
  const [slots, mentees] = await Promise.all([
    getAvailability(email),
    getMenteesForMentor(email),
  ]);

  return (
    <div className="min-h-screen bg-[#03030e] px-6 py-16">
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 40%, rgba(56,189,248,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-2xl mx-auto relative z-10">
        <div className="flex items-center gap-4 mb-10">
          <a href="/dashboard" className="text-xs text-white/30 hover:text-white/60 transition-colors">
            ← Dashboard
          </a>
          <span className="text-white/10">/</span>
          <p className="text-xs uppercase tracking-[0.3em] text-sky-400/80 font-medium">Availability</p>
        </div>

        <h1 className="text-3xl font-extralight text-white mb-2">My availability</h1>
        <p className="text-sm text-white/40 mb-10">
          Set recurring weekly time blocks. Mentees will pick from these slots.
        </p>

        {/* Assigned mentees */}
        {mentees.length > 0 && (
          <div className="glass-card rounded-2xl p-5 mb-8">
            <p className="text-xs uppercase tracking-[0.3em] text-sky-400/80 mb-4 font-medium">
              My mentee{mentees.length !== 1 ? "s" : ""}
            </p>
            <div className="space-y-2">
              {mentees.map((m) => (
                <div key={m.email} className="flex items-center gap-3">
                  {m.avatar ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={m.avatar} alt={m.name ?? ""} className="w-7 h-7 rounded-full ring-1 ring-white/10 flex-shrink-0" />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-white/5 flex-shrink-0" />
                  )}
                  <div>
                    <p className="text-sm text-white font-light">{m.name ?? m.email}</p>
                    <p className="text-[10px] text-white/30">{m.email}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add slot form */}
        <div className="glass-card glow-border rounded-2xl p-6 mb-8">
          <p className="text-xs uppercase tracking-[0.3em] text-sky-400/80 mb-5 font-medium">
            Add time block
          </p>
          <AvailabilityForm />
        </div>

        {/* Existing slots */}
        <div className="space-y-3">
          {slots.length === 0 && (
            <p className="text-sm text-white/30 text-center py-12">
              No slots yet. Add your first time block above.
            </p>
          )}
          {slots.map((slot) => (
            <div key={slot.id} className="glass-card rounded-2xl p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-sky-400/10 border border-sky-400/20 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-medium text-sky-400">{DAYS[slot.day_of_week]}</span>
              </div>

              <div className="flex-1">
                <p className="text-sm text-white font-light">
                  {fmt12(slot.start_time)} – {fmt12(slot.end_time)}
                </p>
                <p className="text-[10px] text-white/30 mt-0.5">{slot.timezone}</p>
              </div>

              <form
                action={async () => {
                  "use server";
                  await removeSlot(slot.id);
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
