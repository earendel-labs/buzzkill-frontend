// pages/api/user/rewards/claimYield.ts

import type { NextApiRequest, NextApiResponse } from "next";
import { getSupabaseClientWithAuth } from "@/app/libs/supabaseClient";
import { logger } from "@/utils/logger";
import jwt, { JwtPayload } from "jsonwebtoken";

export default async function claimYield(
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

  const supabaseAuth = getSupabaseClientWithAuth(sessionToken);
  const { data: user, error: userError } = await supabaseAuth
    .from("users")
    .select("pending_yield, total_yield, total_rewards")
    .eq("address", address)
    .single();

  if (userError || !user) {
    logger.error("Error fetching user data:", userError);
    return res.status(500).json({ error: "Error fetching user data" });
  }

  // If there's no pending yield, nothing to finalize
  if (user.pending_yield <= 0) {
    return res.status(400).json({ error: "No pending yield to claim" });
  }

  // Finalize the yield
  const newTotalYield = user.total_yield + user.pending_yield;
  const newTotalRewards = user.total_rewards + user.pending_yield;

  logger.log("Finalizing yield in Supabase:", {
    address,
    pendingYield: user.pending_yield,
    newTotalYield,
    newTotalRewards,
  });

  const { data: updateData, error: updateError } = await supabaseAuth
    .from("users")
    .update({
      total_yield: newTotalYield,
      total_rewards: newTotalRewards,
      pending_yield: 0,
    })
    .eq("address", address)
    .select("*")
    .single();

  if (updateError || !updateData) {
    logger.error("Error finalizing yield:", updateError);
    return res.status(500).json({ error: "Error finalizing yield" });
  }

  return res.status(200).json({
    success: true,
    finalizedAmount: user.pending_yield,
  });
}
