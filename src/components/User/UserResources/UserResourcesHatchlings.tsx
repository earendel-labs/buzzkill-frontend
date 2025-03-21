"use client";

import React, { useEffect, useState } from "react";
import { Box, Typography, Skeleton, Tooltip } from "@mui/material";
import Image from "next/image";
import { motion } from "framer-motion";
import UserResourcesBackground from "./UserResourcesBackground";
import { useProfileContext } from "@/context/ProfileContext";
import { useUserContext } from "@/context/UserContext";
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
      setDisplayPoints(Number(liveUnclaimedPoints)); // For testing, replace with liveUnclaimedPoints
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
            minWidth: {
              md: "100px",
              lg: "120px",
              xl: "420px",
            },
            height: "54px",
            flexWrap: "nowrap",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: { xs: 0.5, md: 1 },
              px: { xs: 1, md: 2 },
              height: "48px",
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
                  fill
                  sizes="(max-width: 768px) 32px, 32px"
                  style={{
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
                  width={64}
                  height={34}
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    transform: "none",
                  }}
                />
              ) : (
                <Tooltip title="Total claimed points across your campaign">
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: "bold",
                      color: theme.palette.Gold.main,
                      letterSpacing: "0.5px",
                      fontSize: {
                        xs: "20px",
                        sm: "20px",
                        md: "20px",
                        lg: "28px",
                        xl: "30px",
                      },
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "start",
                      lineHeight: 1,
                      height: "100%",
                      marginTop: "3px",
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
              gap: {
                xs: 0.5,
                sm: 0.7,
                md: 1.3,
                lg: 1.5,
                xl: 2,
              },
              px: { xs: 1, md: 2 },
              flexWrap: "wrap",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Tooltip title="Total unclaimed points from your hatchlings">
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  sx={{
                    color: theme.palette.LightBlue.main,
                    WebkitTextStroke: "0",
                    lineHeight: "1.2",
                    marginTop: "6px",
                    fontSize: {
                      xs: "16px",
                      sm: "16px",
                      md: "16px",
                      lg: "24px",
                      xl: "28px",
                    },
                  }}
                >
                  {displayPoints !== null ? (
                    formatNumber(Math.floor(displayPoints))
                  ) : (
                    <Skeleton variant="text" width={40} height={60} />
                  )}
                </Typography>
              </Tooltip>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                padding: {
                  xs: "0px 0px",
                  sm: "0px 4px",
                  md: "0px 0px",
                  lg: "0px 0px",
                  xl: "0px 0px",
                },
              }}
            >
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
