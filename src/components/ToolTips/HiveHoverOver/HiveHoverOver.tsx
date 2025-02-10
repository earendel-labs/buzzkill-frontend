import React from "react";
import { Box, Typography, Skeleton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import LargeToolTip from "../Large/LargeToolTip";
import { formatNumber } from "@/utils/formatNumber";
interface HiveHoverOverProps {
  hiveName?: string;
  hiveDefence?: number;
  queenBees?: string;
  workerBees?: string;
}

const HiveHoverOver: React.FC<HiveHoverOverProps> = ({
  hiveName,
  hiveDefence,
  queenBees,
  workerBees,
}) => {
  const theme = useTheme();

  // Check if all data is available
  const isLoading =
    hiveName === undefined ||
    hiveDefence === undefined ||
    queenBees === undefined ||
    workerBees === undefined;

  return (
    <LargeToolTip>
      {isLoading ? (
        <Skeleton
          variant="rectangular"
          width={200}
          height={120}
          sx={{ backgroundColor: "#242E4E", borderRadius: "4px" }}
        />
      ) : (
        <Box
          sx={{
            width: "200px",
            gap: "4px",
            height: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: "700",
              fontSize: "22px",
              lineHeight: "100%",
              display: "flex",
              alignItems: "center",
              textAlign: "center",
              color: "#FFFFFF",
              marginBottom: "5px",
            }}
          >
            {hiveName}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography variant="ToolTipLabel">Production</Typography>
            <Typography variant="ToolTipValue">
              {formatNumber(hiveDefence)}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography variant="ToolTipLabel">Rare Hatchlings</Typography>
            <Typography variant="ToolTipValue">{queenBees}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography variant="ToolTipLabel">Total Hatchlings</Typography>
            <Typography variant="ToolTipValue">{workerBees}</Typography>
          </Box>
        </Box>
      )}
    </LargeToolTip>
  );
};

export default HiveHoverOver;
