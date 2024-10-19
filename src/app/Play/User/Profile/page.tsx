"use client";
import React, { useState } from "react";
import { Box, Typography, Snackbar, Alert, Tab, Tabs } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Layout from "@/components/Layouts/Layout/Layout";
import HexagonSpinner from "@/components/Loaders/HexagonSpinner/HexagonSpinner";

// Import tab components
import ProfileTab from "./Components/ProfileTab";
import MyBeesTab from "./Components/MyBeesTab";
import RewardsTab from "./Components/RewardsTab";

const ProfilePage = () => {
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
    <Layout>
      {loading ? (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          flexGrow={1} // Ensure it grows to fill the remaining space
        >
          <HexagonSpinner />
          <Typography marginTop="24px">Fetching data...</Typography>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            flexGrow: 1, // Grow to fill the available space dynamically
            justifyContent: "space-between", // Prevent unnecessary scrolling
          }}
        >
          {/* Tabs */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              backgroundColor: "transparent",
              py: 2,
              borderBottom: "none", // Remove border or shadow under tabs
            }}
          >
            <Tabs
              value={selectedTab}
              onChange={handleTabChange}
              centered
              sx={{
                width: "100%",
                maxWidth: "1200px", // Maximum width for the tabs container
                "& .MuiTabs-indicator": {
                  backgroundColor: "transparent", // Hide indicator line
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
              flexGrow: 1, // Ensure this part grows to fill the remaining space
            }}
          >
            <Box
              sx={{
                width: "100%",
                maxWidth: "1200px", // Maximum width for the content
              }}
            >
              {renderTabContent()}
            </Box>
          </Box>

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
        </Box>
      )}
    </Layout>
  );
};

export default ProfilePage;
