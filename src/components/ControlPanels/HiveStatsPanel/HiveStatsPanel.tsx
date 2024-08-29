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
        padding: "1.25rem", // Use rem for padding
        borderRadius: "10px",
        width: "100%", // Set width to 100% and adjust in media queries
        maxWidth: "350px", // Add a max-width to constrain the size
        "@media (max-width: 768px)": {
          padding: "1rem", // Adjust padding on smaller screens
          maxWidth: "300px",
        },
        "@media (max-width: 480px)": {
          padding: "0.75rem",
          maxWidth: "100%", // Allow the panel to take full width on small screens
        },
      }}
    >
      {/* Hive Stats */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          fontSize: "2rem", // Use rem for font size
          color: "#D4AF37",
          marginBottom: "1rem",
          textAlign: "center", // Center the text on smaller screens
          "@media (max-width: 768px)": {
            fontSize: "1.75rem", // Adjust font size on smaller screens
          },
          "@media (max-width: 480px)": {
            fontSize: "1.5rem",
          },
        }}
      >
        Hive Stats
      </Typography>

      {/* Top Decorator */}
      <Box sx={{ marginBottom: "1rem" }}>
        <Image
          src="/Frames/Decorators/HiveStatsTop.svg"
          alt="Hive Stats Top Decorator"
          width={300}
          height={46}
          style={{ maxWidth: "100%", height: "auto" }} // Make the image responsive
        />
      </Box>

      {/* Hive Defense */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          marginTop: "1rem",
          "@media (max-width: 480px)": {
            flexDirection: "column", // Stack on small screens
            alignItems: "center",
          },
        }}
      >
        <Typography variant="h6" sx={{ color: "#D4AF37" }}>
          Hive Defense
        </Typography>
        <Typography variant="h6" sx={{ color: "white" }}>
          {hiveDefense}
        </Typography>
      </Box>

      {/* Queen Bees */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          marginTop: "1rem",
          "@media (max-width: 480px)": {
            flexDirection: "column",
            alignItems: "center",
          },
        }}
      >
        <Typography variant="h6" sx={{ color: "#D4AF37" }}>
          Queen Bees
        </Typography>
        <Typography variant="h6" sx={{ color: "white" }}>
          {queenBees}
        </Typography>
      </Box>

      {/* Worker Bees */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          marginTop: "1rem",
          "@media (max-width: 480px)": {
            flexDirection: "column",
            alignItems: "center",
          },
        }}
      >
        <Typography variant="h6" sx={{ color: "#D4AF37" }}>
          Worker Bees
        </Typography>
        <Typography variant="h6" sx={{ color: "white" }}>
          {workerBees}
        </Typography>
      </Box>

      {/* Bottom Decorator */}
      <Box sx={{ marginTop: "1rem" }}>
        <Image
          src="/Frames/Decorators/HiveStatsBottom.svg"
          alt="Hive Stats Bottom Decorator"
          width={350}
          height={46}
          style={{ maxWidth: "100%", height: "auto" }} // Make the image responsive
        />
      </Box>

      {/* Buttons */}
      <Box
        sx={{
          display: "flex",
          gap: "1.25rem", // Adjust gap between buttons
          marginTop: "1.5rem",
          "@media (max-width: 480px)": {
            flexDirection: "column", // Stack buttons on small screens
            width: "100%", // Make buttons full width
            gap: "1rem",
          },
        }}
      >
        <PrimaryButton text="Stake" onClick={onStake} />
        <PrimaryButton text="Raid" onClick={onRaid} />
      </Box>
    </Box>
  );
};

export default HiveStatsPanel;
