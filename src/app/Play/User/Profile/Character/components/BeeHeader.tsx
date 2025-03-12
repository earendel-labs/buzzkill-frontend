// BeeHeader.tsx
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
import {
  BarChart as ActivityIcon,
  Hexagon as HexagonIcon,
} from "@mui/icons-material";
import type { BeeStats } from "./types";

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
  return (
    <Box>
      {/* A bit more padding on smaller screens, less on bigger */}
      <Box sx={{ p: { xs: 2, md: 3 }, textAlign: "center" }}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          {beeStats.name} {beeStats.id}
        </Typography>
      </Box>

      {/* Make image smaller on small screens, normal on md+ */}
      <Box
        sx={{
          position: "relative",
          aspectRatio: { xs: "1/1.3", sm: "1/1.2", md: "1/1" },
          borderRadius: "12px",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.3)",
          mx: { xs: "auto", md: 0 },
          width: "100%",
          maxWidth: { xs: 300, sm: 400, md: "100%" },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            borderRadius: "8px",
            padding: "4px",
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
            src="/NFTs/Workers/JungleWorker.png"
            alt="Bee Warrior NFT"
            fill
            style={{ objectFit: "cover" }}
          />
        </Box>
      </Box>

      <Box sx={{ p: { xs: 2, md: 3 } }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography
              component="div"
              sx={{
                mb: 1.4,
                fontWeight: "bold",
                color: "white",
                display: "flex",
                alignItems: "flex-end",
              }}
            >
              <HexagonIcon sx={{ color: "#f0c850", marginRight: 1 }} />
              <Typography
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  lineHeight: 1.0,
                }}
              >
                Level {beeStats.level}
              </Typography>
            </Typography>
          </Box>
          <Chip
            label={beeStats.initialized ? "Initialized" : "Uninitialized"}
            size="small"
          />
        </Box>

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
              height: 8,
              borderRadius: "4px",
              "& .MuiLinearProgress-bar": {
                backgroundImage: "linear-gradient(to right, #c9a227, #f0c850)",
              },
            }}
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
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
        </Box>

        <Grid container spacing={1} sx={{ mb: 2 }}>
          {Object.entries(beeStats.traits).map(([key, value]) => (
            <Grid item xs={6} key={key}>
              <Paper sx={{ p: 1.5, bgcolor: "#1a3045" }}>
                <Typography variant="body2" sx={{ color: "#f0c850", mb: 0.5 }}>
                  {key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                </Typography>
                <Typography variant="body2" noWrap>
                  {value}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {!beeStats.initialized ? (
          <Button
            fullWidth
            variant="contained"
            onClick={initializeBee}
            sx={{
              background: "linear-gradient(to right, #c9a227, #f0c850)",
              color: "black",
              fontWeight: "bold",
              py: 1,
            }}
          >
            Initialize Bee
          </Button>
        ) : (
          <Button
            fullWidth
            className="blueButton"
            onClick={() => {}}
            sx={{ py: 1 }}
            startIcon={<ActivityIcon />}
          >
            View Activity
          </Button>
        )}
      </Box>
    </Box>
  );
}
