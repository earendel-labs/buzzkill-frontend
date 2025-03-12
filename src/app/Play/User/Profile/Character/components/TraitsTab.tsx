"use client";

import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import { BeeStats } from "./types";

interface TraitsTabProps {
  beeStats: BeeStats;
}

// Renders the traits tab content.
export default function TraitsTab({ beeStats }: TraitsTabProps) {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ color: "#f0c850", mb: 3 }}>
        Bee Warrior Traits
      </Typography>

      <Grid container spacing={2}>
        {Object.entries(beeStats.traits).map(([key, value]) => (
          <Grid item xs={12} md={6} key={key}>
            <Box sx={{ p: 2, bgcolor: "#1a3045" }}>
              <Typography variant="body2" sx={{ color: "#f0c850", mb: 1 }}>
                {key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}
              </Typography>
              <Typography variant="body1">{value}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
