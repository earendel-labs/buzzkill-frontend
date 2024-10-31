// src/types.ts
export interface Hatchling {
  id: number;
  imageAddress: string;
  status: string;
  environmentID: string | null;
  hiveID: string | null;
}
