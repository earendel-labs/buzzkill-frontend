"use client";

import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Link } from "@mui/material";
import CircleIconButton from "@/components/Buttons/CircleIcon/CircleIconButton";
import { LoginButton } from "@/components/Buttons/LoginButton/Login";
import GameMenuModal from "@/components/Modals/GameMenu/GameMenu";

interface HeaderProps {
  isGameLayout?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isGameLayout = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const theme = useTheme();
  const NavBarColour = theme.palette.NavBarBackground.light;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Show CircleIconButton only if isGameLayout is true */}
      {isGameLayout && (
        <CircleIconButton
          icon={<MenuIcon sx={{ fontSize: "34px", color: "white" }} />}
          onClick={toggleMenu}
          sx={{
            position: "fixed",
            top: "2.6rem",
            right: "0.5rem",
            transform: "translateY(-50%)",
            zIndex: 1500,
          }}
        />
      )}

      {/* Game Menu Modal (Replaces the old Drawer) */}
      {isGameLayout && <GameMenuModal open={isMenuOpen} onClose={toggleMenu} />}

      {/* AppBar for standard layout */}
      {!isGameLayout && (
        <AppBar
          position="static"
          sx={{
            height: "70px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
            backgroundColor: `${NavBarColour} !important`,
            position: "relative",
            zIndex: 1100,
          }}
        >
          <Toolbar
            sx={{
              padding: "0",
              flex: 1,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* Logo */}
            <Box display="flex" alignItems="center">
              <Link href="/">
                <Box
                  component="img"
                  src="/Logos/buzzkill-logo-nav.png"
                  alt="Buzzkill Logo"
                  sx={{ height: "30px", cursor: "pointer", mr: 1 }}
                />
              </Link>
            </Box>

            {/* Navigation Links */}
            <Box
              sx={{
                flex: 1,
                display: "flex",
                justifyContent: "left",
                gap: "28px",
                padding: "0 0 0 44px",
              }}
            >
              <Link href="/Play" className="linkStyle2">
                Play
              </Link>
              <Link href="/Mint" className="linkStyle2">
                Mint
              </Link>
              <Link href="/HoneyDrops" className="linkStyle2">
                Leaderboard
              </Link>
              <Link href="/Play/User/Profile/MyProfile" className="linkStyle2">
                My Profile
              </Link>
              <Link href="/Play/User/Profile/MyBees" className="linkStyle2">
                My Hatchlings
              </Link>
              <Link href="/Play/User/Profile/MyRewards" className="linkStyle2">
                Rewards
              </Link>
            </Box>

            {/* Login Button */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <LoginButton />
            </Box>
          </Toolbar>
        </AppBar>
      )}
    </>
  );
};

export default Header;
