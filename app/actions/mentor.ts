"use server";

import { auth } from "@/auth";
import {
  getUserRole,
  addAvailability as dbAddAvailability,
  deleteAvailability as dbDeleteAvailability,
} from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function requireMentor(): Promise<string> {
  const session = await auth();
  if (!session?.user?.email) redirect("/login");
  const role = await getUserRole(session.user.email);
  if (role !== "mentor") redirect("/dashboard");
  return session.user.email;
}

export async function addSlot(formData: FormData) {
  const email = await requireMentor();
  const day = parseInt(formData.get("day_of_week") as string, 10);
  const start_time = formData.get("start_time") as string;
  const end_time = formData.get("end_time") as string;
  const timezone = formData.get("timezone") as string;
  if (!start_time || !end_time || !timezone || isNaN(day)) return;
  const result = await dbAddAvailability(email, day, start_time, end_time, timezone);
  if (result.error) console.error("[mentor] addSlot:", result.error);
  revalidatePath("/dashboard/mentor/availability");
}

export async function removeSlot(id: string) {
  await requireMentor();
  await dbDeleteAvailability(id);
  revalidatePath("/dashboard/mentor/availability");
}
