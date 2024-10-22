"use client";
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import Link from "@mui/material/Link";
import SocialIcon from "@/components/Layouts/Layout/Footer/SocialIcons/SocialIcon";

// Import the individual social icons
import DiscordIcon from "/public/Icons/Social/discord.svg";
import TwitterIcon from "/public/Icons/Social/twitter.svg";
import GitbookIcon from "/public/Icons/Social/gitbook.svg";
import MediumIcon from "/public/Icons/Social/medium.svg";

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
        padding: "20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: theme.palette.text.primary,
        borderTop: "1px solid #222f4b",
      }}
    >
      {/* Copyright section */}
      <Typography variant="body2" color={Gold}>
        © 2024 Erandel Labs. All rights reserved.
      </Typography>

      {/* Social icons in the center */}
      <Box sx={{ display: "flex", gap: "32px", justifyContent: "center" }}>
        {/* Social icons in the center */}
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

      {/* Links section */}
      <Box sx={{ display: "flex", gap: "24px" }}>
        <Link href="/" className="linkStyle1">
          Privacy Policy
        </Link>
        <Link href="/" className="linkStyle1">
          Terms of Service
        </Link>
      </Box>
    </Box>
  );
};

export default Footer;
