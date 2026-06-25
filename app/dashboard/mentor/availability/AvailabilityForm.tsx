"use client";

import { useEffect, useState } from "react";
import { addSlot } from "@/app/actions/mentor";

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function AvailabilityForm() {
  const [tz, setTz] = useState("");

  useEffect(() => {
    setTz(Intl.DateTimeFormat().resolvedOptions().timeZone);
  }, []);

  return (
    <form action={addSlot} className="space-y-4">
      <input type="hidden" name="timezone" value={tz} />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <select
          name="day_of_week"
          required
          defaultValue=""
          className="bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-sky-400/40"
        >
          <option value="" disabled>Day</option>
          {DAYS.map((d, i) => (
            <option key={i} value={i}>{d}</option>
          ))}
        </select>

        <input
          type="time"
          name="start_time"
          required
          placeholder="Start"
          className="bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-sky-400/40 [color-scheme:dark]"
        />

        <input
          type="time"
          name="end_time"
          required
          placeholder="End"
          className="bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-sky-400/40 [color-scheme:dark]"
        />
      </div>

      <div className="flex items-center justify-between">
        <p className="text-[11px] text-white/25">
          {tz ? `Timezone: ${tz}` : "Detecting timezone…"}
        </p>
        <button
          type="submit"
          className="px-5 py-2 rounded-xl bg-sky-400 text-[#05050f] text-sm font-semibold hover:bg-sky-300 transition-colors disabled:opacity-40"
          disabled={!tz}
        >
          Add slot
        </button>
      </div>
    </form>
  );
}
