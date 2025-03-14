import { Box, Paper, Typography, useTheme, Tooltip } from "@mui/material";
import React from "react";

type StatUpgradeCardProps = {
  icon: React.ReactNode;
  label: string;
  color: string;
  value: number;
  toolTipText: string;
  onClick: () => void;
};

const StatUpgradeCard: React.FC<StatUpgradeCardProps> = ({
  icon,
  label,
  color,
  value,
  toolTipText,
  onClick,
}) => {
  const theme = useTheme();
  const darkerColor = "rgba(0, 0, 0, 0.8)";

  return (
    <Tooltip title={toolTipText} placement="top" arrow>
      <Paper
        sx={{
          p: 1.25,
          mb: 0.5,
          bgcolor: theme.palette.DarkBlueFaded?.main || "#1a3045",
          borderRadius: 2,
          boxShadow:
            "0px 4px 8px rgba(0, 0, 0, 0.2), inset 0px 1px 2px rgba(255, 255, 255, 0.08)",
          cursor: "pointer",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            bgcolor: theme.palette.DarkBlueFaded?.dark || "#254560",
          },
          "&:active": {
            bgcolor: theme.palette.DarkBlueFaded?.light || "#2e447a",
            boxShadow: "inset 0px 2px 4px rgba(0, 0, 0, 0.3)",
          },
        }}
        onClick={onClick}
      >
        {/* Icon + Label */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 0.5,
          }}
        >
          <Box
            sx={{
              display: "flex",
              color,
              alignItems: "center",
              fontSize: "1.1rem",
              mr: 1,
            }}
          >
            {icon}
          </Box>

          <Typography
            component="div"
            sx={{
              fontWeight: "700",
              fontSize: "1.1rem",
              color: "white",
              display: "flex",
              alignItems: "center",
              lineHeight: 1.0,
            }}
          >
            {label}
          </Typography>
        </Box>

        {/* Stat Value */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            color,
            textAlign: "center",
            fontSize: "3rem",
            lineHeight: 1, // Ensures minimal spacing
            marginTop: 1, // Removes any default margin
            padding: 0, // Ensures no additional space
            textShadow: `-1px -1px 0 ${darkerColor}, 1px -1px 0 ${darkerColor}, -1px 1px 0 ${darkerColor}, 1px 1px 0 ${darkerColor}`,
          }}
        >
          {value}
        </Typography>
      </Paper>
    </Tooltip>
  );
};

export default StatUpgradeCard;
