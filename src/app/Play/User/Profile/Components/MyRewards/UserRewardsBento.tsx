"use client";

import React from "react";
import {
  Grid,
  Typography,
 
  Skeleton,
  Box,
  Tooltip,
  Chip,
} from "@mui/material";
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
  const isConnected = !loadingProfile && profileData && profileData.invite_code;
  const { userRewards, onChainPoints, liveUnclaimedPoints, stakedBees } =
    useUserContext();

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

  return (
    <Grid container spacing={3} marginBottom={6}>
      {/* Total Earnings Card */}
      <Grid item xs={12}>
        <SemiTransparentCard transparency={0.3} sx={{ padding: "40px" }}>
          <Grid item xs={12}>
            {/* Wrap both sections in a Grid container so they're on the same row */}
            <Grid container spacing={2} alignItems="flex-start">
              <Grid item xs={12} sm={6} md={6} lg={8.1}>
                <Box
                  sx={{
                    padding: "2px 2px 24px 12px",
                    marginBottom: "28px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    textAlign: "left",
                  }}
                >
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
                        fontSize: "32px",
                      }}
                    />
                    <Typography
                      variant="h5"
                      component="p"
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
                    component="p"
                    fontWeight="bold"
                    sx={{
                      color: theme.palette.Gold.main,
                      WebkitTextStroke: "0",
                      lineHeight: "1.2",
                    }}
                  >
                    {profileData?.total_rewards !== undefined
                      ? `${profileData.total_rewards.toLocaleString()}`
                      : "0"}
                    <Typography
                      variant="h4"
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
                </Box>
              </Grid>

              <Grid item xs={12} sm={6} md={6} lg={3.9}>
                <SemiTransparentCard
                  sx={{ height: "100%", p: 3 }}
                  shadowTransparency={0}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "flex-start",
                      textAlign: "left",
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
                        Staked Hatchling Yield
                      </Typography>
                      <Tooltip
                        title={
                          <Typography variant="body1" sx={{ fontSize: "1rem" }}>
                            Points earned by staking your Hatchlings inside a
                            hive
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
                          lineHeight: "1.2",
                          WebkitTextStroke: "0",
                          marginTop: "8px",
                          marginBottom: "8px",
                        }}
                      >
                        {formatNumber(onChainPoints || 0)}
                        <Typography
                          variant="h6"
                          component="span"
                          sx={{
                            color: theme.palette.Gold.main,
                            fontSize: "1.75rem",
                            WebkitTextStroke: "0",
                            marginLeft: "8px",
                          }}
                        >
                          Honey Drops
                        </Typography>
                      </Typography>
                    </Tooltip>
                  </Box>
                </SemiTransparentCard>
              </Grid>
            </Grid>
          </Grid>

          {/* Row for Daily Hatchling Yield, Unclaimed Yield, Referral Rewards, Staked Hatchling Yield */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
              height: "100%",
              paddingBottom: 0,
            }}
          >
            <Grid
              container
              spacing={4}
              sx={{
                maxWidth: "1200px",
                justifyContent: "center",
                padding: 0,
              }}
            >
              {/* Daily Hatchling Yield */}
              <Grid item xs={12} sm={6} md={3} lg={4}>
                <SemiTransparentCard
                  sx={{ height: "100%", p: 3 }}
                  shadowTransparency={0}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "flex-start",
                      textAlign: "left",
                    }}
                  >
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
                        component="p"
                        sx={{
                          fontWeight: "bold",
                          color: theme.palette.LightBlue.main,
                        }}
                      >
                        Daily Hatchling Yield
                      </Typography>
                      <Tooltip
                        title={
                          <Typography variant="body1" sx={{ fontSize: "1rem" }}>
                            Daily total yield per day from all your Hatchlings
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
                          lineHeight: "1.2",
                          marginTop: "12px",
                          WebkitTextStroke: "0",
                          marginBottom: "12px",
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
                            WebkitTextStroke: "0",
                            fontSize: "1.4rem",
                            marginLeft: "8px",
                          }}
                        >
                          Honey Drops / Day
                        </Typography>
                      </Typography>
                    </Tooltip>

                    {profileData?.has_oneid && (
                      <Tooltip
                        title={`Bonus Hatchling yield multiplier from having a valid OneID`}
                      >
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
              <Grid item xs={12} sm={6} md={3} lg={4}>
                <SemiTransparentCard
                  shadowTransparency={0}
                  sx={{ height: "100%", p: 3 }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "flex-start",
                      textAlign: "left",
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
                        Unclaimed Yield
                      </Typography>
                      <Tooltip
                        title={
                          <Typography variant="body1" sx={{ fontSize: "1rem" }}>
                            This is your total Hatchling staking yield that you
                            haven't claimed yet
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
                        {formatNumber(Math.floor(liveUnclaimedPoints))}
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
                        sx={{ marginTop: "12px" }}
                      />
                    )}
                    <Box sx={{ width: "100%" }}>
                      <ClaimButton liveUnclaimedPoints={liveUnclaimedPoints} />
                    </Box>
                  </Box>
                </SemiTransparentCard>
              </Grid>

              {/* Referral Rewards */}
              <Grid item xs={12} sm={6} md={3} lg={4}>
                <SemiTransparentCard
                  shadowTransparency={0}
                  sx={{ height: "100%", p: 3 }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "flex-start",
                      textAlign: "left",
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
                      <Tooltip
                        title={
                          <Typography variant="body1" sx={{ fontSize: "1rem" }}>
                            Invite friends to join and mint. The more you
                            invite, the more points you can earn
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
                        sx={{ marginTop: "12px" }}
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
                          alignItems: "center",
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
          </Box>
        </SemiTransparentCard>
      </Grid>
    </Grid>
  );
};

export default UserRewardsBento;
