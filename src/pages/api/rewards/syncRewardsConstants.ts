// pages/api/syncRewardsConstants.ts
import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/app/libs/supabaseClient";
import { updateRewardsConstants } from "@/constants/rewards";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Fetch reward tasks data from the database
    const { data, error } = await supabase
      .from("honey_drop_tasks")
      .select("task, points")
      .in("task", ["Daily Claim", "Invite Rewards"]);

    if (error || !data) {
      console.error("Error fetching reward constants:", error);
      return res.status(500).json({ error: "Error fetching reward constants" });
    }

    // Extract points for each task and update the constants
    const dailyBonus = data.find((task) => task.task === "Daily Claim")?.points || 100;
    const referralReward = data.find((task) => task.task === "Invite Rewards")?.points || 500;

    // Update constants in rewards.ts
    updateRewardsConstants(dailyBonus, referralReward);

    // Set Cache-Control headers for ISR
    res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate=3600");

    return res.status(200).json({ message: "Reward constants synced successfully." });
  } catch (error) {
    console.error("Error in syncRewardsConstants API:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
