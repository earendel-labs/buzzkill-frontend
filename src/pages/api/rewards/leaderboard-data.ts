// src/pages/api/rewards/leaderboard-data.ts

import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/app/libs/supabaseClient";
import { LeaderboardEntry } from "@/app/HoneyDrops/Components/leaderboardTable";

// Define the raw data type returned by Supabase
interface RawLeaderboardEntry {
  rank: number;
  account_name: string | null;
  address: string;
  invited_count: number;
  total_rewards: number;
}

// Helper function to map raw data to LeaderboardEntry
function mapToLeaderboardEntry(raw: RawLeaderboardEntry): LeaderboardEntry {
  return {
    rank: raw.rank,
    account_name: raw.account_name,
    address: raw.address,
    invited_count: raw.invited_count,
    total_rewards: raw.total_rewards,
  };
}

// Updated validation to check for RawLeaderboardEntry
function isRawLeaderboardEntry(obj: any): obj is RawLeaderboardEntry {
  return (
    typeof obj.rank === "number" &&
    (typeof obj.account_name === "string" || obj.account_name === null) &&
    typeof obj.address === "string" &&
    typeof obj.invited_count === "number" &&
    typeof obj.total_rewards === "number"
  );
}

export const getLeaderboardData = async (): Promise<LeaderboardEntry[]> => {
  const { data, error } = await supabase
    .from("leaderboard")
    .select("*")
    .order("rank", { ascending: true })
    .limit(100);

  if (error) {
    console.error("Error fetching leaderboard data:", error.message);
    return []; // Return an empty array on error
  }

  // Validate each item in data and map to LeaderboardEntry
  return (data || [])
    .filter(isRawLeaderboardEntry)
    .map(mapToLeaderboardEntry);
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const leaderboardData = await getLeaderboardData();
    res.status(200).json(leaderboardData);
  } catch (error: any) {
    console.error("Handler Error:", error);
    res.status(500).json({ error: "Failed to fetch leaderboard data." });
  }
}