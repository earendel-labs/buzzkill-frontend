// src/pages/api/user/rewards/getStakingData.ts

import type { NextApiRequest, NextApiResponse } from "next";
import { ethers } from "ethers";
import HIVE_STAKING_ABI from "@/app/libs/abi/HiveStaking.json";
import BUZZKILL_HATCHLINGS_ABI from "@/app/libs/abi/BuzzkillHatchlingsNFT.json";
import { logger } from "@/utils/logger";

export enum Rarity {
  Common = 0,
  Rare = 1,
  UltraRare = 2,
}

export interface StakedNFT {
  tokenId: number;
  stakedAt: number;
  environmentId: number;
  hiveId: number;
  lastClaimedAt: number;
  owner: string;
  rarity: Rarity;
  userMultiplier: number;
}

// Config
const HIVE_STAKING_CONTRACT_ADDRESS =
  process.env.NEXT_PUBLIC_HIVE_STAKING_ADDRESS ?? "";
const BUZZKILL_HATCHLINGS_CONTRACT_ADDRESS =
  process.env.NEXT_PUBLIC_HATCHLINGS_ADDRESS ?? "";
// Setup RPC URLs
const PRIMARY_RPC = process.env.BLOCKPI_RPC;
const FALLBACK_RPC = "https://rpc.viction.xyz";

if (!PRIMARY_RPC) {
  throw new Error("Missing environment variable: BLOCKPI_RPC");
}

if (!HIVE_STAKING_CONTRACT_ADDRESS) {
  throw new Error(
    "Missing environment variable: NEXT_PUBLIC_HIVE_STAKING_ADDRESS"
  );
}
if (!BUZZKILL_HATCHLINGS_CONTRACT_ADDRESS) {
  throw new Error(
    "Missing environment variable: NEXT_PUBLIC_HATCHLINGS_ADDRESS"
  );
}
if (!PRIMARY_RPC) {
  throw new Error("Missing environment variable: BLOCKPI_RPC");
}

// Convert fixed multipliers from ethers to numbers
const BASE_MULTIPLIER_NUM = Number(ethers.parseUnits("1", 18).toString());
const EXTERNAL_FLAG_MULTIPLIER_NUM = Number(
  ethers.parseUnits("1.2", 18).toString()
);
const RARITY_MULTIPLIERS_NUM: { [key in Rarity]: number } = {
  [Rarity.Common]: BASE_MULTIPLIER_NUM, // 1x
  [Rarity.Rare]: Number(ethers.parseUnits("1.2", 18).toString()), // 1.2x
  [Rarity.UltraRare]: Number(ethers.parseUnits("1.5", 18).toString()), // 1.5x
};

export default async function getStakingData(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { address } = req.query;
  if (!address || typeof address !== "string") {
    logger.warn("Invalid address received:", address);
    return res.status(400).json({ error: "Invalid address" });
  }
  let provider: ethers.JsonRpcProvider;

  try {
    logger.log("Fetching staking data for address:", address);
    try {
      provider = new ethers.JsonRpcProvider(PRIMARY_RPC);
      await provider.getBlockNumber(); // Test connection
      logger.log("Connected to primary RPC:", PRIMARY_RPC);
    } catch (primaryError) {
      logger.error("Primary RPC failed, switching to fallback:", primaryError);
      try {
        provider = new ethers.JsonRpcProvider(FALLBACK_RPC);
        await provider.getBlockNumber(); // Test connection
        logger.log("Connected to fallback RPC:", FALLBACK_RPC);
      } catch (fallbackError) {
        logger.error("Fallback RPC also failed:", fallbackError);
        return res
          .status(500)
          .json({ error: "Both primary and fallback RPCs failed" });
      }
    }

    // Create contract instances
    const hiveStakingContract = new ethers.Contract(
      HIVE_STAKING_CONTRACT_ADDRESS,
      HIVE_STAKING_ABI,
      provider
    );
    const buzzkillHatchlingsContract = new ethers.Contract(
      BUZZKILL_HATCHLINGS_CONTRACT_ADDRESS,
      BUZZKILL_HATCHLINGS_ABI,
      provider
    );

    // Fetch staked NFTs
    logger.log("Calling getAllStakedNFTsForUser...");
    const stakedNFTsRaw: any[] =
      await hiveStakingContract.getAllStakedNFTsForUser(address);
    logger.log("Raw staked NFTs data:", stakedNFTsRaw);

    // Convert rewardRatePerDay and userRewardMultiplier to numbers
    const rewardRatePerDay = Number(
      (await hiveStakingContract.rewardRatePerDay()).toString()
    );
    logger.log("rewardRatePerDay:", rewardRatePerDay);
    const userMultiplier = Number(
      (await hiveStakingContract.userRewardMultiplier(address)).toString()
    );
    logger.log("User multiplier:", userMultiplier);
    const hasExternalFlag = await hiveStakingContract.hasExternalNFTFlag(
      address
    );
    logger.log("Has external NFT flag:", hasExternalFlag);

    // Fetch staked NFT details (including rarity)
    const stakedNFTs: StakedNFT[] = await Promise.all(
      stakedNFTsRaw.map(async (nft) => {
        logger.log(`Fetching rarity for tokenId: ${nft[0]}`);
        const rarityEnum = await buzzkillHatchlingsContract.tokenRarity(nft[0]);
        const rarityValue = Number(rarityEnum);

        return {
          tokenId: Number(nft[0]),
          stakedAt: Number(nft[1]),
          environmentId: Number(nft[2]),
          hiveId: Number(nft[3]),
          lastClaimedAt: Number(nft[4]),
          owner: nft[5],
          rarity: rarityValue,
          userMultiplier: Number(nft[7]),
        };
      })
    );

    // Calculate current yield and per-second rate
    let totalUnclaimed = 0;
    let totalPointsPerSecond = 0;
    const now = Date.now() / 1000;

    for (const nft of stakedNFTs) {
      if (now <= nft.lastClaimedAt) {
        continue;
      }
      const secondsElapsed = now - nft.lastClaimedAt;

      // Calculate final multiplier for this NFT
      const rarityMultiplier = RARITY_MULTIPLIERS_NUM[nft.rarity];
      const extraUserMultiplier = (userMultiplier * BASE_MULTIPLIER_NUM) / 100;
      let finalMultiplier = rarityMultiplier + extraUserMultiplier;
      if (hasExternalFlag) {
        finalMultiplier =
          (finalMultiplier * EXTERNAL_FLAG_MULTIPLIER_NUM) /
          BASE_MULTIPLIER_NUM;
      }

      // Yield for NFT
      const yieldForNFT =
        (secondsElapsed * rewardRatePerDay * finalMultiplier) /
        (BASE_MULTIPLIER_NUM * 86400);
      totalUnclaimed += yieldForNFT;

      // Rate for NFT
      const rateForNFT =
        (rewardRatePerDay * finalMultiplier) / (BASE_MULTIPLIER_NUM * 86400);
      totalPointsPerSecond += rateForNFT;
    }

    logger.log("Total unclaimed rewards:", totalUnclaimed);
    logger.log("Total points per second:", totalPointsPerSecond);

    // Return plain numbers so JSON.stringify works fine
    return res.status(200).json({
      stakedNFTs,
      totalUnclaimed,
      pointsPerSecond: totalPointsPerSecond,
    });
  } catch (err) {
    logger.error("Error fetching staking data:", err);
    return res.status(500).json({ error: "Error fetching staking data" });
  }
}
