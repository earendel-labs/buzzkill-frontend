"use client";

import React from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import { BeeStats } from "./types";
import { useTheme } from "@mui/material";
interface TraitsTabProps {
  beeStats: BeeStats;
}

// Renders the traits tab content.
export default function TraitsTab({ beeStats }: TraitsTabProps) {
  const theme = useTheme();
  return (
    <Box sx={{ p: { xs: 1, xl: 1 } }}>
      <Typography variant="h6" sx={{ color: theme.palette.Gold.main, mb: 0.5 }}>
        Buzzkill Origin Traits
      </Typography>
      <Typography variant="body2" sx={{ color: "#ffffff", mb: 2 }}>
        Each Buzzkill Trait provides unique bonuses
      </Typography>

      <Grid container spacing={1}>
        {Object.entries(beeStats.traits).map(([key, value]) => (
          <Grid item xs={6} key={key}>
            <Paper sx={{ p: 1.25, bgcolor: "#1a3045" }}>
              <Typography variant="body2" sx={{ color: "#f0c850", mb: 0.25 }}>
                {key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}
              </Typography>
              <Typography variant="body1" noWrap sx={{ fontWeight: "bold" }}>
                {value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
