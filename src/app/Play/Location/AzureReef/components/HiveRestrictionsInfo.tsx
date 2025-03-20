"use client";

import type React from "react";
import { useState } from "react";
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

const HiveRestrictionsInfo: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const fullMessage =
    "To stake in Azure Reef you need to own a Contrarian, Ivy or Starship NFTs at the date of Snapshot.";
  const shortMessage = "Hive Restrictions";

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <GoldBorderCard
      sx={{
        // On small screens, set a smaller width, and increase it if expanded.
        width: {
          sm: expanded ? "250px" : "220px",
          md: "300px",
          lg: "450px",
        },
        // Reduce padding on small screens.
        p: {
          sm: 1.5,
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
          <InfoOutlined
            sx={{
              fontSize: 20,
              color: "#E9B743",
            }}
          />
          <Typography
            variant="body1"
            sx={{
              fontSize: { sm: "16px", md: "inherit" },
              flex: 1,
              textAlign: "left",
              lineHeight: "1",
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
