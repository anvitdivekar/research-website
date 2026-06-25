import { auth } from "@/auth";
import { getAllUsers, getUserRole } from "@/lib/db";
import { setUserRole } from "@/app/actions/admin";
import { redirect } from "next/navigation";
import type { Role } from "@/lib/db";

const ROLES: Role[] = ["admin", "mentor", "mentee", "pending"];

export default async function UsersPage() {
  const session = await auth();
  if (!session?.user?.email) redirect("/login");
  const role = await getUserRole(session.user.email);
  if (role !== "admin") redirect("/dashboard");

  const users = await getAllUsers();

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
          <p className="text-xs uppercase tracking-[0.3em] text-sky-400/80 font-medium">Users</p>
        </div>

        <h1 className="text-3xl font-extralight text-white mb-2">All users</h1>
        <p className="text-sm text-white/40 mb-10">{users.length} account{users.length !== 1 ? "s" : ""}</p>

        <div className="space-y-3">
          {users.length === 0 && (
            <p className="text-sm text-white/30 text-center py-12">No users yet. They&apos;ll appear here after their first login.</p>
          )}
          {users.map((user) => (
            <div
              key={user.email}
              className="glass-card rounded-2xl p-5 flex items-center gap-4"
            >
              {user.avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={user.avatar} alt={user.name ?? ""} className="w-9 h-9 rounded-full ring-1 ring-white/10 flex-shrink-0" />
              ) : (
                <div className="w-9 h-9 rounded-full bg-white/5 flex-shrink-0" />
              )}

              <div className="flex-1 min-w-0">
                <p className="text-sm text-white font-light truncate">{user.name ?? "—"}</p>
                <p className="text-xs text-white/30 truncate">{user.email}</p>
              </div>

              <form
                action={async (formData: FormData) => {
                  "use server";
                  const newRole = formData.get("role") as Role;
                  await setUserRole(user.email, newRole);
                }}
              >
                <select
                  name="role"
                  defaultValue={user.role}
                  onChange={undefined}
                  className="bg-white/[0.04] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white/70 focus:outline-none focus:border-sky-400/40 mr-2"
                >
                  {ROLES.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
                <button
                  type="submit"
                  className="text-xs text-sky-400/70 hover:text-sky-400 transition-colors border border-sky-400/20 hover:border-sky-400/40 px-3 py-1.5 rounded-lg"
                >
                  Save
                </button>
              </form>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
