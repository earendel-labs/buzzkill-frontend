// /pages/api/auth/set-supabase-jwt.js
import { supabase } from "@/app/libs/supabaseClient";

export default async function handler(req, res) {
  const { userId } = req.body;

  // Get or create user in Supabase, then create a JWT
  const { data, error } = await supabase.auth.api.signInWithIdToken(userId);

  if (error) {
    return res.status(500).json({ message: "Error creating JWT" });
  }

  // Set the JWT as an HttpOnly cookie
  res.setHeader(
    "Set-Cookie",
    `token=${data.access_token}; HttpOnly; Secure; Path=/; SameSite=Strict`
  );
  return res.status(200).json({ message: "JWT set successfully" });
}
