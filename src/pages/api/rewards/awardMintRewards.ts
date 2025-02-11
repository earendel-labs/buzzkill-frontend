// /pages/api/user/awardMintRewards.ts
import { NextApiRequest, NextApiResponse } from "next";
import { supabase, getSupabaseClientWithAuth } from "@/app/libs/supabaseClient";
import { logger } from "@/utils/logger";
import jwt, { JwtPayload } from "jsonwebtoken";
import { RateLimiterMemory } from "rate-limiter-flexible";

// One request per minute (per address)
const minuteRateLimiter = new RateLimiterMemory({
  points: 1,
  duration: 25,
});

// Two calls total (per address). In-memory for demonstration.
const totalUsageLimiter = new RateLimiterMemory({
  points: 2,
  duration: 365 * 24 * 60 * 60,
});

export default async function awardMintRewards(
  req: NextApiRequest,
  res: NextApiResponse
) {
  logger.log("Received request for awardMintRewards:", req.body);
  if (req.method !== "POST") {
    logger.warn(`Received ${req.method} request, expected POST`);
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
    logger.warn("Session token not found in cookies");
    return res.status(401).json({ error: "Session token not found" });
  }

  if (!process.env.NEXTAUTH_SECRET) {
    throw new Error("NEXTAUTH_SECRET not defined");
  }

  // Decode token to get address
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

  // Rate limiting
  try {
    logger.log(`Attempting to consume rate limits for address: ${address}`);

    await minuteRateLimiter.consume(address);
    await totalUsageLimiter.consume(address);
    logger.log("Rate limit check passed");
  } catch {
    logger.log("Rate limit exceeded for address:", address);
    return res.status(429).json({ error: "Rate limit exceeded" });
  }

  // Check request body
  const { task } = req.body;
  if (!task) {
    logger.log("Missing task in request body");
    return res.status(400).json({ error: "Missing task." });
  }

  // 1) Fetch points for the task
  try {
    logger.log(`Fetching points for task: ${task}`);
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

    // 2) Insert a reward entry (public Supabase client is fine if RLS allows it)
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

    // 3) Use authenticated client to read and update the user
    const supabaseAuth = getSupabaseClientWithAuth(sessionToken);

    const { data: userData, error: userError } = await supabaseAuth
      .from("users")
      .select("total_rewards, total_mints")
      .eq("address", address)
      .single();

    if (userError || !userData) {
      logger.error("User not found or error reading user:", userError);
      return res.status(404).json({ error: "User not found" });
    }

    // If user has already minted 2 times, block further mints
    const currentTotalMints = userData.total_mints || 0;
    if (currentTotalMints >= 2) {
      return res.status(400).json({ error: "User has reached max mints (2)." });
    }

    // Increment total_mints by 1
    const newTotalMints = currentTotalMints + 1;

    // Calculate new total rewards
    const currentTotalRewards = userData.total_rewards || 0;
    const newTotalRewards = currentTotalRewards + points;

    // 4) Update user with new totals
    const { error: updateError } = await supabaseAuth
      .from("users")
      .update({
        total_rewards: newTotalRewards,
        total_mints: newTotalMints,
      })
      .eq("address", address)
      .single();

    if (updateError) {
      logger.error("Error updating user:", updateError);
      return res.status(500).json({ error: "Error updating user." });
    }

    logger.log("Mint updated:", {
      rewardEntry,
      newTotalRewards,
      newTotalMints,
    });

    // Return updated info
    return res.status(200).json({
      success: true,
      reward: rewardEntry,
      newTotalRewards,
      newTotalMints,
    });
  } catch (err) {
    logger.error("Error awarding mint points:", err);
    return res.status(401).json({ error: "Invalid token or unauthorized" });
  }
}
