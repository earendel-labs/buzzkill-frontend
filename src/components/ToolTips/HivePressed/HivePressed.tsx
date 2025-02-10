import React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PrimaryButton from "@/components/Buttons/PrimaryButton/PrimaryButton"; // Adjust the import path as needed
import LargeTallToolTip from "@/components/ToolTips/LargeTall/LargeTallToolTip"; // Adjust the import path as needed
import { formatNumber } from "@/utils/formatNumber";
interface HivePressedProps {
  hiveName: string;
  hiveDefence: number;
  queenBees: string;
  workerBees: string;
  onRaidClick: () => void; // Callback for Raid button click
  onEnterClick: () => void; // Callback for Enter button click
}

const HivePressed: React.FC<HivePressedProps> = ({
  hiveName,
  hiveDefence,
  queenBees,
  workerBees,
  onRaidClick,
  onEnterClick,
}) => {
  const theme = useTheme();

  return (
    <LargeTallToolTip>
      <Box
        sx={{
          width: "220px",
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
          <Typography variant="ToolTipLabel">Rare Bees</Typography>
          <Typography variant="ToolTipValue">{queenBees}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Typography variant="ToolTipLabel">Total Bees</Typography>
          <Typography variant="ToolTipValue">{workerBees}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            marginTop: "10px", // Margin above the buttons
          }}
        >
          <PrimaryButton text="Raid" onClick={onRaidClick} disabled={true} />
          <PrimaryButton text="Enter" onClick={onEnterClick} />
        </Box>
      </Box>
    </LargeTallToolTip>
  );
};

export default HivePressed;
