import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/app/libs/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { address } = req.body;

  if (!address) {
    return res.status(400).json({ error: "Address is required" });
  }

  // Check if the address exists in your Supabase database
  const { data, error } = await supabase
    .from("users") // Assuming you have a 'users' table in Supabase
    .select("id")
    .eq("wallet_address", address)
    .single();

  if (error || !data) {
    return res.status(404).json({ exists: false });
  }

  // Return that the account exists
  return res.status(200).json({ exists: true });
}
