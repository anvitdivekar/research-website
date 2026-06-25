"use server";

import { auth } from "@/auth";
import { getUserRole, updateUserRole, createPair, deletePair } from "@/lib/db";
import type { Role } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user?.email) redirect("/login");
  const role = await getUserRole(session.user.email);
  if (role !== "admin") redirect("/dashboard");
}

export async function setUserRole(email: string, role: Role) {
  await requireAdmin();
  await updateUserRole(email, role);
  revalidatePath("/dashboard/admin/users");
}

export async function addPair(formData: FormData) {
  await requireAdmin();
  const mentor_email = formData.get("mentor_email") as string;
  const mentee_email = formData.get("mentee_email") as string;
  if (!mentor_email || !mentee_email) return;
  const result = await createPair(mentor_email, mentee_email);
  if (result.error) console.error("[admin] createPair:", result.error);
  revalidatePath("/dashboard/admin/pairings");
}

export async function removePair(id: string) {
  await requireAdmin();
  await deletePair(id);
  revalidatePath("/dashboard/admin/pairings");
}
