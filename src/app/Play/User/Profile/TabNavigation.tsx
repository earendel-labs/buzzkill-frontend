"use client";

import React, { useState } from "react";
import { Box, Tab, Tabs, Snackbar, Alert } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ProfileTab from "./Components/ProfileTab";
import MyBeesTab from "./Components/MyBeesTab";
import RewardsTab from "./Components/RewardsTab";
import HexagonSpinner from "@/components/Loaders/HexagonSpinner/HexagonSpinner";

const TabNavigation = () => {
  const theme = useTheme();
  const [selectedTab, setSelectedTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case 0:
        return <ProfileTab />;
      case 1:
        return <MyBeesTab />;
      case 2:
        return <RewardsTab />;
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        flexGrow: 1,
        justifyContent: "space-between",
      }}
    >
      {loading ? (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          flexGrow={1}
        >
          <HexagonSpinner />
        </Box>
      ) : (
        <>
          {/* Tabs */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              py: 2,
            }}
          >
            <Tabs
              value={selectedTab}
              onChange={handleTabChange}
              centered
              sx={{
                width: "100%",
                maxWidth: "1200px",
                "& .MuiTabs-indicator": {
                  backgroundColor: "transparent",
                },
              }}
            >
              <Tab
                label="Profile"
                sx={{
                  color:
                    selectedTab === 0
                      ? theme.palette.Gold.main
                      : theme.palette.LightBlue.main,
                  backgroundColor:
                    selectedTab === 0
                      ? theme.palette.DarkBlue.main
                      : "transparent",
                  fontWeight: "bold",
                  borderRadius: "2px",
                  mx: 1,
                  px: 3,
                  "&:hover": {
                    backgroundColor: theme.palette.DarkBlue.light,
                  },
                }}
              />
              <Tab
                label="My Bees"
                sx={{
                  color:
                    selectedTab === 1
                      ? theme.palette.Gold.main
                      : theme.palette.LightBlue.main,
                  backgroundColor:
                    selectedTab === 1
                      ? theme.palette.DarkBlue.main
                      : "transparent",
                  fontWeight: "bold",
                  borderRadius: "2px",
                  mx: 1,
                  px: 3,
                  "&:hover": {
                    backgroundColor: theme.palette.DarkBlue.light,
                  },
                }}
              />
              <Tab
                label="Rewards"
                sx={{
                  color:
                    selectedTab === 2
                      ? theme.palette.Gold.main
                      : theme.palette.LightBlue.main,
                  backgroundColor:
                    selectedTab === 2
                      ? theme.palette.DarkBlue.main
                      : "transparent",
                  fontWeight: "bold",
                  borderRadius: "2px",
                  mx: 1,
                  px: 3,
                  "&:hover": {
                    backgroundColor: theme.palette.DarkBlue.light,
                  },
                }}
              />
            </Tabs>
          </Box>

          {/* Render the content of the active tab */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              px: 2,
              mt: 4,
              flexGrow: 1,
            }}
          >
            <Box
              sx={{
                width: "100%",
                maxWidth: "1200px",
              }}
            >
              {renderTabContent()}
            </Box>
          </Box>

          {/* Snackbar */}
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity={snackbarSeverity}
              sx={{ width: "100%" }}
            >
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </>
      )}
    </Box>
  );
};

export default TabNavigation;
