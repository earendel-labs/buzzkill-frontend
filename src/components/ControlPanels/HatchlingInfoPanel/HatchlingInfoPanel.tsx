// rest of your imports here

"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  Tab,
  Tabs,
  List,
  ListItem,
  ListItemText,
  IconButton,
  useMediaQuery,
  SxProps,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import { HatchlingTable } from "./HatchlingTable";
import MiniLeaderboard from "@/app/Play/User/Profile/Components/MyRewards/MiniLeaderboard";
import { useSound } from "@/context/SoundContext";
import DefaultButton from "@/components/Buttons/DefaultButton/DefaultButton";
import { useTheme } from "@mui/material/styles";

interface LeaderboardEntry {
  rank: number;
  address: string;
  points: number;
}

const HatchlingInfoPanel: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [selectedTab, setSelectedTab] = useState("campaign");
  const [resizeKey, setResizeKey] = useState(0);
  const [isMobileFullScreen, setIsMobileFullScreen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const { isMuted } = useSound();

  const [tabSwitchSound, setTabSwitchSound] = useState<HTMLAudioElement | null>(
    null
  );
  const [expandSound, setExpandSound] = useState<HTMLAudioElement | null>(null);
  const [collapseSound, setCollapseSound] = useState<HTMLAudioElement | null>(
    null
  );

  useEffect(() => {
    setTabSwitchSound(new Audio("/Audio/Button/WoodenHover.wav"));
    setExpandSound(new Audio("/Audio/ExpandPages/OpenBox.wav"));
    setCollapseSound(new Audio("/Audio/ExpandPages/CloseBox.mp3"));
  }, []);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node) &&
        !isMobile
      ) {
        if (isExpanded) {
          setShowContent(false);
          setTimeout(() => {
            setIsExpanded(false);
            if (!isMuted && collapseSound) {
              collapseSound.currentTime = 0;
              collapseSound.play();
            }
          }, 500);
        }
      }
    },
    [isExpanded, collapseSound, isMuted, isMobile]
  );

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside]);

  const handleToggle = () => {
    if (isMobile) {
      if (isMobileFullScreen) {
        setShowContent(false);
        setTimeout(() => {
          setIsMobileFullScreen(false);
          if (!isMuted && collapseSound) {
            collapseSound.currentTime = 0;
            collapseSound.play();
          }
        }, 500);
      } else {
        setIsMobileFullScreen(true);
        setTimeout(() => {
          setShowContent(true);
          if (!isMuted && expandSound) {
            expandSound.currentTime = 0;
            expandSound.play();
          }
        }, 50);
      }
    } else {
      if (isExpanded) {
        setShowContent(false);
        setTimeout(() => {
          setIsExpanded(false);
          if (!isMuted && collapseSound) {
            collapseSound.currentTime = 0;
            collapseSound.play();
          }
        }, 500);
      } else {
        setIsExpanded(true);
        setTimeout(() => {
          setShowContent(true);
          if (!isMuted && expandSound) {
            expandSound.currentTime = 0;
            expandSound.play();
          }
        }, 50);
      }
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
    if (!isMuted && tabSwitchSound) {
      tabSwitchSound.currentTime = 0;
      tabSwitchSound.play();
    }
  };

  const data = [
    { id: 1, rarity: "Common", mintingPoints: 5000, baseDailyYield: 800 },
    { id: 2, rarity: "Rare", mintingPoints: 6000, baseDailyYield: 960 },
    { id: 3, rarity: "Ultra-Rare", mintingPoints: 8000, baseDailyYield: 1200 },
  ];

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      setResizeKey((prevKey) => prevKey + 1);
    });
    if (contentRef.current) {
      resizeObserver.observe(contentRef.current);
    }
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (isExpanded) {
      setTimeout(() => {
        setResizeKey((prev) => prev + 1);
      }, 600);
    }
  }, [isExpanded]);

  const containerStyles: SxProps =
    isMobile && isMobileFullScreen
      ? {
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          bgcolor: "rgba(15, 28, 48, 0.85)",
          backdropFilter: "blur(12px)",
          borderRadius: 0,
          zIndex: 102,
          transition: "all 0.3s ease",
          overflow: "auto",
        }
      : {
          position: "relative",
          width: isExpanded
            ? { sm: "100%", md: "98vw", lg: "900px" }
            : { sm: "53px", md: "170px", lg: "170px", xl: "190px" },
          height: isExpanded
            ? {
                sm: "200px",
                md: "67vh",
                lg: "530px",
                xl: "600px",
                xxl: "800px",
              }
            : {
                sm: "3rem",
                md: "4rem",
                lg: "4rem",
                xl: "4rem",
                xxl: "4rem",
              },
          bgcolor: "rgba(15, 28, 48, 0.85)",
          backdropFilter: "blur(12px)",
          borderRadius: "8px",
          boxShadow:
            "inset 4px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 4px 4px rgba(0, 0, 0, 0.15)",
          transition: "width 0.3s ease, height 0.3s ease",
          overflow: "hidden",
          zIndex: 999999,
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            borderRadius: "inherit",
            background:
              "linear-gradient(135deg, #FFD700 10%, #E9B743 50%, #C88036 90%)",
            padding: "2px",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            zIndex: -1,
          },
        };

  return (
    <Box ref={panelRef} sx={containerStyles}>
      <Box
        ref={contentRef}
        sx={{
          opacity: showContent ? 1 : 0,
          transition: "opacity 0.5s ease",
          padding: { sm: "1.3rem", lg: "2rem" },
          textAlign: "left",
          color: "white",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: "bold",
            fontSize: "2rem",
            color: "#FFD700",
            marginBottom: { sm: "1rem", lg: "1.5rem" },
            textAlign: "center",
          }}
        >
          The Hatchling Explorer
        </Typography>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          key={resizeKey}
          variant={isSmallScreen ? "scrollable" : "standard"}
          scrollButtons={isSmallScreen ? "auto" : false}
          sx={{
            "& .MuiTabs-flexContainer": {
              justifyContent: "center",
              gap: isMediumScreen ? "4px" : "8px",
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "#FFD700",
            },
            "& .MuiTab-root": {
              fontSize: isSmallScreen
                ? "12px"
                : isMediumScreen
                ? "14px"
                : "16px",
              minWidth: isSmallScreen
                ? "70px"
                : isMediumScreen
                ? "100px"
                : "120px",
              padding: isSmallScreen ? "1px" : isMediumScreen ? "0px" : "6px",
            },
          }}
        >
          <Tab label="Campaign" value="campaign" />
          <Tab label="Hatchlings" value="hatchlings" />
          <Tab label="Explore Nectera" value="explore" />
          <Tab label="Leaderboard" value="leaderboard" />
        </Tabs>
        {selectedTab === "campaign" && (
          <Box
            sx={{
              marginTop: { sm: "1.3rem", md: "0.7rem", lg: "2rem" },
              padding: "0 2rem",
            }}
          >
            <Typography
              sx={{
                marginBottom: "1rem",
                fontSize: {
                  xs: "14px",
                  sm: "15px",
                  md: "16px",
                  lg: "inherit",
                },
              }}
            >
              In the thawing world of Nectera, the Buzzkill Hatchlings are
              awakening after millennia of dormancy. Now’s your chance to
              explore the planet and earn Honey Drop Points.
              <br />
              <br />
              1. Mint up to 2 free Hatchlings.
              <br />
              2. Select your active Hatchling from the panel below.
              <br />
              3. Explore the map and find your hive.
              <br />
              4. Stake your Hatchling and earn points based on their rarity.
            </Typography>
          </Box>
        )}
        {selectedTab === "hatchlings" && (
          <Box
            sx={{
              marginTop: {
                xs: "1rem",
                sm: "1rem",
                md: "1rem",
                lg: "2rem",
              },
              padding: "0 2rem",
            }}
          >
            <Typography
              sx={{
                marginBottom: {
                  sm: "0.1rem",
                  md: "0.25rem",
                  lg: "1rem",
                },
                fontSize: {
                  xs: "14px",
                  sm: "15px",
                  md: "16px",
                  lg: "inherit",
                },
              }}
            >
              You can{" "}
              <Link
                href="/mint"
                style={{
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                Mint
              </Link>{" "}
              up to 2 Hatchlings per wallet. There are 3 rarities. The higher
              the rarity the more Honey Drop points you earn
            </Typography>
            <HatchlingTable data={data} />
          </Box>
        )}
        {selectedTab === "explore" && (
          <Box sx={{ marginTop: "1rem", padding: "0 2rem" }}>
            <Typography
              sx={{
                marginBottom: "1rem",
                fontSize: {
                  xs: "14px",
                  sm: "15px",
                  md: "16px",
                  lg: "inherit",
                },
              }}
            >
              Stake your hatchling to yield Honey Drop points. Environments will
              launch throughout the campaign. Below are the status of the
              current campaigns:
            </Typography>
            <Box
              component="ul"
              sx={{ padding: 0, margin: 0, listStyle: "none" }}
            >
              <Box component="li" sx={{ padding: "1px 0" }}>
                <ListItemText
                  primary={
                    <Link
                      href="/Play/Location/WhisperwoodValleys"
                      style={{
                        textDecoration: "none",
                        color: "inherit",
                      }}
                    >
                      Whisperwood Valley (240 spots - open)
                    </Link>
                  }
                  primaryTypographyProps={{
                    sx: {
                      fontWeight: "bold",
                      color: (theme) => theme.palette.Gold.main,
                    },
                  }}
                />
              </Box>
              <Box component="li" sx={{ padding: "1px 0" }}>
                <ListItemText
                  primary={
                    <Link
                      href="/Play/Location/WhisperwoodValleys"
                      style={{
                        textDecoration: "none",
                        color: "inherit",
                      }}
                    >
                      Molten Ridge (240 spots - open)
                    </Link>
                  }
                  primaryTypographyProps={{
                    sx: {
                      fontWeight: "bold",
                      color: (theme) => theme.palette.Gold.main,
                    },
                  }}
                />
              </Box>
              <Box component="li" sx={{ padding: "2px 0" }}>
                <ListItemText
                  primary="Azure Reef (320 spots - open)"
                  primaryTypographyProps={{
                    sx: {
                      fontWeight: "bold",
                      color: (theme) => theme.palette.Gold.main,
                    },
                  }}
                />
              </Box>
            </Box>
          </Box>
        )}
        {selectedTab === "leaderboard" && (
          <Box
            sx={{
              marginTop: {
                xs: "1rem",
                sm: "1rem",
                md: "1rem",
                lg: "2rem",
              },
              padding: "0 2rem",
            }}
          >
            <Typography
              sx={{
                marginBottom: "0.75rem",
                fontSize: {
                  xs: "14px",
                  sm: "15px",
                  md: "16px",
                  lg: "inherit",
                },
              }}
            >
              Claim your points and view your spot on the leaderboard. Checkout
              the{" "}
              <Link
                href="/HoneyDrops"
                style={{
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                full leaderboard here.
              </Link>
            </Typography>
            <MiniLeaderboard />
          </Box>
        )}
      </Box>

      {/* The key fix is below. 
          We rely on startIcon for mobile with no text, 
          and handle text vs. icon with simpler logic. 
      */}
      <DefaultButton
        onClick={handleToggle}
        sx={{
          color: "#FFD700",
          textTransform: "none",
          fontWeight: "bold",
          borderRadius: isMobile ? "0" : "0 0 12px 12px",
          width: "100%",
          height: isMobile ? "3.1rem" : "4rem",
          display: "flex",
          alignItems: "center",
          justifyContent: isMobile ? "center" : "space-between",
          padding: isMobile ? "0rem" : "0 2rem",
          "&:hover": {
            backgroundColor: "rgba(212, 175, 55, 0.2)",
          },
          position: isMobile ? "fixed" : "absolute",
          bottom: 0,
        }}
        // Show the bulb icon if mobile and not expanded, otherwise show the expand icon if mobile and expanded
        startIcon={
          isMobile ? (
            isExpanded ? (
              <ExpandMoreIcon />
            ) : (
              <EmojiObjectsIcon />
            )
          ) : undefined
        }
        // Keep the desktop arrow icons on the right
        endIcon={
          !isMobile ? (
            isExpanded ? (
              <ExpandMoreIcon />
            ) : (
              <ExpandLessIcon />
            )
          ) : undefined
        }
      >
        {
          // Decide what text to show depending on mobile/expanded
          isMobile && isExpanded
            ? "Minimise" 
            : !isMobile && isExpanded
            ? "Minimise"
            : !isMobile && !isExpanded
            ? "How to Play"
            : ""
        }
      </DefaultButton>
    </Box>
  );
};

export default HatchlingInfoPanel;
