"use client";

import React, { useState, useEffect } from "react";
import { Box, AppBar, Tabs, Tab, Toolbar, Typography } from "@mui/material";
import { useRouter, usePathname } from "next/navigation";
import { useTheme } from "@mui/material/styles";
import HexagonSpinner from "@/components/Loaders/HexagonSpinner/HexagonSpinner";

interface NavigationDrawerProps {
  loading?: boolean;
}

const NavigationDrawer: React.FC<NavigationDrawerProps> = ({
  loading = false,
}) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();

  const [hoverSound, setHoverSound] = useState<HTMLAudioElement | null>(null);
  const [clickSound, setClickSound] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    setHoverSound(new Audio("/Audio/Button/SocialIconHover.wav"));
    setClickSound(new Audio("/Audio/Button/WoodenClick.wav"));
  }, []);

  const tabMap: Record<string, number> = {
    "/Play/User/Profile/MyProfile": 0,
    "/Play/User/Profile/MyBees": 1,
    "/Play/User/Profile/MyRewards": 2,
  };

  useEffect(() => {
    if (pathname && pathname in tabMap) {
      setSelectedTab(tabMap[pathname]);
    }
  }, [pathname]);

  const handleTabClick = () => {
    if (clickSound) {
      clickSound.currentTime = 0;
      clickSound.play();
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
    handleTabClick();
    switch (newValue) {
      case 0:
        router.push("/Play/User/Profile/MyProfile");
        break;
      case 1:
        router.push("/Play/User/Profile/MyBees");
        break;
      case 2:
        router.push("/Play/User/Profile/MyRewards");
        break;
      default:
        break;
    }
  };

  const handleMouseEnter = () => {
    if (hoverSound) {
      hoverSound.currentTime = 0;
      hoverSound.play();
    }
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "transparent",
        boxShadow: "none",
        borderBottom: "none",
        margin: "12px 30px 0px 30px",
      }}
    >
      <Toolbar sx={{ justifyContent: "center" }}>
        <Box>
          {loading ? (
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              sx={{ py: 2 }}
            >
              <HexagonSpinner />
              <Typography sx={{ marginTop: "16px" }}>
                Fetching Data from the Hive Mind...
              </Typography>
            </Box>
          ) : (
            <Tabs
              value={selectedTab}
              onChange={handleTabChange}
              centered
              sx={{
                "& .MuiTabs-indicator": { display: "none" },
              }}
            >
              <Tab
                label="Profile"
                onMouseEnter={handleMouseEnter}
                sx={{
                  color:
                    selectedTab === 0
                      ? theme.palette.Gold.main
                      : theme.palette.GoldFaded.main,
                  fontWeight: "bold",
                  borderBottom:
                    selectedTab === 0
                      ? `2px solid ${theme.palette.Gold.dark}`
                      : `2px solid transparent`,
                  "&:hover": {
                    color: theme.palette.Gold.main,
                    borderBottom: `2px solid ${theme.palette.Gold.main}`,
                  },
                  mx: 1,
                  px: 3,
                }}
              />
              <Tab
                label="My Hatchlings"
                onMouseEnter={handleMouseEnter}
                sx={{
                  color:
                    selectedTab === 1
                      ? theme.palette.Gold.main
                      : theme.palette.GoldFaded.main,
                  fontWeight: "bold",
                  borderBottom:
                    selectedTab === 1
                      ? `2px solid ${theme.palette.Gold.dark}`
                      : `2px solid transparent`,
                  "&:hover": {
                    color: theme.palette.Gold.main,
                    borderBottom: `2px solid ${theme.palette.Gold.main}`,
                  },
                  mx: 1,
                  px: 3,
                }}
              />
              <Tab
                label="Rewards"
                onMouseEnter={handleMouseEnter}
                sx={{
                  color:
                    selectedTab === 2
                      ? theme.palette.Gold.main
                      : theme.palette.GoldFaded.main,
                  fontWeight: "bold",
                  borderBottom:
                    selectedTab === 2
                      ? `2px solid ${theme.palette.Gold.dark}`
                      : `2px solid transparent`,
                  "&:hover": {
                    color: theme.palette.Gold.main,
                    borderBottom: `2px solid ${theme.palette.Gold.main}`,
                  },
                  mx: 1,
                  px: 3,
                }}
              />
            </Tabs>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationDrawer;
