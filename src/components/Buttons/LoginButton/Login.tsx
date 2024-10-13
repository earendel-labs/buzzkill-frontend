import React, { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import ListItemIcon from "@mui/material/ListItemIcon";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import PowerSettingsNewRoundedIcon from "@mui/icons-material/PowerSettingsNewRounded";
import { useTheme } from "@mui/material/styles";
import Skeleton from "@mui/material/Skeleton";
import CustomAvatar from "@/components/User/CustomAvatar";
import { useRouter } from "next/navigation";

import { signOut } from "next-auth/react";
import { useDisconnect } from "wagmi";

interface LoginButtonProps {
  loginButtonText?: string; // Optional prop for custom button text
  loading?: boolean; // Add loading prop to handle skeleton state
}

const handleNextAuthSignOut = () => {
  signOut({ callbackUrl: "/" });
};

export const LoginButton: React.FC<LoginButtonProps> = ({
  loginButtonText,
  loading = false,
}) => {
  const theme = useTheme(); // Access MUI theme
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const { disconnect } = useDisconnect();

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileNavigation = () => {
    router.push("/Play/User/MyProfile");
  };

  const handleLogout = async () => {
    disconnect(); // Disconnect the RainbowKit wallet

    try {
      signOut({
        callbackUrl: `${window.location.origin}/`,
      });
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
        // Check if component is mounted and authentication status is either authenticated or undefined
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (authenticationStatus === "authenticated" || !authenticationStatus);
        const router = useRouter();

        // Show skeleton loader if the component is not ready or custom loading state is true
        if (!mounted || !ready || loading) {
          return (
            <Skeleton
              variant="rectangular"
              width={180}
              height={50}
              sx={{
                borderRadius: 2,
                backgroundColor: theme.palette.DarkBlue.main,
              }}
            />
          );
        }

        return (
          <Box>
            {!connected ? (
              <Button className="blueButton" onClick={openConnectModal}>
                {loginButtonText || "Sign Up / Login"}
              </Button>
            ) : (
              <Box>
                <Button
                  onClick={handleMenuOpen}
                  variant="contained"
                  sx={{
                    backgroundColor: theme.palette.DarkBlue.main,
                    color: theme.palette.text.primary,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    padding: "8px 16px",
                    minWidth: 200,
                    "&:hover": {
                      backgroundColor: theme.palette.DarkBlue.dark,
                    },
                  }}
                >
                  <CustomAvatar
                    address={account.address}
                    ensImage={account.ensAvatar}
                    size={24}
                  />
                  <Typography
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                      color: theme.palette.text.primary,
                    }}
                  >
                    {account.displayName}
                  </Typography>
                  <ArrowDropDownIcon
                    sx={{
                      color: theme.palette.text.primary,
                      ml: "auto",
                    }}
                  />
                </Button>

                {/* Profile dropdown menu */}
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleMenuClose}
                  PaperProps={{
                    elevation: 4,
                    sx: {
                      backgroundColor: theme.palette.DarkBlue.main,
                      color: theme.palette.text.primary,
                      mt: 0.5,
                      minWidth: 200,
                      "& .MuiAvatar-root": {
                        width: 24,
                        height: 24,
                        ml: -0.5,
                        mr: 1,
                      },
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
                  {/* Account balance */}
                  <MenuItem
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "left",
                      padding: "10px 16px",
                      fontSize: "1.2rem",
                      "&:hover": {
                        backgroundColor: theme.palette.DarkOrange.dark,
                      },
                    }}
                  >
                    <Typography
                      sx={{ textAlign: "left", lineHeight: "1.7rem" }}
                    >
                      Balance: {account.displayBalance}
                    </Typography>
                  </MenuItem>

                  {/* Chain selector */}
                  <MenuItem
                    onClick={openChainModal}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "left",
                      padding: "10px 0px 10px 22px",
                      fontSize: "1.2rem",
                      "&:hover": {
                        backgroundColor: theme.palette.DarkOrange.dark,
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
                        padding: "0px 4px",
                        lineHeight: "1.7rem",
                        fontSize: "1.2rem",
                      }}
                    >
                      {chain.name}
                    </Typography>
                  </MenuItem>

                  {/* Profile Section */}
                  <MenuItem
                    onClick={handleProfileNavigation}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "left",
                      "&:hover": {
                        backgroundColor: theme.palette.DarkOrange.dark,
                      },
                      padding: "10px 16px",
                      fontSize: "1.2rem",
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

                  {/* Settings Option */}
                  <MenuItem
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "left",
                      "&:hover": {
                        backgroundColor: theme.palette.DarkOrange.dark,
                      },
                      padding: "10px 16px",
                      fontSize: "1.2rem",
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

                  {/* Logout button */}
                  <MenuItem
                    onClick={handleLogout}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "left",
                      padding: "10px 16px",
                      fontSize: "1.2rem",
                      "&:hover": {
                        backgroundColor: theme.palette.DarkOrange.main,
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
              </Box>
            )}
          </Box>
        );
      }}
    </ConnectButton.Custom>
  );
};
