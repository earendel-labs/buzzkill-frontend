import React from "react";
import { Box, IconButton, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LocationHeader from "@/components/MapNavigation/LocationHeader/LocationHeader";
import ModalCloseButton from "@/components/Buttons/ModalClose/ModalCloseButton";

interface ModalFrameProps {
  open: boolean;
  onClose: () => void;
  size?: "extraSmall" | "small" | "medium" | "large" | "extraLarge";
  title?: string;
  children: React.ReactNode;
}

const ModalFrame: React.FC<ModalFrameProps> = ({
  open,
  onClose,
  size = "medium",
  title = "Modal Title",
  children,
}) => {
  let width = "85%";
  let height = "auto";
  let maxHeight = "95vh"; // Adjust maximum height as required

  if (size === "extraSmall") {
    width = "75%";
  } else if (size === "small") {
    width = "80%";
  } else if (size === "medium") {
    width = "85%";
  } else if (size === "large") {
    width = "90%";
  } else if (size === "extraLarge") {
    width = "98%";
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        position="relative"
        width={width}
        height="98vh"
        sx={{ overflow: "hidden" }}
        onClick={(e) => e.stopPropagation()} // Prevent closing the modal when clicking inside the modal
      >
        <Box
          component="svg"
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%" // Changed from {height}
          viewBox="0 0 1349 702"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          sx={{ zIndex: 1 }}
          preserveAspectRatio="none" // Ensures the SVG fills the container
        >
          <path
            id="modal_frame"
            d="M46.6671 367.568V548.997C46.8868 653.531 657.099 608.235 674.749 692C692.413 608.235 1302.11 653.521 1302.33 548.997V367.568L1345 336.638L1302.33 305.708V60.5713C1270.86 37.7533 1253.22 24.9692 1221.74 2.15125L127.255 2.15125C95.7788 24.9692 78.1437 37.7533 46.6671 60.5713V305.708L4.00012 336.638L46.6671 367.568Z"
            fill="url(#paint0_linear_822006_1771)"
            fillOpacity="0.9"
            stroke="url(#paint1_linear_822006_1771)"
            strokeWidth="4"
            strokeMiterlimit="10"
          />
          <defs>
            <linearGradient
              id="paint0_linear_822006_1771"
              x1="674.5"
              y1="735.116"
              x2="674.5"
              y2="-35.5749"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0.275" stopColor="#242E4E" />
              <stop offset="0.575" stopColor="#121727" />
              <stop offset="0.765" stopColor="#202946" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_822006_1771"
              x1="1329.99"
              y1="1111.84"
              x2="-6.62341"
              y2="1097.26"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0.0225496" stopColor="#68341B" />
              <stop offset="0.15138" stopColor="#E9B743" />
              <stop offset="0.453063" stopColor="#68341B" />
              <stop offset="0.596396" stopColor="#E9B743" />
              <stop offset="0.925" stopColor="#68341B" />
            </linearGradient>
          </defs>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          position="relative"
          p={2}
          alignItems="center"
          boxSizing="border-box"
          sx={{ zIndex: 2 }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
            height="15vh"
            width="100%"
          >
            <Box flex="1" padding="0px 0px 0px 148px" />
            <LocationHeader text={title} position="relative" isHeader={true} />
            <Box
              flex="1"
              display="flex"
              justifyContent="flex-end"
              padding="0px 148px 0px 0px"
            >
              <ModalCloseButton isClose={true} onClick={onClose} />
            </Box>
          </Box>
          <Box
            flex={1}
            height="98vh"
            borderRadius={2}
            overflow="auto"
            p={2}
            onClick={(e) => e.stopPropagation()} // Prevent closing the modal when clicking inside the modal content
          >
            {children}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalFrame;
