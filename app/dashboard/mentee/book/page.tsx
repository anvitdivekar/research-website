import { auth } from "@/auth";
import {
  getUserRole,
  getMentorForMentee,
  getAvailability,
  getSessionsForMentee,
} from "@/lib/db";
import { bookSession } from "@/app/actions/mentee";
import { redirect } from "next/navigation";

const DAYS_FULL = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
];
const DAYS_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function fmt12(time: string) {
  const [h, m] = time.split(":").map(Number);
  const ampm = h >= 12 ? "pm" : "am";
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, "0")}${ampm}`;
}

function fmtDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

// Returns next `count` dates (YYYY-MM-DD) that fall on `dayOfWeek` (0=Sun)
function nextOccurrences(dayOfWeek: number, count = 4): string[] {
  const dates: string[] = [];
  const d = new Date();
  d.setDate(d.getDate() + 1);
  d.setHours(0, 0, 0, 0);
  while (dates.length < count) {
    if (d.getDay() === dayOfWeek) {
      const y = d.getFullYear();
      const mo = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      dates.push(`${y}-${mo}-${day}`);
    }
    d.setDate(d.getDate() + 1);
  }
  return dates;
}

export default async function MenteeBookPage() {
  const session = await auth();
  if (!session?.user?.email) redirect("/login");
  const role = await getUserRole(session.user.email);
  if (role !== "mentee") redirect("/dashboard");

  const email = session.user.email;
  const [mentor, upcomingSessions] = await Promise.all([
    getMentorForMentee(email),
    getSessionsForMentee(email),
  ]);

  const slots = mentor ? await getAvailability(mentor.email) : [];

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
          <p className="text-xs uppercase tracking-[0.3em] text-sky-400/80 font-medium">Sessions</p>
        </div>

        <h1 className="text-3xl font-extralight text-white mb-2">Book a session</h1>

        {/* No mentor assigned */}
        {!mentor && (
          <div className="glass-card rounded-2xl p-8 text-center mt-8">
            <p className="text-sm text-white/40">
              You haven&apos;t been paired with a mentor yet.
              <br />
              Reach out to{" "}
              <a href="mailto:divekar.anvit@gmail.com" className="text-sky-400/60 hover:text-sky-400">
                divekar.anvit@gmail.com
              </a>{" "}
              to get assigned.
            </p>
          </div>
        )}

        {mentor && (
          <>
            {/* Mentor info */}
            <div className="glass-card rounded-2xl p-5 mb-8 flex items-center gap-4">
              {mentor.avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={mentor.avatar}
                  alt={mentor.name ?? ""}
                  className="w-11 h-11 rounded-full ring-1 ring-white/10 flex-shrink-0"
                />
              ) : (
                <div className="w-11 h-11 rounded-full bg-white/5 flex-shrink-0" />
              )}
              <div>
                <p className="text-xs uppercase tracking-widest text-sky-400/60 mb-0.5">Your mentor</p>
                <p className="text-sm text-white font-light">{mentor.name ?? mentor.email}</p>
                <p className="text-[10px] text-white/30">{mentor.email}</p>
              </div>
            </div>

            {/* Upcoming booked sessions */}
            {upcomingSessions.length > 0 && (
              <div className="mb-8">
                <p className="text-xs uppercase tracking-[0.3em] text-sky-400/80 mb-4 font-medium">
                  Upcoming sessions
                </p>
                <div className="space-y-3">
                  {upcomingSessions.map((s) => (
                    <div key={s.id} className="glass-card rounded-2xl p-4 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-sky-400/10 border border-sky-400/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-medium text-sky-400">
                          {DAYS_SHORT[new Date(s.session_date + "T12:00:00").getDay()]}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white font-light">{fmtDate(s.session_date)}</p>
                        <p className="text-[10px] text-white/40 mt-0.5">
                          {fmt12(s.start_time)} – {fmt12(s.end_time)} · {s.timezone}
                        </p>
                      </div>
                      {s.meet_link && (
                        <a
                          href={s.meet_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs px-3 py-1.5 rounded-lg bg-sky-400/10 border border-sky-400/30 text-sky-400 hover:bg-sky-400/20 transition-colors whitespace-nowrap"
                        >
                          Join Meet →
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Available slots */}
            {slots.length === 0 ? (
              <div className="glass-card rounded-2xl p-8 text-center">
                <p className="text-sm text-white/40">
                  Your mentor hasn&apos;t set any availability slots yet.
                </p>
              </div>
            ) : (
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-sky-400/80 mb-4 font-medium">
                  Available times
                </p>
                <div className="space-y-4">
                  {slots.map((slot) => {
                    const dates = nextOccurrences(slot.day_of_week);
                    return (
                      <div key={slot.id} className="glass-card glow-border rounded-2xl p-5">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-9 h-9 rounded-xl bg-sky-400/10 border border-sky-400/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-xs font-medium text-sky-400">
                              {DAYS_SHORT[slot.day_of_week]}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm text-white font-light">
                              {DAYS_FULL[slot.day_of_week]}s · {fmt12(slot.start_time)} – {fmt12(slot.end_time)}
                            </p>
                            <p className="text-[10px] text-white/30">{slot.timezone}</p>
                          </div>
                        </div>

                        <form action={bookSession} className="flex flex-wrap items-center gap-2">
                          <input type="hidden" name="availability_id" value={slot.id} />
                          <select
                            name="session_date"
                            required
                            className="flex-1 min-w-[180px] bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-sky-400/40"
                          >
                            {dates.map((d) => (
                              <option key={d} value={d}>{fmtDate(d)}</option>
                            ))}
                          </select>
                          <button
                            type="submit"
                            className="px-5 py-2 rounded-xl bg-sky-400 text-[#05050f] text-sm font-semibold hover:bg-sky-300 transition-colors whitespace-nowrap"
                          >
                            Book
                          </button>
                        </form>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
