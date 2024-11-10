"use client";
import React, { useState, useEffect } from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import ProfileLayout from "../../../../../components/Layouts/ProfileLayout/ProfileLayout";
import SemiTransparentCard from "@/components/Card/SemiTransaprentCard";
import PrimaryButton from "@/components/Buttons/PrimaryButton/PrimaryButton";
import { getRewardsData } from "@/pages/api/user/getRewardsData";
import { RewardsTable, RewardEntry } from "./Components/RewardsTable";

const RewardsPage = () => {
  const [loading, setLoading] = useState(true);
  const [rewards, setRewards] = useState<RewardEntry[]>([]);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRewards = async () => {
      try {
        const data = await getRewardsData();
        setRewards(data);
      } catch (err) {
        setError("Failed to fetch rewards data.");
      } finally {
        setLoading(false);
      }
    };

    fetchRewards();
  }, []);

  useEffect(() => {
    const fetchRewardsData = async () => {
      // Simulate data fetching delay
      setTimeout(() => {
        setLoading(false);
      }, 1000); // Replace with actual API call or logic
    };

    fetchRewardsData();
  }, []);

  return (
    <ProfileLayout loading={loading}>
      <Box sx={{ maxWidth: "1000px", mx: "auto", px: 2 }}>
        {/* Limit the overall width and center the content */}

        {/* Rewards-specific content */}
        <Typography variant="h5" color="white" sx={{ mb: 1 }}>
          Rewards
        </Typography>
        <Typography variant="body1" color="white" sx={{ mb: 4 }}>
          Check your earnings and claim rewards.
        </Typography>

        <Grid container spacing={3} marginBottom={6}>
          {/* Total Earnings */}
          <Grid item xs={12}>
            <SemiTransparentCard
              transparency={0.7}
              sx={{
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center", // Center vertically
                alignItems: "center", // Center horizontally
                textAlign: "center", // Ensure text is centered
              }}
            >
              <Typography variant="h6" color="white" gutterBottom>
                Total Earnings
              </Typography>
              <Typography
                variant="h3"
                component="p"
                fontWeight="bold"
                color="white"
                sx={{ py: 2 }}
              >
                5,230 Honey
              </Typography>
            </SemiTransparentCard>
          </Grid>

          {/* Daily Bonus */}
          <Grid item xs={12} md={6} lg={4}>
            <SemiTransparentCard
              transparency={0.7}
              sx={{ height: "100%", p: 2 }}
            >
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
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  color="white"
                  gutterBottom
                >
                  100 Honey
                </Typography>
                <Button className="goldButton">Claim</Button>
              </Box>
            </SemiTransparentCard>
          </Grid>

          {/* Referral Rewards */}
          <Grid item xs={12} md={6} lg={4}>
            <SemiTransparentCard
              transparency={0.7}
              sx={{ height: "100%", p: 2 }}
            >
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
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  color="white"
                  gutterBottom
                >
                  500 Honey
                </Typography>
                <Button className="blueConnectWallet">Invite Friends</Button>
              </Box>
            </SemiTransparentCard>
          </Grid>

          {/* Bee Production */}
          <Grid item xs={12} md={6} lg={4}>
            <SemiTransparentCard
              transparency={0.7}
              sx={{ height: "100%", p: 2 }}
            >
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
                  150 Honey/day
                </Typography>
              </Box>
            </SemiTransparentCard>
          </Grid>
        </Grid>
        <RewardsTable data={rewards} />
      </Box>
    </ProfileLayout>
  );
};

export default RewardsPage;
