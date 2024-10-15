// /pages/api/user/validateInviteCode.ts
import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/app/libs/supabaseClient";
import { serialize } from "cookie";

export default async function validateInviteCode(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { invite } = req.query;

  if (!invite || typeof invite !== "string") {
    return res.status(400).json({ valid: false });
  }

  try {
    const { data, error } = await supabase
      .from("users")
      .select("invite_code")
      .eq("invite_code", invite)
      .single();

    if (error || !data) {
      return res.status(200).json({ valid: false });
    }
    // Set HTTP-only cookie if invite code is valid
    const cookie = serialize("inviteCode", invite, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60, // 1 hour
    });

    res.setHeader("Set-Cookie", cookie);
    return res.status(200).json({ valid: true });
  } catch (error) {
    console.error("Error validating invite code:", error);
    return res.status(500).json({ valid: false });
  }
}
