"use client";

import React from "react";
import { Grid, Typography, Skeleton, Box, Tooltip, Chip } from "@mui/material";
import SemiTransparentCard from "@/components/Card/SemiTransaprentCard";
import { ContentCopy as CopyIcon } from "@mui/icons-material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import InfoIcon from "@mui/icons-material/InfoOutlined";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import PaymentsIcon from "@mui/icons-material/Payments";
import FactoryIcon from "@mui/icons-material/Factory";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import { useRouter } from "next/navigation";
import { useTheme } from "@mui/system";
import { useUserContext } from "@/context/UserContext";
import ClaimButton from "@/components/Buttons/ClaimButton/ClaimButton";
import { formatNumber } from "@/utils/formatNumber";
import DefaultButton from "@/components/Buttons/DefaultButton/DefaultButton";

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
  const { userRewards, onChainPoints, liveUnclaimedPoints, stakedBees } =
    useUserContext();

  const isConnected = !loadingProfile && profileData && profileData.invite_code;

  // 1) Loading state
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

  // 2) Not connected (no profile)
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
          minHeight: "200px",
        }}
      >
        <Typography variant="h6" color="white" gutterBottom>
          No user is logged in
        </Typography>
        <Typography variant="body1" color="white" sx={{ mb: 3 }}>
          Sign-up or login to view your rewards
        </Typography>
        <DefaultButton
          className="darkBlueButton"
          onClick={() => router.push("/")}
          sx={{ mt: 2 }}
        >
          Go to Home
        </DefaultButton>
      </SemiTransparentCard>
    );
  }

  // 3) Connected: Display rewards in a single big card
  return (
    <Grid container spacing={3} marginBottom={6}>
      <Grid item xs={12}>
        {/* Wrap everything in ONE big card */}
        <SemiTransparentCard sx={{ p: { xs: 2, md: 4 } }}>
          <Grid container spacing={3}>
            {/* Row 1: "Total Rewards" (left) + "Staked Hatchling" (right) */}
            <Grid item xs={12} md={8}>
              {/* Total Rewards (left) */}
              <Box
                sx={{
                  padding: "0 0 24px 0",
                  mb: "12px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  textAlign: "left",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <TrendingUpIcon
                    sx={{
                      color: theme.palette.LightBlue.main,
                      fontSize: "32px",
                    }}
                  />
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: "bold",
                      color: theme.palette.LightBlue.main,
                    }}
                  >
                    Total Rewards
                  </Typography>
                  <Tooltip
                    title={
                      <Typography variant="body1" sx={{ fontSize: "1rem" }}>
                        Total rewards earned throughout Buzzkill Campaigns
                      </Typography>
                    }
                    placement="top"
                    arrow
                  >
                    <InfoIcon
                      sx={{
                        color: theme.palette.LightBlue.main,
                        fontSize: "1.2rem",
                        cursor: "pointer",
                      }}
                    />
                  </Tooltip>
                </Box>

                <Typography
                  variant="h2"
                  fontWeight="bold"
                  sx={{
                    color: theme.palette.Gold.main,
                    lineHeight: 1.2,
                    WebkitTextStroke: "0px",
                    mt: "8px",
                    flexWrap: "wrap",
                  }}
                >
                  {profileData?.total_rewards
                    ? profileData.total_rewards.toLocaleString()
                    : "0"}
                  <Typography
                    variant="h4"
                    component="span"
                    sx={{
                      color: theme.palette.Gold.main,
                      WebkitTextStroke: "0px",
                      ml: "8px",
                    }}
                  >
                    Honey Drops
                  </Typography>
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              {/* Staked Hatchling Yield (right) */}
              <SemiTransparentCard sx={{ height: "100%", p: 3 }}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "8px" }}
                  >
                    <FactoryIcon
                      sx={{
                        color: theme.palette.LightBlue.main,
                        fontSize: "1.25rem",
                      }}
                    />
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                        color: theme.palette.LightBlue.main,
                      }}
                    >
                      Staked Hatchling Yield
                    </Typography>
                    <Tooltip
                      title={
                        <Typography variant="body1" sx={{ fontSize: "1rem" }}>
                          Points earned by staking your Hatchlings inside a hive
                        </Typography>
                      }
                      placement="top"
                      arrow
                    >
                      <InfoIcon
                        sx={{
                          color: theme.palette.LightBlue.main,
                          fontSize: "1.2rem",
                          cursor: "pointer",
                        }}
                      />
                    </Tooltip>
                  </Box>

                  <Tooltip
                    title={`From ${stakedBees.length} staked hatchlings`}
                  >
                    <Typography
                      variant="h4"
                      fontWeight="bold"
                      sx={{
                        color: theme.palette.Gold.main,
                        WebkitTextStroke: "0px",
                        lineHeight: "1.2",
                        mt: "8px",
                      }}
                    >
                      {formatNumber(onChainPoints || 0)}
                      <Typography
                        variant="h6"
                        component="span"
                        sx={{
                          color: theme.palette.Gold.main,
                          ml: "8px",
                          fontSize: "1.25rem",
                        }}
                      >
                        Honey Drops
                      </Typography>
                    </Typography>
                  </Tooltip>
                </Box>
              </SemiTransparentCard>
            </Grid>

            {/* Row 2: Daily Hatchling Yield, Unclaimed Yield, Referral Rewards */}
            <Grid item xs={12}>
              <Grid container spacing={3}>
                {/* Daily Hatchling Yield */}
                <Grid item xs={12} sm={6} md={4}>
                  <SemiTransparentCard sx={{ p: 3 }}>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <TrendingUpIcon
                          sx={{
                            color: theme.palette.LightBlue.main,
                            fontSize: "1.25rem",
                          }}
                        />
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: "bold",
                            color: theme.palette.LightBlue.main,
                          }}
                        >
                          Daily Hatchling Yield
                        </Typography>
                        <Tooltip
                          title={
                            <Typography
                              variant="body1"
                              sx={{ fontSize: "1rem" }}
                            >
                              Daily total yield from all your Hatchlings
                            </Typography>
                          }
                          placement="top"
                          arrow
                        >
                          <InfoIcon
                            sx={{
                              color: theme.palette.LightBlue.main,
                              fontSize: "1.2rem",
                              cursor: "pointer",
                            }}
                          />
                        </Tooltip>
                      </Box>

                      <Tooltip
                        title={`From ${stakedBees.length} staked hatchlings`}
                      >
                        <Typography
                          variant="h4"
                          fontWeight="bold"
                          sx={{
                            color: theme.palette.Gold.main,
                            WebkitTextStroke: "0px",
                            mt: "12px",
                            mb: "6px",
                            lineHeight: "1.2",
                          }}
                        >
                          {formatNumber(
                            Number(userRewards?.totalProduction) || 0
                          )}
                          <Typography
                            variant="h6"
                            component="span"
                            sx={{
                              color: theme.palette.Gold.main,
                              fontSize: "1.2rem",
                              ml: "8px",
                            }}
                          >
                            Honey Drops / Day
                          </Typography>
                        </Typography>
                      </Tooltip>

                      {profileData?.has_oneid && (
                        <Tooltip title="Bonus yield multiplier from having a valid OneID">
                          <Chip
                            label="1.2x OneID Multiplier"
                            icon={
                              <WhatshotIcon
                                sx={{
                                  color: "white",
                                  fontSize: "1.2rem",
                                }}
                              />
                            }
                            sx={{
                              "& .MuiChip-icon": {
                                marginRight: "-12px",
                                color: "white",
                              },
                              backgroundColor: theme.palette.OneIDRed.main,
                              color: "white",
                              fontWeight: "bold",
                              borderRadius: "24px",
                              paddingY: "23px",
                              width: "100%",
                              fontSize: "1.1rem",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              gap: "8px",
                            }}
                          />
                        </Tooltip>
                      )}
                    </Box>
                  </SemiTransparentCard>
                </Grid>

                {/* Unclaimed Yield */}
                <Grid item xs={12} sm={6} md={4}>
                  <SemiTransparentCard sx={{ p: 3 }}>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
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
                          sx={{
                            fontWeight: "bold",
                            color: theme.palette.LightBlue.main,
                          }}
                        >
                          Unclaimed Yield
                        </Typography>
                        <Tooltip
                          title={
                            <Typography
                              variant="body1"
                              sx={{ fontSize: "1rem" }}
                            >
                              Your total Hatchling staking yield that you
                              haven’t claimed yet
                            </Typography>
                          }
                          placement="top"
                          arrow
                        >
                          <InfoIcon
                            sx={{
                              color: theme.palette.LightBlue.main,
                              fontSize: "1.2rem",
                              cursor: "pointer",
                            }}
                          />
                        </Tooltip>
                      </Box>

                      {liveUnclaimedPoints !== undefined ? (
                        <Typography
                          variant="h4"
                          fontWeight="bold"
                          sx={{
                            color: theme.palette.Gold.main,
                            WebkitTextStroke: "0px",
                            mt: "8px",
                            mb: "8px",
                            lineHeight: "1.2",
                          }}
                        >
                          {formatNumber(Math.floor(liveUnclaimedPoints))}
                          <Typography
                            variant="h5"
                            component="span"
                            sx={{
                              color: theme.palette.Gold.main,
                              ml: "8px",
                              WebkitTextStroke: "0px",
                              fontSize: "1.25rem",
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
                          sx={{ mt: "12px" }}
                        />
                      )}
                      <Box sx={{ width: "100%" }}>
                        <ClaimButton
                          liveUnclaimedPoints={liveUnclaimedPoints}
                        />
                      </Box>
                    </Box>
                  </SemiTransparentCard>
                </Grid>

                {/* Referral Rewards */}
                <Grid item xs={12} sm={6} md={4}>
                  <SemiTransparentCard sx={{ p: 3 }}>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
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
                          sx={{
                            fontWeight: "bold",
                            color: theme.palette.LightBlue.main,
                          }}
                        >
                          Referral Rewards
                        </Typography>
                        <Tooltip
                          title={
                            <Typography
                              variant="body1"
                              sx={{ fontSize: "1rem" }}
                            >
                              Invite friends to join. The more you invite, the
                              more points you can earn
                            </Typography>
                          }
                          placement="top"
                          arrow
                        >
                          <InfoIcon
                            sx={{
                              color: theme.palette.LightBlue.main,
                              fontSize: "1.2rem",
                              cursor: "pointer",
                            }}
                          />
                        </Tooltip>
                      </Box>

                      {constants.referralReward !== undefined ? (
                        <Typography
                          variant="h4"
                          fontWeight="bold"
                          sx={{
                            color: theme.palette.Gold.main,
                            WebkitTextStroke: "0px",
                            mt: "8px",
                            mb: "8px",
                            lineHeight: "1.2",
                          }}
                        >
                          {constants.referralReward.toLocaleString()}
                          <Typography
                            variant="h5"
                            component="span"
                            sx={{
                              color: theme.palette.Gold.main,
                              WebkitTextStroke: "0px",
                              ml: "8px",
                              fontSize: "1.25rem",
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
                          sx={{ mt: "12px" }}
                        />
                      )}

                      {profileData?.invite_code ? (
                        <DefaultButton
                          className="blueButton"
                          onClick={copyInviteLink}
                          startIcon={<CopyIcon />}
                          aria-label="Copy invite link and invite friends"
                          sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            textTransform: "none",
                            fontWeight: "bold",
                            fontSize: "1rem",
                            lineHeight: "1.5",
                          }}
                        >
                          Invite Friends
                        </DefaultButton>
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
              </Grid>
            </Grid>
          </Grid>
        </SemiTransparentCard>
      </Grid>
    </Grid>
  );
};

export default UserRewardsBento;
