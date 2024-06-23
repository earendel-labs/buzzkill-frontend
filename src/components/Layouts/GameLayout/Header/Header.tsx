"use client";

import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Link } from "@mui/material";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const theme = useTheme();
  const NavBarColour = theme.palette.NavBarBackground.main;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {!isMenuOpen && (
        <Box
          sx={{
            position: "fixed",
            top: 10,
            right: 20,
            zIndex: 1000,
            width: "70px",
            height: "70px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "transparent",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              width: "70px",
              height: "70px",
              backgroundImage: `url('/Frames/Buttons/circle-frame.png')`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundColor: "transparent",
            }}
          />
          <IconButton
            color="inherit"
            aria-label="menu"
            sx={{
              width: "50px",
              height: "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: theme.palette.GoldFaded.main,
            }}
            onClick={toggleMenu}
          >
            <MenuIcon sx={{ fontSize: "34px", color: "white" }} />
          </IconButton>
        </Box>
      )}
      {isMenuOpen && (
        <AppBar
          position="static"
          sx={{
            boxSizing: "border-box",
            height: "65px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
            backgroundColor: NavBarColour,
            overflow: "visible",
            alignContent: "center",
            position: "relative",
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
            <Box>
              <Link href="/">
                <Box
                  component="img"
                  src="/Logos/buzzkill-logo-nav.png"
                  alt="Buzzkill Logo"
                  sx={{ height: "30px", cursor: "pointer" }}
                />
              </Link>
            </Box>
            <Box
              sx={{
                flex: 1,
                display: "flex",
                justifyContent: "left",
                gap: "18px",
                padding: "0 0 0 44px",
              }}
            >
              <Link href="/Play" className="linkStyle2">
                Play
              </Link>
              <Link
                href="/"
                color="inherit"
                underline="none"
                className="linkStyle2"
              >
                Gallery
              </Link>
              <Link
                href="/"
                color="inherit"
                underline="none"
                className="linkStyle2"
              >
                Mint
              </Link>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button className="goldButton" href="/" target="_blank">
                Connect Wallet
              </Button>
            </Box>
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
                border: `2px solid #FFFFF`,
              }}
              onClick={toggleMenu}
            >
              <MenuIcon sx={{ fontSize: "32px", color: "#fffff" }} />{" "}
              {/* Set the color to Blue.main */}
            </IconButton>
          </Toolbar>
        </AppBar>
      )}
    </>
  );
};

export default Header;
