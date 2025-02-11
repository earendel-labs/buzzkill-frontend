import { NextApiRequest, NextApiResponse } from "next";
import { RateLimiterMemory } from "rate-limiter-flexible";
import { getSupabaseClientWithAuth } from "@/app/libs/supabaseClient";
import jwt from "jsonwebtoken";
import { logger } from "@/utils/logger";
const rateLimiter = new RateLimiterMemory({
  points: 5, // Allow 5 requests
  duration: 60, // Per 60 seconds
});

export default async function syncOneID(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  logger.log(`Checking...`);
  // Extract client IP
  const ip = (req.headers["x-forwarded-for"] ||
    req.socket.remoteAddress) as string;
  const clientIp = ip.split(",")[0].trim(); // Ensure the correct IP is used
  logger.log(`Checking rate limit for IP: ${clientIp}`);
  // Rate Limiting
  try {
    logger.log(`Checking rate limit for IP: ${clientIp}`);
    await rateLimiter.consume(clientIp);
    logger.log(`Rate limit passed for IP: ${clientIp}`);
  } catch (rateLimiterRes) {
    logger.warn(`Rate limit exceeded for IP: ${clientIp}`);
    return res
      .status(429)
      .json({ error: "Too many requests. Please try again later." });
  }

  // Retrieve the session token from cookies
  const cookies = req.headers.cookie?.split("; ") || [];
  const sessionToken = cookies
    .find(
      (cookie) =>
        cookie.startsWith("next-auth.session-token=") ||
        cookie.startsWith("__Secure-next-auth.session-token=")
    )
    ?.split("=")[1];

  if (!sessionToken) {
    return res.status(401).json({ error: "Session token not found" });
  }

  const { address, account_name, oneid_name, has_oneid } = req.body;

  // Validate Input
  if (!address || !oneid_name) {
    return res
      .status(400)
      .json({ error: "Address and ONEID name are required" });
  }

  // Validate OneID Name
  const validOneIDName = /^[a-zA-Z0-9-_.]+$/.test(oneid_name);
  if (!validOneIDName) {
    return res.status(400).json({
      error:
        "Invalid ONEID name. Use alphanumeric characters, hyphens, and underscores only.",
    });
  }

  try {
    const supabase = getSupabaseClientWithAuth(sessionToken);

    let updateData: any = {
      oneid_name: oneid_name,
      has_oneid: has_oneid,
    };

    if (account_name && account_name !== "") {
      updateData.account_name = account_name;
    } else if (account_name === "") {
      updateData.account_name = oneid_name;
    }

    const { data, error } = await supabase
      .from("users")
      .update(updateData)
      .eq("address", address)
      .single(); // Use .single() to get a single record

    if (error) {
      logger.error("Error updating ONEID info:", error);
      if (error.code === "PGRST116") {
        return res.status(404).json({ error: "User not found" });
      }
      return res
        .status(500)
        .json({ error: "Failed to update ONEID information" });
    }

    return res.status(200).json({ user: data });
  } catch (error) {
    logger.error("Error in syncOneID API:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
