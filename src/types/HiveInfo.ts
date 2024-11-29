export type HiveInfo = {
  queenBees: number;
  workerBees: number;
  healthValue: number;
  productivityValue: number;
  attackValue: number;
  defenceValue: number;
  status: string;
  location: string;
  environment: string;
};

export type HiveHatchlingInfo = {
  productivityValue: number;
  CommonBees: number;
  RareBees: number;
  UltraRareBees: number;
  TotalBees: number;
  status: string;
  location: string;
  environment: string;
};
