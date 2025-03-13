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
import WaterDropRoundedIcon from "@mui/icons-material/WaterDropRounded";
import SportsEsportsRoundedIcon from "@mui/icons-material/SportsEsportsRounded";
import PowerSettingsNewRoundedIcon from "@mui/icons-material/PowerSettingsNewRounded";
import { useTheme } from "@mui/material/styles";
import Skeleton from "@mui/material/Skeleton";
import CustomAvatar from "@/components/User/CustomAvatar";
import { useRouter } from "next/navigation";
import { signOut, signIn } from "next-auth/react";
import { useDisconnect } from "wagmi";
import { useProfileContext } from "@/context/ProfileContext";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import DisconnectDialog from "@/components/Modals/DisconnectDialog/DisconnectDialog";

interface LoginButtonProps {
  loginButtonText?: string;
  loading?: boolean;
  isMenu?: boolean; // If true, hide down arrow and use disconnect popup
}

export const LoginButton: React.FC<LoginButtonProps> = ({
  loginButtonText,
  loading = false,
  isMenu = false,
}) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openDisconnectDialog, setOpenDisconnectDialog] = useState(false);
  const open = Boolean(anchorEl);
  const router = useRouter();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
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

  const { disconnect } = useDisconnect();

  const handleLogout = async () => {
    disconnect();
    try {
      signOut({
        callbackUrl: `${window.location.origin}/?loggingOut=true`,
      });
    } catch (error) {
      console.error("Error during sign out:", error);
    }
  };

  const handleOpenDisconnectDialog = () => {
    setOpenDisconnectDialog(true);
  };

  const handleCloseDisconnectDialog = () => {
    setOpenDisconnectDialog(false);
  };

  const { profileData, loadingProfile } = useProfileContext();

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

        return (
          <Box>
            {!connected ? (
              <Button className="blueButton" onClick={handleConnect}>
                {loginButtonText || "Sign Up / Login"}
              </Button>
            ) : (
              <Box>
                <Button
                  onClick={isMenu ? handleOpenDisconnectDialog : handleMenuOpen}
                  variant="contained"
                  className="blueConnectWallet"
                  sx={{
                    elevation: 0,
                    backgroundColor: theme.palette.DarkBlue.main,
                    boxShadow: "none",
                    borderColor: open ? "#2e447a  !important" : "white",
                    color: theme.palette.text.primary,
                    borderRadius: open ? "6px 6px 0 0" : "6px",
                    borderBottomWidth: open ? "0px" : "1.25px",
                    borderBottomStyle: open ? "none" : "solid",
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
                    {profileData && profileData.account_name
                      ? profileData.account_name
                      : account.displayName}
                  </Typography>
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
                    PaperProps={{
                      elevation: 2,
                      sx: {
                        backgroundColor: theme.palette.DarkBlue.main,
                        borderRadius: "0px 0px 6px 6px",
                        borderColor: "#2e447a",
                        borderWidth: "1.5px",
                        borderTopStyle: "none",
                        minWidth: "210px",
                        color: theme.palette.text.primary,
                        mt: -1,
                        padding: "0px 1px",
                        "& .MuiAvatar-root": {
                          width: 24,
                          height: 24,
                          ml: 0,
                          mb: 1,
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
                    <MenuItem
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
                      <Typography
                        sx={{ textAlign: "left", lineHeight: "1.7rem" }}
                      >
                        Balance: {account.displayBalance}
                      </Typography>
                    </MenuItem>
                    <MenuItem
                      onClick={openChainModal}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "left",
                        padding: "10px 0px 10px 18px",
                        fontSize: "1.2rem",
                        "&:hover": {
                          backgroundColor: theme.palette.DarkOrange.main,
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
                    <MenuItem
                      onClick={handleProfileNavigation}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "left",
                        "&:hover": {
                          backgroundColor: theme.palette.DarkOrange.main,
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
                    <MenuItem
                      onClick={handleMyBeesNavigation}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "left",
                        "&:hover": {
                          backgroundColor: theme.palette.DarkOrange.main,
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
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "left",
                        "&:hover": {
                          backgroundColor: theme.palette.DarkOrange.main,
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
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "left",
                        "&:hover": {
                          backgroundColor: theme.palette.DarkOrange.main,
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
                )}

                {isMenu && (
                  <DisconnectDialog
                    open={openDisconnectDialog}
                    onClose={handleCloseDisconnectDialog}
                    onDisconnect={handleLogout}
                  />
                )}
              </Box>
            )}
          </Box>
        );
      }}
    </ConnectButton.Custom>
  );
};
