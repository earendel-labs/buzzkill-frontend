import { createClient } from "@supabase/supabase-js";
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
// Supabase environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_API_DOMAIN!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    `Supabase environment variables are missing. 
    Ensure NEXT_PUBLIC_SUPABASE_API_DOMAIN and NEXT_PUBLIC_SUPABASE_API_KEY are set.`
  );
}

// Initialize Supabase client without authentication headers
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Function to set JWT token for authenticated requests
export const getSupabaseClientWithAuth = (token: JWT | null) => {
  if (token) {
    return createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the JWT token in the Authorization header
        },
      },
    });
  } else {
    return supabase; // Return the anon client if no token is provided
  }
};
