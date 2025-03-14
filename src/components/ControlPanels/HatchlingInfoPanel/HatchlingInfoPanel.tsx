"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Tab, Tabs, List, ListItem, ListItemText, Paper } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Link from "next/link";
import { HatchlingTable } from "./HatchlingTable";
import MiniLeaderboard from "@/app/Play/User/Profile/Components/MyRewards/MiniLeaderboard";
import { useSound } from "@/context/SoundContext"; // Import useSound context

// Define the shape of a leaderboard entry
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
  const contentRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null); // Ref for the panel container

  const { isMuted } = useSound(); // Access the sound context

  // Sound for tab change
  const [tabSwitchSound, setTabSwitchSound] = useState<HTMLAudioElement | null>(
    null
  );
  // Sounds for expanding and collapsing
  const [expandSound, setExpandSound] = useState<HTMLAudioElement | null>(null);
  const [collapseSound, setCollapseSound] = useState<HTMLAudioElement | null>(
    null
  );

  useEffect(() => {
    setTabSwitchSound(new Audio("/Audio/Button/WoodenHover.wav")); // Set tab switch sound
    setExpandSound(new Audio("/Audio/ExpandPages/OpenBox.wav")); // Set expand sound
    setCollapseSound(new Audio("/Audio/ExpandPages/CloseBox.mp3")); // Set collapse sound
  }, []);

  // Handle click outside to collapse the panel
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node)
      ) {
        if (isExpanded) {
          setShowContent(false);
          setTimeout(() => {
            setIsExpanded(false);
            if (!isMuted && collapseSound) {
              collapseSound.currentTime = 0; // Ensure the sound starts fresh each time
              collapseSound.play();
            }
          }, 500);
        }
      }
    },
    [isExpanded, collapseSound, isMuted]
  );

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside]);

  // Toggle expand/collapse for the info panel
  const handleToggle = () => {
    if (isExpanded) {
      setShowContent(false);
      setTimeout(() => {
        setIsExpanded(false);
        if (!isMuted && collapseSound) {
          collapseSound.currentTime = 0; // Ensure the sound starts fresh each time
          collapseSound.play();
        }
      }, 500);
    } else {
      setIsExpanded(true);
      setTimeout(() => {
        setShowContent(true);
        if (!isMuted && expandSound) {
          expandSound.currentTime = 0; // Ensure the sound starts fresh each time
          expandSound.play();
        }
      }, 50);
    }
  };

  // Handle tab changes with sound effect
  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);

    // Play the tab switch sound if not muted
    if (!isMuted && tabSwitchSound) {
      tabSwitchSound.currentTime = 0; // Reset sound to start from the beginning
      tabSwitchSound.play();
    }
  };

  // Data for the hatchling table (assumed to be defined elsewhere)
  const data = [
    { id: 1, rarity: "Common", mintingPoints: 5000, baseDailyYield: 800 },
    { id: 2, rarity: "Rare", mintingPoints: 6000, baseDailyYield: 960 },
    { id: 3, rarity: "Ultra-Rare", mintingPoints: 8000, baseDailyYield: 1200 },
  ];

  // Observe size changes to force a resize of tabs if needed
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

  return (
    <Box
      ref={panelRef} // Add the ref to the panel container
      sx={{
        position: "relative",
        width: isExpanded
          ? "800px"
          : {
              xs: "190px",
              md: "190px",
              xl: "190px",
            },
        height: isExpanded
          ? {
              xs: "100%",
              md: "500px",
              xl: "600px",
              xxl: "800px",
            }
          : "4rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        bgcolor: "rgba(15, 28, 48, 0.85)",
        backdropFilter: "blur(12px)",
        borderRadius: "8px",
        boxShadow: `
          inset 4px 4px 4px rgba(0, 0, 0, 0.25),
          inset 0px 4px 4px rgba(0, 0, 0, 0.15)
        `,
        transition: "width 0.3s ease, height 0.3s ease",
        overflow: "hidden",
        zIndex: 102,
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
      }}
    >
      <Box
        ref={contentRef}
        sx={{
          opacity: showContent ? 1 : 0,
          transition: "opacity 0.5s ease",
          padding: "2rem",
          textAlign: "left",
          color: "white",
          minHeight: "400px",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: "bold",
            fontSize: "2rem",
            color: "#FFD700",
            marginBottom: "1.5rem",
            textAlign: "center",
          }}
        >
          The Hatchling Explorer
        </Typography>

        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          key={resizeKey}
          sx={{
            "& .MuiTabs-flexContainer": {
              justifyContent: "center",
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "#FFD700",
            },
          }}
        >
          <Tab label="Campaign" value="campaign" />
          <Tab label="Hatchlings" value="hatchlings" />
          <Tab label="Explore Nectera" value="explore" />
          <Tab label="Leaderboard" value="leaderboard" />
        </Tabs>

        {selectedTab === "campaign" && (
          <Box sx={{ marginTop: "2rem", padding: "0 2rem" }}>
            <Typography sx={{ marginBottom: "1rem" }}>
              In the thawing world of Nectera, the Buzzkill Hatchlings are
              awakening after millennia of dormancy. Now’s your chance to
              explore the planet and earn Honey Drop Points.
              <br />
              <br />
              1. Mint up to 2 free Hatchlings. <br />
              2. Select your active Hatchling from the panel below. <br />
              3. Explore the map and find your hive. <br />
              4. Stake your Hatchling and earn points based on their rarity.{" "}
              <br />
            </Typography>
          </Box>
        )}

        {selectedTab === "hatchlings" && (
          <Box sx={{ marginTop: "2rem", padding: "0 2rem" }}>
            <Typography sx={{ marginBottom: "1rem" }}>
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
              the rarity the more Honey Drop points your hatchling will yield:
            </Typography>
            <HatchlingTable data={data} />
          </Box>
        )}

        {selectedTab === "explore" && (
          <Box sx={{ marginTop: "2rem", padding: "0 2rem" }}>
            <Typography sx={{ marginBottom: "1rem" }}>
              Stake your hatchling to yield Honey Drop points. Environments will
              launch throughout the campaign. Below are the status of the
              current campaigns:
            </Typography>
            <List
              sx={{
                padding: 0,
                margin: 0,
                listStyleType: "none",
              }}
            >
              <ListItem
                disableGutters
                sx={{
                  padding: "2px 0",
                }}
              >
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
              </ListItem>
              <ListItem
                disableGutters
                sx={{
                  padding: "2px 0",
                }}
              >
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
              </ListItem>
              <ListItem
                disableGutters
                sx={{
                  padding: "2px 0",
                }}
              >
                <ListItemText
                  primary="Azure Reef (320 spots - open)"
                  primaryTypographyProps={{
                    sx: {
                      fontWeight: "bold",
                      color: (theme) => theme.palette.Gold.main,
                    },
                  }}
                />
              </ListItem>
            </List>
          </Box>
        )}

        {selectedTab === "leaderboard" && (
          <Box sx={{ marginTop: "2rem", padding: "0 2rem" }}>
            <Typography sx={{ marginBottom: "1rem" }}>
              Claim your points and view your spot on the leaderboard. Checkout
              the{" "}
              <Link
                href="/HoneyDrops"
                style={{
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                full leaderboard.
              </Link>
            </Typography>
            <MiniLeaderboard />
          </Box>
        )}
      </Box>

      <Button
        onClick={handleToggle}
        sx={{
          color: "#FFD700",
          textTransform: "none",
          fontWeight: "bold",
          borderRadius: "0 0 12px 12px",
          width: "100%",
          height: "4rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 2rem",
          "&:hover": {
            backgroundColor: "rgba(212, 175, 55, 0.2)",
          },
          position: "absolute",
          bottom: 0,
        }}
        endIcon={isExpanded ? <ExpandMoreIcon /> : <ExpandLessIcon />}
      >
        {isExpanded ? "Minimise" : "How to Play"}
      </Button>
    </Box>
  );
};

export default HatchlingInfoPanel;
