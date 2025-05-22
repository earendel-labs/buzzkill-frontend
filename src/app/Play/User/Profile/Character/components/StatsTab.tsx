"use client";
import React from "react";
import { Paper, Box, Typography, Grid, useTheme } from "@mui/material";
import {
  LocalFireDepartment as AttackIcon,
  Shield as ShieldIcon,
  Spa as ForageIcon,
  Bolt as EnergyIcon,
  Favorite as HealthIcon,
  Hexagon as HexagonIcon,
  BarChart as ActivityIcon,
  EmojiEvents as TrophyIcon,
  Gavel as RaidsIcon,
} from "@mui/icons-material";
import type { BeeStats } from "../../../../../../types/OriginsStats";
import StatUpgradeCard from "./StatsUpgradedCard";
import SkillsCard from "./SkillsCard";
import DefaultButton from "@/components/Buttons/DefaultButton/DefaultButton";

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
    <Box sx={{ p: { xs: 0, xl: 1 } }}>
      <Box sx={{ mb: 1 }}>
        <Typography variant="h6" sx={{ color: theme.palette.Gold.main, mb: 0 }}>
          Bee Stats
        </Typography>
        <Typography variant="body2" sx={{ color: "#fff", mb: 1 }}>
          View and manage your Buzzkill Origins capabilities
        </Typography>
      </Box>

      <Grid
        container
        spacing={{ xs: 0.5, lg: 1, xl: 2 }}
        sx={{ mb: { xl: 0.5, lg: 0.75 } }}
      >
        <Grid item xs={12} md={4}>
          <StatUpgradeCard
            icon={<AttackIcon />}
            label="Attack"
            color={theme.palette.OneIDRed.main}
            value={beeStats.attack}
            toolTipText={
              "Boosts raid efficiency, maximizing your resource plunder"
            }
            onClick={() => openUpgradeDialog("Attack")}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatUpgradeCard
            icon={<ShieldIcon />}
            label="Defence"
            color={theme.palette.Blue.main}
            value={beeStats.defence}
            toolTipText={
              "Fortifies your hive against raids and potential threats"
            }
            onClick={() => openUpgradeDialog("Defence")}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatUpgradeCard
            icon={<ForageIcon />}
            label="Foraging"
            color={theme.palette.success.main}
            value={beeStats.foraging}
            toolTipText={
              "Elevates the chance of harvesting resources during forages"
            }
            onClick={() => openUpgradeDialog("Foraging")}
          />
        </Grid>
      </Grid>

      <Typography variant="h6" sx={{ color: theme.palette.Gold.main, mb: 0 }}>
        Skills
      </Typography>

      <SkillsCard
        icon={<EnergyIcon sx={{ color: theme.palette.Gold.main }} />}
        label="Energy"
        stat={beeStats.energy}
        maxStat={beeStats.maxEnergy}
        onClick={() => openUpgradeDialog("Energy")}
        toolTipText={
          "Sets the maximum energy your bee can consume, refreshed every 24 hours"
        }
        color={"Gold"}
      />

      <SkillsCard
        icon={<HealthIcon sx={{ color: theme.palette.OneIDRed.main }} />}
        label="Health"
        stat={beeStats.health}
        maxStat={beeStats.maxHealth}
        onClick={() => openUpgradeDialog("Health")}
        toolTipText={"Damage your bee can take during raids"}
        color={"OneIDRed"}
      />

      <SkillsCard
        icon={<HexagonIcon sx={{ color: theme.palette.Orange.main }} />}
        label="Productivity"
        stat={beeStats.productivity}
        currentStat={beeStats.currentProductivity}
        maxStat={beeStats.maxProductivity}
        onClick={() => openUpgradeDialog("Productivity")}
        toolTipText={"Your NFTs yielding power set by: base, current, max"}
        color={"Orange"}
      />

      <Typography
        variant="h6"
        sx={{ color: theme.palette.Gold.main, mt: 2, mb: 0 }}
      >
        Activity
      </Typography>

      <Grid container spacing={{ xs: 2, lg: 1, xl: 2 }}>
        {[
          ...[
            {
              label: "Total Raids",
              value: beeStats.raidsCompleted,
              icon: (
                <RaidsIcon sx={{ color: theme.palette.OneIDRed.main, mr: 1 }} />
              ),
            },
            {
              label: "Successful Raids",
              value: beeStats.raidsSuccessful,
              icon: (
                <TrophyIcon sx={{ color: theme.palette.Gold.main, mr: 1 }} />
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
          ],
        ].map(({ label, value, icon, extra }, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Paper
              sx={{
                p: 1.5,
                bgcolor: theme.palette.DarkBlueFaded.dark,
                minHeight: 120,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                boxShadow:
                  "0px 1px 4px rgba(0, 0, 0, 0.10), inset 0px 1px 2px rgba(255, 255, 255, 0.05)",
                borderRadius: 2,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 0 }}>
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
      <Box sx={{ marginTop: 1.5 }}>
        <DefaultButton
          fullWidth
          onClick={() => {}}
          sx={{ py: 1 }}
          startIcon={<ActivityIcon />}
          className="blueButton"
        >
          View Activity
        </DefaultButton>
      </Box>
    </Box>
  );
}
