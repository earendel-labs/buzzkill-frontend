import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/app/libs/supabaseClient";
import { REFERRAL_REWARD_POINTS } from "@/constants/rewards"; // Use default or synced constant

// Function to generate a unique code
function generateUniqueCode(): string {
  const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return Array(8)
    .fill(0)
    .map(() => CHARSET[Math.floor(Math.random() * CHARSET.length)])
    .join("");
}

// Helper function to fetch referral points from the database
async function getReferralRewardPoints() {
  const { data, error } = await supabase
    .from("honey_drop_tasks")
    .select("points")
    .eq("task", "Invite Rewards")
    .single();

  if (error) {
    console.error("Error fetching referral points:", error);
    return REFERRAL_REWARD_POINTS; // Use constant as fallback
  }

  return data?.points || REFERRAL_REWARD_POINTS;
}

export default async function createUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { address } = req.body;
  const referrerCode = req.query.invite as string | undefined;
  console.log("Incoming referrerCode:", referrerCode);

  if (!address) {
    return res.status(400).json({ error: "Address is required" });
  }

  try {
    let invitedBy: string | null = null;
    let referrer: {
      address: string;
      invited_count: number;
      total_rewards: number;
    } | null = null;

    // Step 1: Check if the referrer invite code exists in the database
    if (referrerCode) {
      const { data, error } = await supabase
        .from("users")
        .select("address, invite_code, invited_count, total_rewards")
        .eq("invite_code", referrerCode)
        .single();

      if (error || !data) {
        console.error(
          "Invalid referrer code provided or error fetching referrer:",
          error
        );
      } else {
        invitedBy = referrerCode;
        referrer = data;
        console.log(
          "Valid referrer found. Referrer address:",
          referrer.address
        );
        console.log(
          "Current invited_count for referrer:",
          referrer.invited_count
        );
      }
    }

    // Step 2: Generate a unique invite code for the new user
    const inviteCode = generateUniqueCode();
    console.log("Generated invite code for new user:", inviteCode);

    // Create a new user entry
    const { data: newUser, error: createUserError } = await supabase
      .from("users")
      .insert({
        address,
        total_rewards: 0,
        role: "authenticated",
        created_at: new Date().toISOString(),
        invite_code: inviteCode,
        invited_by: invitedBy,
        invited_count: 0,
      })
      .single();

    if (createUserError) {
      throw createUserError;
    }
    console.log("New user created successfully:", newUser);

    // Step 3: If a valid referrer exists, increment their invited_count and update total_rewards
    if (referrer) {
      console.log(
        "Attempting to increment invited_count for referrer with address:",
        referrer.address
      );

      // Increment invited_count using stored procedure or RPC
      const { data: updatedCount, error: rpcError } = await supabase.rpc(
        "increment_invited_count",
        { referrer_address: referrer.address }
      );

      if (rpcError) {
        console.error(
          "Error incrementing invited_count with RPC function:",
          rpcError
        );
      } else {
        console.log(
          "Successfully incremented invited_count. New count:",
          updatedCount
        );
      }

      // Step 4: Get Total Rewards
      const referralPoints = await getReferralRewardPoints();

      // Step 5: Insert an entry into rewards_table to log the referral reward
      const { data: rewardEntry, error: rewardError } = await supabase
        .from("rewards_table")
        .insert({
          address: referrer.address,
          task: "Invite Rewards",
          points: referralPoints,
          phase: "Phase 1",
          created_at: new Date().toISOString(),
        })
        .single();

      if (rewardError) {
        console.error("Error inserting entry into rewards_table:", rewardError);
      } else {
        console.log(
          rewardEntry
        );
      }
    }

    // Final response with the new user details
    return res.status(201).json({ user: newUser });
  } catch (error) {
    console.error("Error in createUser function:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
