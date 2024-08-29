import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import PrimaryButton from "@/components/Buttons/PrimaryButton/PrimaryButton";

interface HiveStatsPanelProps {
  hiveDefense: number;
  queenBees: string;
  workerBees: string;
  onStake: () => void;
  onRaid: () => void;
}

const HiveStatsPanel: React.FC<HiveStatsPanelProps> = ({
  hiveDefense,
  queenBees,
  workerBees,
  onStake,
  onRaid,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        borderRadius: "10px",
        width: "350px",
      }}
    >
      {/* Hive Stats */}
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", fontSize: 48, color: "#D4AF37", mb: 2 }}
      >
        Hive Stats
      </Typography>
      {/* Top Decorator */}
      <Box sx={{ mb: 2 }}>
        <Image
          src="/Frames/Decorators/HiveStatsTop.svg"
          alt="Hive Stats Top Decorator"
          width={300}
          height={46}
        />
      </Box>

      {/* Hive Defense */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          mt: 2,
        }}
      >
        <Typography variant="h6" sx={{ color: "#D4AF37" }}>
          Hive Defense
        </Typography>
        <Typography variant="h5" sx={{ color: "white" }}>
          {hiveDefense}
        </Typography>
      </Box>

      {/* Queen Bees */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          mt: 2,
        }}
      >
        <Typography variant="h6" sx={{ color: "#D4AF37" }}>
          Queen Bees
        </Typography>
        <Typography variant="h5" sx={{ color: "white" }}>
          {queenBees}
        </Typography>
      </Box>

      {/* Worker Bees */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          mt: 2,
        }}
      >
        <Typography variant="h6" sx={{ color: "#D4AF37" }}>
          Worker Bees
        </Typography>
        <Typography variant="h5" sx={{ color: "white" }}>
          {workerBees}
        </Typography>
      </Box>

      {/* Bottom Decorator */}
      <Box sx={{ mt: 2 }}>
        <Image
          src="/Frames/Decorators/HiveStatsBottom.svg"
          alt="Hive Stats Bottom Decorator"
          width={350}
          height={46}
        />
      </Box>

      {/* Buttons */}
      <Box sx={{ display: "flex", gap: 5, mt: 3 }}>
        <PrimaryButton text="Stake" onClick={onStake} />
        <PrimaryButton text="Raid" onClick={onRaid} />
      </Box>
    </Box>
  );
};

export default HiveStatsPanel;
