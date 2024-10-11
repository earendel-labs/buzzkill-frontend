import { createClient } from "@supabase/supabase-js";

// Supabase environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_API_DOMAIN!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    `Supabase environment variables are missing. 
    Ensure NEXT_PUBLIC_SUPABASE_API_DOMAIN and NEXT_PUBLIC_SUPABASE_API_KEY are set.`
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const getSupabaseClientWithAuth = (token: string) => {
  return createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        Authorization: `Bearer ${token}`, // Ensure the token is passed in the correct format
      },
    },
  });
};
