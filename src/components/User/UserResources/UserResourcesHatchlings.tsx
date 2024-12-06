import React, { useState, useEffect } from "react";
import { Box, Typography, Skeleton } from "@mui/material";
import Image from "next/image";
import { UserInfo } from "@/types/UserInfo";
import { formatNumber } from "@/app/utils/formatNumber";
import UserResourcesBackground from "./UserResourcesBackground";
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
    <UserResourcesBackground borderWidth="2px">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end", // Ensure all items align to the bottom
          width: "100%",
          height: "100%",
          padding: "2px 24px 2px 12px",
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
          <Box sx={{ width: 32, height: 32 }}>
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
                  fontSize: "32px",
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
    </UserResourcesBackground>
  );
};

export default UserResourceBar;
