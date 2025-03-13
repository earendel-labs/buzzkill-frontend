"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import StyledModal from "@/components/Modals/StyledModal/StyledModal";
import { useRouter } from "next/navigation";
import GoldOutlinedButton from "@/components/Buttons/GoldOutlinedButton/GoldOutlinedButton";

interface GameMenuModalProps {
  open: boolean;
  onClose: () => void;
}

const GameMenuModal: React.FC<GameMenuModalProps> = ({ open, onClose }) => {
  const router = useRouter();

  const menuItems = [
    { label: "Play", path: "/Play" },
    { label: "Mint", path: "/Mint" },
    { label: "Leaderboard", path: "/HoneyDrops" },
    { label: "My Profile", path: "/Play/User/Profile/MyProfile" },
    { label: "My Hatchlings", path: "/Play/User/Profile/MyBees" },
    { label: "Rewards", path: "/Play/User/Profile/MyRewards" },
    { label: "Check Whitelist", path: "/CheckWhitelist" },
  ];

  const handleNavigation = (path: string) => {
    router.push(path);
    onClose(); // Close the modal after navigation
  };

  return (
    <StyledModal open={open} onClose={onClose}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          paddingBottom: 4,
        }}
      >
        {/* Menu Title */}
        <Typography
          variant="h5"
          sx={{ color: "white", fontWeight: "bold", mb: 2 }}
        >
          Buzzkill Menu
        </Typography>

        {/* Menu Buttons */}
        {menuItems.map((item) => (
          <GoldOutlinedButton
            key={item.path}
            text={item.label} // Use label instead of children
            onClick={() => handleNavigation(item.path)}
            sx={{
              width: "100%",
              maxWidth: "350px",
            }}
          />
        ))}
      </Box>
    </StyledModal>
  );
};

export default GameMenuModal;
