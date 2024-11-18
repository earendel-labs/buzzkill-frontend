// pages/api/user/syncOneID.ts

import { NextApiRequest, NextApiResponse } from "next";
import { getSupabaseClientWithAuth } from "@/app/libs/supabaseClient";
import jwt, { JwtPayload } from "jsonwebtoken";

export default async function syncOneID(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Retrieve the session token from cookies
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

  const { address, account_name, oneid_name, has_oneid } = req.body;

  if (!address || !oneid_name) {
    return res
      .status(400)
      .json({ error: "Address and ONEID name are required" });
  }

  if (!process.env.NEXTAUTH_SECRET) {
    throw new Error("Error: NEXTAUTH_SECRET not defined");
  }

  console.log("account_name inside syncOneID:", account_name);

  try {
    const supabase = getSupabaseClientWithAuth(sessionToken);

    let updateData: any = {
      oneid_name: oneid_name,
      has_oneid: has_oneid,
    };

    if (account_name && account_name !== "Not provided") {
      updateData.account_name = account_name;
    } else if (account_name === "Not provided") {
      updateData.account_name = oneid_name;
    }

    const { data, error } = await supabase
      .from("users")
      .update(updateData)
      .eq("address", address)
      .single(); // Use .single() to get a single record

    if (error) {
      console.error("Error updating ONEID info:", error);
      // Check if the error is due to no rows found
      if (error.code === "PGRST116") {
        return res.status(404).json({ error: "User not found" });
      }
      return res
        .status(500)
        .json({ error: "Failed to update ONEID information" });
    }

    return res.status(200).json({ user: data });
  } catch (error) {
    console.error("Error in syncOneID API:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
