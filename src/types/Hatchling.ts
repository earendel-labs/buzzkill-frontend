export type HatchlingStatus = "Free" | "Staked";

export interface Hatchling {
  id: number;
  imageAddress: string;
  status: HatchlingStatus;
  environmentID: string;
  hiveID: string;
}
