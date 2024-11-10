// src/app/HoneyDrops/api/getRewardsData.ts
import { RewardEntry } from "@/app/Play/User/Profile/MyRewards/Components/RewardsTable";

export const getRewardsData = async (): Promise<RewardEntry[]> => {
  // Simulate an API call delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Hardcoded dummy data
  return [
    {
      id: 1,
      task: "Complete Tutorial",
      phase: "Phase 1",
      points: 100,
    },
    {
      id: 2,
      task: "Refer a Friend",
      phase: "Phase 1",
      points: 150,
    },
    {
      id: 3,
      task: "Mint NFT",
      phase: "Phase 2",
      points: 200,
    },
    {
      id: 4,
      task: "Join Partner Program",
      phase: "Partner",
      points: 250,
    },
    {
      id: 5,
      task: "Participate in Community Event",
      phase: "Phase 2",
      points: 180,
    },
    // Add more entries as needed
  ];
};
