// pages/api/auth/nonce.ts

import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/app/libs/supabaseClient";
import crypto from "crypto";

/**
 * API route to generate and store a unique nonce for SIWE.
 * @param req - Next.js API request.
 * @param res - Next.js API response.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    // Generate a secure random nonce
    const nonce = crypto.randomBytes(16).toString("base64");

    // Store nonce in Supabase with current timestamp
    const { data, error } = await supabase
      .from("nonces")
      .insert([
        { nonce: nonce, created_at: new Date().toISOString() },
      ]);

    if (error) {
      console.error("Error storing nonce in Supabase:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    // Return the nonce
    return res.status(200).json({ nonce });
  } catch (error) {
    console.error("Error generating nonce:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
