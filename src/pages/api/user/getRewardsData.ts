// src/pages/api/user/getRewardsData.ts
import { NextApiRequest, NextApiResponse } from "next";
import { getSupabaseClientWithAuth } from "@/app/libs/supabaseClient";
import jwt, { JwtPayload } from "jsonwebtoken";
import { RewardEntry } from "@/app/Play/User/Profile/MyRewards/Components/RewardsTable";

const getRewardsData = async (req: NextApiRequest, res: NextApiResponse) => {
  // Extract the session token from cookies
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
    // Decode the JWT to extract the user's address
    const decodedToken = jwt.verify(sessionToken, process.env.NEXTAUTH_SECRET);
    const jwtPayload = decodedToken as JwtPayload;
    const address = jwtPayload.sub;

    if (!address) {
      return res.status(401).json({ error: "Invalid token payload" });
    }

    // Create an authenticated Supabase client
    const supabase = getSupabaseClientWithAuth(sessionToken);

    // Query the rewards_table for rewards associated with the user's address
    const { data: rewardData, error } = await supabase
      .from("rewards_table")
      .select("id, task, phase, points, created_at")
      .eq("address", address);

    if (error) {
      console.error("Error fetching reward data:", error);
      return res.status(500).json({ error: "Error fetching reward data" });
    }

    if (!rewardData || rewardData.length === 0) {
      return res.status(404).json({ error: "No reward data found for user" });
    }

    // Format data to match the RewardEntry type
    const formattedData: RewardEntry[] = rewardData.map((entry) => ({
      id: entry.id,
      task: entry.task,
      phase: entry.phase,
      points: entry.points,
      createdAt: entry.created_at,
    }));

    return res.status(200).json({ rewards: formattedData });
  } catch (err) {
    console.error("Error decoding token or fetching rewards data:", err);
    return res.status(401).json({ error: "Invalid token or unauthorized" });
  }
};

export default getRewardsData;
