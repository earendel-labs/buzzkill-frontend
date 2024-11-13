// src/pages/HoneyDropsPage.tsx

"use client";

import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Layout from "@/components/Layouts/Layout/Layout";
import HexagonSpinner from "@/components/Loaders/HexagonSpinner/HexagonSpinner";
import { useProfileContext } from "@/context/ProfileContext";
import UserRewardsBento from "@/app/Play/User/Profile/MyRewards/Components/UserRewardsBento";
import { LeaderboardTable, LeaderboardEntry } from "./Components/leaderboardTable";
import { useRouter } from "next/navigation";

const HoneyDropsPage = () => {
  const [loading, setLoading] = useState(true);
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [constants, setConstants] = useState<{
    dailyBonus?: number;
    referralReward?: number;
  }>({});
  const [error, setError] = useState<string | null>(null);

  const { loadingProfile, profileData, copyInviteLink } = useProfileContext();
  const router = useRouter();

  useEffect(() => {
    const fetchLeaderboardAndConstants = async () => {
      try {
        // Fetch leaderboard data and constants concurrently
        const [leaderboardResponse, constantsResponse] = await Promise.all([
          fetch("/api/rewards/leaderboard-data", {
            method: "GET",
          }).then((res) => res.json()),
          fetch("/api/rewards/syncRewardsConstants", {
            method: "GET",
            credentials: "include", // Include cookies if needed
          }),
        ]);

        // Set leaderboard data
        setLeaderboardData(leaderboardResponse);

        // Handle constants data
        if (constantsResponse.ok) {
          const data = await constantsResponse.json();
          setConstants({
            dailyBonus: data.dailyBonus || 100,
            referralReward: data.referralReward || 500,
          });
        } else {
          console.error(
            "Failed to fetch reward constants:",
            constantsResponse.statusText
          );
          setConstants({
            dailyBonus: 100,
            referralReward: 500,
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch leaderboard data.");
        setConstants({
          dailyBonus: 100,
          referralReward: 500,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboardAndConstants();
  }, []);

  const isLoading = loading || loadingProfile;

  if (isLoading) {
    return (
      <Layout>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          flexGrow={1}
          sx={{ height: "65vh" }}
        >
          <HexagonSpinner />
          <Typography marginTop="32px">
            Fetching Data from the Hive Mind...
          </Typography>
        </Box>
      </Layout>
    );
  }

  // Extract current user's address from profileData
  const currentUserAddress = profileData?.address || "";

  return (
    <Layout>
      <Box sx={{ maxWidth: "1000px", mx: "auto", px: 2 }}>
        <Typography variant="h5" color="white" sx={{ mt: 6, mb: 1 }}>
          Honey Drops Rewards
        </Typography>
        <Typography variant="body1" color="white" sx={{ mb: 4 }}>
          Check your earnings, claim rewards, and see the leaderboard.
        </Typography>

        {/* UserRewardsBento Component */}
        <UserRewardsBento
          loadingProfile={loadingProfile}
          profileData={profileData}
          constants={constants}
          copyInviteLink={copyInviteLink}
        />

        {/* Leaderboard Section */}
        <Typography variant="h5" color="white" sx={{ mt: 4, mb: 2 }}>
          Leaderboard
        </Typography>
        {error ? (
          <Typography variant="body1" color="error">
            {error}
          </Typography>
        ) : (
          <LeaderboardTable data={leaderboardData} currentUserAddress={currentUserAddress} />
        )}
      </Box>
    </Layout>
  );
};

export default HoneyDropsPage;
