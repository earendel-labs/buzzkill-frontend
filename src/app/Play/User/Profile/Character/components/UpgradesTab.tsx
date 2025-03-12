"use client";

import React from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import { ArrowCircleUp as UpgradeIcon } from "@mui/icons-material";
import { BeeStats } from "./types";

interface UpgradesTabProps {
  beeStats: BeeStats;
  openUpgradeDialog: (stat: string) => void;
}

// Renders the Upgrades tab content.
export default function UpgradesTab({
  beeStats,
  openUpgradeDialog,
}: UpgradesTabProps) {
  const upgrades = [
    {
      name: "Attack",
      desc: "Increase damage in raids",
      value: beeStats.attack,
      stat: "Attack",
    },
    {
      name: "Defence",
      desc: "Reduce damage taken in raids",
      value: beeStats.defence,
      stat: "Defence",
    },
    {
      name: "Foraging",
      desc: "Improve resource gathering",
      value: beeStats.foraging,
      stat: "Foraging",
    },
    {
      name: "Max Energy",
      desc: "Increase daily action capacity",
      value: beeStats.maxEnergy,
      stat: "Energy",
    },
    {
      name: "Max Health",
      desc: "Survive longer in raids",
      value: beeStats.maxHealth,
      stat: "Health",
    },
    {
      name: "Max Productivity",
      desc: "Increase $HONEY production",
      value: beeStats.maxProductivity,
      stat: "Productivity",
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ color: "#f0c850", mb: 1 }}>
        Upgrade Your Buzzkill Origins.
      </Typography>
      <Typography variant="body2" sx={{ color: "text.secondary", mb: 3 }}>
        Spend $HONEY to improve your Buzzkill Origins capabilities
      </Typography>

      <Grid container spacing={2}>
        {upgrades.map((upgrade) => (
          <Grid item xs={12} md={6} key={upgrade.stat}>
            <Box
              sx={{
                p: 2,
                bgcolor: "#1a3045",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>
                <Typography variant="body1">{upgrade.name}</Typography>
                <Typography variant="body2" sx={{ color: "#f0c850" }}>
                  Current: {upgrade.value}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {upgrade.desc}
                </Typography>
              </Box>
              <Button
                variant="contained"
                onClick={() => openUpgradeDialog(upgrade.stat)}
                startIcon={<UpgradeIcon />}
                sx={{
                  background: "linear-gradient(to right, #c9a227, #f0c850)",
                  color: "black",
                }}
              >
                500 $HONEY
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
