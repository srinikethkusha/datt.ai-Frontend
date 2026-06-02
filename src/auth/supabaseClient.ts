import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

function createSupabaseClient(): SupabaseClient {
  if (!supabaseUrl?.trim() || !supabaseAnonKey?.trim()) {
    throw new Error(
      "Supabase is not configured. Create Reactjs-template/.env from .env.example and set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY (Supabase Dashboard → Settings → API).",
    );
  }

  return createClient(supabaseUrl, supabaseAnonKey);
}

export const supabase = createSupabaseClient();
