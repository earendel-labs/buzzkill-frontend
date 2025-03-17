"use client";

import React, { useEffect, useState } from "react";
import { Box, Typography, Skeleton, Tooltip } from "@mui/material";
import Image from "next/image";
import { motion } from "framer-motion";
import UserResourcesBackground from "./UserResourcesBackground";
import { useProfileContext } from "@/context/ProfileContext";
import { useUserContext } from "@/context/UserContext"; // import useUserContext for liveUnclaimedPoints
import { formatNumber } from "@/utils/formatNumber";
import ClaimButton from "@/components/Buttons/ClaimButton/ClaimButton";
import { useTheme } from "@mui/material/styles";

const UserResourceBar: React.FC = () => {
  const theme = useTheme();
  const { profileData, loadingProfile } = useProfileContext();
  const { userRewards, liveUnclaimedPoints } = useUserContext();
  const totalRewards = loadingProfile
    ? undefined
    : profileData?.total_rewards || 0;

  const [displayPoints, setDisplayPoints] = useState<null | number>(null);

  useEffect(() => {
    if (
      liveUnclaimedPoints === undefined ||
      liveUnclaimedPoints === null ||
      isNaN(Number(liveUnclaimedPoints))
    ) {
      setDisplayPoints(0);
    } else {
      setDisplayPoints(Number(23456)); //
    }
  }, [liveUnclaimedPoints]);

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
            // Reduce overall dimensions on mobile/tablet
            minWidth: { xs: "80px", sm: "100px", lg: "260px" },
            height: { xs: "30px", sm: "36px", lg: "54px" },
            flexWrap: "nowrap",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              // Smaller gap and padding for mobile/tablet
              gap: { xs: 0.25, sm: 0.5 },
              px: { xs: 0.5, sm: 1 },
              height: "100%",
            }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Box
                sx={{
                  // Decrease icon dimensions on smaller screens
                  width: { xs: 20, sm: 24 },
                  height: { xs: 20, sm: 24 },
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                <Image
                  src="/Icons/Resources/HoneyToken.png"
                  alt="HoneyToken"
                  fill
                  sizes="(max-width: 768px) 20px, 24px"
                  style={{ objectFit: "contain" }}
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
                  width={50}
                  height={20}
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    transform: "none",
                  }}
                />
              ) : (
                <Tooltip title="Total claimed points across your campaign">
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      color: theme.palette.Gold.main,
                      letterSpacing: "0.5px",
                      // Smaller font size on mobile/tablet
                      fontSize: { xs: "14px", sm: "18px", lg: "24px" },
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "start",
                      lineHeight: 1,
                      marginTop: "2px",
                    }}
                  >
                    {formatNumber(totalRewards) || 0}
                  </Typography>
                </Tooltip>
              )}
            </motion.div>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              // Reduce gap on smaller screens
              gap: { xs: 0.25, sm: 0.5, lg: 1.5 },
              px: { xs: 0.5, sm: 1 },
              flexWrap: "wrap",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: { xs: 0.25, sm: 0.5 },
              }}
            >
              <Tooltip title="Total unclaimed points from your hatchlings">
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  sx={{
                    color: theme.palette.LightBlue.main,
                    WebkitTextStroke: "0",
                    lineHeight: "1.2",
                    marginTop: "2px",
                    // Smaller font for mobile/tablet
                    fontSize: { xs: "12px", sm: "16px", lg: "24px" },
                  }}
                >
                  {displayPoints !== null ? (
                    formatNumber(Math.floor(displayPoints))
                  ) : (
                    <Skeleton variant="text" width={30} height={20} />
                  )}
                </Typography>
              </Tooltip>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <ClaimButton
                isUserResource={true}
                liveUnclaimedPoints={displayPoints || 0}
              />
            </Box>
          </Box>
        </Box>
      </UserResourcesBackground>
    </motion.div>
  );
};

export default UserResourceBar;
