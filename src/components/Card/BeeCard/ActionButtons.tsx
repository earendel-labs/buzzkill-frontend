import React from "react";
import { Box, Button, styled } from "@mui/material";

interface ActionButtonsProps {
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

const PlaceholderBox = styled(Box)(({ theme }) => ({
  width: "95%",
  margin: "16px auto 0",
  height: "48px", // Matches the height of the button (including padding)
  display: "block", // Ensures it occupies space
}));

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onPlayClick,
  onUnstakeClick,
  isPending = false,
  isTransactionLoading = false,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        width: "100%",
      }}
    >
      {onPlayClick && (
        <StyledActionButton
          variant="contained"
          color="primary"
          onClick={onPlayClick}
          disabled={isPending || isTransactionLoading}
        >
          Play
        </StyledActionButton>
      )}
      {onUnstakeClick && (
        <StyledActionButton
          variant="contained"
          color="secondary"
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