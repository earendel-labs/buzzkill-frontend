// /pages/api/user/createUser.ts
import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/app/libs/supabaseClient";

export default async function createUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { address } = req.body;

  if (!address) {
    return res.status(400).json({ error: "Address is required" });
  }

  try {
    const { data: newUser, error } = await supabase
      .from("users")
      .insert({
        address,
        role: "authenticated",
        created_at: new Date().toISOString(),
      })
      .single();

    if (error) {
      throw error;
    }

    return res.status(201).json({ user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
