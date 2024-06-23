"use client";

import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Link } from "@mui/material";

const Header: React.FC = () => {
  const theme = useTheme();
  const NavBarColour = theme.palette.NavBarBackground.main;
  const cardBorder = theme.palette.cardBorder.main;

  return (
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
          <Link href="/Play" className="linkStyle1">
            Play
          </Link>
          <Link
            href="/Play"
            color="inherit"
            underline="none"
            className="linkStyle1"
          >
            Gallery
          </Link>
          <Link
            href="/"
            color="inherit"
            underline="none"
            className="linkStyle1"
          >
            Mint
          </Link>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Button className="goldButton" href="/" target="_blank">
            Connect Wallet
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
