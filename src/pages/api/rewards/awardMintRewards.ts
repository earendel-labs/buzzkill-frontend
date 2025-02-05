// /pages/api/user/awardMintRewards.ts
import { NextApiRequest, NextApiResponse } from "next";
import { supabase, getSupabaseClientWithAuth } from "@/app/libs/supabaseClient";
import { logger } from "@/utils/logger";
import jwt, { JwtPayload } from "jsonwebtoken";
import { RateLimiterMemory } from "rate-limiter-flexible";

// One request per minute (per address)
const minuteRateLimiter = new RateLimiterMemory({
  points: 1, // Each user can make 1 request
  duration: 60, // Per 60 seconds
});

// Two calls total (per address). To persist beyond server restarts,
// consider storing usage count in your DB. This example is purely in-memory:
const totalUsageLimiter = new RateLimiterMemory({
  points: 2, // Each user can call 2 times total
  duration: 365 * 24 * 60 * 60, // 1 year (long period)
});

export default async function awardMintRewards(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Rate limit checks must happen as soon as possible
  // We don’t know the address until after decoding the token.
  // So decode first to get an address-based key.

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
    throw new Error("NEXTAUTH_SECRET not defined");
  }

  let address: string | undefined;

  try {
    const decodedToken = jwt.verify(sessionToken, process.env.NEXTAUTH_SECRET);
    const jwtPayload = decodedToken as JwtPayload;
    address = jwtPayload.sub;
    if (!address) {
      return res.status(401).json({ error: "No address found in token" });
    }
  } catch (err) {
    logger.error("Error verifying token:", err);
    return res.status(401).json({ error: "Invalid token or unauthorized" });
  }

  // Now apply rate limiting with the user's address
  try {
    // Consume 1 point from the minute-limiter for this address
    await minuteRateLimiter.consume(address);
  } catch {
    return res
      .status(429)
      .json({ error: "Rate limit: only 1 request allowed per minute" });
  }

  try {
    // Consume 1 point from the total-usage-limiter for this address
    await totalUsageLimiter.consume(address);
  } catch {
    return res.status(429).json({
      error: "You have reached the maximum total uses of this endpoint (2)",
    });
  }

  // Safe to proceed
  const { task } = req.body;
  if (!task) {
    return res.status(400).json({ error: "Missing task." });
  }

  try {
    // 1) Fetch points for the given task
    const { data: taskData, error: taskError } = await supabase
      .from("honey_drop_tasks")
      .select("points")
      .eq("task", task)
      .single();

    if (taskError || !taskData) {
      logger.error("Error fetching task points:", taskError);
      return res.status(400).json({ error: "Invalid task" });
    }
    const points = taskData.points;

    // 2) Insert new row into rewards_table
    const { data: rewardEntry, error: rewardError } = await supabase
      .from("rewards_table")
      .insert({
        address,
        task,
        points,
        phase: "Phase 2",
        created_at: new Date().toISOString(),
      })
      .single();

    if (rewardError) {
      logger.error("Error inserting into rewards_table:", rewardError);
      return res.status(500).json({ error: "Error inserting reward" });
    }
    const supabaseAuth = getSupabaseClientWithAuth(sessionToken);

    // 3) Safely fetch and increment total_rewards in users table
    const { data: userData, error: userError } = await supabaseAuth
      .from("users")
      .select("total_rewards")
      .eq("address", address)
      .single();

    if (userError || !userData) {
      logger.error("User not found or error reading user:", userError);
      return res.status(404).json({ error: "User not found" });
    }

    const newTotalRewards = (userData.total_rewards || 0) + points;

    // 4) Update total_rewards
    const { error: updateError } = await supabaseAuth
      .from("users")
      .update({ total_rewards: newTotalRewards })
      .eq("address", address);

    if (updateError) {
      logger.error("Error updating total_rewards:", updateError);
      return res.status(500).json({ error: "Error updating total_rewards" });
    }

    logger.log("Reward entry inserted and total_rewards updated:", rewardEntry);

    // Return updated points or any data you want the client to have
    return res.status(200).json({
      success: true,
      reward: rewardEntry,
      newTotalRewards,
    });
  } catch (err) {
    logger.error("Error awarding mint points:", err);
    return res.status(401).json({ error: "Invalid token or unauthorized" });
  }
}
