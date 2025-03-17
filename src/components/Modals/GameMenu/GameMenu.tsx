"use client";

import React from "react";
import { Modal, Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useRouter } from "next/navigation";
import CloseIcon from "@mui/icons-material/Close";
import { LoginButton } from "@/components/Buttons/LoginButton/Login";
import SocialIcon from "@/components/Layouts/Layout/Footer/SocialIcons/SocialIcon";
import GoldOutlinedButton from "@/components/Buttons/GoldOutlinedButton/GoldOutlinedButton";
import { styled } from "@mui/material/styles";

// SVG icons
import DiscordIcon from "/public/Icons/Social/discord.svg";
import TwitterIcon from "/public/Icons/Social/twitter.svg";
import GitbookIcon from "/public/Icons/Social/gitbook.svg";
import MediumIcon from "/public/Icons/Social/medium.svg";

const menuItems = [
  { label: "Play", path: "/Play" },
  { label: "Mint", path: "/Mint" },
  { label: "Leaderboard", path: "/HoneyDrops" },
  { label: "My Profile", path: "/Play/User/Profile/MyProfile" },
  { label: "My Hatchlings", path: "/Play/User/Profile/MyBees" },
  { label: "Rewards", path: "/Play/User/Profile/MyRewards" },
  { label: "Check Whitelist", path: "/CheckWhitelist" },
];

// 1) Main Container: full-height column layout
const MenuContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  maxWidth: "43.75rem", // 700px
  width: "100%",
  backgroundColor: "rgba(15, 28, 48, 0.95)",
  backdropFilter: "blur(0.625rem)",
  borderRadius: "0.75rem",
  border: "0.125rem solid #D4AF37",
  outline: "none",
  overflow: "hidden",
  margin: "0 auto", // Center horizontally if there's space

  [theme.breakpoints.down("md")]: {
    maxWidth: "100vw",
    border: "none",
    borderRadius: 0,
  },
}));

// 2) Header: top row
const MenuHeader = styled(Box)(({ theme }) => ({
  flex: "0 0 auto",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "1rem 2rem",

  [theme.breakpoints.down("md")]: {
    padding: "1rem 1rem",
  },
}));

// 3) ScrollableContent: middle row (scrolls if needed)
const ScrollableContent = styled(Box)(({ theme }) => ({
  flex: "1 1 auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1rem",
  padding: "1rem 2rem",
  overflowY: "auto",
  scrollbarWidth: "thin",
  scrollbarColor: "#D4AF37 transparent",
  "&::-webkit-scrollbar": {
    width: "6px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#D4AF37",
    borderRadius: "3px",
  },

  [theme.breakpoints.down("md")]: {
    padding: "1rem",
    gap: "0.9rem",
  },

  // Tweak spacing in very tight horizontal screens
  "@media (max-width: 844px) and (max-height: 390px)": {
    padding: "0.5rem",
    gap: "0.75rem",
  },
}));

// 4) Footer: bottom row
const ModalFooter = styled(Box)(({ theme }) => ({
  flex: "0 0 auto",
  display: "flex",
  justifyContent: "center",
  gap: "1.5rem",
  padding: "1rem 0 1.5rem 0",

  [theme.breakpoints.down("md")]: {
    padding: "0.75rem 0 1rem 0",
  },

  "@media (max-width: 844px) and (max-height: 390px)": {
    paddingBottom: "0.5rem",
  },
}));

interface GameMenuModalProps {
  open: boolean;
  onClose: () => void;
}

const GameMenuModal: React.FC<GameMenuModalProps> = ({ open, onClose }) => {
  const router = useRouter();
  const theme = useTheme();
  const isTabletOrSmaller = useMediaQuery(theme.breakpoints.down("md"));

  const handleMenuItemClick = (path: string) => {
    router.push(path);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="menu-modal-title">
      <MenuContainer>
        {/* Header */}
        <MenuHeader>
          <Typography
            id="menu-modal-title"
            sx={{
              color: "#D4AF37",
              fontWeight: "bold",
              fontSize: "1.75rem",
              textShadow: "0 0 0.625rem rgba(212, 175, 55, 0.5)",
              letterSpacing: "0.125rem",
            }}
          >
            MENU
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <LoginButton isMenu={true} />
            {isTabletOrSmaller && (
              <GoldOutlinedButton
                onClick={onClose}
                sx={{
                  padding: "0.5rem",
                  minWidth: "2.5rem",
                  height: "2.5rem",
                }}
              >
                <CloseIcon sx={{ fontSize: "1.8rem", color: "#D4AF37" }} />
              </GoldOutlinedButton>
            )}
          </Box>
        </MenuHeader>

        {/* Scrollable Menu Content */}
        <ScrollableContent>
          {menuItems.map((item) => (
            <GoldOutlinedButton
              key={item.label}
              text={item.label}
              onClick={() => {
                router.push(item.path);
                onClose();
              }}
              sx={{
                width: "100%",
                maxWidth: "25rem",
                padding: "0.9rem 1.2rem",
                fontSize: "1.15rem",
                opacity: 0.9,
                textAlign: "center",
              }}
            />
          ))}
        </ScrollableContent>

        {/* Footer */}
        <ModalFooter>
          <SocialIcon
            Component={DiscordIcon}
            href="https://discord.com/invite/3fuc9K4EQK"
          />
          <SocialIcon
            Component={TwitterIcon}
            href="https://twitter.com/BuzzkillNFT"
          />
          <SocialIcon
            Component={GitbookIcon}
            href="https://buzzkill-honeycomb-hustle.gitbook.io/buzzkill-docs"
          />
          <SocialIcon
            Component={MediumIcon}
            href="https://medium.com/@BuzzkillNFT"
          />
        </ModalFooter>
      </MenuContainer>
    </Modal>
  );
};

export default GameMenuModal;
