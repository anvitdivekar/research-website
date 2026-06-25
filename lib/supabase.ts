import { createClient } from "@supabase/supabase-js";

// Server-only — never import this into a client component
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default supabase;
