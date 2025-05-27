"use client";
import React from "react";
import Image from "next/image";
import { Box, Typography, Chip, Grid, LinearProgress } from "@mui/material";
import { Hexagon as HexagonIcon } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import type { BeeStats } from "../../../../../../types/OriginsStats";

import RarityChip, {
  rarityChipStyles,
} from "@/components/Card/BeeCard/RarityChip";

interface BeeHeaderProps {
  beeStats: BeeStats;
  honey: number;
}

/** Map all incoming backend strings → internal rarity keys */
const rarityMap: Record<string, keyof typeof rarityChipStyles> = {
  Common: "Common",
  Rare: "Rare",
  "Ultra-Rare": "Ultra-Rare",
  "Ultra Rare": "Ultra-Rare", // backend sometimes omits the dash
  Legendary: "Legendary",
};

export default function BeeHeader({ beeStats, honey }: BeeHeaderProps) {
  const theme = useTheme();

  /* Which rarity key do we actually use? */
  const rarityKey =
    rarityMap[beeStats.rarity] || ("Common" as keyof typeof rarityChipStyles);
  const { gradient: rarityGradient } = rarityChipStyles[rarityKey];

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
        {beeStats.name}
      </Typography>

      {/* ────────────────── NFT + Border ────────────────── */}
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
          boxShadow: "4px 4px 10px rgba(0,0,0,0.3)",
          mx: "auto",
          width: "100%",
          maxWidth: { xs: 250, sm: 320, md: 340, lg: 360 },
        }}
      >
        {/* Border colour matches rarity */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            borderRadius: "8px",
            background: rarityGradient,
            content: '""',
            zIndex: 0,
          }}
        />

        {/* Inner image / chips */}
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
            sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 400px"
            style={{ objectFit: "cover" }}
          />

          {/* rarity chip (top-left) */}
          <RarityChip rarity={rarityKey} />

          {/* character chip (bottom-left) */}
          <Chip
            label={beeStats.traits.character}
            sx={{
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "4px 12px",
              borderRadius: "16px",
              fontWeight: "bold",
              fontSize: 16,
              lineHeight: "14px",
              position: "absolute",
              bottom: 16,
              left: 16,
              zIndex: 2,
              boxShadow: "0px 2px 4px rgba(0,0,0,0.25)",
              backgroundColor:
                beeStats.traits.character === "Queen Bee"
                  ? "rgba(242, 180, 23, 0.8)"
                  : "rgba(118, 170, 228, 0.8)",

              // Decorative border
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                borderRadius: "inherit",
                background:
                  beeStats.traits.character === "Queen Bee"
                    ? "linear-gradient(135deg, #F2B417, #ff842e, #C3790B)"
                    : "linear-gradient(135deg, #76aae4, #a2c8ee, #4172cf)",
                padding: "0.5px",
                WebkitMask:
                  "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
                zIndex: -1,
              },
            }}
          />
        </Box>
      </Box>

      {/* ────────────────── Level / Init status ────────────────── */}
      <Box sx={{ px: { xs: 1, md: 0 } }}>
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
              sx={{ fontWeight: "bold", color: "#fff", lineHeight: 1 }}
            >
              Level&nbsp;{beeStats.level}
            </Typography>
          </Box>

          {!beeStats.initialized ? (
            <Chip
              label="Uninitialized"
              sx={{
                fontSize: "1rem",
                px: 2,
                backgroundColor: theme.palette.grey[400],
                color: "#000",
                fontWeight: "bold",
                boxShadow:
                  "inset 0px -1px 3px rgba(255,255,255,0.1), 0px 2px 4px rgba(0,0,0,0.2)",
              }}
            />
          ) : (
            <Chip
              label="Initialized"
              sx={{
                fontSize: "1rem",
                px: 2,
                backgroundColor: theme.palette.Blue?.main || "#0079d1",
                color: "#fff",
                fontWeight: "bold",
                boxShadow:
                  "inset 0px -1px 3px rgba(255,255,255,0.1), 0px 2px 4px rgba(0,0,0,0.3)",
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
        {/* ────────────────── XP bar ────────────────── */}
        <Box sx={{ mb: 2 }}>
          <Box
            sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}
          >
            <Typography variant="body2">XP</Typography>
            <Typography variant="body2">
              {beeStats.xp}/{beeStats.maxXp}
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={(beeStats.xp / beeStats.maxXp) * 100}
            sx={{
              height: 10,
              borderRadius: 5,
              backgroundColor: "rgba(0,121,145,0.4)",
              boxShadow:
                "inset 0px -1px 3px rgba(255,255,255,0.1), 0px 2px 4px rgba(0,0,0,0.3)",
              "& .MuiLinearProgress-bar": {
                background: "linear-gradient(to right, #f0c850, #c9a227)",
                boxShadow: "inset 0px 1px 2px rgba(255,255,255,0.3)",
              },
            }}
          />
        </Box>

        {/* ────────────────── Trait list ────────────────── */}
        <Grid container spacing={1}>
          {Object.entries(beeStats.traits)
            .filter(([key]) => allowedTraits.includes(key))
            .map(([key, value]) => (
              <Grid item xs={6} key={key}>
                <Box sx={{ p: 1.25, bgcolor: "#1a3045", borderRadius: 1 }}>
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
                </Box>
              </Grid>
            ))}
        </Grid>
      </Box>
    </Box>
  );
}
