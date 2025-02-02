// src/pages/api/user/getProfile.ts

import { NextApiRequest, NextApiResponse } from "next";
import { getSupabaseClientWithAuth } from "@/app/libs/supabaseClient";
import jwt, { JwtPayload } from "jsonwebtoken";
import { logger } from "@/utils/logger";
const getProfile = async (req: NextApiRequest, res: NextApiResponse) => {
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
    throw new Error("Error: NEXTAUTH_SECRET not defined");
  }

  try {
    const decodedToken = jwt.verify(sessionToken, process.env.NEXTAUTH_SECRET);
    const jwtPayload = decodedToken as JwtPayload;
    logger.log("Manually decoded token:", jwtPayload);

    const supabase = getSupabaseClientWithAuth(sessionToken);
    const address = jwtPayload.sub;
    if (!address) {
      throw new Error("error no JWT payload");
    }
    logger.log("address from payload", address);
    const { data: userData, error } = await supabase
      .from("users")
      .select(
        "account_name, email_address, address, invited_count, invite_code, total_rewards, oneid_name, has_oneid"
      )
      .eq("address", address)
      .maybeSingle();

    if (error) {
      logger.error("Error fetching profile:", error);
    }

    if (!userData) {
      return res.status(404).json({ error: "Profile not found" });
    }

    const profileData = {
      account_name: userData.account_name || "",
      email_address: userData.email_address || "",
      address: userData.address,
      invite_code: userData.invite_code,
      invited_count: userData.invited_count,
      total_rewards: userData.total_rewards,
      oneid_name: userData.oneid_name || null,
      has_oneid: userData.has_oneid,
    };
    logger.log("profileData returned: ", profileData);
    return res.status(200).json(profileData);
  } catch (err) {
    logger.error("Error decoding token or fetching profile:", err);
    return res.status(401).json({ error: "Invalid token or unauthorized" });
  }
};

export default getProfile;
