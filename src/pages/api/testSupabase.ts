import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/app/libs/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Try to fetch any data from the `users` table to ensure the connection is working
  const { data, error } = await supabase.from("users").select("*").limit(1);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  // Return the first user found in the database
  return res.status(200).json({ data });
}
