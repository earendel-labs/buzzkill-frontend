import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import PrimaryButton from "@/components/Buttons/PrimaryButton/PrimaryButton";
import { HiveInfo } from "@/types/HiveInfo";

interface HiveStatsPanelProps {
  hiveInfo: HiveInfo;
  onStake: () => void;
  onRaid: () => void;
}

const HiveStatsPanel: React.FC<HiveStatsPanelProps> = ({
  hiveInfo,
  onStake,
  onRaid,
}) => {
  // Constants for maximum values
  const maxQueenBees = 3;
  const maxWorkerBees = 55;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: {
          xs: "0.5rem", // Extra small devices
          sm: "1rem", // Small devices
        },
        width: "100%",
        maxWidth: {
          xs: "100%",
          sm: "18.75rem",
          md: "20rem",
          lg: "25rem",
          xl: "30rem",
        },
      }}
    >
      {/* Hive Stats */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          fontSize: {
            xs: "1.25rem", // 1.25rem on small screens
            sm: "1.5rem", // 1.5rem on small devices
            md: "1.75rem", // 1.75rem on medium devices
            lg: "2rem",
            xl: "3rem",
          },
          color: "#D4AF37",
          marginBottom: "0.75rem",
          textAlign: "center",
        }}
      >
        Hive Stats
      </Typography>

      {/* Top Decorator */}
      <Box
        sx={{
          width: "100%", // Ensures the container takes full width
          maxWidth: {
            xs: "100%", // Full width on extra small screens
            sm: "18.75rem", // 300px -> 18.75rem on small screens
            md: "20rem", // 320px -> 20rem on medium screens and above
            lg: "25rem", // 400px -> 25rem on large screens
            xl: "30rem", // 560px -> 35rem on extra-large screens
          },
          marginBottom: "0.75rem",
        }}
      >
        <Image
          src="/Frames/Decorators/HiveStatsTop.svg"
          alt="Hive Stats Top Decorator"
          width={300} // Use a static width for the Next.js Image optimization
          height={46} // Static height for the image
          style={{ width: "100%", height: "auto" }} // Scale the image responsively
        />
      </Box>

      {/* Hive Defense */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          marginTop: "0.5rem",
          flexDirection: {
            xs: "column",
            sm: "row",
          },
          alignItems: { xs: "center", sm: "unset" },
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "#D4AF37",
            fontSize: {
              xs: "0.75rem",
              sm: "0.875rem",
              md: "0.95rem",
              lg: "1rem",
              xl: "1.5rem",
            },
          }}
        >
          Hive Defense
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: "white",
            fontSize: {
              xs: "0.75rem",
              sm: "0.875rem",
              md: "0.95rem",
              lg: "1rem",
              xl: "1.5rem",
            },
          }}
        >
          {hiveInfo.defenceValue}
        </Typography>
      </Box>

      {/* Queen Bees */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          marginTop: "0.5rem",
          flexDirection: {
            xs: "column",
            sm: "row",
          },
          alignItems: { xs: "center", sm: "unset" },
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "#D4AF37",
            fontSize: {
              xs: "0.75rem",
              sm: "0.875rem",
              md: "0.95rem",
              lg: "1rem",
              xl: "1.5rem",
            },
          }}
        >
          Queen Bees
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: "white",
            fontSize: {
              xs: "0.75rem",
              sm: "0.875rem",
              md: "0.95rem",
              lg: "1rem",
              xl: "1.5rem",
            },
          }}
        >
          {`${hiveInfo.queenBees}/${maxQueenBees}`}
        </Typography>
      </Box>

      {/* Worker Bees */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          marginTop: "0.5rem",
          flexDirection: {
            xs: "column",
            sm: "row",
          },
          alignItems: { xs: "center", sm: "unset" },
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "#D4AF37",
            fontSize: {
              xs: "0.75rem",
              sm: "0.875rem",
              md: "0.95rem",
              lg: "1rem",
              xl: "1.5rem",
            },
          }}
        >
          Worker Bees
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: "white",
            fontSize: {
              xs: "0.75rem",
              sm: "0.875rem",
              md: "0.95rem",
              lg: "1rem",
              xl: "1.5rem",
            },
          }}
        >
          {`${hiveInfo.workerBees}/${maxWorkerBees}`}
        </Typography>
      </Box>

      <Box
        sx={{
          width: "100%", // Ensures the container takes full width
          maxWidth: {
            xs: "100%", // Full width on extra small screens
            sm: "18.75rem", // 300px -> 18.75rem on small screens
            md: "20rem", // 320px -> 20rem on medium screens and above
            lg: "25rem", // 400px -> 25rem on large screens
            xl: "30rem", // 560px -> 35rem on extra-large screens
          },
          marginTop: {
            xs: "0.75rem",
            sm: "0.875rem",
            md: "1rem",
            lg: "1.5rem",
            xl: "2rem",
          },
        }}
      >
        <Image
          src="/Frames/Decorators/HiveStatsBottom.svg"
          alt="Hive Stats Bottom Decorator"
          width={300} // Use a static width for the Next.js Image optimization
          height={30} // Static height for the image
          style={{ width: "100%", height: "auto" }} // Scale the image responsively
        />
      </Box>

      {/* Buttons */}
      <Box
        sx={{
          display: "flex",
          gap: "1.25rem",
          marginTop: {
            xs: "0.75rem",
            sm: "0.875rem",
            md: "1rem",
            lg: "1.5rem",
            xl: "2rem",
          },
          marginBottom: {
            xs: "0.5rem",
            xl: "2rem",
          },
          flexDirection: {
            xs: "column", // Stack buttons vertically on small screens
            sm: "row", // Row layout on small screens and above
          },
          width: { xs: "100%", sm: "auto" }, // Full width on small screens
        }}
      >
        <PrimaryButton text="Stake" onClick={onStake} />
        <PrimaryButton text="Raid" onClick={onRaid} />
      </Box>
    </Box>
  );
};

export default HiveStatsPanel;
