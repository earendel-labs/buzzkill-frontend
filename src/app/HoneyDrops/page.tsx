"use client";

import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Layout from "@/components/Layouts/Layout/Layout";
import HexagonSpinner from "@/components/Loaders/HexagonSpinner/HexagonSpinner";
import { useProfileContext } from "@/context/ProfileContext";
import UserRewardsBento from "@/app/Play/User/Profile/Components/MyRewards/UserRewardsBento";
import {
  LeaderboardTable,
  LeaderboardEntry,
} from "./Components/leaderboardTable";
import { useRouter } from "next/navigation";

const HoneyDropsPage = () => {
  const [loading, setLoading] = useState(true);
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>(
    []
  );
  const [constants, setConstants] = useState<{
    dailyBonus?: number;
    referralReward?: number;
  }>({});
  const [error, setError] = useState<string | null>(null);

  const { loadingProfile, profileData, copyInviteLink } = useProfileContext();
  const router = useRouter();

  useEffect(() => {
    let isMounted = true; // Flag to prevent state updates if component is unmounted

    const fetchLeaderboardAndConstants = async () => {
      try {
        // Fetch leaderboard data and constants concurrently
        const [leaderboardResponse, constantsResponse] = await Promise.all([
          fetch("/api/rewards/leaderboard-data", {
            method: "GET",
          }).then(async (res) => {
            if (!res.ok) {
              const errorData = await res.json();
              throw new Error(
                errorData.error || "Failed to fetch leaderboard data."
              );
            }
            return res.json();
          }),
          fetch("/api/rewards/syncRewardsConstants", {
            method: "GET",
            credentials: "include", // Include cookies if needed
          }).then(async (res) => {
            if (!res.ok) {
              const errorData = await res.json();
              throw new Error(
                errorData.error || "Failed to fetch reward constants."
              );
            }
            return res.json();
          }),
        ]);

        if (isMounted) {
          // Set leaderboard data
          setLeaderboardData(leaderboardResponse.data || []);

          // Handle constants data
          setConstants({
            dailyBonus: constantsResponse.dailyBonus ?? 100,
            referralReward: constantsResponse.referralReward ?? 500,
          });

          setError(null); // Clear any previous errors
        }
      } catch (err: any) {
        if (isMounted) {
          console.error("Error fetching data:", err.message || err);
          setError(err.message || "Failed to fetch leaderboard data.");
          setConstants({
            dailyBonus: 100,
            referralReward: 500,
          });
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchLeaderboardAndConstants();

    return () => {
      isMounted = false; // Cleanup flag on unmount
    };
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
        ) : leaderboardData.length === 0 ? (
          <Typography variant="body1" color="white">
            No leaderboard data available.
          </Typography>
        ) : (
          <LeaderboardTable
            data={leaderboardData}
            currentUserAddress={currentUserAddress}
          />
        )}
      </Box>
    </Layout>
  );
};

export default HoneyDropsPage;
