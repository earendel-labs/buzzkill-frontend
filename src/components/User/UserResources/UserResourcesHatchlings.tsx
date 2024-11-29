import React, { useState, useEffect } from "react";
import { Box, Typography, Skeleton } from "@mui/material";
import Image from "next/image";
import { UserInfo } from "@/types/UserInfo";
import { formatNumber } from "@/app/utils/formatNumber";

// Function to fetch user info from the Next.js API
const fetchUserInfo = async (): Promise<UserInfo> => {
  const response = await fetch("/api/user-info");
  if (!response.ok) {
    throw new Error("Failed to fetch user info");
  }
  const data = await response.json();
  return data;
};

const UserResourceBar: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true); // Track loading state

  // Fetch userInfo data from API
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const data = await fetchUserInfo();
        setUserInfo(data);
      } catch (error) {
        console.error("Failed to fetch user info", error);
      } finally {
        setLoading(false); // Data is either loaded or failed, stop loading
      }
    };

    getUserInfo();
  }, []); // Empty dependency array means this only runs once

  return (
    <Box
      sx={{
        width: "305px",
        height: "56px",
        backgroundImage: "url(/Frames/UserResources/UserResourceBarBeta.svg)",
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
          height: "100%",
          padding: "0 55px 0px 30px",
        }}
      >
        {/* HoneyToken */}
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
            gap: "12px",
          }}
        >
          <Box sx={{ width: 24, height: 24 }}>
            <Image
              src="/Icons/Resources/HoneyToken.svg"
              alt="HoneyToken"
              width={32}
              height={32}
              style={{ width: "auto", height: "auto" }}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "flex-start" }}>
            {loading ? (
              <Skeleton variant="text" width={50} />
            ) : (
              <Typography
                variant="h6"
                sx={{
                  fontSize: "20px",
                  minWidth: "50px",
                  textAlign: "left",
                  lineHeight: 0.85,
                }}
              >
                {formatNumber(userInfo?.honey || 0)}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default UserResourceBar;
