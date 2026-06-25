import supabase from "./supabase";

export type Role = "admin" | "mentor" | "mentee" | "pending";

export interface User {
  email: string;
  name: string | null;
  avatar: string | null;
  role: Role;
  created_at: string;
}

export interface Pair {
  id: string;
  mentor_email: string;
  mentee_email: string;
  status: string;
  start_date: string;
  created_at: string;
  mentor?: User;
  mentee?: User;
}

// Upsert user on login, return their current role
export async function upsertUser(
  email: string,
  name: string | null,
  avatar: string | null
): Promise<Role> {
  const { data, error } = await supabase
    .from("users")
    .upsert({ email, name, avatar }, { onConflict: "email", ignoreDuplicates: false })
    .select("role")
    .single();

  if (error) {
    console.error("[db] upsertUser error:", error.message);
    return "pending";
  }
  return (data?.role ?? "pending") as Role;
}

export async function getUserRole(email: string): Promise<Role> {
  const { data } = await supabase
    .from("users")
    .select("role")
    .eq("email", email)
    .single();
  return (data?.role ?? "pending") as Role;
}

export async function getAllUsers(): Promise<User[]> {
  const { data } = await supabase
    .from("users")
    .select("*")
    .order("created_at", { ascending: false });
  return (data ?? []) as User[];
}

export async function updateUserRole(email: string, role: Role): Promise<void> {
  await supabase.from("users").update({ role }).eq("email", email);
}

export async function getAllPairs(): Promise<Pair[]> {
  const { data } = await supabase
    .from("pairs")
    .select(`
      *,
      mentor:users!pairs_mentor_email_fkey(email, name, avatar, role, created_at),
      mentee:users!pairs_mentee_email_fkey(email, name, avatar, role, created_at)
    `)
    .order("created_at", { ascending: false });
  return (data ?? []) as Pair[];
}

export async function createPair(
  mentor_email: string,
  mentee_email: string
): Promise<{ error?: string }> {
  const { error } = await supabase
    .from("pairs")
    .insert({ mentor_email, mentee_email });
  if (error) return { error: error.message };
  return {};
}

export async function deletePair(id: string): Promise<void> {
  await supabase.from("pairs").delete().eq("id", id);
}
