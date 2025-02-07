"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import ProfileLayout from "../Components/ProfileLayout/ProfileLayout";
import UserRewardsBento from "../Components/MyRewards/UserRewardsBento";
import {
  RewardsTable,
  RewardEntry,
} from "../Components/MyRewards/RewardsTable";
import { useProfileContext } from "@/context/ProfileContext";
import { useAccount } from "wagmi";

const RewardsPage = () => {
  const { address, isConnected } = useAccount(); // Get account info from wagmi
  const [loading, setLoading] = useState(true);
  const [rewards, setRewards] = useState<RewardEntry[]>([]);
  const [constants, setConstants] = useState<{
    dailyBonus?: number;
    referralReward?: number;
  }>({});
  const [error, setError] = useState<string | null>(null);

  const [snackbarOpen, setSnackbarOpen] = useState(false); // State for Snackbar visibility
  const { copyInviteLink, profileData, loadingProfile } = useProfileContext();

  useEffect(() => {
    const fetchRewards = async () => {
      if (!address) {
        setError("User address not found.");
        setSnackbarOpen(true); // Show snackbar
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
          setSnackbarOpen(true); // Show snackbar
        }
      } catch (err) {
        console.error("Error fetching rewards data:", err);
        setError("Failed to fetch rewards data.");
        setSnackbarOpen(true); // Show snackbar
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
            referralReward: data.referralReward || 1000,
          });
        } else {
          console.error(
            "Failed to fetch reward constants:",
            response.statusText
          );
          setConstants({
            dailyBonus: 100,
            referralReward: 1000,
          });
        }
      } catch (error) {
        console.error("Failed to fetch reward constants:", error);
        setConstants({
          dailyBonus: 100,
          referralReward: 1000,
        });
      }
    };

    if (isConnected) {
      fetchRewards();
    }

    fetchConstants();
  }, [isConnected, address]);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

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
      <Box sx={{ px: 2, py: 2 }}>
        {/* UserRewardsBento Component */}
        <UserRewardsBento
          loadingProfile={loadingProfile}
          profileData={profileData}
          constants={constants}
          copyInviteLink={copyInviteLink}
        />

        {/* Rewards Table */}
        <RewardsTable data={rewards} />
      </Box>

      {/* Snackbar for Error Alert */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000} // Automatically close after 6 seconds
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </ProfileLayout>
  );
};

export default RewardsPage;
