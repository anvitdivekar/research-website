"use server";

import { auth } from "@/auth";
import {
  getUserRole,
  getMentorForMentee,
  getAvailability,
  createSession,
} from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { google } from "googleapis";

async function requireMentee() {
  const session = await auth();
  if (!session?.user?.email) redirect("/login");
  const role = await getUserRole(session.user.email);
  if (role !== "mentee") redirect("/dashboard");
  return session;
}

export async function bookSession(formData: FormData) {
  const session = await requireMentee();
  const menteeEmail = session.user!.email!;
  const menteeName = session.user!.name ?? menteeEmail;
  const accessToken = session.access_token;

  const availabilityId = formData.get("availability_id") as string;
  const sessionDate = formData.get("session_date") as string; // YYYY-MM-DD

  if (!availabilityId || !sessionDate) return;

  const mentor = await getMentorForMentee(menteeEmail);
  if (!mentor) return;

  const slots = await getAvailability(mentor.email);
  const slot = slots.find((s) => s.id === availabilityId);
  if (!slot) return;

  let googleEventId: string | undefined;
  let meetLink: string | undefined;

  if (accessToken) {
    try {
      const oauth2 = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET
      );
      oauth2.setCredentials({ access_token: accessToken });

      const calendar = google.calendar({ version: "v3", auth: oauth2 });
      const event = await calendar.events.insert({
        calendarId: "primary",
        conferenceDataVersion: 1,
        sendUpdates: "all",
        requestBody: {
          summary: `Mentorship: ${mentor.name ?? mentor.email} & ${menteeName}`,
          start: {
            dateTime: `${sessionDate}T${slot.start_time}`,
            timeZone: slot.timezone,
          },
          end: {
            dateTime: `${sessionDate}T${slot.end_time}`,
            timeZone: slot.timezone,
          },
          attendees: [
            { email: menteeEmail },
            { email: mentor.email },
          ],
          conferenceData: {
            createRequest: {
              requestId: `session-${Date.now()}`,
              conferenceSolutionKey: { type: "hangoutsMeet" },
            },
          },
        },
      });

      googleEventId = event.data.id ?? undefined;
      meetLink =
        event.data.conferenceData?.entryPoints?.find(
          (ep) => ep.entryPointType === "video"
        )?.uri ?? event.data.hangoutLink ?? undefined;
    } catch (err) {
      console.error("[mentee] Calendar API error:", err);
    }
  }

  await createSession({
    mentor_email: mentor.email,
    mentee_email: menteeEmail,
    availability_id: availabilityId,
    session_date: sessionDate,
    start_time: slot.start_time,
    end_time: slot.end_time,
    timezone: slot.timezone,
    google_event_id: googleEventId,
    meet_link: meetLink,
  });

  revalidatePath("/dashboard/mentee/book");
  redirect("/dashboard/mentee/book");
}
