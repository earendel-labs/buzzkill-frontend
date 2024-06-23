"use client";
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import Link from "@mui/material/Link";
const Footer: React.FC = () => {
  const theme = useTheme();
  const backgroundColor = theme.palette.FooterBackground.main;
  const Gold = theme.palette.Gold.main;

  return (
    <Box
      component="footer"
      sx={{
        boxSizing: "border-box",
        width: "100%",
        backgroundColor: backgroundColor,
        padding: "30px 20px 20px 20px",
        display: "flex",
        flexDirection: "column",
        color: theme.palette.text.primary,
        borderTop: "1px solid #222f4b",
      }}
    >
      {/* Row for logo and social icons */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        {/* Logo section */}
        <Box sx={{ textAlign: "center" }}>
          <img
            src="/Logos/buzzkill-logo-nav.png"
            alt="Logo"
            style={{ height: "20px" }}
          />
        </Box>

        {/* Social icons */}
        <Box sx={{ display: "flex", gap: "10px" }}></Box>
      </Box>

      {/* Copyright and links row */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          padding: "10px 0 0 0",
        }}
      >
        <Typography variant="body2" color={Gold}>
          © 2024 Erandel Labs. All rights reserved.
        </Typography>
        <Box sx={{ display: "flex", gap: "48px" }}>
          <Link href="/" className="linkStyle1">
            Privacy Policy
          </Link>
          <Link href="/" className="linkStyle1">
            Terms of Service
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
