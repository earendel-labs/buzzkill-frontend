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
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"; // Dropdown caret icon
import { useTheme } from "@mui/material/styles";
import Skeleton from "@mui/material/Skeleton";

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
                    backgroundColor: theme.palette.DarkBlue.main, // Button background
                    color: theme.palette.text.primary,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    padding: "8px 16px", // Make it feel more like a button with padding
                    minWidth: 200, // Ensure a consistent width
                    "&:hover": {
                      backgroundColor: theme.palette.DarkBlue.dark, // Darken on hover
                    },
                  }}
                >
                  <Avatar
                    alt={account.displayName}
                    src={account.ensAvatar}
                    sx={{
                      width: 24, // Smaller avatar size
                      height: 24,
                    }}
                  />
                  <Typography sx={{ color: theme.palette.text.primary }}>
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
                        backgroundColor: theme.palette.DarkOrange.dark, // Updated hover effect for balance
                      },
                      padding: "10px 16px", // Consistent padding
                      fontSize: "1.2rem", // Increase font size
                    }}
                  >
                    <Typography sx={{ textAlign: "left" }}>
                      Balance: {account.displayBalance}
                    </Typography>
                  </MenuItem>

                  {/* Profile Section */}
                  <MenuItem
                    sx={{
                      display: "flex",
                      alignItems: "center", // Ensure vertical alignment
                      justifyContent: "left", // Left justify all content
                      "&:hover": {
                        backgroundColor: theme.palette.DarkOrange.dark, // Updated hover effect for menu items
                      },
                      fontSize: "1.2rem", // Increase font size for profile
                      padding: "10px 16px", // Uniform padding for all items
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: "36px" }}>
                      <AccountCircleIcon
                        sx={{
                          color: theme.palette.Orange.main, // Updated icon color
                          fontSize: "1.7rem", // Make icon larger
                        }}
                      />
                    </ListItemIcon>
                    <Typography variant="body1" sx={{ fontSize: "1.2rem" }}>
                      My Profile
                    </Typography>
                  </MenuItem>

                  {/* Settings Option */}
                  <MenuItem
                    sx={{
                      display: "flex",
                      alignItems: "center", // Ensure vertical alignment
                      justifyContent: "left", // Left justify all content
                      "&:hover": {
                        backgroundColor: theme.palette.DarkOrange.dark, // Updated hover effect for settings
                      },
                      padding: "10px 16px", // Consistent padding
                      fontSize: "1.2rem", // Increase font size
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: "36px" }}>
                      <SettingsIcon
                        sx={{
                          color: theme.palette.Orange.main, // Updated icon color
                          fontSize: "1.7rem", // Make icon larger
                        }}
                      />
                    </ListItemIcon>
                    <Typography variant="body1" sx={{ fontSize: "1.2rem" }}>
                      Settings
                    </Typography>
                  </MenuItem>

                  {/* Chain Selector */}
                  <MenuItem
                    onClick={openChainModal}
                    sx={{
                      display: "flex",
                      alignItems: "center", // Ensure vertical alignment
                      justifyContent: "left", // Left justify all content
                      "&:hover": {
                        backgroundColor: theme.palette.DarkOrange.dark, // Updated hover effect for chain selection
                      },
                      padding: "10px 0px 10px 22px", // Consistent padding
                      fontSize: "1.2rem", // Increase font size
                    }}
                  >
                    {chain.hasIcon && (
                      <Avatar
                        src={chain.iconUrl}
                        alt={chain.name ?? "Chain icon"}
                        sx={{
                          width: 12, // Consistent smaller avatar size
                          height: 12,
                          backgroundColor: chain.iconBackground,
                        }}
                      />
                    )}
                    <Typography
                      variant="body1"
                      sx={{ padding: "0px 3px", fontSize: "1.2rem" }}
                    >
                      {chain.name}
                    </Typography>
                  </MenuItem>

                  {/* Logout Button */}
                  <MenuItem
                    onClick={openAccountModal}
                    sx={{
                      display: "flex",
                      alignItems: "center", // Ensure vertical alignment
                      justifyContent: "left", // Left justify all content
                      "&:hover": {
                        backgroundColor: theme.palette.DarkOrange.main, // Updated selection color for Logout
                      },
                      padding: "10px 16px", // Consistent padding
                      fontSize: "1.2rem", // Increase font size
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: "36px" }}>
                      <LogoutIcon
                        sx={{
                          color: theme.palette.Orange.main, // Use Orange color for Logout icon
                          fontSize: "1.7rem", // Make icon larger
                        }}
                      />
                    </ListItemIcon>
                    <Typography variant="body1" sx={{ fontSize: "1.2rem" }}>
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
