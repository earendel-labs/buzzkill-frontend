import type { NextApiRequest, NextApiResponse } from "next";
import { getSupabaseClientWithAuth } from "@/app/libs/supabaseClient";
import { logger } from "@/utils/logger";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ethers } from "ethers";
import HIVE_STAKING_ABI from "@/app/libs/abi/HiveStaking.json";

export default async function claimUnstakingYield(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Get session token from cookies
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

  // Initialize Supabase client with auth and fetch user data
  const supabaseAuth = getSupabaseClientWithAuth(sessionToken);
  const { data: user, error: userError } = await supabaseAuth
    .from("users")
    .select("total_yield, total_rewards")
    .eq("address", address)
    .single();

  if (userError || !user) {
    logger.error("Error fetching user data:", userError);
    return res.status(500).json({ error: "Error fetching user data" });
  }

  // Setup RPC URLs
  const PRIMARY_RPC = process.env.BLOCKPI_RPC;
  const FALLBACK_RPC = "https://rpc.viction.xyz";

  if (!PRIMARY_RPC) {
    throw new Error("Missing environment variable: BLOCKPI_RPC");
  }
  if (!process.env.NEXT_PUBLIC_HIVE_STAKING_ADDRESS) {
    throw new Error(
      "Missing environment variable: NEXT_PUBLIC_HIVE_STAKING_ADDRESS"
    );
  }

  let provider: ethers.JsonRpcProvider;

  try {
    provider = new ethers.JsonRpcProvider(PRIMARY_RPC);
    await provider.getBlockNumber(); // Test connection
    logger.log("Connected to primary RPC:", PRIMARY_RPC);
  } catch (primaryError) {
    logger.error("Primary RPC failed, switching to fallback:", primaryError);
    try {
      provider = new ethers.JsonRpcProvider(FALLBACK_RPC);
      await provider.getBlockNumber(); // Test connection
      logger.log("Connected to fallback RPC:", FALLBACK_RPC);
    } catch (fallbackError) {
      logger.error("Fallback RPC also failed:", fallbackError);
      return res
        .status(500)
        .json({ error: "Both primary and fallback RPCs failed" });
    }
  }

  // Setup contract instance
  const hiveStakingContract = new ethers.Contract(
    process.env.NEXT_PUBLIC_HIVE_STAKING_ADDRESS,
    HIVE_STAKING_ABI,
    provider
  );

  // Call smart contract function getUserPoints
  let pointsData;
  try {
    pointsData = await hiveStakingContract.getUserPoints(address);
  } catch (err) {
    logger.error("Error calling getUserPoints:", err);
    return res
      .status(500)
      .json({ error: "Error retrieving user points from contract" });
  }

  // Extract on-chain totalPoints and claimedPoints
  const onChainTotalPoints = Number(pointsData[0].toString());
  const onChainClaimedPoints = Number(pointsData[1].toString());
  logger.log("On-chain user points:", {
    onChainTotalPoints,
    onChainClaimedPoints,
  });

  // Finalize yield
  const newTotalRewards =
    user.total_rewards + (onChainTotalPoints - user.total_yield);

  logger.log("Finalizing yield in Supabase:", {
    address,
    newTotalRewards,
  });

  // Update user record in Supabase with finalized yield and new points
  const { data: updateData, error: updateError } = await supabaseAuth
    .from("users")
    .update({
      total_yield: onChainTotalPoints,
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
    onChainTotalPoints,
    newTotalRewards,
  });
}
