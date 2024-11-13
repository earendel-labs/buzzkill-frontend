// src/pages/RewardsPage.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import ProfileLayout from "../../../../../components/Layouts/ProfileLayout/ProfileLayout";
import UserRewardsBento from "./Components/UserRewardsBento";
import { RewardsTable, RewardEntry } from "./Components/RewardsTable";
import { useProfileContext } from "@/context/ProfileContext";
import { useAccount } from "wagmi"; // Import useAccount from wagmi

const RewardsPage = () => {
  const { address, isConnected } = useAccount(); // Get account info from wagmi
  const [loading, setLoading] = useState(true);
  const [rewards, setRewards] = useState<RewardEntry[]>([]);
  const [constants, setConstants] = useState<{
    dailyBonus?: number;
    referralReward?: number;
  }>({});
  const [error, setError] = useState<string | null>(null);

  const { copyInviteLink, profileData, loadingProfile } = useProfileContext();

  useEffect(() => {
    const fetchRewards = async () => {
      if (!address) {
        setError("User address not found.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/user/getRewardsData", {
          method: "GET",
          credentials: "include", // Include cookies in the request
        });

        if (response.ok) {
          const data = await response.json();
          setRewards(data.rewards);
        } else {
          const errorData = await response.json();
          setError(errorData.error || "Failed to fetch rewards data.");
        }
      } catch (err) {
        console.error("Error fetching rewards data:", err);
        setError("Failed to fetch rewards data.");
      } finally {
        setLoading(false);
      }
    };

    const fetchConstants = async () => {
      try {
        const response = await fetch("/api/rewards/syncRewardsConstants", {
          method: "GET",
          credentials: "include", // Include cookies if needed
        });

        if (response.ok) {
          const data = await response.json();
          setConstants({
            dailyBonus: data.dailyBonus || 100,
            referralReward: data.referralReward || 500,
          });
        } else {
          console.error(
            "Failed to fetch reward constants:",
            response.statusText
          );
          setConstants({
            dailyBonus: 100,
            referralReward: 500,
          });
        }
      } catch (error) {
        console.error("Failed to fetch reward constants:", error);
        setConstants({
          dailyBonus: 100,
          referralReward: 500,
        });
      }
    };

    if (isConnected) {
      fetchRewards();
    }

    fetchConstants();
  }, [isConnected, address]);

  if (loading || loadingProfile) {
    return (
      <ProfileLayout loading={true}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <CircularProgress />
        </Box>
      </ProfileLayout>
    );
  }

  return (
    <ProfileLayout loading={false}>
      <Box sx={{ maxWidth: "1000px", mx: "auto", px: 2 }}>
        {/* Page Header */}
        <Typography variant="h5" color="white" sx={{ mb: 1 }}>
          Rewards
        </Typography>
        <Typography variant="body1" color="white" sx={{ mb: 4 }}>
          Check your earnings and claim rewards.
        </Typography>

        {/* UserRewardsBento Component */}
        <UserRewardsBento
          loadingProfile={loadingProfile}
          profileData={profileData}
          constants={constants}
          copyInviteLink={copyInviteLink}
        />

        {/* Display Error Message if Any */}
        {error && (
          <Typography variant="body1" color="error" sx={{ mb: 4 }}>
            {error}
          </Typography>
        )}

        {/* Rewards Table */}
        <RewardsTable data={rewards} />
      </Box>
    </ProfileLayout>
  );
};

export default RewardsPage;
