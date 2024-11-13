"use client";

import React from "react";
import {
  Grid,
  Typography,
  Button,
  Skeleton,
  Box,
  Tooltip,
} from "@mui/material";
import SemiTransparentCard from "@/components/Card/SemiTransaprentCard";
import { ContentCopy as CopyIcon } from "@mui/icons-material";
import { useRouter } from "next/navigation"; // Import useRouter

interface UserRewardsBentoProps {
  loadingProfile: boolean;
  profileData: {
    total_rewards?: number;
    invite_code?: string;
  } | null; // Allow profileData to be null if not connected
  constants: {
    dailyBonus?: number;
    referralReward?: number;
  };
  copyInviteLink: () => void;
}

const UserRewardsBento: React.FC<UserRewardsBentoProps> = ({
  loadingProfile,
  profileData,
  constants,
  copyInviteLink,
}) => {
  const router = useRouter();

  // Determine if the user is connected
  const isConnected = !loadingProfile && profileData && profileData.invite_code;

  if (loadingProfile) {
    // Display skeleton loaders while loading
    return (
      <Grid container spacing={3} marginBottom={6}>
        {/* Total Earnings Skeleton */}
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
            <Skeleton variant="text" width={150} height={60} animation="wave" />
          </SemiTransparentCard>
        </Grid>

        {/* Daily Bonus Skeleton */}
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
              <Skeleton
                variant="text"
                width={80}
                height={40}
                animation="wave"
              />
              <Button className="goldButton" disabled>
                Claim
              </Button>
            </Box>
          </SemiTransparentCard>
        </Grid>

        {/* Referral Rewards Skeleton */}
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
              <Skeleton
                variant="text"
                width={80}
                height={40}
                animation="wave"
              />
              <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                <Skeleton
                  variant="text"
                  width={120}
                  height={40}
                  animation="wave"
                />
              </Box>
            </Box>
          </SemiTransparentCard>
        </Grid>

        {/* Bee Production Skeleton */}
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
              <Skeleton
                variant="text"
                width={120}
                height={40}
                animation="wave"
              />
            </Box>
          </SemiTransparentCard>
        </Grid>
      </Grid>
    );
  }

  if (!isConnected) {
    // Display message prompting user to sign-up or log-in
    return (
      <SemiTransparentCard
        sx={{
          padding: "40px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          maxWidth: "1000px", // Set max-width to 1000px
          margin: "0 auto", // Center the card horizontally
        }}
      >
        <Typography variant="h6" color="white" gutterBottom>
          No user is logged in
        </Typography>
        <Typography variant="body1" color="white" sx={{ mb: 3 }}>
          Sign-up or login to view your rewards
        </Typography>
        <Button
          className="blueConnectWallet" // Use the old setup for styling
          onClick={() => router.push("/")}
          sx={{ mt: 2 }}
        >
          Go to Home
        </Button>
      </SemiTransparentCard>
    );
  }

  // User is connected; display rewards
  return (
    <Grid container spacing={3} marginBottom={6}>
      {/* Total Earnings */}
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
          <Typography
            variant="h3"
            component="p"
            fontWeight="bold"
            color="white"
            sx={{ py: 2 }}
          >
            {profileData?.total_rewards !== undefined
              ? `${profileData.total_rewards} Honey`
              : "0 Honey"}
          </Typography>
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
            {constants.dailyBonus !== undefined ? (
              <Typography
                variant="h4"
                fontWeight="bold"
                color="white"
                gutterBottom
              >
                {constants.dailyBonus} Honey
              </Typography>
            ) : (
              <Skeleton
                variant="text"
                width={80}
                height={40}
                animation="wave"
              />
            )}
            <Button
              className="goldButton" // Use the old setup for styling
              disabled={constants.dailyBonus === undefined}
            >
              Claim
            </Button>
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
            {constants.referralReward !== undefined ? (
              <Typography
                variant="h4"
                fontWeight="bold"
                color="white"
                gutterBottom
              >
                {constants.referralReward} Honey
              </Typography>
            ) : (
              <Skeleton
                variant="text"
                width={80}
                height={40}
                animation="wave"
              />
            )}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
              }}
            >
              {profileData?.invite_code ? (
                <>
                  <Tooltip title="Copy Invite Link">
                    <Button
                      className="blueConnectWallet" // Use the old setup for styling
                      onClick={copyInviteLink}
                      startIcon={<CopyIcon />}
                      aria-label="Copy invite link and invite friends"
                    >
                      Invite Friends
                    </Button>
                  </Tooltip>
                </>
              ) : (
                <Skeleton
                  variant="text"
                  width={120}
                  height={40}
                  animation="wave"
                />
              )}
            </Box>
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
              150 Honey/day
            </Typography>
          </Box>
        </SemiTransparentCard>
      </Grid>
    </Grid>
  );
};

export default UserRewardsBento;
