// Reusable TypeScript type used across multiple components.
export interface BeeStats {
  id: string;
  name: string;
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
  productivity: number;
  currentProductivity: number;
  maxProductivity: number;
  raidsCompleted: number;
  raidsSuccessful: number;
  foragesCompleted: number;
  initialized: boolean;
  traits: {
    leftArm: string;
    rightArm: string;
    body: string;
    head: string;
    wings: string;
    background: string;
  };
}
