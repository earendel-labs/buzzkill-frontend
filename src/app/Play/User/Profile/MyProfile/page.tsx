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
import { useTheme } from "@mui/material/styles";
import ProfileLayout from "../../../../../components/Layouts/ProfileLayout/ProfileLayout";
import SemiTransparentCard from "@/components/Card/SemiTransaprentCard";
import { useProfileContext } from "@/context/ProfileContext";
import { OneID } from "@oneid-xyz/inspect";

const ProfileTab = () => {
  const theme = useTheme();
  const {
    profileData,
    loadingProfile,
    savingProfile,
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

  useEffect(() => {
    const initializeOneID = async () => {
      try {
        const oneid = new OneID();
        await oneid.systemConfig.initConfig();
        console.log("OneID initialized successfully.");
      } catch (error) {
        console.error("Error initializing OneID:", error);
      }
    };
    console.log("oneID function call");
    initializeOneID();
  }, []);

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
            padding: "40px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
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
            className="blueConnectWallet" // Use the old setup for styling
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
          padding: 4,
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
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: 2,
                  }}
                >
                  {/* Wallet Address */}
                  <Box sx={{ flex: "1 1 300px" }}>
                    <Typography
                      sx={{ mb: 1, fontWeight: "bold", color: "white" }}
                    >
                      Wallet Address
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: "white", padding: "5px 0px" }}
                    >
                      {profileData.address}
                    </Typography>
                  </Box>

                  {/* OneID Integration */}
                  <Box sx={{ flex: "1 1 300px", textAlign: "left" }}>
                    {profileData.has_oneid ? (
                      <>
                        <Typography
                          sx={{ mb: 1, fontWeight: "bold", color: "white" }}
                        >
                          OneID Name
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
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
                            disabled={savingProfile}
                            startIcon={<LinkIcon />}
                            sx={{
                              textTransform: "none",
                              paddingX: 2,
                              paddingY: 1,
                            }}
                          >
                            {savingProfile ? (
                              <CircularProgress size={24} color="inherit" />
                            ) : (
                              "Sync"
                            )}
                          </Button>
                        </Box>
                      </>
                    ) : (
                      <>
                        <Typography
                          sx={{ mb: 1, fontWeight: "bold", color: "white" }}
                        >
                          OneID
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
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
                            }}
                          >
                            {savingProfile ? (
                              <CircularProgress size={24} color="inherit" />
                            ) : (
                              "Link OneID"
                            )}
                          </Button>
                        </Box>
                      </>
                    )}
                  </Box>
                </Box>
              </Grid>

              {/* Invite Code */}
              <Grid item xs={12} sm={6}>
                <Typography sx={{ mb: 1, fontWeight: "bold", color: "white" }}>
                  Invite Code
                </Typography>
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
                    value={profileData.invite_code}
                    variant="filled"
                    disabled
                    InputProps={{
                      disableUnderline: true,
                    }}
                    sx={{
                      input: {
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
                <Typography sx={{ mb: 1, fontWeight: "bold", color: "white" }}>
                  Users Invited
                </Typography>
                <TextField
                  fullWidth
                  value={profileData.invited_count}
                  variant="filled"
                  disabled
                  sx={{
                    input: {
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
                <Typography sx={{ mb: 1, fontWeight: "bold", color: "white" }}>
                  Account Name
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
                  sx={{
                    input: {
                      color: "white",
                      fontWeight: "bold",
                      background: isEditable
                        ? "#4272ce"
                        : theme.palette.DarkBlueFaded.dark,
                      "&:-webkit-autofill": {
                        WebkitBoxShadow: `0 0 0 100px ${
                          profileData.has_oneid
                            ? theme.palette.DarkBlueFaded.dark
                            : isEditable
                            ? theme.palette.DarkBlueFaded.light
                            : theme.palette.DarkBlueFaded.dark
                        } inset`,
                        WebkitTextFillColor: "white",
                      },
                      "&.Mui-disabled": {
                        WebkitTextFillColor: "white",
                        color: "white",
                        fontSize: "1.25rem",
                      },
                    },
                    "& .MuiFilledInput-root": {
                      backgroundColor: isEditable
                        ? "#4272ce"
                        : theme.palette.DarkBlueFaded.dark,
                      "&:hover": {
                        backgroundColor: isEditable
                          ? "#609de6"
                          : theme.palette.DarkBlueFaded.dark,
                      },
                      "&.Mui-focused": {
                        backgroundColor: isEditable
                          ? "#609de6"
                          : theme.palette.DarkBlueFaded.dark,
                      },
                      "&.Mui-disabled": {
                        backgroundColor: theme.palette.DarkBlueFaded.dark,
                      },
                    },
                  }}
                />
              </Grid>

              {/* Email Address */}
              <Grid item xs={12} sm={6}>
                <Typography sx={{ mb: 1, fontWeight: "bold", color: "white" }}>
                  Email Address
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
                  sx={{
                    input: {
                      color: "white",
                      fontWeight: "bold",
                      background: isEditable
                        ? "#4272ce"
                        : theme.palette.DarkBlueFaded.dark,
                      "&:-webkit-autofill": {
                        WebkitBoxShadow: `0 0 0 100px ${
                          isEditable
                            ? "#4272ce"
                            : theme.palette.DarkBlueFaded.dark
                        } inset`,
                        WebkitTextFillColor: "white",
                      },
                      "&.Mui-disabled": {
                        WebkitTextFillColor: "white",
                        color: "white",
                        fontSize: "1.25rem",
                      },
                    },
                    "& .MuiFilledInput-root": {
                      backgroundColor: isEditable
                        ? "#4272ce"
                        : theme.palette.DarkBlueFaded.dark,
                      "&:hover": {
                        backgroundColor: isEditable
                          ? "#609de6"
                          : theme.palette.DarkBlueFaded.dark,
                      },
                      "&.Mui-focused": {
                        backgroundColor: isEditable
                          ? "#609de6"
                          : theme.palette.DarkBlueFaded.dark,
                      },
                      "&.Mui-disabled": {
                        backgroundColor: theme.palette.DarkBlueFaded.dark,
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
                  gap: 2,
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
