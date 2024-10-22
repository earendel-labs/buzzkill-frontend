"use client";
import React, { useState, useEffect } from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import ProfileLayout from "../page";
import SemiTransparentCard from "@/components/Card/SemiTransaprentCard";
import PrimaryButton from "@/components/Buttons/PrimaryButton/PrimaryButton";

const RewardsPage = () => {
  const [loading, setLoading] = useState(true);

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

        <Grid container spacing={3}>
          {/* Total Earnings */}
          <Grid item xs={12}>
            <SemiTransparentCard
              transparency={0.7}
              sx={{ padding: "20px 0px 0px 0px" }}
            >
              <Typography variant="h6" color="white" gutterBottom>
                Total Earnings
              </Typography>
              <Box sx={{ textAlign: "center", py: 2 }}>
                {/* Centralize and add padding */}
                <Typography
                  variant="h3"
                  component="p"
                  fontWeight="bold"
                  color="white"
                >
                  5,230 Honey
                </Typography>
              </Box>
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
              <Box sx={{ textAlign: "center", py: 2 }}>
                <Typography variant="h4" fontWeight="bold" color="white">
                  150 Honey/day
                </Typography>
              </Box>
            </SemiTransparentCard>
          </Grid>
        </Grid>
      </Box>
    </ProfileLayout>
  );
};

export default RewardsPage;
