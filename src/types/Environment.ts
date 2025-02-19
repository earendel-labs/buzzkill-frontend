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
  environmentId: number;
  productivityValue: number;
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
  environmentType: string;
  jsonUrl: string;
  environmentURL?: string;
  backgroundImage?: string;
  audioFile?: string;
  MapMarker?: string;
  MapMarkerHovered?: string;
  MapMarkerPressed?: string;
  resources?: (Hive | Resource)[];
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

export interface HiveProductionData {
  hiveId: number;
  totalProduction: string;
  averageProduction: string;
}

export interface StakedNFT {
  id: string;
  tokenIdNum: string;
  stakedAt: string;
  lastClaimedAt: string;
  environmentId: {
    id: string;
    environmentId: string;
  };
  hiveId: {
    id: string;
    hiveId: string;
  };
  ownerId: {
    id: string;
  };
  tokenId: {
    rarity: string;
    tokenURI: string;
  };
}

export interface StakedNFTsData {
  stakedNFTs: {
    edges: Array<{
      cursor: string;
      node: StakedNFT;
    }>;
    pageInfo: {
      endCursor: string | null;
      hasNextPage: boolean;
    };
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
