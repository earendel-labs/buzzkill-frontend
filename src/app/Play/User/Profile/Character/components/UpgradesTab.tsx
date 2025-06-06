"use client";

import React from "react";
import { Box, Typography, Grid, Paper, useTheme } from "@mui/material";
import { ArrowCircleUp as UpgradeIcon } from "@mui/icons-material";
import { BeeStats } from "../../../../../../types/OriginsStats";
import DefaultButton from "@/components/Buttons/DefaultButton/DefaultButton";

interface UpgradesTabProps {
  beeStats: BeeStats;
  openUpgradeDialog: (stat: string) => void;
}

// Renders the Upgrades tab content.
export default function UpgradesTab({
  beeStats,
  openUpgradeDialog,
}: UpgradesTabProps) {
  const theme = useTheme();

  const upgrades = [
    {
      name: "Attack",
      desc: "Boosts raid efficiency, maximizing your resource plunder",
      value: beeStats.attack,
      stat: "Attack",
    },
    {
      name: "Defence",
      desc: "Fortifies your hive against raids and potential threats",
      value: beeStats.defence,
      stat: "Defence",
    },
    {
      name: "Foraging",
      desc: "Elevates the chance of harvesting resources during forages",
      value: beeStats.foraging,
      stat: "Foraging",
    },
    {
      name: "Energy",
      desc: "Sets the maximum energy your bee can consume, refreshed every 24 hours",
      value: beeStats.maxEnergy,
      stat: "Energy",
    },
    {
      name: "Health",
      desc: "Damage your bee can take during raids",
      value: beeStats.maxHealth,
      stat: "Health",
    },
    {
      name: "Yield",
      desc: "Your characters yielding power set by: base, current, max",
      value: beeStats.maxYield,
      stat: "Yield",
    },
  ];

  return (
    <Box sx={{ p: { xs: 1, xl: 1 } }}>
      <Typography variant="h6" sx={{ color: theme.palette.Gold.main, mb: 0.5 }}>
        Upgrade Your Buzzkill Origins
      </Typography>
      <Typography variant="body2" sx={{ color: "#ffffff", mb: 2 }}>
        Spend $HONEY to improve your Buzzkill Origins capabilities
      </Typography>

      <Grid
        container
        spacing={{ xs: 0.5, lg: 1, xl: 1.5 }}
        sx={{ flexDirection: { lg: "column" } }}
      >
        {upgrades.map((upgrade) => (
          <Grid item xs={12} md={6} lg={12} key={upgrade.stat}>
            <Paper
              sx={{
                p: { xs: 1, lg: 1.5, xl: 2 },
                bgcolor: theme.palette.DarkBlueFaded.dark,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: { xs: 1, lg: 2 },
              }}
            >
              <Box sx={{ flex: 1 }}>
                {/* Name & Value on the Same Line with Correct Alignment */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 0,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: theme.palette.Gold.main,
                      fontWeight: "bold",
                      fontSize: { xs: "1rem", lg: "1.15rem", xl: "1.3rem" },
                    }}
                  >
                    {upgrade.name}
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: "#ffffff" }}>
                  {upgrade.desc}
                </Typography>
              </Box>
              <DefaultButton
                variant="contained"
                // onClick={() => openUpgradeDialog(upgrade.stat)} // Upgrade logic not yet enabled
                disabled
                className="goldButtonHorizontal"
                sx={{
                  width: { xs: "100%", lg: "auto" },
                  minWidth: "180px",
                }}
              >
                <UpgradeIcon sx={{ mr: 1 }} />
                500 $HONEY
              </DefaultButton>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
