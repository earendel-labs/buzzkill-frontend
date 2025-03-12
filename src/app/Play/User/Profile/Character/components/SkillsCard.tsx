import { Box, Paper, Typography, LinearProgress } from "@mui/material";
import React from "react";

type SkillsCardProps = {
  icon: React.ReactNode;
  label: string;
  color: string;
  stat: number;
  maxStat: number;
  currentStat?: number; // Optional (only used for Productivity)
  onClick: () => void;
};

const SkillsCard: React.FC<SkillsCardProps> = ({
  icon,
  label,
  color,
  stat,
  maxStat,
  currentStat,
  onClick,
}) => {
  return (
    <Paper
      sx={{
        p: 2,
        mb: 2,
        bgcolor: "DarkBlueFaded.main",
        cursor: "pointer",
        "&:hover": { bgcolor: "DarkBlueFaded.dark" },
      }}
      onClick={onClick}
    >
      {/* Label + Stat */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end", // Aligns text and icons properly
          mb: 1,
        }}
      >
        {/* Icon + Label */}
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end", // Ensures icon and text align at the bottom
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

        {/* Stat Values */}
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: "1.1rem",
            color: "white",
          }}
        >
          {currentStat !== undefined
            ? `${stat}/${currentStat}/${maxStat}`
            : `${stat}/${maxStat}`}
        </Typography>
      </Box>

      {/* Progress Bar */}
      <Box sx={{ position: "relative" }}>
        <LinearProgress
          variant="determinate"
          value={(stat / maxStat) * 100}
          sx={{
            mb: 1.5,
            mt: 1.5,
            "& .MuiLinearProgress-bar": {
              backgroundImage: `linear-gradient(to right, ${color}, ${color})`,
            },
          }}
        />
        {/* Productivity Marker (Only Show for Productivity) */}
        {currentStat !== undefined && (
          <Box
            sx={{
              position: "absolute",
              left: `${(currentStat / maxStat) * 100}%`,
              top: 0,
              height: "100%",
              width: 2,
              bgcolor: "text.primary",
              transform: "translateX(-50%)",
            }}
          />
        )}
      </Box>

      <Typography variant="body2" sx={{ color: "Gold.main" }}>
        Click to upgrade max capacity
      </Typography>
    </Paper>
  );
};

export default SkillsCard;
