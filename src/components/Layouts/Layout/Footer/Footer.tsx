"use client";
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import Link from "@mui/material/Link";
import SocialIcon from "@/components/Layouts/Layout/Footer/SocialIcons/SocialIcon";

// Import social icons
import DiscordIcon from "/public/Icons/Social/discord.svg";
import TwitterIcon from "/public/Icons/Social/twitter.svg";
import GitbookIcon from "/public/Icons/Social/gitbook.svg";
import MediumIcon from "/public/Icons/Social/medium.svg";

const Footer: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Only for extra small screens
  const isTablet = useMediaQuery(theme.breakpoints.down("md")); // sm and md screens

  const backgroundColor = theme.palette.FooterBackground.main;
  const Gold = theme.palette.Gold.main;

  return (
    <Box
      component="footer"
      sx={{
        boxSizing: "border-box",
        width: "100%",
        backgroundColor,
        padding: { xs: "12px", md: "14px", lg: "20px" }, // Increased padding for better spacing
        display: "flex",
        flexDirection: isMobile ? "column" : "row", // Stack only on mobile (xs)
        justifyContent: isTablet ? "space-around" : "space-between", // Center elements in sm/md
        alignItems: "center",
        color: theme.palette.text.primary,
        backdropFilter: "blur(10px)",
        borderTop: "1px solid #222f4b",
        textAlign: "center",
        flexWrap: "wrap", // Allows better fitting when near md breakpoint
        gap: isMobile ? "2px" : "4px", // Increased spacing between sections for mobile
      }}
    >
      {/* Copyright section */}
      <Typography
        variant="body2"
        color={Gold}
        sx={{ marginBottom: isMobile ? "12px" : 0 }} // Added margin for better spacing
      >
        © 2024 Buzzkill Studios Inc.
      </Typography>

      {/* Social icons */}
      <Box
        sx={{
          display: "flex",
          gap: isMobile ? "24px" : isTablet ? "24px" : "32px",
          justifyContent: "center",
          flexWrap: "wrap", // Allows them to wrap naturally if needed
          marginBottom: isMobile ? "12px" : 0, // More spacing between sections on mobile
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
          gap: isMobile ? "24px" : isTablet ? "20px" : "24px", // More spacing on mobile
          flexDirection: "row",
          alignItems: "center",
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
