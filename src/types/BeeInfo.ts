export enum BeeType {
  Queen = "queen",
  Worker = "worker",
}

export type BeeInfo = {
  ownerAddress: string;
  nftAddress: string;
  beeName: string;
  beeURL: string;
  beeType: BeeType;
  level: number;
  energyValue: number;
  healthValue: number;
  productivityValue: number;
  attackValue: number;
  defenceValue: number;
  forageValue: number;
  status: string;
  location: string;
  environment: string;
};
