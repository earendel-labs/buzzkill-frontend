import React from "react";
import { Box, Chip } from "@mui/material";
import { styled } from "@mui/system";

const StatusChip = styled(Chip)<{ status: string }>(({ theme, status }) => ({
  backgroundColor: status === "Free" ? "green" : theme.palette.info.main,
  color: "white",
  borderRadius: "2px",
}));

const EnvironmentChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: "white",
  borderRadius: "2px",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
  },
  "&:active": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const HatchlingStatus: React.FC<{ status: string; environment: string | null }> = ({
  status,
  environment,
}) => (
  <Box sx={{ position: "absolute", bottom: "12px", left: "12px", display: "flex", gap: "8px" }}>
    <StatusChip label={status || "Free"} status={status || "Free"} />
    {status === "Staked" && environment && (
      <EnvironmentChip label={environment} onClick={() => console.log(`Navigate to ${environment}`)} />
    )}
  </Box>
);

export default HatchlingStatus;
