import React from "react";
import { Box } from "@mui/material";
import PrimaryButton from "@/components/Buttons/PrimaryButton/PrimaryButton";
import { styled } from "@mui/system";

// Overlay component to display the Play button on hover
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

// Wrapper for positioning the Play button
const PlayButtonWrapper = styled(Box)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  opacity: 0,
  visibility: "hidden",
  transition: "opacity 0.3s ease",
});

const PlayOverlay: React.FC<{ onPlayClick: () => void }> = ({
  onPlayClick,
}) => (
  <>
    <Overlay className="overlay" />
    <PlayButtonWrapper className="playButtonWrapper">
      <PrimaryButton onClick={onPlayClick} text="Play" />
    </PlayButtonWrapper>
  </>
);

export default PlayOverlay;
