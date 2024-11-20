// src/components/Card/StatusChip.tsx

import { Box } from "@mui/material";
import { styled } from "@mui/system";

interface StatusChipProps {
  isFree: boolean;
  children: React.ReactNode;
}

const StyledStatusChip = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isFree",
})<StatusChipProps>(({ theme, isFree }) => ({
  backgroundColor: isFree
    ? theme.palette.success.main
    : theme.palette.info.main,
  color: "white",
  padding: "4px 20px",
  borderRadius: "24px",
  position: "absolute",
  top: "16px",
  right: "16px",
  fontWeight: "bold",
  fontSize: "16px",
  zIndex: 1,
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
}));

const StatusChip: React.FC<StatusChipProps> = ({ isFree, children }) => {
  return <StyledStatusChip isFree={isFree}>{children}</StyledStatusChip>;
};

export default StatusChip;
