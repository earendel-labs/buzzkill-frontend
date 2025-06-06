import { NextApiRequest, NextApiResponse } from "next";
import { RateLimiterMemory } from "rate-limiter-flexible";
import { supabase } from "@/app/libs/supabaseClient";
import { logger } from "@/utils/logger";

const rateLimiter = new RateLimiterMemory({ points: 10, duration: 60 });

export default async function checkAirdrop(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const ip =
    (req.headers["x-forwarded-for"] as string) ||
    req.socket.remoteAddress ||
    "unknown";

  try {
    await rateLimiter.consume(ip);
  } catch {
    logger.warn(`429 for ${ip}`);
    return res.status(429).json({ error: "Too many requests" });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { address } = req.body;
  if (!address) return res.status(400).json({ error: "Address required" });

  try {
    const { data, error } = await supabase
      .from("honey_airdrop")
      .select("honey_rewards")
      .eq("address", address)
      .maybeSingle();

    if (error) throw error; // surfaces to catch below

    if (!data) {
      return res.status(200).json({ eligible: false, rewards: 0 });
    }

    // Supabase returns int8 as string → force to number / BigInt
    const rewards = Number(data.honey_rewards);

    return res.status(200).json({ eligible: rewards > 0, rewards });
  } catch (err) {
    logger.error("Supabase query failed:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
