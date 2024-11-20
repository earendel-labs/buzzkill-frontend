// src/components/Card/ActionButtons.tsx

import React from "react";
import { Box, Button, styled } from "@mui/material";

interface ActionButtonsProps {
  status: "Free" | "Staked";
  onPlayClick?: () => void | Promise<void>; // Zero-argument function
  onUnstakeClick?: () => void;
  isPending?: boolean;
  isTransactionLoading?: boolean;
}

const StyledActionButton = styled(Button)(({ theme }) => ({
  width: "95%", // Set width to 95% of the container
  margin: "16px auto 0", // Center button with margin at the top
  padding: "6px 12px",
  fontSize: "1.1rem",
}));

const ActionButtons: React.FC<ActionButtonsProps> = ({
  status,
  onPlayClick,
  onUnstakeClick,
  isPending = false,
  isTransactionLoading = false,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 1,
        paddingTop: 1,
      }}
    >
      {status === "Free" ? (
        <StyledActionButton
          variant="contained"
          color="primary"
          onClick={onPlayClick} // Correctly typed as () => void | Promise<void>
          disabled={isPending || isTransactionLoading}
        >
          Play
        </StyledActionButton>
      ) : (
        <StyledActionButton
          variant="contained"
          color="primary"
          onClick={onUnstakeClick}
          disabled={isPending || isTransactionLoading}
        >
          {isPending || isTransactionLoading ? "Unstaking..." : "Unstake"}
        </StyledActionButton>
      )}
    </Box>
  );
};

export default ActionButtons;
