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
  // Darker shade of the color for stroke
  const darkerColor = `rgba(0, 0, 0, 0.8)`;

  return (
    <Paper
      sx={{
        p: 2,
        bgcolor: "#1a3045",
        textAlign: "center",
        cursor: "pointer",
        "&:hover": { bgcolor: "#254560" },
      }}
      onClick={onClick}
    >
      {/* Icon + Label */}
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          mb: 1,
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

      {/* Stat Value with Stroke Effect */}
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          color,
          fontSize: "3.5rem",
          mb: 1,
          textShadow: `-1px -1px 0 ${darkerColor}, 1px -1px 0 ${darkerColor}, -1px 1px 0 ${darkerColor}, 1px 1px 0 ${darkerColor}`, // Thinner stroke effect
        }}
      >
        {value}
      </Typography>

      {/* Upgrade Message */}
      <Typography variant="body2" sx={{ color: "#f0c850" }}>
        Click to upgrade
      </Typography>
    </Paper>
  );
};

export default StatUpgradeCard;
