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

export interface Environment {
  id: number;
  name: string;
  environmentType: string;
  jsonUrl: string;
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
