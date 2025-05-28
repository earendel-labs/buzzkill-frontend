import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import PrimaryButton from "@/components/Buttons/PrimaryButton/PrimaryButton";
import { HiveInfo } from "@/types/HiveInfo";
import { useTheme, useMediaQuery } from "@mui/material";
interface HiveStatsPanelProps {
  hiveInfo: HiveInfo;
  onStake: () => void;
  onRaid: () => void;
}

// Define common sizes for different breakpoints
const scaleByBreakpoint = {
  xs: 0.8,
  sm: 0.8,
  md: 1,
  lg: 0.8,
  xl: 1.2,
  xxl: 1.2,
};

const HiveStatsPanel: React.FC<HiveStatsPanelProps> = ({
  hiveInfo,
  onStake,
  onRaid,
}) => {
  const theme = useTheme();
  const maxQueenBees = 3;
  const maxWorkerBees = 55;

  // Use media queries outside of conditional logic to follow the hooks rules
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));
  const isSm = useMediaQuery(theme.breakpoints.only("sm"));
  const isMd = useMediaQuery(theme.breakpoints.only("md"));
  const isLg = useMediaQuery(theme.breakpoints.only("lg"));
  const isXl = useMediaQuery(theme.breakpoints.only("xl"));
  const isXxl = useMediaQuery(theme.breakpoints.only("xxl"));

  // Set the button scale dynamically based on breakpoints
  const currentScale = () => {
    if (isXs) return scaleByBreakpoint.xs;
    if (isSm) return scaleByBreakpoint.sm;
    if (isMd) return scaleByBreakpoint.md;
    if (isLg) return scaleByBreakpoint.lg;
    if (isXl) return scaleByBreakpoint.xl;
    if (isXxl) return scaleByBreakpoint.xxl;
    return scaleByBreakpoint.md; // Fallback scale
  };

  const scale = currentScale(); // Get the current scale based on screen size

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: {
          xs: "0.5rem", // Extra small devices
          sm: "1rem", // Small devices
          lg: "2rem 2rem",
          xxl: "4rem 0rem",
        },
        width: "100%",
        maxWidth: {
          xs: "100%",
          sm: "18.75rem",
          md: "20rem",
          lg: "28rem",
          xl: "30rem",
          xxl: "30rem",
        },
      }}
    >
      {/* Hive Stats */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          fontSize: {
            xs: "1rem", // 1.25rem on small screens
            sm: "1rem", // 1.5rem on small devices
            md: "1rem", // 1.75rem on medium devices
            lg: "1rem",
            xl: "1rem",
            xxl: "1rem",
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
        <PrimaryButton text="Stake" onClick={onStake} scale={scale} />
        <PrimaryButton text="Raid" onClick={onRaid} scale={scale} />
      </Box>
    </Box>
  );
};

export default HiveStatsPanel;
