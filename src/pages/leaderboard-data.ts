// leaderboard-data.ts
import { LeaderboardEntry } from "@/app/HoneyDrops/Components/leaderboardTable"; // Adjust the import path as necessary

export const getLeaderboardData = async (): Promise<LeaderboardEntry[]> => {
  // Simulate an API call delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return [
    {
      rank: 1,
      name: "Fantasy",
      handle: "@fantasy_top_",
      invitesSent: 50,
      pointsEarned: 1500,
      tasksCompleted: 12,
    },
    {
      rank: 2,
      name: "Thruster Finance",
      handle: "@thrusterfi",
      invitesSent: 75,
      pointsEarned: 2000,
      tasksCompleted: 15,
    },
    {
      rank: 3,
      name: "Juice Finance",
      handle: "@Juice_Finance",
      invitesSent: 100,
      pointsEarned: 2500,
      tasksCompleted: 18,
    },
    // Add more entries as needed
  ];
};
