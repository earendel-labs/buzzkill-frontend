"use client";

import React from "react";
import {
  Modal,
  Box,
  Typography,
  IconButton,
  Button,
  styled,
  keyframes,
} from "@mui/material";
import { useRouter } from "next/navigation";
import CloseIcon from "@mui/icons-material/Close";
import { LoginButton } from "@/components/Buttons/LoginButton/Login";
import SocialIcon from "@/components/Layouts/Layout/Footer/SocialIcons/SocialIcon";
import GoldOutlinedButton from "@/components/Buttons/GoldOutlinedButton/GoldOutlinedButton";
// Import your SVG icons (adjust to your actual paths)
import DiscordIcon from "/public/Icons/Social/discord.svg";
import TwitterIcon from "/public/Icons/Social/twitter.svg";
import GitbookIcon from "/public/Icons/Social/gitbook.svg";
import MediumIcon from "/public/Icons/Social/medium.svg";

// Menu items as provided
const menuItems = [
  { label: "Play", path: "/Play" },
  { label: "Mint", path: "/Mint" },
  { label: "Leaderboard", path: "/HoneyDrops" },
  { label: "My Profile", path: "/Play/User/Profile/MyProfile" },
  { label: "My Hatchlings", path: "/Play/User/Profile/MyBees" },
  { label: "Rewards", path: "/Play/User/Profile/MyRewards" },
  { label: "Check Whitelist", path: "/Whitelist" },
];

// Keyframes for animations
const glowPulse = keyframes`
  0% { box-shadow: 0 0 5px #D4AF37, 0 0 10px #D4AF37; }
  50% { box-shadow: 0 0 10px #D4AF37, 0 0 20px #D4AF37; }
  100% { box-shadow: 0 0 5px #D4AF37, 0 0 10px #D4AF37; }
`;

const scanLine = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
`;

// Styled components for futuristic HUD style
const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const MenuContainer = styled(Box)({
  width: 700,
  maxWidth: "90vw",
  backgroundColor: "rgba(15, 28, 48, 0.95)", // Semi-transparent dark blue
  backdropFilter: "blur(10px)",
  borderRadius: 12,
  border: "2px solid #D4AF37", // Gold border
  padding: "20px 0",
  outline: "none",
  overflow: "hidden",
  position: "relative",
  display: "flex",
  flexDirection: "column",
});

const ScanLineEffect = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  height: "2px",
  background:
    "linear-gradient(to right, transparent, rgba(212, 175, 55, 0.8), transparent)",
  animation: `${scanLine} 2s linear infinite`,
  opacity: 0.7,
  zIndex: 1,
});

const MenuHeader = styled(Box)({
  padding: "0 20px 20px 40px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  position: "relative",
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: "10%",
    right: "10%",
    height: "1px",
    background: "linear-gradient(to right, transparent, #D4AF37, transparent)",
  },
});

const MenuTitle = styled(Typography)({
  color: "#D4AF37", // Gold text
  fontWeight: "bold",
  fontSize: 28,
  textShadow: "0 0 10px rgba(212, 175, 55, 0.5)",
  letterSpacing: "2px",
});

const MenuContent = styled(Box)({
  padding: "20px 30px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "14px",
});

const CloseButton = styled(IconButton)({
  color: "#D4AF37", // Gold color for close icon
  "&:hover": {
    backgroundColor: "rgba(212, 175, 55, 0.1)",
    boxShadow: "0 0 10px rgba(212, 175, 55, 0.5)",
  },
});

// Footer area inside modal
const ModalFooter = styled(Box)({
  marginTop: "auto",
  padding: "16px 0px 2px 0px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "25px",
  borderTop: "1px solid rgba(212, 175, 55, 0.3)",
});

interface GameMenuModalProps {
  open: boolean;
  onClose: () => void;
}

const GameMenuModal: React.FC<GameMenuModalProps> = ({ open, onClose }) => {
  const router = useRouter();

  const handleMenuItemClick = (path: string) => {
    router.push(path);
    onClose();
  };

  return (
    <StyledModal
      open={open}
      onClose={onClose}
      aria-labelledby="menu-modal-title"
    >
      <MenuContainer>
        <ScanLineEffect />

        <MenuHeader>
          <MenuTitle id="menu-modal-title">MENU</MenuTitle>

          {/* Header icons: LoginButton + Close */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <LoginButton isMenu={true} />
          </Box>
        </MenuHeader>

        <MenuContent>
          {menuItems.map((item, index) => (
            <GoldOutlinedButton
              key={index}
              text={item.label}
              onClick={() => handleMenuItemClick(item.path)}
              sx={{
                width: "100%",
                maxWidth: "400px",
                animationDelay: `${index * 0.1}s`,
                opacity: 0.9,
              }}
            />
          ))}
        </MenuContent>

        {/* Modal Footer with social icons */}
        <ModalFooter>
          <Box sx={{ display: "flex", gap: "32px" }}>
            <SocialIcon
              Component={DiscordIcon}
              href="https://discord.com/invite/3fuc9K4EQK"
              target="_blank"
              rel="noopener noreferrer"
            />
            <SocialIcon
              Component={TwitterIcon}
              href="https://twitter.com/BuzzkillNFT"
              target="_blank"
              rel="noopener noreferrer"
            />
            <SocialIcon
              Component={GitbookIcon}
              href="https://buzzkill-honeycomb-hustle.gitbook.io/buzzkill-docs"
              target="_blank"
              rel="noopener noreferrer"
            />
            <SocialIcon
              Component={MediumIcon}
              href="https://medium.com/@BuzzkillNFT"
              target="_blank"
              rel="noopener noreferrer"
            />
          </Box>
        </ModalFooter>
      </MenuContainer>
    </StyledModal>
  );
};

export default GameMenuModal;
