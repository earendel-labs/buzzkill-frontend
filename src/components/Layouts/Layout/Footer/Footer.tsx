"use client";
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material"; // ✅ Corrected import
import Link from "@mui/material/Link";
import SocialIcon from "@/components/Layouts/Layout/Footer/SocialIcons/SocialIcon";

// Import the individual social icons
import DiscordIcon from "/public/Icons/Social/discord.svg";
import TwitterIcon from "/public/Icons/Social/twitter.svg";
import GitbookIcon from "/public/Icons/Social/gitbook.svg";
import MediumIcon from "/public/Icons/Social/medium.svg";

const Footer: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const backgroundColor = theme.palette.FooterBackground.main;
  const Gold = theme.palette.Gold.main;

  return (
    <Box
      component="footer"
      sx={{
        boxSizing: "border-box",
        width: "100%",
        backgroundColor,
        padding: isMobile ? "16px" : "20px",
        display: "flex",
        flexDirection: isTablet ? "column" : "row",
        justifyContent: "space-between",
        alignItems: isTablet ? "center" : "center",
        color: theme.palette.text.primary,
        borderTop: "1px solid #222f4b",
        textAlign: isTablet ? "center" : "left",
      }}
    >
      {/* Copyright section */}
      <Typography
        variant="body2"
        color={Gold}
        sx={{ marginBottom: isTablet ? "8px" : 0 }}
      >
        © 2024 Buzzkill Studios Inc. All rights reserved.
      </Typography>

      {/* Social icons */}
      <Box
        sx={{
          display: "flex",
          gap: isMobile ? "20px" : "32px",
          justifyContent: "center",
          marginY: isTablet ? "12px" : 0,
        }}
      >
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
      <Box
        sx={{
          display: "flex",
          gap: "24px",
          flexDirection: "row",
          alignItems: isMobile ? "center" : "flex-start",
        }}
      >
        <Link href="/TermsOfService" className="linkStyle1">
          Terms of Service
        </Link>
        <Link href="/PrivacyPolicy" className="linkStyle1">
          Privacy Policy
        </Link>
      </Box>
    </Box>
  );
};

export default Footer;
