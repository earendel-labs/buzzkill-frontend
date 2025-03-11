import { NextApiRequest, NextApiResponse } from "next";
import { RateLimiterMemory } from "rate-limiter-flexible";
import { supabase } from "@/app/libs/supabaseClient"; // Adjust path as needed
import { logger } from "@/utils/logger"; // Adjust path as needed

// Create a rate limiter that allows 10 requests per minute per IP.
const rateLimiter = new RateLimiterMemory({
  points: 10, // 10 requests
  duration: 60, // Per 60 seconds
});

export default async function checkWhitelist(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Identify the client IP address.
  const ip =
    (req.headers["x-forwarded-for"] as string) ||
    req.socket.remoteAddress ||
    "unknown";

  // Consume 1 point for the current IP.
  try {
    await rateLimiter.consume(ip);
  } catch (rlRejected) {
    logger.log(`Rate limit exceeded for IP: ${ip}`);
    return res.status(429).json({
      error: "Too many requests. Please try again later.",
    });
  }

  // Allow only POST requests.
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
    const { data, error } = await supabase
      .from("genesis_whitelist")
      .select("address")
      .eq("address", address)
      .maybeSingle();

    if (error) {
      logger.error("Error querying Supabase:", error);
      throw error;
    }

    const whitelisted = Boolean(data);
    return res.status(200).json({ whitelisted });
  } catch (error) {
    logger.error("Error checking whitelist:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
