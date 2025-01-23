import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/app/libs/supabaseClient";
import { logger } from "@/app/utils/logger";

export default async function checkUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    logger.log("Invalid request method:", req.method);
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { address } = req.body;

  if (!address) {
    logger.log("No address provided in request body");
    return res.status(400).json({ error: "Address is required" });
  }

  try {
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("address", address)
      .maybeSingle();

    if (error) {
      logger.error("Error querying Supabase:", error);
      throw error;
    }

    if (user) {
      logger.log(`User found in Supabase: ${JSON.stringify(user)}`);
    } else {
      logger.log(`No user found in Supabase with address: ${address}`);
    }

    return res.status(200).json({ exists: Boolean(user), user });
  } catch (error) {
    logger.error("Error checking user in Supabase:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
