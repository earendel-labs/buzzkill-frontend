// src/types/Hatchling.ts

export type HatchlingStatus = "Free" | "Staked";

export interface Hatchling {
  id: number;
  imageAddress: string;
  status: HatchlingStatus;
  environmentID: string | null;
  hiveID: string | null;
  ownerAddress: string;
}



// 