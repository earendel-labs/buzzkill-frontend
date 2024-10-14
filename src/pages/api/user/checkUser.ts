// /pages/api/user/checkUser.ts
import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/app/libs/supabaseClient";

export default async function checkUser(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { address } = req.body;

  if (!address) {
    return res.status(400).json({ error: "Address is required" });
  }

  try {
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("address", address)
      .maybeSingle();

    if (error) {
      throw error;
    }

    return res.status(200).json({ exists: Boolean(user), user });
  } catch (error) {
    console.error("Error checking user:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
