"use client";

import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Link as MuiLink,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import NextLink from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import { LoginButton } from "@/components/Buttons/LoginButton/Login";
import GameMenuModal from "@/components/Modals/GameMenu/GameMenu";
import GoldOutlinedButton from "@/components/Buttons/GoldOutlinedButton/GoldOutlinedButton";
import { useSound } from "@/context/SoundContext";

interface HeaderProps {
  isGameLayout?: boolean;
}

// Navigation Links
const NAV_LINKS = [
  { label: "Play", href: "/Play" },
  { label: "Mint", href: "/Mint" },
  { label: "Leaderboard", href: "/HoneyDrops" },
  { label: "My Profile", href: "/Play/User/Profile/MyProfile" },
  { label: "My Hatchlings", href: "/Play/User/Profile/MyBees" },
  { label: "Rewards", href: "/Play/User/Profile/MyRewards" },
  { label: "Check Whitelist", href: "/CheckWhitelist" },
];

const Header: React.FC<HeaderProps> = ({ isGameLayout = false }) => {
  const theme = useTheme();

  // Show nav links only if screen is lg (1280px) or wider
  const showNavLinks = useMediaQuery(theme.breakpoints.up("lg"));
  // Show the LoginButton for screens sm (600px) and wider
  const showLoginButton = useMediaQuery(theme.breakpoints.up("sm"));
  // If nav links are hidden, we show the hamburger
  const isMobileOrTablet = !showNavLinks;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isMuted } = useSound();

  const [hoverSound, setHoverSound] = useState<HTMLAudioElement | null>(null);
  const [clickSound, setClickSound] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    setHoverSound(new Audio("/Audio/Button/WoodenHover.wav"));
    setClickSound(new Audio("/Audio/Button/WoodenClick.wav"));
  }, []);

  const handleMouseEnter = () => {
    if (!isMuted && hoverSound) {
      hoverSound.currentTime = 0;
      hoverSound.play();
    }
  };

  const handleMouseDown = () => {
    if (!isMuted && clickSound) {
      clickSound.currentTime = 0;
      clickSound.play();
    }
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const NavBarColour = theme.palette.NavBarBackground.light;

  // If this is a game layout, show a floating menu button instead of a full nav bar
  if (isGameLayout) {
    return (
      <>
        <Box
          sx={{
            position: "fixed",
            top: "3rem",
            right: "1rem",
            zIndex: 1500,
          }}
        >
          <GoldOutlinedButton
            text=""
            onClick={toggleMenu}
            sx={{ padding: "0.5rem", minWidth: "3rem", height: "3rem" }}
          >
            <MenuIcon sx={{ fontSize: "2rem", color: "#D4AF37" }} />
          </GoldOutlinedButton>
        </Box>
        {isMobileOrTablet && (
          <GameMenuModal open={isMenuOpen} onClose={toggleMenu} />
        )}
      </>
    );
  }

  // Otherwise, show the standard header
  return (
    <>
      <AppBar
        position="static"
        sx={{
          height: "5rem",
          backgroundColor: `${NavBarColour} !important`,
          boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
        }}
      >
        <Toolbar
          sx={{
            width: "100%",
            maxWidth: "1800px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: theme.spacing(2),
          }}
        >
          {/* LEFT SIDE: Logo + (Optional) Desktop Nav Links */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: theme.spacing(4),
            }}
          >
            {/* Logo */}
            <MuiLink href="/">
              <Box
                component="img"
                src="/Logos/buzzkill-logo-nav.png"
                alt="Buzzkill Logo"
                sx={{ height: "2rem", cursor: "pointer" }}
              />
            </MuiLink>

            {/* Desktop Navigation (only if showNavLinks) */}
            {showNavLinks && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: theme.spacing(4),
                }}
              >
                {NAV_LINKS.map((link) => (
                  <MuiLink
                    key={link.href}
                    component={NextLink}
                    href={link.href}
                    onMouseEnter={handleMouseEnter}
                    onMouseDown={handleMouseDown}
                    sx={{
                      textDecoration: "none",
                      color: "inherit",
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      transition: "color 0.2s ease",
                      "&:hover": { color: "primary.main" },
                    }}
                  >
                    {link.label}
                  </MuiLink>
                ))}
              </Box>
            )}
          </Box>

          {/* RIGHT SIDE: LoginButton & (Optional) Hamburger */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: theme.spacing(2),
            }}
          >
            {/* Show LoginButton if screen >= sm */}
            {showLoginButton && <LoginButton />}

            {/* If nav links are hidden, show hamburger */}
            {isMobileOrTablet && (
              <GoldOutlinedButton
                onClick={toggleMenu}
                sx={{ padding: "0.5rem", minWidth: "3rem", height: "3rem" }}
              >
                <MenuIcon
                  sx={{ fontSize: "2rem", color: theme.palette.Gold.main }}
                />
              </GoldOutlinedButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile/Tablet Menu Modal */}
      {isMobileOrTablet && (
        <GameMenuModal open={isMenuOpen} onClose={toggleMenu} />
      )}
    </>
  );
};

export default Header;
