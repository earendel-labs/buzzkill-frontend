import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/app/libs/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Log to ensure the environment is correct
    console.log("Running Supabase test query");

    // Try to fetch any data from the `users` table to ensure the connection is working
    const { data, error } = await supabase.from("users").select("*").limit(1);

    // Log if there's an error
    if (error) {
      console.error("Supabase query error:", error);
      return res.status(500).json({ error: error.message });
    }

    // Log the data received
    console.log("Supabase query result:", data);

    if (!data || data.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    // Return the first user found in the database
    return res.status(200).json({ data });
  } catch (err) {
    console.error("Unexpected error:", err);
    return res.status(500).json({ error: "Unexpected error" });
  }
}
