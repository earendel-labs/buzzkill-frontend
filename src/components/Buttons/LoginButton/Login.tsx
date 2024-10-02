import React, { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import ListItemIcon from "@mui/material/ListItemIcon";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import PowerSettingsNewRoundedIcon from "@mui/icons-material/PowerSettingsNewRounded";

import { useTheme } from "@mui/material/styles";
import Skeleton from "@mui/material/Skeleton";
import CustomAvatar from "@/components/User/CustomAvatar";
interface LoginButtonProps {
  loginButtonText?: string; // Optional prop for custom button text
  loading?: boolean; // Add loading prop to handle skeleton state
}

export const LoginButton: React.FC<LoginButtonProps> = ({
  loginButtonText,
  loading = false,
}) => {
  const theme = useTheme(); // Access MUI theme
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  if (loading) {
    // Show skeleton loader while loading
    return (
      <Skeleton
        variant="rectangular"
        width={180}
        height={50}
        sx={{
          borderRadius: 4,
          backgroundColor: theme.palette.background.paper,
        }}
      />
    );
  }

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
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
          (!authenticationStatus || authenticationStatus === "authenticated");

        return (
          <Box
            {...(!ready && {
              "aria-hidden": true,
              sx: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {!connected ? (
              <Button className="blueButton" onClick={openConnectModal}>
                {/* Use the prop for custom text, fallback to default */}
                {loginButtonText || "Sign Up / Login"}
              </Button>
            ) : (
              <Box>
                {/* Button to open the profile dropdown */}
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
                  {/* Reuse the custom avatar logic */}
                  <CustomAvatar
                    address={account.address}
                    ensImage={account.ensAvatar}
                    size={24}
                  />
                  <Typography
                    sx={{
                      display: "flex",
                      flexDirection: "column", // Stack items vertically
                      justifyContent: "flex-end", // Push items to the bottom
                      color: theme.palette.text.primary,
                    }}
                  >
                    {account.displayName}
                  </Typography>
                  <ArrowDropDownIcon
                    sx={{
                      color: theme.palette.text.primary,
                      ml: "auto", // Align caret to the right
                    }}
                  />
                </Button>

                {/* Menu for profile dropdown */}
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleMenuClose}
                  PaperProps={{
                    elevation: 4,
                    sx: {
                      backgroundColor: theme.palette.DarkBlue.main, // Updated background to DarkBlue.main
                      color: theme.palette.text.primary, // Text color from MUI theme
                      mt: 0.5, // Tighten space between button and menu
                      minWidth: 200, // Ensure same width as button
                      "& .MuiAvatar-root": {
                        width: 24, // Smaller avatar size in the menu
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
                  {/* Account Balance */}
                  <MenuItem
                    sx={{
                      display: "flex",
                      alignItems: "center", // Ensure vertical alignment
                      justifyContent: "left", // Left justify all content
                      "&:hover": {
                        backgroundColor: theme.palette.DarkOrange.dark, // Hover effect for balance
                      },
                      padding: "10px 16px", // Consistent padding
                      fontSize: "1.2rem", // Font size
                    }}
                  >
                    <Typography
                      sx={{
                        textAlign: "left",
                        lineHeight: "1.7rem", // Set line height to match other items
                      }}
                    >
                      Balance: {account.displayBalance}
                    </Typography>
                  </MenuItem>

                  {/* Chain Selector */}
                  <MenuItem
                    onClick={openChainModal}
                    sx={{
                      display: "flex",
                      alignItems: "center", // Ensure vertical alignment
                      justifyContent: "left", // Left justify content
                      "&:hover": {
                        backgroundColor: theme.palette.DarkOrange.dark, // Hover effect for chain selection
                      },
                      padding: "10px 0px 10px 22px", // Padding
                      fontSize: "1.2rem", // Font size
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
                        alignItems: "center", // Vertically center text
                        padding: "0px 4px",
                        lineHeight: "1.7rem", // Match icon size
                        fontSize: "1.2rem",
                      }}
                    >
                      {chain.name}
                    </Typography>
                  </MenuItem>

                  {/* Profile Section */}
                  <MenuItem
                    sx={{
                      display: "flex",
                      alignItems: "center", // Vertical alignment
                      justifyContent: "left", // Left justify content
                      "&:hover": {
                        backgroundColor: theme.palette.DarkOrange.dark, // Hover effect for profile
                      },
                      padding: "10px 16px", // Uniform padding for all items
                      fontSize: "1.2rem", // Font size
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: "36px",
                        display: "flex",
                        alignItems: "center", // Center icon vertically
                      }}
                    >
                      <AccountCircleIcon
                        sx={{
                          color: theme.palette.Orange.main, // Icon color
                          fontSize: "1.7rem", // Icon size
                        }}
                      />
                    </ListItemIcon>
                    <Typography
                      variant="body1"
                      sx={{
                        display: "flex", // Treat as flex item
                        alignItems: "center", // Vertically center the text
                        lineHeight: "1.7rem", // Match icon size
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
                      alignItems: "center", // Ensure vertical alignment
                      justifyContent: "left", // Left justify content
                      "&:hover": {
                        backgroundColor: theme.palette.DarkOrange.dark, // Hover effect for settings
                      },
                      padding: "10px 16px", // Uniform padding
                      fontSize: "1.2rem", // Font size
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: "36px",
                        display: "flex",
                        alignItems: "center", // Center icon vertically
                      }}
                    >
                      <SettingsIcon
                        sx={{
                          color: theme.palette.Orange.main, // Icon color
                          fontSize: "1.7rem", // Icon size
                        }}
                      />
                    </ListItemIcon>
                    <Typography
                      variant="body1"
                      sx={{
                        display: "flex",
                        alignItems: "center", // Vertically center text
                        lineHeight: "1.7rem", // Match icon size
                        fontSize: "1.2rem",
                      }}
                    >
                      Settings
                    </Typography>
                  </MenuItem>

                  {/* Logout Button */}
                  <MenuItem
                    onClick={openAccountModal}
                    sx={{
                      display: "flex",
                      alignItems: "center", // Ensure vertical alignment
                      justifyContent: "left", // Left justify content
                      "&:hover": {
                        backgroundColor: theme.palette.DarkOrange.main, // Hover effect for Logout
                      },
                      padding: "10px 16px", // Consistent padding
                      fontSize: "1.2rem", // Font size
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: "36px",
                        display: "flex",
                        alignItems: "center", // Center icon vertically
                      }}
                    >
                      <PowerSettingsNewRoundedIcon
                        sx={{
                          color: theme.palette.Orange.main, // Icon color
                          fontSize: "1.7rem", // Icon size
                        }}
                      />
                    </ListItemIcon>
                    <Typography
                      variant="body1"
                      sx={{
                        display: "flex",
                        alignItems: "center", // Vertically center text
                        lineHeight: "1.7rem", // Match icon size
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
