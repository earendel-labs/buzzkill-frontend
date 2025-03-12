// CharacterDashboard.tsx
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
import type { BeeStats } from "./components/types";

export default function CharacterDashboard() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [beeStats, setBeeStats] = useState<BeeStats>({
    id: "#522",
    name: "Worker Bee",
    level: 2,
    xp: 150,
    maxXp: 250,
    attack: 86,
    defence: 52,
    foraging: 40,
    energy: 82,
    maxEnergy: 90,
    health: 24,
    maxHealth: 55,
    productivity: 21,
    currentProductivity: 44,
    maxProductivity: 67,
    raidsCompleted: 13,
    raidsSuccessful: 6,
    foragesCompleted: 50,
    initialized: true,
    traits: {
      leftArm: "Lightning Sword",
      rightArm: "Shield of Pollen",
      body: "Royal Armor",
      head: "Antler Crown",
      wings: "Golden Wings",
      background: "Forest Haven",
    },
  });

  const [honey, setHoney] = useState(3356);
  const [upgradeDialogOpen, setUpgradeDialogOpen] = useState(false);
  const [selectedStat, setSelectedStat] = useState("");
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const openUpgradeDialog = (stat: string) => {
    setSelectedStat(stat.toLowerCase());
    setUpgradeDialogOpen(true);
  };

  const upgradeStat = () => {
    const cost = 500;
    if (honey >= cost) {
      setHoney(honey - cost);
      setBeeStats((prev) => {
        switch (selectedStat) {
          case "attack":
            return { ...prev, attack: prev.attack + 5 };
          case "defence":
            return { ...prev, defence: prev.defence + 5 };
          case "foraging":
            return { ...prev, foraging: prev.foraging + 5 };
          case "energy":
            return { ...prev, maxEnergy: prev.maxEnergy + 10 };
          case "health":
            return { ...prev, maxHealth: prev.maxHealth + 10 };
          case "productivity":
            return { ...prev, maxProductivity: prev.maxProductivity + 10 };
          default:
            return prev;
        }
      });
      setUpgradeDialogOpen(false);
    }
  };

  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          // Tighter top/bottom margin at lg for vertical fit
          my: { xs: 6, sm: 5, md: 4, lg: 2, xl: 4 },
          px: { xs: 2, sm: 3, md: 3, lg: 2, xl: 3 },
        }}
      >
        <SemiTransparentCard
          sx={{
            // Slightly tighter padding at lg
            px: { xs: 2, sm: 2, md: 3, lg: 2 },
            py: { xs: 2, sm: 2, md: 3, lg: 2 },
            width: "100%",
            maxWidth: "1400px",
          }}
        >
          <Grid container alignItems="center" spacing={{ xs: 2, md: 3 }}>
            <Grid
              item
              xs={1}
              display={{ xs: "none", md: "flex" }}
              justifyContent="center"
            >
              <LeftButton />
            </Grid>

            <Grid item xs={isSmallScreen ? 12 : 10}>
              <Grid container spacing={{ xs: 3, md: 4, lg: 3 }}>
                <Grid item xs={12} md={5}>
                  <BeeHeader
                    beeStats={beeStats}
                    honey={honey}
                    initializeBee={() => {}}
                  />
                </Grid>
                <Grid item xs={12} md={7}>
                  <Box sx={{ mb: { xs: 2, md: 3 } }}>
                    <Tabs
                      value={tabValue}
                      onChange={handleTabChange}
                      variant="fullWidth"
                      sx={{ minHeight: 40 }}
                    >
                      <Tab label="Stats" />
                      <Tab label="Traits" />
                      <Tab label="Upgrades" />
                    </Tabs>
                  </Box>

                  {tabValue === 0 && (
                    <StatsTab
                      beeStats={beeStats}
                      openUpgradeDialog={openUpgradeDialog}
                    />
                  )}
                  {tabValue === 1 && <TraitsTab beeStats={beeStats} />}
                  {tabValue === 2 && (
                    <UpgradesTab
                      beeStats={beeStats}
                      openUpgradeDialog={openUpgradeDialog}
                    />
                  )}
                </Grid>
              </Grid>
            </Grid>

            <Grid
              item
              xs={1}
              display={{ xs: "none", md: "flex" }}
              justifyContent="center"
            >
              <RightButton />
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
