// RewardsPage.tsx
"use client";
import React, { useState, useEffect } from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import SemiTransparentCard from "@/components/Card/SemiTransaprentCard";
import PrimaryButton from "@/components/Buttons/PrimaryButton/PrimaryButton";
import Layout from "@/components/Layouts/Layout/Layout";

import {
  LeaderboardTable,
  LeaderboardEntry,
} from "./Components/leaderboardTable"; // Import the interface
import { getLeaderboardData } from "@/pages/leaderboard-data";
import HexagonSpinner from "@/components/Loaders/HexagonSpinner/HexagonSpinner";
const HoneyDropsPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRewardsData = async () => {
      // Simulate data fetching delay
      // You can implement actual data fetching logic here
      setLoading(false);
    };

    fetchRewardsData();
  }, []);

  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>(
    []
  ); // Define the state type

  useEffect(() => {
    const fetchData = async () => {
      const data = await getLeaderboardData();
      setLeaderboardData(data);
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <Layout>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          flexGrow={1}
          sx={{ height: "65vh" }} // Ensure the loading spinner covers the full height
        >
          <HexagonSpinner />
          <Typography marginTop="32px">
            Fetching Data from the Hive Mind...
          </Typography>
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box sx={{ maxWidth: "1000px", mx: "auto", px: 2 }}>
        {/* Limit the overall width and center the content */}

        <Grid container spacing={3} marginBottom={6} marginTop={4}>
          {/* Total Earnings */}
          <Grid item xs={12}>
            <SemiTransparentCard
              // Removed transparency prop since you wanted it fixed
              sx={{
                backgroundColor: "rgba(34, 46, 80, 0.9)", // Fixed transparency
                boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.3)",
                borderRadius: "12px",
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
              sx={{
                backgroundColor: "rgba(34, 46, 80, 0.7)", // Fixed transparency
                boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.3)",
                borderRadius: "12px",
                height: "100%",
                padding: "16px", // Using shorthand for padding: p: 2
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
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
              sx={{
                backgroundColor: "rgba(34, 46, 80, 0.7)", // Fixed transparency
                boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.3)",
                borderRadius: "12px",
                height: "100%",
                padding: "16px", // Using shorthand for padding: p: 2
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
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
              sx={{
                backgroundColor: "rgba(34, 46, 80, 0.7)", // Fixed transparency
                boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.3)",
                borderRadius: "12px",
                height: "100%",
                padding: "16px", // Using shorthand for padding: p: 2
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
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

        {/* Leaderboard Section */}
        <Typography variant="h5" color="white" sx={{ mb: 2 }}>
          Leaderboard
        </Typography>
        <LeaderboardTable data={leaderboardData} loading={loading} />
      </Box>
    </Layout>
  );
};

export default HoneyDropsPage;
