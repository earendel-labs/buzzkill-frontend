"use client";

import React, { useState, useEffect } from "react";
import GoldBorderCard from "@/components/Card/GoldBorderCard/GoldBorderCard";
import {
  Typography,
  IconButton,
  Box,
  useTheme,
  useMediaQuery,
  Tooltip,
} from "@mui/material";
import { ExpandMore, ExpandLess, InfoOutlined } from "@mui/icons-material";
import { useSound } from "@/context/SoundContext";

const HiveRestrictionsInfo: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const [expandSound, setExpandSound] = useState<HTMLAudioElement | null>(null);
  const [collapseSound, setCollapseSound] = useState<HTMLAudioElement | null>(
    null
  );

  const { isMuted } = useSound();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Load sound effects once
  useEffect(() => {
    setExpandSound(new Audio("/Audio/ExpandPages/OpenBox.wav"));
    setCollapseSound(new Audio("/Audio/ExpandPages/CloseBox.mp3"));
  }, []);

  const fullMessage =
    "To stake in Azure Reef you need to own a Contrarian, Ivy or Starship NFTs at the date of Snapshot.";
  const shortMessage = "Hive Restrictions";

  const handleExpandClick = () => {
    if (isMobile) {
      if (!expanded) {
        if (!isMuted && expandSound) {
          expandSound.currentTime = 0;
          expandSound.play();
        }
      } else {
        if (!isMuted && collapseSound) {
          collapseSound.currentTime = 0;
          collapseSound.play();
        }
      }
    }
    setExpanded((prev) => !prev);
  };

  return (
    <GoldBorderCard
      sx={{
        width: {
          sm: expanded ? "250px" : "220px",
          md: "300px",
          lg: "450px",
        },
        p: {
          sm: expanded ? 2 : 1.5,
          md: 2,
        },
      }}
    >
      {isMobile ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <InfoOutlined sx={{ fontSize: 20, color: "#E9B743" }} />
          <Typography
            variant="body1"
            sx={{
              fontSize: { sm: "16px", md: "inherit" },
              flex: 1,
              textAlign: "left",
              lineHeight: "1.2",
            }}
          >
            {expanded ? fullMessage : shortMessage}
          </Typography>
          <Tooltip title={expanded ? "Show less" : "Show more"}>
            <IconButton
              onClick={handleExpandClick}
              size="small"
              sx={{
                color: "#E9B743",
                transition: theme.transitions.create("transform", {
                  duration: theme.transitions.duration.shortest,
                }),
              }}
            >
              {expanded ? <ExpandMore /> : <ExpandLess />}
            </IconButton>
          </Tooltip>
        </Box>
      ) : (
        <Typography variant="body1" sx={{ textAlign: "left" }}>
          {fullMessage}
        </Typography>
      )}
    </GoldBorderCard>
  );
};

export default HiveRestrictionsInfo;
