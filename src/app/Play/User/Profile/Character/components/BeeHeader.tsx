"use client";
import React from "react";
import Image from "next/image";
import {
  Box,
  Typography,
  Paper,
  Button,
  Chip,
  Grid,
  LinearProgress,
} from "@mui/material";
import { Hexagon as HexagonIcon } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import type { BeeStats } from "../../../../../../types/OriginsStats";

interface BeeHeaderProps {
  beeStats: BeeStats;
  honey: number;
  initializeBee: () => void;
}

export default function BeeHeader({
  beeStats,
  honey,
  initializeBee,
}: BeeHeaderProps) {
  const theme = useTheme();
  const allowedTraits = [
    "leftHand",
    "rightHand",
    "armor",
    "wings",
    "headpiece",
    "environment",
  ];

  const imageSrc = beeStats.imageAddress || "/NFTs/Workers/worker-blur.png";

  return (
    <Box sx={{ py: { xs: 1, md: 1.25 }, textAlign: "center" }}>
      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
        {beeStats.name} {beeStats.id}
      </Typography>

      <Box
        sx={{
          mt: 1,
          mb: 2,
          position: "relative",
          aspectRatio: { xs: "1/1.3", sm: "1/1.2", md: "1/1" },
          borderRadius: "12px",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.3)",
          mx: "auto",
          width: "100%",
          maxWidth: { xs: 250, sm: 320, md: 340, lg: 360 },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            borderRadius: "8px",
            background:
              "linear-gradient(135deg, #E9B743 4%, #E9B743 12%, #8a4829 33%, #a86c2c 44%, #E9B743 77%, #E9B743 98%)",
            content: '""',
            zIndex: 0,
          }}
        />
        <Box
          sx={{
            width: "calc(100% - 6px)",
            height: "calc(100% - 6px)",
            borderRadius: "10px",
            overflow: "hidden",
            backgroundColor: "#000",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Image
            src={imageSrc}
            alt="Bee Warrior NFT"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
            style={{ objectFit: "cover" }}
          />

          <Chip
            label={beeStats.traits.character}
            sx={{
              position: "absolute",
              bottom: 8,
              left: 8,
              backgroundColor:
                beeStats.traits.character === "Queen Bee"
                  ? "#9c27b0"
                  : "#2196f3",
              color: "white",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
              zIndex: 2,
            }}
          />
        </Box>
      </Box>

      <Box sx={{ p: { xs: 1, md: 0 } }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <HexagonIcon sx={{ color: "#f0c850", fontSize: "2rem" }} />
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "white", lineHeight: 1.0 }}
            >
              Level {beeStats.level}
            </Typography>
          </Box>

          {!beeStats.initialized ? (
            <Button
              variant="contained"
              onClick={initializeBee}
              sx={{
                px: 2,
                py: 1,
                fontSize: "1rem",
                fontWeight: "bold",
                background: theme.palette.Gold.main,
                color: "black",
                borderRadius: "16px",
                textTransform: "none",
              }}
            >
              Uninitialized
            </Button>
          ) : (
            <Chip
              label="Initialized"
              sx={{
                fontSize: "1rem",
                padding: "8px 16px",
                backgroundColor: theme.palette.Blue.main,
                boxShadow:
                  "inset 0px -1px 3px rgba(255, 255, 255, 0.1), 0px 2px 4px rgba(0, 0, 0, 0.3)",
                "& .MuiLinearProgress-bar": {
                  background: "linear-gradient(to right, #f0c850, #c9a227)",
                  boxShadow: "inset 0px 1px 2px rgba(255, 255, 255, 0.3)",
                },
                color: "white",
                fontWeight: "bold",
              }}
            />
          )}
        </Box>
        {/* <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
          <Box
            sx={{
              borderRadius: "50%",
              width: 42,
              height: 42,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              src="/Icons/Resources/HoneyToken.png"
              alt="Honey"
              width={42}
              height={42}
            />
          </Box>
          <Box>
            <Typography variant="body2" sx={{ color: "#f0c850" }}>
              $HONEY Earned
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {honey.toLocaleString()}
            </Typography>
          </Box>
        </Box> */}
        <Box sx={{ mb: 2 }}>
          <Box
            sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}
          >
            <Typography variant="body2">XP</Typography>
            <Typography variant="body2">
              {beeStats.xp}/{beeStats.maxXp}
            </Typography>
          </Box>
          <Box sx={{ position: "relative" }}>
            <Box sx={{ position: "relative" }}>
              <LinearProgress
                variant="determinate"
                value={(beeStats.xp / beeStats.maxXp) * 100}
                sx={{
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: "rgba(0, 121, 145, 0.4)",
                  boxShadow:
                    "inset 0px -1px 3px rgba(255, 255, 255, 0.1), 0px 2px 4px rgba(0, 0, 0, 0.3)",
                  "& .MuiLinearProgress-bar": {
                    background: "linear-gradient(to right, #f0c850, #c9a227)",
                    boxShadow: "inset 0px 1px 2px rgba(255, 255, 255, 0.3)",
                  },
                }}
              />
            </Box>
          </Box>
        </Box>

        <Grid container spacing={1}>
          {Object.entries(beeStats.traits)
            .filter(([key]) => allowedTraits.includes(key))
            .map(([key, value]) => (
              <Grid item xs={6} key={key}>
                <Paper sx={{ p: 1.25, bgcolor: "#1a3045" }}>
                  <Typography
                    variant="body2"
                    sx={{ color: "#f0c850", mb: 0.25 }}
                  >
                    {key
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())}
                  </Typography>
                  <Typography
                    variant="body1"
                    noWrap
                    sx={{ fontWeight: "bold" }}
                  >
                    {value}
                  </Typography>
                </Paper>
              </Grid>
            ))}
        </Grid>
      </Box>
    </Box>
  );
}
