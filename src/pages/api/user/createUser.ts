// /pages/api/user/createUser.ts
import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/app/libs/supabaseClient";
import { serialize } from "cookie";

// Function to generate a unique code

function generateUniqueCode(): string {
  // Character set limited to letters and numbers
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
  console.log("referrerCode", referrerCode);
  if (!address) {
    return res.status(400).json({ error: "Address is required" });
  }

  try {
    // Variable to store the valid referrer invite code
    let invitedBy: string | null = null;

    // Check if the referrer invite code exists in the database
    if (referrerCode) {
      const { data: referrer, error: referrerError } = await supabase
        .from("users")
        .select("invite_code")
        .eq("invite_code", referrerCode)
        .single();

      if (referrerError || !referrer) {
        console.error("Invalid referrer code provided");
      } else {
        console.log("invitedBy", invitedBy);
        // Assign the valid referrer code to invitedBy
        invitedBy = referrerCode;
      }
    }

    // Generate a unique 8-character invite code
    const inviteCode = generateUniqueCode();

    const { data: newUser, error } = await supabase
      .from("users")
      .insert({
        address,
        role: "authenticated",
        created_at: new Date().toISOString(),
        invite_code: inviteCode,
        invited_by: invitedBy,
      })
      .single();

    if (error) {
      throw error;
    }

    return res.status(201).json({ user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
