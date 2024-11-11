// src/pages/HoneyDropsPage.tsx
"use client";
import React, { useState, useEffect } from "react";
import { Box, Grid, Typography, Button, CircularProgress } from "@mui/material";
import SemiTransparentCard from "@/components/Card/SemiTransaprentCard";
import PrimaryButton from "@/components/Buttons/PrimaryButton/PrimaryButton";
import Layout from "@/components/Layouts/Layout/Layout";

import {
  LeaderboardTable,
  LeaderboardEntry,
} from "./Components/leaderboardTable"; // Import the interface
import { getLeaderboardData } from "@/pages/api/leaderboard-data";
import HexagonSpinner from "@/components/Loaders/HexagonSpinner/HexagonSpinner";
import { useProfileContext } from "@/context/ProfileContext"; // Import the ProfileContext
import { ContentCopy as CopyIcon } from "@mui/icons-material"; // Import CopyIcon

const HoneyDropsPage = () => {
  const [loading, setLoading] = useState(true);
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>(
    []
  );
  const [error, setError] = useState<string | null>(null);

  // Destructure necessary context
  const { copyInviteLink, profileData, loadingProfile } = useProfileContext();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const data = await getLeaderboardData();
        setLeaderboardData(data);
      } catch (err) {
        setError("Failed to fetch leaderboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  // Remove redundant useEffect that simulates a fetch delay

  if (loading || loadingProfile) {
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
              sx={{
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
                boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.3)",
                borderRadius: "12px",
                height: "100%",
                padding: "16px",
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
                boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.3)",
                borderRadius: "12px",
                height: "100%",
                padding: "16px",
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
                {/* Invite Code Display and Copy Button */}
                <Button
                  className="blueConnectWallet"
                  onClick={copyInviteLink}
                  startIcon={<CopyIcon />} // Optional: Add a copy icon for better UX
                >
                  Invite Friends
                </Button>
              </Box>
            </SemiTransparentCard>
          </Grid>

          {/* Bee Production */}
          <Grid item xs={12} md={6} lg={4}>
            <SemiTransparentCard
              sx={{
                boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.3)",
                borderRadius: "12px",
                height: "100%",
                padding: "16px",
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
        {error ? (
          <Typography variant="body1" color="error">
            {error}
          </Typography>
        ) : (
          <LeaderboardTable data={leaderboardData} />
        )}
      </Box>
    </Layout>
  );
};

export default HoneyDropsPage;
