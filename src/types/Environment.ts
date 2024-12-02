export interface Hive {
  type: string;
  id: number;
  name: string;
  defenseValue: number;
  queenBees: string;
  workerBees: string;
  position: {
    left: string;
    top: string;
  };
  resourceLink: string;
  hiveId: number;
}

export interface HiveHatchling {
  type: string;
  id: number;
  name: string;
  productionValue: number;
  rareBees: string;
  totalBees: string;
  position: {
    left: string;
    top: string;
  };
  resourceLink: string;
  hiveId: number;
}

export interface Environment {
  id: number;
  name: string;
  type: string;
  backgroundImage: string;
  audioFile: string;
  resources: (Hive | Resource)[];
}

export interface SpecificEnvironmentData {
  environment: {
    id: number;
    name: string;
    type: string;
    backgroundImage: string;
    audioFile: string;
    resources: (Hive | Resource)[];
  };
}

export interface Resource {
  type: string;
  id: number;
  contentValue?: string;
  position: {
    left: string;
    top: string;
  };
  resourceLink: string;
}

export interface EnvironmentsData {
  environments: Environment[];
}

export interface StakedNFT {
  id: string;
  tokenIdNum: string;
  stakedAt: string;
  lastClaimedAt: string;
  environment: {
    id: string;
    environmentId: string;
  };
  hive: {
    id: string;
    hiveId: string;
  };
  owner: {
    id: string;
  };
  token: {
    rarity: string;
    tokenURI: string;
  };
}

export interface StakedNFTsData {
  stakedNFTs: {
    nodes: StakedNFT[];
  };
}
// src/types/HiveInfo.ts

export interface HiveHatchlingInfo {
  productivityValue: number;
  CommonBees: number;
  RareBees: number;
  UltraRareBees: number;
  TotalBees: string;
  status: string;
  location: string;
  environment: string;
}
