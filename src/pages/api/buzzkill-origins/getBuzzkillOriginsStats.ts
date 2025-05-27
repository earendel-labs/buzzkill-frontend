// /api/buzzkill-origins/getBuzzkillOriginsStats.ts
import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/app/libs/supabaseClient";
import { logger } from "@/utils/logger";

export default async function getBuzzkillOriginsStats(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const rawIds = req.query.ids;
  if (!rawIds || typeof rawIds !== "string") {
    return res.status(400).json({ error: "Missing or invalid ids parameter" });
  }

  const tokenIDs = rawIds
    .split(",")
    .map((id) => Number(id.trim()))
    .filter((n) => !isNaN(n));

  if (tokenIDs.length === 0) {
    return res.status(400).json({ error: "No valid token IDs provided" });
  }

  try {
    const { data, error } = await supabase
      .from("buzzkill_bee_public")
      .select(
        `
        id,
        rarity_tier,
        level,
        xp,
        energy,
        health,
        yield,
        attack,
        defence,
        forage,
        initialised_status,
        raids_completed,
        raids_successful,
        forages_completed
      `
      )
      .in("id", tokenIDs);

    logger.log("TokenIDs received:", tokenIDs);

    if (error) {
      logger.error("Supabase error in getBuzzkillOriginsStats:", error);
      return res.status(500).json({ error: "Database error" });
    }

    logger.log("Fetched bee data from Supabase:", data);

    const beeStats = (data || []).map((b) => ({
      id: String(b.id),
      rarity: b.rarity_tier,
      energy: b.energy,
      maxEnergy: 100,
      health: b.health,
      maxHealth: 100,
      yield: b.yield,
      currentYield: b.yield,
      maxYield: 100,
      attack: b.attack,
      defence: b.defence,
      foraging: b.forage,
      initialized: b.initialised_status,
      level: b.level,
      xp: b.xp,
      maxXp: 1000,
      raidsCompleted: b.raids_completed,
      raidsSuccessful: b.raids_successful,
      foragesCompleted: b.forages_completed,
    }));

    return res.status(200).json(beeStats);
  } catch (err) {
    logger.error("Unhandled error in getBuzzkillOriginsStats:", err);
    return res.status(500).json({ error: "Unexpected error" });
  }
}
