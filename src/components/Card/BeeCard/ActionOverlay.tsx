import React from "react";
import { Box } from "@mui/material";
import PrimaryButton from "@/components/Buttons/PrimaryButton/PrimaryButton"; // <-- Normal import
import { styled } from "@mui/system";

interface ActionOverlayProps {
  actionType: "Play" | "Unstake";
  onActionClick: () => void;
  isLoading?: boolean; // To determine if button should be disabled
}

const Overlay = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  opacity: 0,
  visibility: "hidden",
  transition: "opacity 0.3s ease",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const ActionButtonWrapper = styled(Box)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  opacity: 0,
  visibility: "hidden",
  transition: "opacity 0.3s ease",
});

const ActionOverlay: React.FC<ActionOverlayProps> = ({
  actionType,
  onActionClick,
  isLoading,
}) => (
  <>
    <Overlay className="overlay" />
    <ActionButtonWrapper className="actionButtonWrapper">
      <PrimaryButton
        onClick={onActionClick}
        text={actionType}
        disabled={isLoading} // Pass disabled prop
      />
    </ActionButtonWrapper>
  </>
);

export default ActionOverlay;
