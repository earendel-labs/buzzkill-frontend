"use client";

import React from "react";
import { Paper, Box, Typography, Grid, LinearProgress } from "@mui/material";
import {
  LocalFireDepartment as AttackIcon,
  Shield as ShieldIcon,
  Spa as ForageIcon,
  Bolt as EnergyIcon,
  Favorite as HealthIcon,
  Hexagon as HexagonIcon,
  EmojiEvents as TrophyIcon,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { BeeStats } from "./types";
import SemiTransparentCard from "@/components/Card/SemiTransaprentCard";
import StatUpgradeCard from "./StatsUpgradedCard";
import SkillsCard from "./SkillsCard";

interface StatsTabProps {
  beeStats: BeeStats;
  openUpgradeDialog: (stat: string) => void;
}

export default function StatsTab({
  beeStats,
  openUpgradeDialog,
}: StatsTabProps) {
  const theme = useTheme();

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 1 }}>
        <Typography variant="h6" sx={{ color: theme.palette.Gold.main, mb: 1 }}>
          Bee Stats
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: theme.palette.text.secondary, mb: 3 }}
        >
          View and manage your Buzzkill Origins capabilities
        </Typography>
      </Box>

      {/* Primary Stats */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <StatUpgradeCard
            icon={<AttackIcon />}
            label="Attack"
            color={theme.palette.OneIDRed.main}
            value={beeStats.attack}
            onClick={() => openUpgradeDialog("Attack")}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatUpgradeCard
            icon={<ShieldIcon />}
            label="Defence"
            color={theme.palette.Blue.main}
            value={beeStats.defence}
            onClick={() => openUpgradeDialog("Defence")}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatUpgradeCard
            icon={<ForageIcon />}
            label="Foraging"
            color={theme.palette.success.main}
            value={beeStats.foraging}
            onClick={() => openUpgradeDialog("Foraging")}
          />
        </Grid>
      </Grid>

      {/* Skills */}
      <Typography variant="h6" sx={{ color: theme.palette.Gold.main, mb: 2 }}>
        Skills
      </Typography>

      {/* Energy */}
      <SkillsCard
        icon={<EnergyIcon sx={{ color: theme.palette.Gold.main }} />}
        label="Energy"
        color={theme.palette.Gold.main}
        stat={beeStats.energy}
        maxStat={beeStats.maxEnergy}
        onClick={() => openUpgradeDialog("Energy")}
      />

      <SkillsCard
        icon={<HealthIcon sx={{ color: theme.palette.OneIDRed.main }} />}
        label="Health"
        color={theme.palette.OneIDRed.main}
        stat={beeStats.health}
        maxStat={beeStats.maxHealth}
        onClick={() => openUpgradeDialog("Health")}
      />

      <SkillsCard
        icon={<HexagonIcon sx={{ color: theme.palette.Orange.main }} />}
        label="$HONEY Production"
        color={theme.palette.Orange.main}
        stat={beeStats.productivity}
        currentStat={beeStats.currentProductivity}
        maxStat={beeStats.maxProductivity}
        onClick={() => openUpgradeDialog("Productivity")}
      />

      {/* Activity Stats */}
      <Typography variant="h6" sx={{ color: theme.palette.Gold.main, mb: 2 }}>
        Activity
      </Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, bgcolor: theme.palette.DarkBlueFaded.main }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <TrophyIcon sx={{ color: theme.palette.Gold.main, mr: 1 }} />
              <Typography variant="body2">Raids Complete</Typography>
            </Box>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              {beeStats.raidsCompleted}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, bgcolor: theme.palette.DarkBlueFaded.main }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <TrophyIcon sx={{ color: theme.palette.success.main, mr: 1 }} />
              <Typography variant="body2">Raids Successful</Typography>
            </Box>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              {beeStats.raidsSuccessful}
            </Typography>
            <Typography variant="body2" sx={{ color: theme.palette.Gold.main }}>
              {Math.round(
                (beeStats.raidsSuccessful / beeStats.raidsCompleted) * 100
              )}
              % Success Rate
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, bgcolor: theme.palette.DarkBlueFaded.main }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <ForageIcon sx={{ color: theme.palette.success.main, mr: 1 }} />
              <Typography variant="body2">Forages Complete</Typography>
            </Box>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              {beeStats.foragesCompleted}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
