"use client";

import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Link as MuiLink, LinkProps } from "@mui/material";
import CircleIconButton from "@/components/Buttons/CircleIcon/CircleIconButton";
import { LoginButton } from "@/components/Buttons/LoginButton/Login";
import GameMenuModal from "@/components/Modals/GameMenu/GameMenu";
import { useSound } from "@/context/SoundContext";

interface HeaderProps {
  isGameLayout?: boolean;
}

// Component to wrap MUI Link with sound effects
const SoundLink: React.FC<LinkProps> = (props) => {
  const { isMuted } = useSound();
  const [hoverSound, setHoverSound] = useState<HTMLAudioElement | null>(null);
  const [clickSound, setClickSound] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    setHoverSound(new Audio("/Audio/Button/WoodenHover.wav"));
    setClickSound(new Audio("/Audio/Button/WoodenClick.wav"));
  }, []);

  const handleMouseEnter = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isMuted && hoverSound) {
      hoverSound.currentTime = 0;
      hoverSound.play();
    }
    if (props.onMouseEnter) props.onMouseEnter(event);
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isMuted && clickSound) {
      clickSound.currentTime = 0;
      clickSound.play();
    }
    if (props.onMouseDown) props.onMouseDown(event);
  };

  return (
    <MuiLink
      {...props}
      onMouseEnter={handleMouseEnter}
      onMouseDown={handleMouseDown}
    />
  );
};

const Header: React.FC<HeaderProps> = ({ isGameLayout = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const theme = useTheme();
  const NavBarColour = theme.palette.NavBarBackground.light;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {isGameLayout && (
        <CircleIconButton
          icon={<MenuIcon sx={{ fontSize: "34px", color: "white" }} />}
          onClick={toggleMenu}
          sx={{
            position: "fixed",
            top: "3rem",
            right: "1rem",
            transform: "translateY(-50%)",
            zIndex: 1500,
          }}
        />
      )}

      {isGameLayout && <GameMenuModal open={isMenuOpen} onClose={toggleMenu} />}

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
            <Box display="flex" alignItems="center">
              <MuiLink href="/">
                <Box
                  component="img"
                  src="/Logos/buzzkill-logo-nav.png"
                  alt="Buzzkill Logo"
                  sx={{ height: "30px", cursor: "pointer", mr: 1 }}
                />
              </MuiLink>
            </Box>

            <Box
              sx={{
                flex: 1,
                display: "flex",
                justifyContent: "left",
                gap: "28px",
                padding: "0 0 0 44px",
              }}
            >
              <SoundLink href="/Play" className="linkStyle2">
                Play
              </SoundLink>
              <SoundLink href="/Mint" className="linkStyle2">
                Mint
              </SoundLink>
              <SoundLink href="/HoneyDrops" className="linkStyle2">
                Leaderboard
              </SoundLink>
              <SoundLink
                href="/Play/User/Profile/MyProfile"
                className="linkStyle2"
              >
                My Profile
              </SoundLink>
              <SoundLink
                href="/Play/User/Profile/MyBees"
                className="linkStyle2"
              >
                My Hatchlings
              </SoundLink>
              <SoundLink
                href="/Play/User/Profile/MyRewards"
                className="linkStyle2"
              >
                Rewards
              </SoundLink>
            </Box>

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
