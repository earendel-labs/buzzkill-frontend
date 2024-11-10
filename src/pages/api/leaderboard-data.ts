// leaderboard-data.ts
import { LeaderboardEntry } from "@/app/HoneyDrops/Components/leaderboardTable"; // Adjust the import path as necessary

export const getLeaderboardData = async (): Promise<LeaderboardEntry[]> => {
  // Simulate an API call delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return [
    {
      rank: 1,
      name: "Fantasy",
      address: "0x2356778864332",
      invitesSent: 50,
      pointsEarned: 1500,
      tasksCompleted: 12,
    },
    {
      rank: 2,
      name: "Bee29",
      address: "0x2356778856Abe3",
      invitesSent: 75,
      pointsEarned: 2000,
      tasksCompleted: 15,
    },
    {
      rank: 3,
      name: "BeeMaster23",
      address: "0xaB3567788556823",
      invitesSent: 100,
      pointsEarned: 2500,
      tasksCompleted: 18,
    },
    // Add more entries as needed
  ];
};
