import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import PrimaryButton from "@/components/Buttons/PrimaryButton/PrimaryButton";
import { HiveInfo, HiveHatchlingInfo } from "@/types/HiveInfo";
import { useTheme, useMediaQuery, Skeleton, Tooltip } from "@mui/material";
import { useReadHiveStakingMaxBeesPerHive } from "@/hooks/HiveStaking";
interface HiveHatchlingsPanelProps {
  hiveHatchlingInfo: HiveHatchlingInfo;
  onStake: () => void;
  onRaid: () => void;
}

// Define common sizes for different breakpoints
const scaleByBreakpoint = {
  xs: 0.8,
  sm: 0.8,
  md: 1,
  lg: 1,
  xl: 1.2,
  xxl: 1.2,
};

const HiveHatchlingsPanel: React.FC<HiveHatchlingsPanelProps> = ({
  hiveHatchlingInfo,
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

  const {
    data: maxBeesData,
    isLoading: isMaxBeesLoading,
    isError: isMaxBeesError,
    error: maxBeesError,
  } = useReadHiveStakingMaxBeesPerHive();

  const isHiveFull =
    maxBeesData !== undefined && hiveHatchlingInfo.TotalBees >= maxBeesData;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: {
          xs: "0.5rem", // Extra small devices
          sm: "1rem", // Small devices
          lg: "1.25rem 2rem",
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
          Environment
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
          {hiveHatchlingInfo.environment}
        </Typography>
      </Box>

      {/* Hive Production */}
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
          Production
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
          {hiveHatchlingInfo.productivityValue}
        </Typography>
      </Box>

      {/* Rare Hatchlings Bees */}
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
          Rare Hatchlings
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
          {hiveHatchlingInfo.RareBees}
        </Typography>
      </Box>

      {/*Ultra Rare Hatchlings Bees */}
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
          Ultra Rare Hatchlings
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
          {hiveHatchlingInfo.UltraRareBees}
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
          Total Hatchlings
        </Typography>
        {maxBeesData === undefined ? (
          <Skeleton
            variant="text"
            width={60}
            height={44}
            sx={{
              backgroundColor: "#444",
              display: "block",
              lineHeight: "normal",
            }}
          />
        ) : (
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
            {`${hiveHatchlingInfo.TotalBees}/${maxBeesData}`}
          </Typography>
        )}
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
            xl: "0rem",
          },
          flexDirection: {
            xs: "column", // Stack buttons vertically on small screens
            sm: "row", // Row layout on small screens and above
          },
          width: { xs: "100%", sm: "auto" }, // Full width on small screens
        }}
      >
        {/* Stake Button with Tooltip */}
        <Tooltip
          title={isHiveFull ? "Hive is full, please look for other hives." : ""}
          arrow
        >
          <span>
            <PrimaryButton
              text={isHiveFull ? "Hive Full" : "Stake"}
              onClick={onStake}
              scale={scale}
              disabled={isHiveFull}
            />
          </span>
        </Tooltip>

        {/* Raid Button */}
        <PrimaryButton text="Raid" onClick={onRaid} scale={scale} disabled />
      </Box>
    </Box>
  );
};

export default HiveHatchlingsPanel;
