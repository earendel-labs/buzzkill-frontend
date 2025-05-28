"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  AppBar,
  Tabs,
  Tab,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
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

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

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
        margin: isMobile ? "8px 16px 0px 16px" : "12px 30px 0px 30px",
      }}
    >
      <Toolbar sx={{ justifyContent: "center" }}>
        <Box width="100%">
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
                minHeight: isMobile ? 56 : "auto",
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
                  fontSize: isMobile ? "18px" : isTablet ? "20px" : "22px",
                  minWidth: "auto",
                  borderBottom:
                    selectedTab === 0
                      ? `3px solid ${theme.palette.Gold.dark}`
                      : `3px solid transparent`,
                  "&:hover": {
                    color: theme.palette.Gold.main,
                    borderBottom: `3px solid ${theme.palette.Gold.main}`,
                  },
                  mx: isTablet ? 1 : 2,
                  px: isTablet ? 2 : 3,
                }}
              />
              <Tab
                label="My Bees"
                onMouseEnter={handleMouseEnter}
                sx={{
                  color:
                    selectedTab === 1
                      ? theme.palette.Gold.main
                      : theme.palette.GoldFaded.main,
                  fontWeight: "bold",
                  fontSize: isMobile ? "18px" : isTablet ? "20px" : "22px",
                  minWidth: "auto",
                  borderBottom:
                    selectedTab === 1
                      ? `3px solid ${theme.palette.Gold.dark}`
                      : `3px solid transparent`,
                  "&:hover": {
                    color: theme.palette.Gold.main,
                    borderBottom: `3px solid ${theme.palette.Gold.main}`,
                  },
                  mx: isTablet ? 1 : 2,
                  px: isTablet ? 2 : 3,
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
                  fontSize: isMobile ? "18px" : isTablet ? "20px" : "22px",
                  minWidth: "auto",
                  borderBottom:
                    selectedTab === 2
                      ? `3px solid ${theme.palette.Gold.dark}`
                      : `3px solid transparent`,
                  "&:hover": {
                    color: theme.palette.Gold.main,
                    borderBottom: `3px solid ${theme.palette.Gold.main}`,
                  },
                  mx: isTablet ? 1 : 2,
                  px: isTablet ? 2 : 3,
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
