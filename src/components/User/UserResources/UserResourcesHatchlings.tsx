"use client";

import React from "react";
import { Box, Typography, Skeleton, Tooltip } from "@mui/material";
import Image from "next/image";
import { motion } from "framer-motion";
import UserResourcesBackground from "./UserResourcesBackground";
import { useProfileContext } from "@/context/ProfileContext";
import { useUserContext } from "@/context/UserContext"; // import useUserContext for liveUnclaimedPoints
import { formatNumber } from "@/utils/formatNumber";
import ClaimButton from "@/components/Buttons/ClaimButton/ClaimButton"; // import ClaimButton
import { useTheme } from "@mui/material/styles";

const UserResourceBar: React.FC = () => {
  const theme = useTheme();
  const { profileData, loadingProfile } = useProfileContext();
  const { userRewards, liveUnclaimedPoints } = useUserContext(); // get liveUnclaimedPoints from context
  const totalRewards = loadingProfile
    ? undefined
    : profileData?.total_rewards || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <UserResourcesBackground>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            px: 2,
            py: 1.5,
            minWidth: "120px",
            height: "48px", // Fixed height to match the image
            flexWrap: "nowrap",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: 2,
              px: 2,
              py: 1.5,
              height: "48px", // Fixed height to match the image
            }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                <Image
                  src="/Icons/Resources/HoneyToken.png"
                  alt="HoneyToken"
                  width={32}
                  height={32}
                  style={{
                    width: "auto",
                    height: "auto",
                    objectFit: "contain",
                  }}
                />
              </Box>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {loadingProfile || totalRewards === undefined ? (
                <Skeleton
                  variant="text"
                  width={80}
                  height={32}
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    transform: "none",
                  }}
                />
              ) : (
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "bold",
                    color: theme.palette.Gold.main,
                    letterSpacing: "0.5px",
                    fontSize: { xs: "24px", sm: "28px" },
                    minWidth: "80px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "start",
                    lineHeight: 1,
                    height: "100%",
                    marginTop: "3px", // Push text downward
                  }}
                >
                  {formatNumber(totalRewards) || 0}
                </Typography>
              )}
            </motion.div>
          </Box>
          {/* Display Unclaimed Points and ClaimButton on the same line */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              px: 2,
              flexWrap: "wrap",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {/* Tooltip for unclaimed points */}
              <Tooltip title="Total unclaimed points from your hatchlings">
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  sx={{
                    color: theme.palette.LightBlue.main, // Gold color for total points
                    WebkitTextStroke: "0",
                    lineHeight: "1.2",
                    marginTop: "8px",
                    marginBottom: "8px",
                    fontSize: { xs: "24px", sm: "28px" },
                  }}
                >
                  {liveUnclaimedPoints !== undefined ? (
                    <>{Math.floor(liveUnclaimedPoints).toLocaleString()}</>
                  ) : (
                    <Skeleton variant="text" width={120} height={32} />
                  )}
                </Typography>
              </Tooltip>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              {/* Claim Button for Unclaimed Points */}
              <ClaimButton liveUnclaimedPoints={liveUnclaimedPoints || 0} />
            </Box>
          </Box>
        </Box>
      </UserResourcesBackground>
    </motion.div>
  );
};

export default UserResourceBar;
