"use client";

import type React from "react";
import { useState } from "react";
import { Box, Grid, Tabs, Tab } from "@mui/material";
import Layout from "@/components/Layouts/Layout/Layout";
import { BeeStats } from "./components/types";
import BeeHeader from "./components/BeeHeader";
import StatsTab from "./components/StatsTab";
import TraitsTab from "./components/TraitsTab";
import UpgradesTab from "./components/UpgradesTab";
import UpgradeDialog from "./components/UpgradeDialog";
import SemiTransparentCard from "@/components/Card/SemiTransaprentCard";
import LeftButton from "@/components/Buttons/CarouselNavigation/LeftButton";
import RightButton from "@/components/Buttons/CarouselNavigation/RightButton";

export default function CharacterDashboard() {
  const [beeStats, setBeeStats] = useState<BeeStats>({
    id: "#522",
    name: "Worker Bee",
    level: 2,
    xp: 150,
    maxXp: 250,
    attack: 30,
    defence: 30,
    foraging: 30,
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

  const initializeBee = () => {
    setBeeStats((prev) => ({
      ...prev,
      attack: Math.floor(Math.random() * 20) + 20,
      defence: Math.floor(Math.random() * 20) + 20,
      foraging: Math.floor(Math.random() * 20) + 20,
      energy: Math.floor(Math.random() * 30) + 70,
      maxEnergy: 100,
      health: Math.floor(Math.random() * 20) + 40,
      maxHealth: 60,
      productivity: Math.floor(Math.random() * 15) + 15,
      currentProductivity: Math.floor(Math.random() * 20) + 30,
      maxProductivity: 70,
      initialized: true,
    }));
  };

  const openUpgradeDialog = (stat: string) => {
    setSelectedStat(stat);
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
      <Box sx={{ mx: { xs: 1, md: 2 }, my: 4 }}>
        <SemiTransparentCard sx={{ px: 2, py: 4 }}>
          <Grid container alignItems="center">
            {/* Left Arrow using LeftButton Component */}
            <Grid item xs={1} display="flex" justifyContent="center">
              <LeftButton />
            </Grid>

            {/* Main Content */}
            <Grid item xs={10}>
              <Grid container spacing={3}>
                {/* Left Column - Header + Image + Traits */}
                <Grid item xs={12} md={5}>
                  <BeeHeader
                    beeStats={beeStats}
                    honey={honey}
                    initializeBee={initializeBee}
                  />
                </Grid>

                {/* Right Column - Tabs + Content */}
                <Grid item xs={12} md={7}>
                  <Box sx={{ mb: 2 }}>
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

            {/* Right Arrow using RightButton Component */}
            <Grid item xs={1} display="flex" justifyContent="center">
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
