import React from "react";
import { Typography } from "@mui/material";
import ModalFrame from "../ModalFrame/ModalFrame";
import RightButton from "@/components/Buttons/CarouselNavigation/RightButton";
import LeftButton from "@/components/Buttons/CarouselNavigation/LeftButton";

interface MyBeesModalProps {
  open: boolean;
  onClose: () => void;
  size?: "extraSmall" | "small" | "medium" | "large" | "extraLarge";
}
//TODO: Work In Progress
const MyBeesModal: React.FC<MyBeesModalProps> = ({
  open,
  onClose,
  size = "extraLarge",
}) => {
  return (
    <ModalFrame open={open} onClose={onClose} size={size} title="My Hatchlings">
      <Typography id="modal-description" sx={{ mt: 2 }}>
        This is the content of the Your Bees modal.
      </Typography>
      <LeftButton></LeftButton>
      <RightButton></RightButton>
    </ModalFrame>
  );
};

export default MyBeesModal;
