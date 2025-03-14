import React, { useState, useEffect } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  Box,
  Button,
  Avatar,
  Menu,
  MenuItem,
  Typography,
  ListItemIcon,
  Skeleton,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import WaterDropRoundedIcon from "@mui/icons-material/WaterDropRounded";
import SportsEsportsRoundedIcon from "@mui/icons-material/SportsEsportsRounded";
import PowerSettingsNewRoundedIcon from "@mui/icons-material/PowerSettingsNewRounded";
import { useTheme, keyframes } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import { signOut, signIn } from "next-auth/react";
import { useDisconnect } from "wagmi";
import CustomAvatar from "@/components/User/CustomAvatar";
import { useProfileContext } from "@/context/ProfileContext";
import DisconnectDialog from "@/components/Modals/DisconnectDialog/DisconnectDialog";
import { useSound } from "@/context/SoundContext";

const glowPulse = keyframes`
  0% { box-shadow: 0 0 5px rgba(212, 175, 55, 0.5), 0 0 10px rgba(212, 175, 55, 0.3); }
  50% { box-shadow: 0 0 8px rgba(212, 175, 55, 0.7), 0 0 15px rgba(212, 175, 55, 0.5); }
  100% { box-shadow: 0 0 5px rgba(212, 175, 55, 0.5), 0 0 10px rgba(212, 175, 55, 0.3); }
`;

interface LoginButtonProps {
  loginButtonText?: string;
  loading?: boolean;
  isMenu?: boolean;
}

export const LoginButton: React.FC<LoginButtonProps> = ({
  loginButtonText,
  loading = false,
  isMenu = false,
}) => {
  const theme = useTheme();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openDisconnectDialog, setOpenDisconnectDialog] = useState(false);
  const open = Boolean(anchorEl);

  const { isMuted } = useSound();
  const [hoverSound, setHoverSound] = useState<HTMLAudioElement | null>(null);
  const [clickSound, setClickSound] = useState<HTMLAudioElement | null>(null);

  const { profileData, loadingProfile } = useProfileContext();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    setHoverSound(new Audio("/Audio/Button/LoginButton/LoginHover.mp3"));
    setClickSound(new Audio("/Audio/Button/LoginButton/LoginPressed.mp3"));
  }, []);

  const handleMouseEnter = () => {
    if (!isMuted && hoverSound) {
      hoverSound.currentTime = 0;
      hoverSound.play();
    }
  };

  const handleMouseDown = () => {
    if (!isMuted && clickSound) {
      clickSound.currentTime = 0;
      clickSound.play();
    }
  };

  const handleMenuItemMouseEnter = () => {
    if (!isMuted && hoverSound) {
      hoverSound.currentTime = 0;
      hoverSound.play();
    }
  };

  const handleMenuItemMouseDown = () => {
    if (!isMuted && clickSound) {
      clickSound.currentTime = 0;
      clickSound.play();
    }
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleOpenDisconnectDialog = () => {
    setOpenDisconnectDialog(true);
  };

  const handleCloseDisconnectDialog = () => {
    setOpenDisconnectDialog(false);
  };

  const handleProfileNavigation = () => {
    router.push("/Play/User/Profile/MyProfile");
  };

  const handleMyBeesNavigation = () => {
    router.push("/Play/User/Profile/MyBees");
  };

  const handleMyRewardsNavigation = () => {
    router.push("/Play/User/Profile/MyRewards");
  };

  const handleLogout = async () => {
    disconnect();
    try {
      signOut({ callbackUrl: `${window.location.origin}/?loggingOut=true` });
    } catch (error) {
      console.error("Error during sign out:", error);
    }
  };

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (authenticationStatus === "authenticated" || !authenticationStatus);
        const isLoading = !mounted || !ready || loading || loadingProfile;

        if (isLoading) {
          return (
            <Skeleton
              variant="rectangular"
              width={180}
              height={55}
              sx={{
                borderRadius: 1,
                backgroundColor: theme.palette.DarkBlue.main,
              }}
            />
          );
        }

        const handleConnect = async () => {
          if (account) {
            await signIn("credentials", {
              address: account.address,
            });
          }
          openConnectModal();
        };

        if (!connected) {
          return (
            <Button
              className="blueButton"
              onClick={handleConnect}
              onMouseEnter={handleMouseEnter}
              onMouseDown={handleMouseDown}
            >
              {loginButtonText || "Sign Up / Login"}
            </Button>
          );
        }

        return (
          <Box>
            <Button
              onClick={isMenu ? handleOpenDisconnectDialog : handleMenuOpen}
              variant="contained"
              className="blueConnectWallet"
              sx={{
                backgroundColor: theme.palette.DarkBlue.main,
                boxShadow: "none",
                color: theme.palette.text.primary,
                borderRadius: open ? "6px 6px 0 0" : "6px",
                borderBottomWidth: open ? "0" : "1.25px",
                borderBottomStyle: open ? "none" : "solid",
                display: "flex",
                alignItems: "center",
                gap: 1,
                padding: "8px 16px",
                minWidth: isMenu ? 150 : 210,
                "&:hover": {
                  backgroundColor: theme.palette.DarkBlue.dark,
                },
              }}
              onMouseEnter={handleMouseEnter}
              onMouseDown={handleMouseDown}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <CustomAvatar
                  address={account.address}
                  ensImage={account.ensAvatar}
                  size={24}
                />

                {/* Use fontSize instead of textSize */}
                <Typography
                  component="div"
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                    lineHeight: 1.0,
                    ml: 1.5,
                    fontSize: "1rem", // or any size you want, e.g. "1.2rem"
                    color: "white",
                  }}
                >
                  {profileData && profileData.account_name
                    ? profileData.account_name
                    : account.displayName}
                </Typography>
              </Box>

              {!isMenu && (
                <ArrowDropDownIcon
                  sx={{
                    color: theme.palette.text.primary,
                    ml: "auto",
                  }}
                />
              )}
            </Button>

            {!isMenu && (
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                // Updated styling below:
                PaperProps={{
                  elevation: 2,
                  sx: {
                    backgroundColor: "rgba(27, 72, 245, 0.8)",
                    borderRadius: "0 0 6px 6px",
                    borderColor: "rgba(14, 28, 106, 0.9)",
                    borderWidth: "1.5px",
                    borderTopStyle: "none",
                    minWidth: "210px",
                    color: theme.palette.text.primary,
                    mt: 0,
                    padding: "0px 1px",
                  },
                }}
                transformOrigin={{
                  horizontal: "right",
                  vertical: "top",
                }}
                anchorOrigin={{
                  horizontal: "right",
                  vertical: "bottom",
                }}
              >
                {/* Common hover styles for each MenuItem */}
                {/* These replicate the moving 'shine' and color shift for icons */}
                <MenuItem
                  onMouseEnter={handleMenuItemMouseEnter}
                  onMouseDown={handleMenuItemMouseDown}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "left",
                    position: "relative",
                    overflow: "hidden",
                    padding: "10px 16px",
                    fontSize: "1.2rem",
                    transition: "all 0.3s ease",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: "-100%",
                      width: "100%",
                      height: "100%",
                      background:
                        "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
                      transition: "left 0.8s ease",
                    },
                    "&:hover::before": {
                      left: "100%",
                    },
                    "&:hover": {
                      backgroundColor: "rgba(208, 46, 0, 0.9)",
                      boxShadow:
                        "0 0 8px rgba(213, 98, 23, 0.7), 0 0 15px rgba(213, 98, 23, 0.5)",
                      "& svg": {
                        color: "#fff",
                      },
                    },
                  }}
                >
                  <Typography sx={{ textAlign: "left", lineHeight: "1.7rem" }}>
                    Balance: {account.displayBalance}
                  </Typography>
                </MenuItem>

                <MenuItem
                  onClick={openChainModal}
                  onMouseEnter={handleMenuItemMouseEnter}
                  onMouseDown={handleMenuItemMouseDown}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "left",
                    position: "relative",
                    overflow: "hidden",
                    padding: "10px 0px 10px 18px",
                    fontSize: "1.2rem",
                    transition: "all 0.3s ease",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: "-100%",
                      width: "100%",
                      height: "100%",
                      background:
                        "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
                      transition: "left 0.8s ease",
                    },
                    "&:hover::before": {
                      left: "100%",
                    },
                    "&:hover": {
                      backgroundColor: "rgba(208, 46, 0, 0.9)",
                      boxShadow:
                        "0 0 8px rgba(213, 98, 23, 0.7), 0 0 15px rgba(213, 98, 23, 0.5)",
                      "& svg": {
                        color: "#fff",
                      },
                    },
                  }}
                >
                  {chain.hasIcon && (
                    <Avatar
                      src={chain.iconUrl}
                      alt={chain.name ?? "Chain icon"}
                      sx={{
                        width: "22px !important",
                        height: "22px !important",
                        backgroundColor: chain.iconBackground,
                      }}
                    />
                  )}
                  <Typography
                    variant="body1"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      padding: "0px 10px",
                      lineHeight: "1.7rem",
                      fontSize: "1.2rem",
                    }}
                  >
                    {chain.name}
                  </Typography>
                </MenuItem>

                <MenuItem
                  onClick={handleProfileNavigation}
                  onMouseEnter={handleMenuItemMouseEnter}
                  onMouseDown={handleMenuItemMouseDown}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "left",
                    position: "relative",
                    overflow: "hidden",
                    padding: "10px 16px",
                    fontSize: "1.2rem",
                    transition: "all 0.3s ease",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: "-100%",
                      width: "100%",
                      height: "100%",
                      background:
                        "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
                      transition: "left 0.8s ease",
                    },
                    "&:hover::before": {
                      left: "100%",
                    },
                    "&:hover": {
                      backgroundColor: "rgba(208, 46, 0, 0.9)",
                      boxShadow:
                        "0 0 8px rgba(213, 98, 23, 0.7), 0 0 15px rgba(213, 98, 23, 0.5)",
                      "& svg": {
                        color: "#fff",
                      },
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: "36px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <AccountCircleIcon
                      sx={{
                        color: theme.palette.Orange.main,
                        fontSize: "1.7rem",
                      }}
                    />
                  </ListItemIcon>
                  <Typography
                    variant="body1"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      lineHeight: "1.7rem",
                      fontSize: "1.2rem",
                    }}
                  >
                    My Profile
                  </Typography>
                </MenuItem>

                <MenuItem
                  onClick={handleMyBeesNavigation}
                  onMouseEnter={handleMenuItemMouseEnter}
                  onMouseDown={handleMenuItemMouseDown}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "left",
                    position: "relative",
                    overflow: "hidden",
                    padding: "10px 16px",
                    fontSize: "1.2rem",
                    transition: "all 0.3s ease",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: "-100%",
                      width: "100%",
                      height: "100%",
                      background:
                        "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
                      transition: "left 0.8s ease",
                    },
                    "&:hover::before": {
                      left: "100%",
                    },
                    "&:hover": {
                      backgroundColor: "rgba(208, 46, 0, 0.9)",
                      boxShadow:
                        "0 0 8px rgba(213, 98, 23, 0.7), 0 0 15px rgba(213, 98, 23, 0.5)",
                      "& svg": {
                        color: "#fff",
                      },
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: "36px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <SportsEsportsRoundedIcon
                      sx={{
                        color: theme.palette.Orange.main,
                        fontSize: "1.7rem",
                      }}
                    />
                  </ListItemIcon>
                  <Typography
                    variant="body1"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      lineHeight: "1.7rem",
                      fontSize: "1.2rem",
                    }}
                  >
                    My Bees
                  </Typography>
                </MenuItem>

                <MenuItem
                  onClick={handleMyRewardsNavigation}
                  onMouseEnter={handleMenuItemMouseEnter}
                  onMouseDown={handleMenuItemMouseDown}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "left",
                    position: "relative",
                    overflow: "hidden",
                    padding: "10px 16px",
                    fontSize: "1.2rem",
                    transition: "all 0.3s ease",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: "-100%",
                      width: "100%",
                      height: "100%",
                      background:
                        "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
                      transition: "left 0.8s ease",
                    },
                    "&:hover::before": {
                      left: "100%",
                    },
                    "&:hover": {
                      backgroundColor: "rgba(208, 46, 0, 0.9)",
                      boxShadow:
                        "0 0 8px rgba(213, 98, 23, 0.7), 0 0 15px rgba(213, 98, 23, 0.5)",
                      "& svg": {
                        color: "#fff",
                      },
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: "36px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <WaterDropRoundedIcon
                      sx={{
                        color: theme.palette.Orange.main,
                        fontSize: "1.7rem",
                      }}
                    />
                  </ListItemIcon>
                  <Typography
                    variant="body1"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      lineHeight: "1.7rem",
                      fontSize: "1.2rem",
                    }}
                  >
                    My Rewards
                  </Typography>
                </MenuItem>

                <MenuItem
                  onMouseEnter={handleMenuItemMouseEnter}
                  onMouseDown={handleMenuItemMouseDown}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "left",
                    position: "relative",
                    overflow: "hidden",
                    padding: "10px 16px",
                    fontSize: "1.2rem",
                    transition: "all 0.3s ease",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: "-100%",
                      width: "100%",
                      height: "100%",
                      background:
                        "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
                      transition: "left 0.8s ease",
                    },
                    "&:hover::before": {
                      left: "100%",
                    },
                    "&:hover": {
                      backgroundColor: "rgba(208, 46, 0, 0.9)",
                      boxShadow:
                        "0 0 8px rgba(213, 98, 23, 0.7), 0 0 15px rgba(213, 98, 23, 0.5)",
                      "& svg": {
                        color: "#fff",
                      },
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: "36px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <SettingsIcon
                      sx={{
                        color: theme.palette.Orange.main,
                        fontSize: "1.7rem",
                      }}
                    />
                  </ListItemIcon>
                  <Typography
                    variant="body1"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      lineHeight: "1.7rem",
                      fontSize: "1.2rem",
                    }}
                  >
                    Settings
                  </Typography>
                </MenuItem>

                <MenuItem
                  onClick={handleLogout}
                  onMouseEnter={handleMenuItemMouseEnter}
                  onMouseDown={handleMenuItemMouseDown}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "left",
                    position: "relative",
                    overflow: "hidden",
                    padding: "10px 16px",
                    fontSize: "1.2rem",
                    transition: "all 0.3s ease",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: "-100%",
                      width: "100%",
                      height: "100%",
                      background:
                        "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
                      transition: "left 0.8s ease",
                    },
                    "&:hover::before": {
                      left: "100%",
                    },
                    "&:hover": {
                      backgroundColor: "rgba(208, 46, 0, 0.9)",
                      boxShadow:
                        "0 0 8px rgba(213, 98, 23, 0.7), 0 0 15px rgba(213, 98, 23, 0.5)",
                      "& svg": {
                        color: "#fff",
                      },
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: "36px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <PowerSettingsNewRoundedIcon
                      sx={{
                        color: theme.palette.Orange.main,
                        fontSize: "1.7rem",
                      }}
                    />
                  </ListItemIcon>
                  <Typography
                    variant="body1"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      lineHeight: "1.7rem",
                      fontSize: "1.2rem",
                    }}
                  >
                    Logout
                  </Typography>
                </MenuItem>
              </Menu>
            )}

            {isMenu && (
              <DisconnectDialog
                open={openDisconnectDialog}
                onClose={handleCloseDisconnectDialog}
                onDisconnect={handleLogout}
              />
            )}
          </Box>
        );
      }}
    </ConnectButton.Custom>
  );
};
