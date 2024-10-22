"use client";

import React, { useState, useEffect } from "react";
import { Box, AppBar, Tabs, Tab, Toolbar } from "@mui/material";
import { useRouter, usePathname } from "next/navigation"; // Import usePathname to get the current path
import { useTheme } from "@mui/material/styles"; // To use theme for colors

const NavigationDrawer = () => {
  const [selectedTab, setSelectedTab] = useState(0); // Tabs state
  const router = useRouter();
  const pathname = usePathname(); // Get the current pathname
  const theme = useTheme(); // Use theme to get color values

  // Define mapping for tabs and subdomains/routes
  const tabMap: Record<string, number> = {
    "/Play/User/Profile/MyProfile": 0,
    "/Play/User/Profile/MyBees": 1,
    "/Play/User/Profile/MyRewards": 2,
  };

  // Update selectedTab based on the current pathname
  useEffect(() => {
    if (pathname && pathname in tabMap) {
      setSelectedTab(tabMap[pathname]);
    }
  }, [pathname]); // Rerun this effect when the pathname changes

  // Handle tab switching
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);

    // Navigate to the specific tab route
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

  return (
    <>
      {/* AppBar with Tabs */}
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
          {" "}
          {/* Center the Tabs */}
          <Box>
            {/* Tabs for navigation */}
            <Tabs
              value={selectedTab}
              onChange={handleTabChange}
              centered
              sx={{
                "& .MuiTabs-indicator": {
                  display: "none", // Hide the default indicator
                },
              }}
            >
              {/* Profile Tab */}
              <Tab
                label="Profile"
                sx={{
                  color:
                    selectedTab === 0
                      ? theme.palette.Gold.main // Highlighted text for selected tab
                      : theme.palette.DarkBlue.main, // Default text color
                  fontWeight: "bold",
                  borderBottom:
                    selectedTab === 0
                      ? `2px solid ${theme.palette.Gold.dark}` // Solid underline for selected tab
                      : `2px solid transparent`, // No underline for non-selected tab
                  "&:hover": {
                    color: theme.palette.Gold.main, // Hover effect for text
                    borderBottom: `2px solid ${theme.palette.Gold.main}`, // Gold underline on hover
                  },
                  mx: 1,
                  px: 3,
                }}
              />
              {/* My Bees Tab */}
              <Tab
                label="My Bees"
                sx={{
                  color:
                    selectedTab === 1
                      ? theme.palette.Gold.main // Highlighted text for selected tab
                      : theme.palette.DarkBlue.main, // Default text color
                  fontWeight: "bold",
                  borderBottom:
                    selectedTab === 1
                      ? `2px solid ${theme.palette.Gold.dark}` // Solid underline for selected tab
                      : `2px solid transparent`, // No underline for non-selected tab
                  "&:hover": {
                    color: theme.palette.Gold.main, // Hover effect for text
                    borderBottom: `2px solid ${theme.palette.Gold.main}`, // Gold underline on hover
                  },
                  mx: 1,
                  px: 3,
                }}
              />
              {/* Rewards Tab */}
              <Tab
                label="Rewards"
                sx={{
                  color:
                    selectedTab === 2
                      ? theme.palette.Gold.main // Highlighted text for selected tab
                      : theme.palette.DarkBlue.main, // Default text color
                  fontWeight: "bold",
                  borderBottom:
                    selectedTab === 2
                      ? `2px solid ${theme.palette.Gold.dark}` // Solid underline for selected tab
                      : `2px solid transparent`, // No underline for non-selected tab
                  "&:hover": {
                    color: theme.palette.Gold.main, // Hover effect for text
                    borderBottom: `2px solid ${theme.palette.Gold.main}`, // Gold underline on hover
                  },
                  mx: 1,
                  px: 3,
                }}
              />
            </Tabs>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavigationDrawer;
