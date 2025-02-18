// src/types/Hatchling.ts

export type HatchlingStatus = "Free" | "Staked";

export interface Hatchling {
  id: number;
  rarity: string;
  imageAddress: string;
  status: HatchlingStatus;
  environmentID: string | null;
  hiveID: string | null;
  ownerAddress: string;
}

// Interface matching the ABI struct
export interface StakedNFT {
  tokenId: number;
  stakedAt: number;
  environmentId: number;
  hiveId: number;
  lastClaimedAt: number;
  owner: string;
  rarity: string;
  userMultiplier: number;
}
