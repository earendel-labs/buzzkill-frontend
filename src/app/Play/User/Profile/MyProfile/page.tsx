// src/components/ProfileTab/ProfileTab.tsx
"use client";

import React from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { ContentCopy as CopyIcon } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import ProfileLayout from "../../../../../components/Layouts/ProfileLayout/ProfileLayout";
import SemiTransparentCard from "@/components/Card/SemiTransaprentCard";
import { useProfileContext } from "@/context/ProfileContext";

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
              sx={{ textAlign: "center", mb: 1, fontWeight: "bold" }}
            >
              My Profile
            </Typography>

            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Typography sx={{ mb: 1, fontWeight: "bold", color: "white" }}>
                  Wallet Address
                </Typography>
                <Typography variant="body1" sx={{ color: "white" }}>
                  {profileData.address}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography sx={{ mb: 1, fontWeight: "bold", color: "white" }}>
                  Invite Code
                </Typography>
                <Box
                  onClick={copyInviteLink}
                  sx={{
                    display: "flex",
                    alignItems: "stretch",
                    border: `1px solid ${theme.palette.DarkBlue.light}`,
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
                        backgroundColor: theme.palette.DarkBlue.light,
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
                        backgroundColor: theme.palette.DarkBlue.light,
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

              <Grid item xs={6}>
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
                      background: theme.palette.background.default,
                      "&.Mui-disabled": {
                        WebkitTextFillColor: "white",
                        fontSize: "1.25rem",
                        color: "white",
                        paddingLeft: 1,
                      },
                    },
                    "& .MuiFilledInput-root": {
                      backgroundColor: theme.palette.Gold.light,
                      "&.Mui-focused, &:hover, &.Mui-disabled": {
                        backgroundColor: theme.palette.Gold.light,
                      },
                    },
                  }}
                />
              </Grid>

              <Grid item xs={6}>
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
                        : theme.palette.background.default,
                      "&:-webkit-autofill": {
                        WebkitBoxShadow: `0 0 0 100px ${
                          isEditable
                            ? "#4272ce"
                            : theme.palette.background.default
                        } inset`,
                        WebkitTextFillColor: "white",
                      },
                      "&.Mui-disabled": {
                        WebkitTextFillColor: "white",
                        fontSize: "1.25rem",
                        color: "white",
                      },
                    },
                    "& .MuiFilledInput-root": {
                      backgroundColor: isEditable
                        ? "#4272ce"
                        : theme.palette.background.default,
                      "&:hover": {
                        backgroundColor: isEditable
                          ? "#609de6"
                          : theme.palette.background.default,
                      },
                      "&.Mui-focused": {
                        backgroundColor: isEditable
                          ? "#609de6"
                          : theme.palette.background.default,
                      },
                      "&.Mui-disabled": {
                        backgroundColor: theme.palette.background.default,
                      },
                    },
                  }}
                />
              </Grid>

              <Grid item xs={6}>
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
                        : theme.palette.background.default,
                      "&:-webkit-autofill": {
                        WebkitBoxShadow: `0 0 0 100px ${
                          isEditable
                            ? "#4272ce"
                            : theme.palette.background.default
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
                        : theme.palette.background.default,
                      "&:hover": {
                        backgroundColor: isEditable
                          ? "#609de6"
                          : theme.palette.background.default,
                      },
                      "&.Mui-focused": {
                        backgroundColor: isEditable
                          ? "#609de6"
                          : theme.palette.background.default,
                      },
                      "&.Mui-disabled": {
                        backgroundColor: theme.palette.background.default,
                      },
                    },
                  }}
                />
              </Grid>

              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  mt: 0,
                  justifyContent: "space-between",
                }}
              >
                <Button
                  className="blueButton"
                  fullWidth
                  sx={{ mr: 2 }}
                  onClick={
                    isEditable ? handleCancelEdit : () => setIsEditable(true)
                  }
                >
                  {isEditable ? "Cancel Edit" : "Edit Profile"}
                </Button>
                <Button
                  className="blueButton"
                  fullWidth
                  type="submit"
                  disabled={!isEditable || savingProfile}
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
