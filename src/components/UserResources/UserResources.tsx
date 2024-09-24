import React, { useState, useEffect } from "react";
import { Box, Typography, Skeleton } from "@mui/material";
import Image from "next/image";
import { UserInfo } from "@/types/UserInfo";
import { formatNumber } from "@/app/utils/formatNumber";

// Hardcoded userInfo data
const initialUserInfo: UserInfo = {
  pollen: 0,
  nectar: 0,
  sap: 0,
  honey: 0,
  queenBees: 0,
  workerBees: 0,
};

const delayedUserInfo: UserInfo = {
  pollen: 75000,
  nectar: 235000,
  sap: 75000,
  honey: 953000,
  queenBees: 5,
  workerBees: 50,
};

const UserResourceBar: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  // Simulate a delay of 0.5 seconds in loading the userInfo data
  useEffect(() => {
    const timer = setTimeout(() => {
      setUserInfo(delayedUserInfo);
    }, 500); // 500ms delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <Box
      sx={{
        width: "480px",
        height: "65px",
        backgroundImage: "url(/Frames/UserResources/UserResourceBar.svg)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        zIndex: 1000,
        display: "flex",
        alignItems: "flex-end", // Align all contents to the bottom
        justifyContent: "center",
        padding: "0px 0px 15px 0px",
        transform: "scale(1)", // Default scale is 1 (no scaling)
        transformOrigin: "top left", // Ensures scaling starts from the top left
        transition: "transform 0.3s ease-in-out", // Smooth transition when resizing
        "@media (max-width: 1440px)": {
          transform: "scale(0.8)", // Scale down to 80% on smaller screens
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end", // Ensure all items align to the bottom
          width: "100%",
          padding: "0 55px 0px 30px",
        }}
      >
        {/* Pollen */}
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end", // Ensure both icon and text align to the bottom
            gap: "4px",
          }}
        >
          <Image
            src="/Icons/Resources/Pollen.svg"
            alt="Pollen"
            width={32}
            height={32}
          />
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            {userInfo ? (
              <Typography
                variant="h6"
                sx={{
                  minWidth: "50px",
                  textAlign: "left",
                  lineHeight: 1,
                }}
              >
                {formatNumber(userInfo.pollen)}
              </Typography>
            ) : (
              <Skeleton variant="text" width={50} />
            )}
          </Box>
        </Box>

        {/* Nectar */}
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end", // Ensure both icon and text align to the bottom
            gap: "4px",
          }}
        >
          <Image
            src="/Icons/Resources/Nectar.svg"
            alt="Nectar"
            width={32}
            height={32}
          />
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            {userInfo ? (
              <Typography
                variant="h6"
                sx={{
                  minWidth: "50px",
                  textAlign: "left",
                  lineHeight: 1,
                }}
              >
                {formatNumber(userInfo.nectar)}
              </Typography>
            ) : (
              <Skeleton variant="text" width={50} />
            )}
          </Box>
        </Box>

        {/* Sap */}
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end", // Ensure both icon and text align to the bottom
            gap: "4px",
          }}
        >
          <Image
            src="/Icons/Resources/Sap.svg"
            alt="Sap"
            width={32}
            height={32}
          />
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            {userInfo ? (
              <Typography
                variant="h6"
                sx={{
                  minWidth: "50px",
                  textAlign: "left",
                  lineHeight: 1,
                }}
              >
                {formatNumber(userInfo.sap)}
              </Typography>
            ) : (
              <Skeleton variant="text" width={50} />
            )}
          </Box>
        </Box>

        {/* HoneyToken */}
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
            gap: "4px",
          }}
        >
          <Image
            src="/Icons/Resources/HoneyToken.svg"
            alt="HoneyToken"
            width={32}
            height={32}
          />
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            {userInfo ? (
              <Typography
                variant="h6"
                sx={{
                  minWidth: "50px",
                  textAlign: "left",
                  lineHeight: 1,
                }}
              >
                {formatNumber(userInfo.honey)}
              </Typography>
            ) : (
              <Skeleton variant="text" width={50} />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default UserResourceBar;
