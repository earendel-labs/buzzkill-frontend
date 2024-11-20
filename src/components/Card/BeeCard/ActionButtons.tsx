// src/components/Card/ActionButtons.tsx

import React from "react";
import { Box, Button, styled } from "@mui/material";

interface ActionButtonsProps {
  status: "Free" | "Staked";
  onPlayClick?: () => void | Promise<void>;
  onUnstakeClick?: () => void;
  isPending?: boolean;
  isTransactionLoading?: boolean;
}

const StyledActionButton = styled(Button)(({ theme }) => ({
  width: "95%",
  margin: "16px auto 0",
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
  if (status === "Free") {
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
        <StyledActionButton
          variant="contained"
          color="primary"
          onClick={onPlayClick}
          disabled={isPending || isTransactionLoading}
        >
          Play
        </StyledActionButton>
      </Box>
    );
  } else if (status === "Staked") {
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
        <StyledActionButton
          variant="contained"
          color="primary"
          onClick={onUnstakeClick}
          disabled={isPending || isTransactionLoading}
        >
          {isPending || isTransactionLoading ? "Unstaking..." : "Unstake"}
        </StyledActionButton>
      </Box>
    );
  } else {
    return null; // Handle unexpected status if necessary
  }
};

export default ActionButtons;
