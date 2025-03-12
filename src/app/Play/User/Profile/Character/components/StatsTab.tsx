// StatsTab.tsx
"use client";
import React from "react";
import { Paper, Box, Typography, Grid } from "@mui/material";
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
import type { BeeStats } from "./types";
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
    <Box sx={{ p: { xs: 2, md: 3 } }}>
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

      <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mb: { xl: 3, md: 2 } }}>
        <Grid item xs={12} md={4}>
          <StatUpgradeCard
            icon={<AttackIcon />}
            label="Attack"
            color={theme.palette.OneIDRed.main}
            value={beeStats.attack}
            onClick={() => openUpgradeDialog("attack")}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatUpgradeCard
            icon={<ShieldIcon />}
            label="Defence"
            color={theme.palette.Blue.main}
            value={beeStats.defence}
            onClick={() => openUpgradeDialog("defence")}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatUpgradeCard
            icon={<ForageIcon />}
            label="Foraging"
            color={theme.palette.success.main}
            value={beeStats.foraging}
            onClick={() => openUpgradeDialog("foraging")}
          />
        </Grid>
      </Grid>

      <Typography variant="h6" sx={{ color: theme.palette.Gold.main, mb: 2 }}>
        Skills
      </Typography>

      <SkillsCard
        icon={<EnergyIcon sx={{ color: theme.palette.Gold.main }} />}
        label="Energy"
        color={theme.palette.Gold.main}
        stat={beeStats.energy}
        maxStat={beeStats.maxEnergy}
        onClick={() => openUpgradeDialog("energy")}
      />

      <SkillsCard
        icon={<HealthIcon sx={{ color: theme.palette.OneIDRed.main }} />}
        label="Health"
        color={theme.palette.OneIDRed.main}
        stat={beeStats.health}
        maxStat={beeStats.maxHealth}
        onClick={() => openUpgradeDialog("health")}
      />

      <SkillsCard
        icon={<HexagonIcon sx={{ color: theme.palette.Orange.main }} />}
        label="$HONEY Production"
        color={theme.palette.Orange.main}
        stat={beeStats.productivity}
        currentStat={beeStats.currentProductivity}
        maxStat={beeStats.maxProductivity}
        onClick={() => openUpgradeDialog("productivity")}
      />

      <Typography variant="h6" sx={{ color: theme.palette.Gold.main, mb: 2 }}>
        Activity
      </Typography>

      <Grid container spacing={{ xs: 2, md: 3 }}>
        {[
          {
            label: "Total Raids",
            value: beeStats.raidsCompleted,
            icon: <TrophyIcon sx={{ color: theme.palette.Gold.main, mr: 1 }} />,
          },
          {
            label: "Raids Successful",
            value: beeStats.raidsSuccessful,
            icon: (
              <TrophyIcon sx={{ color: theme.palette.success.main, mr: 1 }} />
            ),
            extra: (
              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.Gold.main,
                  mt: "auto",
                  textAlign: "center",
                }}
              >
                {Math.round(
                  (beeStats.raidsSuccessful / beeStats.raidsCompleted) * 100
                )}
                % Success Rate
              </Typography>
            ),
          },
          {
            label: "Total Forages",
            value: beeStats.foragesCompleted,
            icon: (
              <ForageIcon sx={{ color: theme.palette.success.main, mr: 1 }} />
            ),
          },
        ].map(({ label, value, icon, extra }, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Paper
              sx={{
                p: 2,
                bgcolor: theme.palette.DarkBlueFaded.main,
                minHeight: 140,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                {icon}
                <Typography variant="body2">{label}</Typography>
              </Box>
              <Typography variant="h5" sx={{ fontWeight: "bold", flexGrow: 1 }}>
                {value}
              </Typography>
              {extra || (
                <Typography variant="body2" sx={{ visibility: "hidden" }}>
                  Placeholder
                </Typography>
              )}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
