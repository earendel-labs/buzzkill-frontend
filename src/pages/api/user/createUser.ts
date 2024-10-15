import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/app/libs/supabaseClient";

// Function to generate a unique code
function generateUniqueCode(): string {
  const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return Array(8)
    .fill(0)
    .map(() => CHARSET[Math.floor(Math.random() * CHARSET.length)])
    .join("");
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
    let referrer: { address: string; invited_count: number } | null = null;

    // Step 1: Check if the referrer invite code exists in the database
    if (referrerCode) {
      const { data, error } = await supabase
        .from("users")
        .select("address, invite_code, invited_count")
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

    // Step 2: Generate a unique 8-character invite code for the new user
    const inviteCode = generateUniqueCode();
    console.log("Generated invite code for new user:", inviteCode);

    const { data: newUser, error: createUserError } = await supabase
      .from("users")
      .insert({
        address,
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

    // Step 3: If a valid referrer exists, increment their invited_count using their address as the primary key
    if (referrer) {
      console.log(
        "Attempting to increment invited_count for referrer with address:",
        referrer.address
      );

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
    }

    return res.status(201).json({ user: newUser });
  } catch (error) {
    console.error("Error in createUser function:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
