// src/components/ProfileTab/ProfileTab.tsx

"use client";

import React, { useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { ContentCopy as CopyIcon, Link as LinkIcon } from "@mui/icons-material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";

import { useTheme } from "@mui/material/styles";
import ProfileLayout from "../Components/ProfileLayout/ProfileLayout";
import SemiTransparentCard from "@/components/Card/SemiTransaprentCard";
import { useProfileContext } from "@/context/ProfileContext";
import { OneID } from "@oneid-xyz/inspect";

const ProfileTab = () => {
  const theme = useTheme();
  const {
    profileData,
    loadingProfile,
    savingProfile,
    syncDelay,
    isEditable,
    setIsEditable,
    handleInputChange,
    handleSubmit,
    handleCancelEdit,
    copyInviteLink,
    handleSyncOneID,
    error,
    helperText,
  } = useProfileContext();

  if (loadingProfile) {
    return (
      <ProfileLayout loading={true}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <CircularProgress />
        </Box>
      </ProfileLayout>
    );
  }

  // Handle case when profileData is null (user not authenticated)
  if (!profileData) {
    return (
      <ProfileLayout loading={false}>
        <SemiTransparentCard
          sx={{
            padding: "60px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            marginTop: "20px",
            width: "100%", // Ensure it spans full width
          }}
        >
          <Typography variant="h6" color="white" gutterBottom>
            No user is logged in
          </Typography>
          <Typography variant="body1" color="white" sx={{ mb: 3 }}>
            Sign-up or login to view your profile
          </Typography>
          <Button
            className="darkBlueButton" 
            onClick={() => (window.location.href = "/")} // Redirect to home
            sx={{ mt: 2 }}
          >
            Go to Home
          </Button>
        </SemiTransparentCard>
      </ProfileLayout>
    );
  }

  return (
    <ProfileLayout loading={false}>
      <Box
        sx={{
          padding: { xs: 2, lg: 2, xxl: 6 },
          borderRadius: "8px",
          width: "100%",
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        <SemiTransparentCard sx={{ padding: "30px 50px 40px 50px" }}>
          <Box component="form" onSubmit={handleSubmit}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ textAlign: "center", mb: 3, fontWeight: "bold" }}
            >
              My Profile
            </Typography>

            <Grid container spacing={4}>
              {/* Wallet Address and OneID Integration */}
              <Grid item xs={12} sm={6}>
                {/* Wallet Address */}
                <Box sx={{ flex: "1 1 300px" }}>
                  <Typography
                    component="div"
                    sx={{
                      mb: 1,
                      fontWeight: "bold",
                      color: "white",
                      display: "flex",
                      alignItems: "flex-end",
                    }}
                  >
                    <AccountBalanceWalletIcon
                      sx={{ color: "white", marginRight: 1, marginBottom: 1 }}
                    />
                    <Box
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        mb: 1,
                        lineHeight: 1.0,
                      }}
                    >
                      Wallet Address
                    </Box>
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: "white", padding: "5px 0px" }}
                  >
                    {profileData.address}
                  </Typography>
                </Box>
              </Grid>
              {/* OneID Integration */}
              <Grid item xs={12} sm={6}>
                <Box sx={{ flex: "1 1 300px", textAlign: "left" }}>
                  <Typography
                    component="div"
                    sx={{
                      mb: 1.4,
                      fontWeight: "bold",
                      color: "white",
                      display: "flex",
                      alignItems: "flex-end",
                    }}
                  >
                    <FingerprintIcon
                      sx={{
                        color: "white",
                        fontSize: "24px",
                        marginRight: 1,
                      }}
                    />
                    <Box
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        lineHeight: 1.0, // Adjust line height for better alignment
                      }}
                    >
                      OneID Name
                    </Box>
                  </Typography>
                  {profileData.has_oneid ? (
                    <>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: 2,
                        }}
                      >
                        <Typography variant="body1" sx={{ color: "white" }}>
                          {profileData.oneid_name}
                        </Typography>
                        <Button
                          variant="contained"
                          className="oneIDRedButton"
                          onClick={handleSyncOneID}
                          disabled={savingProfile || syncDelay} // Disable during saving or delay
                          startIcon={<LinkIcon />}
                          sx={{
                            textTransform: "none",
                            paddingX: 2,
                            paddingY: 1,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {savingProfile ? <>Syncing...</> : "Sync OneID"}
                        </Button>
                      </Box>
                    </>
                  ) : (
                    <>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        <Typography variant="body1" sx={{ color: "white" }}>
                          OneID is not linked.
                        </Typography>
                        <Button
                          variant="contained"
                          className="blueButtonSmall"
                          onClick={handleSyncOneID}
                          disabled={savingProfile}
                          startIcon={<LinkIcon />}
                          sx={{
                            textTransform: "none",
                            paddingX: 2,
                            paddingY: 1,
                            display: "flex",
                            alignItems: "center",
                            
                            justifyContent: "center",
                          }}
                        >
                          {savingProfile ? (
                            <>
                              <CircularProgress
                                size={20}
                                color="inherit"
                                sx={{ marginRight: 1 }}
                              />
                              Syncing...
                            </>
                          ) : (
                            "Link OneID"
                          )}
                        </Button>
                      </Box>
                    </>
                  )}
                </Box>
              </Grid>

              {/* Invite Code */}
              <Grid item xs={12} sm={6}>
                <Typography
                  component="div"
                  sx={{
                    mb: 1,
                    fontWeight: "bold",
                    color: "white",
                    display: "flex",
                    alignItems: "flex-end",
                  }}
                >
                  <PersonAddAlt1Icon
                    sx={{ color: "white", fontSize: "24px", marginRight: 1 }}
                  />
                  <Box
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      lineHeight: 1.0, // Adjust line height for better alignment
                    }}
                  >
                    Invite Code
                  </Box>
                </Typography>{" "}
                <Box
                  onClick={copyInviteLink}
                  sx={{
                    display: "flex",
                    alignItems: "stretch",
                    border: `1px solid ${theme.palette.DarkBlueFaded.dark}`,
                    borderRadius: "4px",
                    overflow: "hidden",
                    width: "100%",
                    cursor: "pointer",
                  }}
                >
                  <TextField
                    fullWidth
                    value={`${window.location.origin}/?invite=${profileData.invite_code}`}
                    variant="filled"
                    disabled
                    InputProps={{
                      disableUnderline: true,
                    }}
                    sx={{
                      input: {
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        color: "white",
                        fontWeight: "bold",
                        backgroundColor: theme.palette.DarkBlueFaded.dark,
                        padding: "0.5rem",
                        borderRadius: "2px 0 0 2px",
                        pointerEvents: "none",
                        "&.Mui-disabled": {
                          WebkitTextFillColor: "white",
                          fontSize: "1.25rem",
                          color: "white",
                          paddingLeft: 1,
                        },
                      },
                      "& .MuiFilledInput-root": {
                        backgroundColor: theme.palette.DarkBlueFaded.dark,
                        borderRadius: "4px 0 0 4px",
                      },
                    }}
                  />
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      copyInviteLink();
                    }}
                    sx={{
                      backgroundColor: theme.palette.DarkBlue.dark,
                      borderRadius: "0 2px 2px 0",
                      "&:hover": {
                        backgroundColor: "#568cdb",
                      },
                    }}
                  >
                    <CopyIcon sx={{ color: "white" }} />
                  </IconButton>
                </Box>
              </Grid>

              {/* Users Invited */}
              <Grid item xs={12} sm={6}>
                <Typography
                  component="div"
                  sx={{
                    mb: 1,
                    fontWeight: "bold",
                    color: "white",
                    display: "flex",
                    alignItems: "flex-end",
                  }}
                >
                  <GroupIcon
                    sx={{ color: "white", fontSize: "24px", marginRight: 1 }}
                  />
                  <Box
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      lineHeight: 1.0, // Adjust line height for better alignment
                    }}
                  >
                    Users Invited
                  </Box>
                </Typography>
                <TextField
                  fullWidth
                  value={profileData.invited_count}
                  variant="filled"
                  disabled
                  sx={{
                    input: {
                      borderRadius: "6px",
                      color: "white",
                      fontWeight: "bold",
                      background: theme.palette.DarkBlueFaded.dark,
                      "&.Mui-disabled": {
                        WebkitTextFillColor: "white",
                        fontSize: "1.25rem",
                        color: "white",
                        paddingLeft: 1,
                      },
                    },
                    "& .MuiFilledInput-root": {
                      "&.Mui-focused, &:hover, &.Mui-disabled": {},
                    },
                  }}
                />
              </Grid>

              {/* Account Name */}
              <Grid item xs={12} sm={6}>
                <Typography
                  component="div"
                  sx={{
                    mb: 1,
                    fontWeight: "bold",
                    color: "white",
                    display: "flex",
                    alignItems: "flex-end",
                  }}
                >
                  <PersonIcon
                    sx={{ color: "white", fontSize: "24px", marginRight: 1 }}
                  />
                  <Box
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      lineHeight: 1.0, // Adjust line height for better alignment
                    }}
                  >
                    Account Name
                  </Box>
                </Typography>
                <TextField
                  fullWidth
                  name="account_name"
                  value={profileData.account_name}
                  onChange={handleInputChange}
                  placeholder="Enter your account name"
                  variant="filled"
                  disabled={!isEditable}
                  error={error}
                  helperText={error ? helperText : ""}
                  InputProps={{
                    disableUnderline: true, // Remove default underline
                  }}
                  sx={{
                    input: {
                      color: "white",
                      fontWeight: "bold",
                      fontSize: isEditable ? "1.3rem" : "1.25rem", // Larger text in editable state
                      borderRadius: "6px",
                      backgroundColor: isEditable
                        ? theme.palette.DarkBlueFaded.light // Lighter background when editable
                        : theme.palette.DarkBlueFaded.dark, // Default background
                      "&:-webkit-autofill": {
                        WebkitBoxShadow: `0 0 0 100px ${
                          isEditable
                            ? theme.palette.DarkBlueFaded.light
                            : theme.palette.DarkBlueFaded.dark
                        } inset`,
                        WebkitTextFillColor: "white",
                      },
                      "&.Mui-disabled": {
                        WebkitTextFillColor: "white",
                        color: "white",
                      },
                    },
                    "& .MuiFilledInput-root": {
                      borderRadius: "6px", // Rounded corners
                      border: `1px solid ${
                        isEditable
                          ? theme.palette.DarkBlueFaded.light
                          : "transparent"
                      }`,
                      backgroundColor: isEditable
                        ? theme.palette.DarkBlueFaded.light // Lighter editable background
                        : theme.palette.DarkBlueFaded.dark,
                      transition:
                        "background-color 0.2s ease, border-color 0.2s ease",
                      "&:hover": {
                        borderColor: isEditable ? "#609de6" : "transparent",
                      },
                      "&.Mui-focused": {
                        borderColor: "#568cdb",
                        outline: "none",
                      },
                      "&.Mui-disabled": {
                        backgroundColor: theme.palette.DarkBlueFaded.dark,
                        borderColor: "transparent",
                      },
                    },
                  }}
                />
              </Grid>

              {/* Email Address */}
              <Grid item xs={12} sm={6}>
                <Typography
                  component="div"
                  sx={{
                    mb: 1,
                    fontWeight: "bold",
                    color: "white",
                    display: "flex",
                    alignItems: "flex-end",
                  }}
                >
                  <EmailIcon
                    sx={{ color: "white", fontSize: "24px", marginRight: 1 }}
                  />
                  <Box
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      lineHeight: 1.0, // Adjust line height for better alignment
                    }}
                  >
                    Email Address
                  </Box>
                </Typography>
                <TextField
                  fullWidth
                  name="email_address"
                  value={profileData.email_address}
                  onChange={handleInputChange}
                  variant="filled"
                  type="email"
                  placeholder="Enter your email address"
                  disabled={!isEditable}
                  error={error}
                  helperText={error ? helperText : ""}
                  InputProps={{
                    disableUnderline: true, // Remove default underline
                  }}
                  sx={{
                    input: {
                      color: "white",
                      fontWeight: "bold",
                      fontSize: isEditable ? "1.3rem" : "1.25rem", // Larger text in editable state
                      borderRadius: "6px", // Consistent rounded corners
                      backgroundColor: isEditable
                        ? theme.palette.DarkBlueFaded.light // Lighter background when editable
                        : theme.palette.DarkBlueFaded.dark, // Default background
                      "&:-webkit-autofill": {
                        WebkitBoxShadow: `0 0 0 100px ${
                          isEditable
                            ? theme.palette.DarkBlueFaded.light
                            : theme.palette.DarkBlueFaded.dark
                        } inset`,
                        WebkitTextFillColor: "white",
                      },
                      "&.Mui-disabled": {
                        WebkitTextFillColor: "white",
                        color: "white",
                      },
                    },
                    "& .MuiFilledInput-root": {
                      borderRadius: "6px", // Rounded corners
                      border: `1px solid ${
                        isEditable
                          ? theme.palette.DarkBlueFaded.light
                          : "transparent"
                      }`,
                      backgroundColor: isEditable
                        ? theme.palette.DarkBlueFaded.light // Lighter editable background
                        : theme.palette.DarkBlueFaded.dark,
                      transition:
                        "background-color 0.2s ease, border-color 0.2s ease",
                      "&:hover": {
                        borderColor: isEditable ? "#609de6" : "transparent",
                      },
                      "&.Mui-focused": {
                        borderColor: "#568cdb",
                        outline: "none",
                      },
                      "&.Mui-disabled": {
                        backgroundColor: theme.palette.DarkBlueFaded.dark,
                        borderColor: "transparent",
                      },
                    },
                  }}
                />
              </Grid>

              {/* Action Buttons */}
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 4,
                }}
              >
                <Button
                  className="blueButton"
                  onClick={
                    isEditable ? handleCancelEdit : () => setIsEditable(true)
                  }
                  sx={{
                    flex: 1,
                    paddingY: 1.5,
                  }}
                >
                  {isEditable ? "Cancel Edit" : "Edit Profile"}
                </Button>
                <Button
                  className="blueButton"
                  type="submit"
                  disabled={!isEditable || savingProfile}
                  sx={{
                    flex: 1,
                    paddingY: 1.5,
                  }}
                >
                  {savingProfile ? "Saving..." : "Save Changes"}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </SemiTransparentCard>
      </Box>
    </ProfileLayout>
  );
};

export default ProfileTab;
