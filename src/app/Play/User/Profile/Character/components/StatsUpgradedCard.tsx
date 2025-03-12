// StatsUpgradedCard.tsx
// (Updated with slightly tighter spacing and the stroke effect you provided)
import { Box, Paper, Typography } from "@mui/material";
import React from "react";

type StatUpgradeCardProps = {
  icon: React.ReactNode;
  label: string;
  color: string;
  value: number;
  onClick: () => void;
};

const StatUpgradeCard: React.FC<StatUpgradeCardProps> = ({
  icon,
  label,
  color,
  value,
  onClick,
}) => {
  const darkerColor = "rgba(0, 0, 0, 0.8)";

  return (
    <Paper
      sx={{
        p: { xs: 2, md: 2 },
        mb: 1,
        bgcolor: "#1a3045",
        textAlign: "center",
        cursor: "pointer",
        "&:hover": { bgcolor: "#254560" },
      }}
      onClick={onClick}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            color: color,
            alignItems: "flex-end",
            mr: 1,
          }}
        >
          {icon}
        </Box>

        <Typography
          component="div"
          sx={{
            fontWeight: "700",
            fontSize: "1.25rem",
            color: "white",
            display: "flex",
            alignItems: "center",
            lineHeight: 1.0,
          }}
        >
          {label}
        </Typography>
      </Box>

      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          color,
          fontSize: "3.5rem",
          textShadow: `-1px -1px 0 ${darkerColor}, 1px -1px 0 ${darkerColor}, -1px 1px 0 ${darkerColor}, 1px 1px 0 ${darkerColor}`,
        }}
      >
        {value}
      </Typography>
    </Paper>
  );
};

export default StatUpgradeCard;
