// src/pages/RewardsPage.tsx
"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  CircularProgress,
  Skeleton,
} from "@mui/material";
import ProfileLayout from "../../../../../components/Layouts/ProfileLayout/ProfileLayout";
import SemiTransparentCard from "@/components/Card/SemiTransaprentCard";
import { RewardsTable, RewardEntry } from "./Components/RewardsTable";
import { useProfileContext } from "@/context/ProfileContext";
import { ContentCopy as CopyIcon } from "@mui/icons-material";
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
        <Typography variant="h5" color="white" sx={{ mb: 1 }}>
          Rewards
        </Typography>
        <Typography variant="body1" color="white" sx={{ mb: 4 }}>
          Check your earnings and claim rewards.
        </Typography>

        <Grid container spacing={3} marginBottom={6}>
          <Grid item xs={12}>
            <SemiTransparentCard
              sx={{
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Typography variant="h6" color="white" gutterBottom>
                Total Earnings
              </Typography>
              {loadingProfile ? (
                <Skeleton variant="text" width={150} height={60} />
              ) : (
                <Typography
                  variant="h3"
                  component="p"
                  fontWeight="bold"
                  color="white"
                  sx={{ py: 2 }}
                >
                  {profileData?.total_rewards || 0} Honey
                </Typography>
              )}
            </SemiTransparentCard>
          </Grid>

          {/* Daily Bonus */}
          <Grid item xs={12} md={6} lg={4}>
            <SemiTransparentCard sx={{ height: "100%", p: 2 }}>
              <Typography variant="h6" color="white" gutterBottom>
                Daily Bonus
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                }}
              >
                {constants.dailyBonus ? (
                  <Typography
                    variant="h4"
                    fontWeight="bold"
                    color="white"
                    gutterBottom
                  >
                    {constants.dailyBonus} Honey
                  </Typography>
                ) : (
                  <Skeleton variant="text" width={80} height={40} />
                )}
                <Button className="goldButton">Claim</Button>
              </Box>
            </SemiTransparentCard>
          </Grid>

          {/* Referral Rewards */}
          <Grid item xs={12} md={6} lg={4}>
            <SemiTransparentCard sx={{ height: "100%", p: 2 }}>
              <Typography variant="h6" color="white" gutterBottom>
                Referral Rewards
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                }}
              >
                {constants.referralReward ? (
                  <Typography
                    variant="h4"
                    fontWeight="bold"
                    color="white"
                    gutterBottom
                  >
                    {constants.referralReward} Honey
                  </Typography>
                ) : (
                  <Skeleton variant="text" width={80} height={40} />
                )}
                <Button
                  className="blueConnectWallet"
                  onClick={copyInviteLink}
                  startIcon={<CopyIcon />}
                >
                  Invite Friends
                </Button>
              </Box>
            </SemiTransparentCard>
          </Grid>

          {/* Bee Production */}
          <Grid item xs={12} md={6} lg={4}>
            <SemiTransparentCard sx={{ height: "100%", p: 2 }}>
              <Typography variant="h6" color="white" gutterBottom>
                Bee Production
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                }}
              >
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  color="white"
                  gutterBottom
                >
                  {150} Honey/day
                </Typography>
              </Box>
            </SemiTransparentCard>
          </Grid>
        </Grid>

        {error && (
          <Typography variant="body1" color="error" sx={{ mb: 4 }}>
            {error}
          </Typography>
        )}

        <RewardsTable data={rewards} />
      </Box>
    </ProfileLayout>
  );
};

export default RewardsPage;
