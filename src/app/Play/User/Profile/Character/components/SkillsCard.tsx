import {
  Box,
  Paper,
  Typography,
  LinearProgress,
  useTheme,
  Tooltip,
} from "@mui/material";
import React from "react";
import { Palette, PaletteColor } from "@mui/material/styles";

type SkillsCardProps = {
  icon: React.ReactNode;
  label: string;
  color: keyof Palette;
  stat: number;
  maxStat: number;
  currentStat?: number;
  toolTipText: string;
  onClick: () => void;
};

const SkillsCard: React.FC<SkillsCardProps> = ({
  icon,
  label,
  color,
  stat,
  maxStat,
  currentStat,
  toolTipText,
  onClick,
}) => {
  const theme = useTheme();
  const progressValue = (stat / maxStat) * 100;
  const currentMarkerPosition = currentStat ? (currentStat / maxStat) * 100 : 0;

  // Ensure color type safety
  const themeColor = theme.palette[color] as PaletteColor | undefined;

  return (
    <Tooltip title={toolTipText} placement="top" arrow>
      <Paper
        sx={{
          px: 2.5,
          py: 2.2,
          mb: 1.5,
          bgcolor: theme.palette.DarkBlueFaded?.main || "#222E50",
          borderRadius: 2,
          boxShadow:
            "0px 4px 8px rgba(0, 0, 0, 0.2), inset 0px 1px 2px rgba(255, 255, 255, 0.08)",
          cursor: "pointer",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            bgcolor: theme.palette.DarkBlueFaded?.dark || "#1a1f3d",
          },
          "&:active": {
            bgcolor: theme.palette.DarkBlueFaded?.light || "#2e447a",
            boxShadow: "inset 0px 2px 4px rgba(0, 0, 0, 0.3)",
          },
        }}
        onClick={onClick}
      >
        {/* Label + Stat */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 0.35,
          }}
        >
          {/* Icon + Label */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                display: "flex",
                color: themeColor?.main || "#1976d2",
                alignItems: "center",
                fontSize: "1.8rem",
                mr: 1,
              }}
            >
              {icon}
            </Box>

            <Typography
              sx={{
                fontWeight: "700",
                fontSize: "1.25rem",
                color: theme.palette.text.primary,
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
              color: theme.palette.text.secondary,
            }}
          >
            {currentStat !== undefined
              ? `${stat} / ${currentStat} / ${maxStat}`
              : `${stat} / ${maxStat}`}
          </Typography>
        </Box>

        {/* Progress Bar */}
        <Box
          sx={{
            position: "relative",
            height: 10,
            borderRadius: 5,
            overflow: "hidden",
          }}
        >
          <LinearProgress
            variant="determinate"
            value={progressValue}
            sx={{
              height: "10px",
              borderRadius: 3,
              backgroundColor:
                theme.palette.BlueFaded?.main || "rgba(0, 121, 145, 0.4)",
              boxShadow:
                "inset 0px -1px 3px rgba(255, 255, 255, 0.1), 0px 2px 4px rgba(0, 0, 0, 0.3)",
              "& .MuiLinearProgress-bar": {
                backgroundImage: `linear-gradient(135deg, ${
                  themeColor?.dark || "#055e74"
                }, ${themeColor?.main || "#1976d2"}, ${
                  themeColor?.light || "#63a4ff"
                })`,
                boxShadow: "inset 0px 1px 2px rgba(255, 255, 255, 0.3)",
              },
            }}
          />

          {/* Productivity Marker */}
          {currentStat !== undefined && (
            <Box
              sx={{
                position: "absolute",
                left: `${currentMarkerPosition}%`,
                top: 0,
                height: "100%",
                width: 3,
                bgcolor: theme.palette.text.primary,
                transform: "translateX(-50%)",
              }}
            />
          )}
        </Box>
      </Paper>
    </Tooltip>
  );
};

export default SkillsCard;
