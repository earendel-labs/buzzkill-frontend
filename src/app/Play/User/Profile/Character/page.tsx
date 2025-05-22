"use client";
import React, { useState } from "react";
import { Box, Grid, Tabs, Tab, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Layout from "@/components/Layouts/Layout/Layout";
import SemiTransparentCard from "@/components/Card/SemiTransaprentCard";
import LeftButton from "@/components/Buttons/CarouselNavigation/LeftButton";
import RightButton from "@/components/Buttons/CarouselNavigation/RightButton";
import UpgradeDialog from "./components/UpgradeDialog";
import BeeHeader from "./components/BeeHeader";
import StatsTab from "./components/StatsTab";
import TraitsTab from "./components/TraitsTab";
import UpgradesTab from "./components/UpgradesTab";
import { useBuzzkillOriginsContext } from "@/context/BuzzkillOriginsContext";
import type { BeeStats } from "@/types/OriginsStats";

export default function CharacterDashboard() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  // ⇢ grab merged array & loading flag from context
  const { bees, loading } = useBuzzkillOriginsContext();
  const [currentIndex, setCurrentIndex] = useState(0);

  // local UI state
  const [honey, setHoney] = useState(3356);
  const [upgradeDialogOpen, setUpgradeDialogOpen] = useState(false);
  const [selectedStat, setSelectedStat] = useState("");
  const [tabValue, setTabValue] = useState(0);

  // 1) loading / empty guards
  if (loading) {
    return <Layout>Loading your bees…</Layout>;
  }
  if (bees.length === 0) {
    return <Layout>No bees found.</Layout>;
  }

  // 2) current BeeStats
  const currentBee: BeeStats = bees[currentIndex];

  // 3) disable carousel at ends
  const leftDisabled = currentIndex === 0;
  const rightDisabled = currentIndex === bees.length - 1;
  const showPrev = () => !leftDisabled && setCurrentIndex((i) => i - 1);
  const showNext = () => !rightDisabled && setCurrentIndex((i) => i + 1);

  const handleTabChange = (_: any, newVal: number) => setTabValue(newVal);
  const openUpgradeDialog = (stat: string) => {
    setSelectedStat(stat.toLowerCase());
    setUpgradeDialogOpen(true);
  };
  const upgradeStat = () => {
    const cost = 500;
    if (honey < cost) return setUpgradeDialogOpen(false);
    setHoney((h) => h - cost);
    // local hack: mutate currentBee; ideally push update back into context or DB
    switch (selectedStat) {
      case "attack":
        currentBee.attack += 5;
        break;
      case "defence":
        currentBee.defence += 5;
        break;
      case "foraging":
        currentBee.foraging += 5;
        break;
      case "energy":
        currentBee.maxEnergy += 10;
        break;
      case "health":
        currentBee.maxHealth += 10;
        break;
      case "productivity":
        currentBee.maxProductivity += 10;
        break;
    }
    setUpgradeDialogOpen(false);
  };

  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: { xs: 2, sm: 3, md: 1 },
          py: { xs: 2, sm: 2, md: 3 },
          width: "100%",
        }}
      >
        <SemiTransparentCard
          sx={{
            width: "100%",
            maxWidth: 1400,
            minHeight: { xs: 500, md: 600 },
            py: { xs: 1.5, sm: 1.5, md: 1 },
            px: { xs: 1.5, sm: 2, md: 1 },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Grid container alignItems="center" spacing={2}>
            <Grid item>
              <LeftButton disabled={leftDisabled} onClick={showPrev} />
            </Grid>

            <Grid item xs sx={{ textAlign: "left" }}>
              <Grid
                container
                alignItems="flex-start"
                spacing={{ xs: 2, md: 3 }}
              >
                <Grid item xs={12} md={5}>
                  <BeeHeader
                    beeStats={currentBee}
                    honey={honey}
                    initializeBee={() => {}}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={7}
                  sx={{ display: "flex", flexDirection: "column" }}
                >
                  <Box sx={{ py: 1, mb: 1 }}>
                    <Tabs
                      value={tabValue}
                      onChange={handleTabChange}
                      variant="fullWidth"
                      sx={{
                        minHeight: 36,
                        "& .MuiTab-root": {
                          fontSize: "1.1rem",
                          minHeight: 36,
                          padding: "6px 12px",
                        },
                        "& .MuiTabs-indicator": { height: 3 },
                      }}
                    >
                      <Tab label="Stats" />
                      <Tab label="Traits" />
                      <Tab label="Upgrades" />
                    </Tabs>
                  </Box>
                  <Box sx={{ flex: 1, width: "100%" }}>
                    {tabValue === 0 && (
                      <StatsTab
                        beeStats={currentBee}
                        openUpgradeDialog={openUpgradeDialog}
                      />
                    )}
                    {tabValue === 1 && <TraitsTab beeStats={currentBee} />}
                    {tabValue === 2 && (
                      <UpgradesTab
                        beeStats={currentBee}
                        openUpgradeDialog={openUpgradeDialog}
                      />
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <RightButton disabled={rightDisabled} onClick={showNext} />
            </Grid>
          </Grid>
        </SemiTransparentCard>
      </Box>

      <UpgradeDialog
        upgradeDialogOpen={upgradeDialogOpen}
        setUpgradeDialogOpen={setUpgradeDialogOpen}
        selectedStat={selectedStat}
        honey={honey}
        upgradeStat={upgradeStat}
      />
    </Layout>
  );
}
