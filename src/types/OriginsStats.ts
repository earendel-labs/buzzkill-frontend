export interface BeeStats {
  id: string;
  name: string;
  imageAddress: string;
  rarity: string;
  level: number;
  xp: number;
  maxXp: number;
  attack: number;
  defence: number;
  foraging: number;
  energy: number;
  maxEnergy: number;
  health: number;
  maxHealth: number;
  yield: number;
  currentYield: number;
  maxYield: number;
  raidsCompleted: number;
  raidsSuccessful: number;
  foragesCompleted: number;
  initialized: boolean;
  traits: {
    environment: string;
    wings: string;
    base: string;
    armor: string;
    leftHand: string;
    rightHand: string;
    hair: string;
    eyes: string;
    headpiece: string;
    character: "Queen Bee" | "Worker Bee";
  };
}
