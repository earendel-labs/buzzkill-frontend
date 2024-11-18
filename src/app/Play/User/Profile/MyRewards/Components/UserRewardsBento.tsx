"use client";

import React from "react";
import {
  Grid,
  Typography,
  Button,
  Skeleton,
  Box,
  Tooltip,
  Chip,
} from "@mui/material";
import SemiTransparentCard from "@/components/Card/SemiTransaprentCard";
import { ContentCopy as CopyIcon } from "@mui/icons-material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import PaymentsIcon from "@mui/icons-material/Payments";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { useRouter } from "next/navigation";
import { useTheme } from "@mui/system";
import FactoryIcon from "@mui/icons-material/Factory";
import WhatshotIcon from "@mui/icons-material/Whatshot";
interface UserRewardsBentoProps {
  loadingProfile: boolean;
  profileData: {
    has_oneid?: boolean;
    total_rewards?: number;
    invite_code?: string;
  } | null;
  constants: {
    dailyBonus?: number;
    referralReward?: number;
  };
  copyInviteLink: () => void;
}

const UserRewardsBento: React.FC<UserRewardsBentoProps> = ({
  loadingProfile,
  profileData,
  constants,
  copyInviteLink,
}) => {
  const router = useRouter();
  const theme = useTheme();
  const isConnected = !loadingProfile && profileData && profileData.invite_code;

  if (loadingProfile) {
    return (
      <Grid container spacing={3} marginBottom={6}>
        <Grid item xs={12}>
          <SemiTransparentCard
            sx={{
              padding: "40px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Typography variant="h6" color="white" gutterBottom>
              Total Earnings
            </Typography>
            <Skeleton variant="text" width={150} height={60} animation="wave" />
          </SemiTransparentCard>
        </Grid>
      </Grid>
    );
  }

  if (!isConnected) {
    return (
      <SemiTransparentCard
        sx={{
          padding: "40px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          maxWidth: "1200px",
          margin: "24px auto",
        }}
      >
        <Typography variant="h6" color="white" gutterBottom>
          No user is logged in
        </Typography>
        <Typography variant="body1" color="white" sx={{ mb: 3 }}>
          Sign-up or login to view your rewards
        </Typography>
        <Button
          className="blueConnectWallet"
          onClick={() => router.push("/")}
          sx={{ mt: 2 }}
        >
          Go to Home
        </Button>
      </SemiTransparentCard>
    );
  }

  return (
    <Grid container spacing={3} marginBottom={6}>
      {/* Total Earnings Card */}
      <Grid item xs={12}>
        <SemiTransparentCard transparency={0.3} sx={{ padding: "40px" }}>
          <Box
            sx={{
              padding: "2px 2px 24px 12px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              textAlign: "left", // Ensure left-aligned text
            }}
          >
            {/* Title with Icon */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "8px", // Spacing between icon and text
              }}
            >
              <TrendingUpIcon
                sx={{
                  color: theme.palette.LightBlue.main,
                  fontSize: "32px", // Icon size
                }}
              />
              <Typography
                variant="h5"
                component="p"
                sx={{
                  fontWeight: "bold",
                  color: theme.palette.LightBlue.main, // Custom color for Total Earnings text
                }}
              >
                Total Rewards
              </Typography>
            </Box>

            {/* Total Rewards Display */}
            <Typography
              variant="h2" // Larger font size for the number
              component="p"
              fontWeight="bold"
              sx={{
                color: theme.palette.Gold.main, // Custom orange color for the number
                WebkitTextStroke: "0",
                lineHeight: "1.2", // Tighten the spacing
              }}
            >
              {profileData?.total_rewards !== undefined
                ? `${profileData.total_rewards.toLocaleString()}`
                : "0"}
              <Typography
                variant="h4"
                component="span"
                sx={{
                  color: theme.palette.Gold.main, // Custom reddish color for the word "Honey"
                  WebkitTextStroke: "0",
                  marginLeft: "8px", // Space between number and "Honey"
                }}
              >
                Honey Drops
              </Typography>
            </Typography>
          </Box>

          {/* Inner Row for Daily Bonus, Referral Rewards, and Bee Production */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center", // Center horizontally
              alignItems: "flex-end", // Align to the bottom
              height: "100%", // Ensure it uses the full height of the parent
              paddingBottom: 0, // Remove unnecessary spacing at the bottom
            }}
          >
            <Grid
              container
              spacing={4}
              sx={{
                maxWidth: "1200px", // Limit the width to prevent stretching
                justifyContent: "center", // Center horizontally
                padding: 0, // Remove extra padding
              }}
            >
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <SemiTransparentCard
                  shadowTransparency={0}
                  sx={{ height: "100%", p: 3 }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "flex-start", // Left-align content
                      textAlign: "left", // Left-align text
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <PaymentsIcon
                        sx={{
                          color: theme.palette.LightBlue.main,
                          fontSize: "1.25rem",
                        }}
                      />
                      <Typography
                        variant="h6"
                        component="p"
                        sx={{
                          fontWeight: "bold",
                          color: theme.palette.LightBlue.main,
                        }}
                      >
                        Daily Bonus
                      </Typography>
                    </Box>

                    {/* Bonus Amount Display */}
                    {constants.dailyBonus !== undefined ? (
                      <Typography
                        variant="h4"
                        component="p"
                        fontWeight="bold"
                        sx={{
                          color: theme.palette.Gold.main,
                          WebkitTextStroke: "0",
                          lineHeight: "1.2",
                          marginTop: "8px",
                          marginBottom: "8px",
                        }}
                      >
                        {constants.dailyBonus.toLocaleString()}
                        <Typography
                          variant="h5"
                          component="span"
                          sx={{
                            color: theme.palette.Gold.main,
                            WebkitTextStroke: "0",
                            marginLeft: "8px",
                          }}
                        >
                          Honey Drops
                        </Typography>
                      </Typography>
                    ) : (
                      <Skeleton
                        variant="text"
                        width={80}
                        height={40}
                        animation="wave"
                        sx={{ marginTop: "12px" }} // Align the skeleton with the number
                      />
                    )}

                    <Button
                      className="goldButton"
                      onClick={copyInviteLink}
                      startIcon={<EmojiEventsIcon />}
                      aria-label="Claim Daily rewards"
                      sx={{
                        width: "100%",
                        display: "flex", // Ensure the button uses flexbox
                        alignItems: "center", // Align icon and text vertically
                        justifyContent: "center", // Center content horizontally
                        textTransform: "none", // Keep text as-is (no uppercase transformation)
                        fontWeight: "bold", // Ensure bold text
                        fontSize: "1rem", // Text size
                        lineHeight: "1.5", // Proper line height for text alignment
                      }}
                    >
                      Claim Bonus
                    </Button>
                  </Box>
                </SemiTransparentCard>
              </Grid>

              <Grid item xs={12} sm={6} md={4} lg={4}>
                <SemiTransparentCard
                  shadowTransparency={0}
                  sx={{ height: "100%", p: 3 }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "flex-start", // Left-align content
                      textAlign: "left", // Left-align text
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <PersonAddAlt1Icon
                        sx={{
                          color: theme.palette.LightBlue.main,
                          fontSize: "1.25rem",
                        }}
                      />
                      <Typography
                        variant="h6"
                        component="p"
                        sx={{
                          fontWeight: "bold",
                          color: theme.palette.LightBlue.main,
                        }}
                      >
                        Referral Rewards
                      </Typography>
                    </Box>

                    {/* Bonus Amount Display */}
                    {constants.referralReward !== undefined ? (
                      <Typography
                        variant="h4"
                        component="p"
                        fontWeight="bold"
                        sx={{
                          color: theme.palette.Gold.main,
                          WebkitTextStroke: "0",
                          lineHeight: "1.2",
                          marginTop: "8px",
                          marginBottom: "8px",
                        }}
                      >
                        {constants.referralReward.toLocaleString()}
                        <Typography
                          variant="h5"
                          component="span"
                          sx={{
                            color: theme.palette.Gold.main,
                            WebkitTextStroke: "0",
                            marginLeft: "8px",
                          }}
                        >
                          Honey Drops
                        </Typography>
                      </Typography>
                    ) : (
                      <Skeleton
                        variant="text"
                        width={80}
                        height={40}
                        animation="wave"
                        sx={{ marginTop: "12px" }} // Align the skeleton with the number
                      />
                    )}

                    {profileData?.invite_code ? (
                      <Button
                        className="blueConnectWallet"
                        onClick={copyInviteLink}
                        startIcon={<CopyIcon />}
                        aria-label="Copy invite link and invite friends"
                        sx={{
                          width: "100%",
                          display: "flex", // Ensure the button uses flexbox
                          alignItems: "center", // Align icon and text vertically
                          justifyContent: "center", // Center content horizontally
                          textTransform: "none", // Keep text as-is (no uppercase transformation)
                          fontWeight: "bold", // Ensure bold text
                          fontSize: "1rem", // Text size
                          lineHeight: "1.5", // Proper line height for text alignment
                        }}
                      >
                        Invite Friends
                      </Button>
                    ) : (
                      <Skeleton
                        variant="text"
                        width={120}
                        height={40}
                        animation="wave"
                      />
                    )}
                  </Box>
                </SemiTransparentCard>
              </Grid>

              <Grid item xs={12} sm={6} md={4} lg={4}>
                <SemiTransparentCard
                  sx={{ height: "100%", p: 3 }}
                  shadowTransparency={0}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "flex-start", // Left-align content
                      textAlign: "left", // Left-align text
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <FactoryIcon
                        sx={{
                          color: theme.palette.LightBlue.main,
                          fontSize: "1.25rem",
                        }}
                      />
                      <Typography
                        variant="h6"
                        component="p"
                        sx={{
                          fontWeight: "bold",
                          color: theme.palette.LightBlue.main,
                        }}
                      >
                        Bee Production
                      </Typography>
                    </Box>

                    {/* Bonus Amount Display */}
                    <Typography
                      variant="h4"
                      component="p"
                      fontWeight="bold"
                      sx={{
                        color: theme.palette.Gold.main,
                        WebkitTextStroke: "0",
                        lineHeight: "1.2",
                        marginTop: "8px",
                        marginBottom: "8px",
                      }}
                    >
                      150
                      <Typography
                        variant="h5"
                        component="span"
                        sx={{
                          color: theme.palette.Gold.main,
                          WebkitTextStroke: "0",
                          marginLeft: "8px",
                        }}
                      >
                        Honey / Day
                      </Typography>
                    </Typography>

                    {/* OneID Multiplier Chip */}
                    {profileData?.has_oneid && (
                      <Chip
                        label="1.2x OneID Multiplier"
                        icon={
                          <WhatshotIcon
                            sx={{
                              color: "white",
                              fontSize: "1.5rem",
                            }}
                          />
                        }
                        sx={{
                          "& .MuiChip-icon": {
                            marginRight: "-12px", // Override default margin
                            color: "white", // Override default color
                          },
                          backgroundColor: theme.palette.OneIDRed.main,
                          color: "white",
                          fontWeight: "bold",
                          borderRadius: "24px",
                          paddingY: "20px",
                          width: "100%",
                          fontSize: "1.125rem",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      />
                    )}
                  </Box>
                </SemiTransparentCard>
              </Grid>
            </Grid>
          </Box>
        </SemiTransparentCard>
      </Grid>
    </Grid>
  );
};

export default UserRewardsBento;
