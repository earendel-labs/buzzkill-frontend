// pages/api/user/rewards/pendingYield.ts

import type { NextApiRequest, NextApiResponse } from "next";
import { getSupabaseClientWithAuth } from "@/app/libs/supabaseClient";
import { logger } from "@/utils/logger";
import jwt, { JwtPayload } from "jsonwebtoken";
import { RateLimiterMemory } from "rate-limiter-flexible";

const rateLimiter = new RateLimiterMemory({
  points: 1,
  duration: 300,
});

export default async function setPendingYield(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

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
  if (!process.env.NEXTAUTH_SECRET) {
    throw new Error("NEXTAUTH_SECRET is not defined");
  }

  let address: string | undefined;
  try {
    const decoded = jwt.verify(
      sessionToken,
      process.env.NEXTAUTH_SECRET
    ) as JwtPayload;
    address = decoded.sub;
    if (!address) {
      return res.status(401).json({ error: "No address found in token" });
    }
  } catch (err) {
    logger.error("Token verification failed:", err);
    return res.status(401).json({ error: "Invalid token" });
  }

  try {
    await rateLimiter.consume(address);
  } catch {
    return res
      .status(429)
      .json({ error: "Too many requests. Please try again later." });
  }

  const protocol = req.headers.referer?.startsWith("https") ? "https" : "http";
  const baseUrl = `${protocol}://${req.headers.host}`;
  const stakingDataUrl = `${baseUrl}/api/user/rewards/getStakingData`;

  let stakingData;
  try {
    const response = await fetch(`${stakingDataUrl}?address=${address}`);
    if (!response.ok) {
      logger.error("Failed to fetch staking data:", await response.text());
      return res.status(500).json({ error: "Failed to retrieve staking data" });
    }
    stakingData = await response.json();
  } catch (err) {
    logger.error("Error fetching staking data:", err);
    return res.status(500).json({ error: "Error fetching staking data" });
  }

  const { totalUnclaimed } = stakingData;
  logger.log("Total unclaimed (pending) yield:", totalUnclaimed);

  if (!totalUnclaimed || totalUnclaimed <= 0) {
    return res.status(400).json({ error: "No yield available" });
  }

  const supabaseAuth = getSupabaseClientWithAuth(sessionToken);
  const { data: user, error: fetchError } = await supabaseAuth
    .from("users")
    .select("pending_yield")
    .eq("address", address)
    .single();

  if (fetchError || !user) {
    logger.error("Error fetching pending yield:", fetchError);
    return res.status(500).json({ error: "Error fetching user data" });
  }

  const newPendingYield = Math.floor(user.pending_yield + totalUnclaimed);
  logger.log("Updating pending yield in Supabase:", {
    address,
    oldPendingYield: user.pending_yield,
    newPendingYield,
  });

  const { data: updateData, error: updateError } = await supabaseAuth
    .from("users")
    .update({ pending_yield: newPendingYield })
    .eq("address", address)
    .select("*")
    .single();

  if (updateError || !updateData) {
    logger.error("Error updating pending yield:", updateError);
    return res.status(500).json({ error: "Error updating pending yield" });
  }

  return res.status(200).json({
    success: true,
    pendingYield: newPendingYield,
  });
}
