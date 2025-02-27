// /pages/api/user/awardNftSnapshots.ts
import { NextApiRequest, NextApiResponse } from "next";
import jwt, { JwtPayload } from "jsonwebtoken";
import { getSupabaseClientWithAuth } from "@/app/libs/supabaseClient";
import { logger } from "@/utils/logger";

// Map each user boolean to the corresponding snapshot field and task
const NFT_MAPPINGS = [
  {
    userField: "has_contrarians",
    snapshotField: "has_contrarians",
    task: "Contrarian Holder",
  },
  {
    userField: "has_ivy",
    snapshotField: "has_ivy",
    task: "IVY holder",
  },
  {
    userField: "has_starship",
    snapshotField: "has_starship",
    task: "Starship Holder",
  },
];

export default async function awardNftSnapshots(
  req: NextApiRequest,
  res: NextApiResponse
) {
  logger.log("awardNftSnapshots invoked", { method: req.method, url: req.url });

  if (req.method !== "POST") {
    logger.warn("Method not allowed", { method: req.method });
    return res.status(405).json({ error: "Method not allowed" });
  }

  // 1) Get session token from cookies
  logger.log("Extracting session token from cookies");
  const cookies = req.headers.cookie?.split("; ") || [];
  const sessionToken = cookies
    .find(
      (cookie) =>
        cookie.startsWith("next-auth.session-token=") ||
        cookie.startsWith("__Secure-next-auth.session-token=")
    )
    ?.split("=")[1];

  if (!sessionToken) {
    logger.error("Session token missing");
    return res.status(401).json({ error: "Session token missing" });
  }
  logger.log("Session token found");

  // 2) Decode token to get address
  let address: string | undefined;
  try {
    if (!process.env.NEXTAUTH_SECRET) {
      throw new Error("NEXTAUTH_SECRET missing");
    }
    const decodedToken = jwt.verify(sessionToken, process.env.NEXTAUTH_SECRET);
    const jwtPayload = decodedToken as JwtPayload;
    address = jwtPayload.sub;
    if (!address) {
      logger.error("No address found in token");
      return res.status(401).json({ error: "No address found in token" });
    }
    logger.log("Token verified", { address });
  } catch (err) {
    logger.error("Error verifying session token:", err);
    return res.status(401).json({ error: "Invalid token" });
  }
  const supabase = getSupabaseClientWithAuth(sessionToken);

  // 3) Fetch user
  logger.log("Fetching user data", { address });
  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("*")
    .eq("address", address)
    .single();

  if (userError || !userData) {
    logger.error("User not found", { address, error: userError });
    return res.status(404).json({ error: "User not found" });
  }
  logger.log("User data fetched", {
    userData: {
      address: userData.address,
      total_rewards: userData.total_rewards,
    },
  });

  // 4) Fetch nft_snapshot for this user
  logger.log("Fetching NFT snapshot data", { address });
  const { data: snapshotData, error: snapshotError } = await supabase
    .from("nft_snapshots")
    .select("*")
    .eq("address", address)
    .single();

  if (snapshotError) {
    logger.warn("No snapshot found or error fetching snapshot", {
      address,
      error: snapshotError,
    });
  }

  if (!snapshotData) {
    logger.log("No NFT records found", { address });
    return res.status(200).json({
      message: "No NFT records found. Nothing to update.",
      updated: false,
    });
  }
  logger.log("NFT snapshot data fetched", { snapshotData });

  // 5) Prepare to update user data
  let newTotalRewards = Number(userData.total_rewards) || 0;
  const updates: Record<string, boolean> = {};
  const rewardInserts = [];

  // 6) Loop through each mapped NFT field
  logger.log("Processing NFT mappings", { mappings: NFT_MAPPINGS });
  for (const item of NFT_MAPPINGS) {
    const userHasIt = !!userData[item.userField];
    const snapshotHasIt = !!snapshotData[item.snapshotField];

    logger.log("Processing mapping", {
      userField: item.userField,
      snapshotField: item.snapshotField,
      userHasIt,
      snapshotHasIt,
      task: item.task,
    });

    // Skip if user already has it or snapshot says user doesn't own it
    if (userHasIt || !snapshotHasIt) {
      logger.log("Skipping mapping", {
        item,
        reason: userHasIt
          ? "User already has NFT"
          : "Snapshot indicates user doesn't own NFT",
      });
      continue;
    }

    // Update user boolean and prepare reward insert
    updates[item.userField] = true;

    // Fetch points for the matching task
    logger.log("Fetching task points", { task: item.task });
    const { data: taskRow, error: taskError } = await supabase
      .from("honey_drop_tasks")
      .select("points")
      .eq("task", item.task)
      .single();

    if (taskError || !taskRow) {
      logger.error(`Error fetching points for ${item.task}`, {
        error: taskError,
      });
      continue;
    }

    const points = Number(taskRow.points) || 0;
    newTotalRewards += points;

    rewardInserts.push({
      address: address,
      task: item.task,
      points: points,
      phase: "Phase 1", // or Phase 2 depending on your logic
      created_at: new Date().toISOString(),
    });

    logger.log("Prepared reward insert", {
      task: item.task,
      points,
      newTotalRewards,
    });
  }

  // If no updates are needed, return early
  if (Object.keys(updates).length === 0) {
    logger.log("No new NFT updates required", { address });
    return res.status(200).json({
      message:
        "User already has all relevant NFT booleans set or no NFT found.",
      updated: false,
    });
  }

  // 7) Update user booleans and total_rewards
  logger.log("Updating user booleans and total rewards", {
    updates,
    newTotalRewards,
    address,
  });
  const { error: updateUserError } = await supabase
    .from("users")
    .update({
      ...updates,
      total_rewards: newTotalRewards,
    })
    .eq("address", address)
    .single();

  if (updateUserError) {
    logger.error("Error updating user data", {
      address,
      error: updateUserError,
    });
    return res.status(500).json({ error: "Error updating user data" });
  }
  logger.log("User data updated successfully", { address, updates });

  // 8) Insert reward logs
  if (rewardInserts.length > 0) {
    logger.log("Inserting rewards log", { rewardInserts });
    const { error: rewardInsertError } = await supabase
      .from("rewards_table")
      .insert(rewardInserts);

    if (rewardInsertError) {
      logger.error("Error inserting rewards entries", {
        address,
        error: rewardInsertError,
      });
      return res.status(500).json({ error: "Error inserting rewards entries" });
    }
    logger.log("Reward entries inserted successfully", { address });
  }

  logger.log("Endpoint processing complete", { address, newTotalRewards });
  return res.status(200).json({
    message: "User booleans and rewards updated.",
    updated: true,
    newTotalRewards,
  });
}
