"use client";

import React from "react";
import { Box, Typography, Skeleton } from "@mui/material";
import Image from "next/image";
import { motion } from "framer-motion";
import UserResourcesBackground from "./UserResourcesBackground";
import { useProfileContext } from "@/context/ProfileContext";
import { formatNumber } from "@/utils/formatNumber";

const UserResourceBar: React.FC = () => {
  const { profileData, loadingProfile } = useProfileContext();
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
            justifyContent: "flex-start",
            gap: 2,
            px: 2,
            py: 1.5,
            minWidth: "120px",
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
                  color: "#E9B743",
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
      </UserResourcesBackground>
    </motion.div>
  );
};

export default UserResourceBar;
