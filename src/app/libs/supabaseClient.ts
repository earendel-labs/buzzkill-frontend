import { createClient } from "@supabase/supabase-js";

// Supabase environment variables
const supabaseUrl = process.env.SUPABASE_API_DOMAIN!;
const supabaseAnonKey = process.env.SUPABASE_API_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    `Supabase environment variables are missing. 
    Ensure NEXT_PUBLIC_SUPABASE_API_DOMAIN and  SUPABASE_API_KEY are set.`
  );
}
// Custom fetch function for logging requests and responses
const customFetch = async (
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> => {
  // Convert `input` to string if it's a URL
  const requestUrl = input instanceof URL ? input.toString() : input;

  // Log request details
  console.log("Supabase Request URL:", requestUrl);
  console.log("Supabase Request Headers:", init?.headers);
  console.log("Supabase Request Method:", init?.method);
  console.log("Supabase Request Body:", init?.body);

  // Perform the actual fetch request
  const response = await fetch(requestUrl, init);

  // Log response details
  const responseBody = await response
    .clone()
    .json()
    .catch(() => "Non-JSON response"); // Clone and handle non-JSON response
  console.log("Supabase Response Status:", response.status);
  console.log("Supabase Response Body:", responseBody);

  return response;
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  global: {
    fetch: customFetch, // Use the custom fetch function for logging
  },
});

// Create Supabase client with authentication token
export const getSupabaseClientWithAuth = (token: string) => {
  return createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        Authorization: `Bearer ${token}`,
        apikey: supabaseAnonKey,
      },
      fetch: customFetch, // Use the custom fetch function for logging
    },
  });
};
