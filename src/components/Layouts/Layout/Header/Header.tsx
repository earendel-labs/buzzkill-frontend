// src/app/HoneyDrops/page.tsx
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
import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { GetServerSideProps, NextPage } from "next";
import { getServerSession } from "next-auth";
import { getAuthOptions } from "@/pages/api/auth/[...nextauth]";
import { LoginButton } from "@/components/Buttons/LoginButton/Login";
import Typography from "@mui/material/Typography"; // Import Typography

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  return {
    props: {
      session: await getServerSession(
        req,
        res,
        getAuthOptions(req, res as any)
      ),
    },
  };
};

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
      {/* Show CircleIconButton only if isGameLayout is true and menu is not open */}
      {isGameLayout && !isMenuOpen && (
        <CircleIconButton
          icon={<MenuIcon sx={{ fontSize: "34px", color: "white" }} />}
          onClick={toggleMenu}
          sx={{
            position: "fixed",
            top: "2.6rem",
            right: "0.5rem",
            transform: "translateY(-50%)",
          }}
        />
      )}

      {/* AppBar component (Shared in both layouts) */}
      {(!isGameLayout || isMenuOpen) && (
        <AppBar
          position="static"
          sx={{
            boxSizing: "border-box",
            height: "70px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
            backgroundColor: `${NavBarColour} !important`,
            overflow: "visible",
            alignContent: "center",
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
            {/* Logo and "Honey Drops" Label */}
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
                gap: "24px",
                padding: "0 0 0 44px",
              }}
            >
              <Link href="/Play" className="linkStyle2">
                Play
              </Link>
              <Link
                href="/Gallery"
                color="inherit"
                underline="none"
                className="linkStyle2"
              >
                Gallery
              </Link>
              <Link
                href="/Mint"
                color="inherit"
                underline="none"
                className="linkStyle2"
              >
                Mint
              </Link>
              <Link
                href="/HoneyDrops"
                color="inherit"
                underline="none"
                className="linkStyle2"
              >
                Honey Drops
              </Link>
            </Box>

            {/* Connect Button */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <LoginButton />
            </Box>

            {/* Close Button in GameLayout */}
            {isGameLayout && (
              <IconButton
                edge="end"
                color="inherit"
                aria-label="close"
                sx={{
                  ml: 2,
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: `2px solid #FFFFFF`,
                }}
                onClick={toggleMenu}
              >
                <MenuIcon sx={{ fontSize: "32px", color: "#FFFFFF" }} />
              </IconButton>
            )}
          </Toolbar>
        </AppBar>
      )}
    </>
  );
};

export default Header;
