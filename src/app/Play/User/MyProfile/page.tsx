"use client";
import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  Snackbar,
  Alert,
  IconButton,
  ButtonBase,
} from "@mui/material";
import { ContentCopy as CopyIcon } from "@mui/icons-material";
import { useSession } from "next-auth/react";
import Layout from "@/components/Layouts/Layout/Layout";
import { useTheme } from "@mui/material/styles";
import HexagonSpinner from "@/components/Loaders/HexagonSpinner/HexagonSpinner";

const ProfilePage = () => {
  const { data: session, status } = useSession();
  const theme = useTheme();
  const [profileData, setProfileData] = useState({
    account_name: "",
    email_address: "",
    address: "",
    invite_code: "", // Initialize with an empty string
    invite_count: 0, // Initialize with zero
  });

  const [originalData, setOriginalData] = useState({
    account_name: "",
    email_address: "",
    address: "",
    invite_code: "", // Initialize with an empty string
    invite_count: 0, // Initialize with zero
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");

  useEffect(() => {
    if (status === "authenticated") {
      const fetchProfile = async () => {
        try {
          const response = await fetch("/api/user/getProfile");
          if (!response.ok) throw new Error("Failed to fetch profile data");

          const data = await response.json();
          setProfileData({
            account_name: data.account_name || "",
            email_address: data.email_address || "",
            address: data.address || "",
            invite_code: data.invite_code || "", // Include invite_code
            invite_count: data.invite_count || 0, // Include invite_count
          });
          setOriginalData({
            account_name: data.account_name || "",
            email_address: data.email_address || "",
            address: data.address || "",
            invite_code: data.invite_code || "", // Include invite_code
            invite_count: data.invite_count || 0, // Include invite_count
          });
        } catch (error) {
          console.error("Error fetching profile:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchProfile();
    }
  }, [status]);

  const handleCopyInvite = () => {
    const inviteLink = `${window.location.origin}/?invite=${profileData.invite_code}`;
    navigator.clipboard
      .writeText(inviteLink)
      .then(() => {
        setSnackbarMessage("Invite link copied to clipboard.");
        setSnackbarSeverity("success");
      })
      .catch((error) => {
        console.error("Error copying invite link:", error);
        setSnackbarMessage("Failed to copy invite link.");
        setSnackbarSeverity("error");
      })
      .finally(() => {
        setSnackbarOpen(true);
      });
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch("/api/user/updateProfile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          account_name: profileData.account_name,
          email_address: profileData.email_address,
        }),
      });

      if (!response.ok) throw new Error("Error updating profile data");

      setSnackbarMessage("Account details updated successfully.");
      setSnackbarSeverity("success");
      setIsEditable(false);
      setOriginalData({ ...profileData });
    } catch (error) {
      console.error("Error updating profile:", error);
      setSnackbarMessage("Error updating profile data.");
      setSnackbarSeverity("error");
    } finally {
      setSaving(false);
      setSnackbarOpen(true);
    }
  };

  const handleCancelEdit = () => {
    setProfileData({ ...originalData });
    setIsEditable(false);
  };

  const validateAccountName = (value: string) => {
    const sanitizedValue = value.replace(/[^A-Za-z0-9_-]/g, "");
    setProfileData((prevState) => ({
      ...prevState,
      account_name: sanitizedValue,
    }));
    if (
      !/^[A-Za-z0-9_-]*$/.test(sanitizedValue) ||
      sanitizedValue.length > 20
    ) {
      setError(true);
      setHelperText("Username must be 20 characters or less, no spaces.");
    } else {
      setError(false);
      setHelperText("");
    }
  };

  return (
    <Layout>
      {loading ? (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <HexagonSpinner />
          <Typography marginTop="24px">Fetching data...</Typography>
        </Box>
      ) : (
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h2"
            gutterBottom
            sx={{ textAlign: "center", mb: 4 }}
          >
            My Profile
          </Typography>

          <Grid container spacing={3} sx={{ maxWidth: 500 }}>
            <Grid item xs={12}>
              <Typography sx={{ mb: 1, fontWeight: "normal", color: "white" }}>
                Wallet Address
              </Typography>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "white" }}
              >
                {profileData.address}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography sx={{ mb: 1, fontWeight: "normal", color: "white" }}>
                Invite Code
              </Typography>
              <Box
                onClick={handleCopyInvite}
                sx={{
                  display: "flex",
                  alignItems: "stretch",
                  border: `1px solid ${theme.palette.DarkBlue.light}`,
                  borderRadius: "4px",
                  overflow: "hidden",
                  width: "100%",
                  cursor: "pointer", // Indicate the whole area is clickable
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
                      borderRadius: "2px 0 0 2px", // Rounded left side
                      pointerEvents: "none", // Disable TextField hover effect
                      "&.Mui-disabled": {
                        WebkitTextFillColor: "white",
                        fontSize: "1.25rem",
                        color: "white",
                        paddingLeft: 1,
                      },
                    },
                    "& .MuiFilledInput-root": {
                      backgroundColor: theme.palette.DarkBlue.light,
                      borderRadius: "4px 0 0 4px", // Rounded left side
                    },
                  }}
                />
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent Box's onClick from triggering
                    handleCopyInvite();
                  }}
                  sx={{
                    backgroundColor: theme.palette.DarkBlue.dark,
                    borderRadius: "0 2px 2px 0", // Rounded right side
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
              <Typography sx={{ mb: 1, fontWeight: "normal", color: "white" }}>
                Users Invited
              </Typography>
              <TextField
                fullWidth
                value={profileData.invite_count}
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
                    "&:hover": {
                      backgroundColor: theme.palette.Gold.light,
                    },
                    "&.Mui-focused": {
                      backgroundColor: theme.palette.Gold.light,
                    },
                    "&.Mui-disabled": {
                      backgroundColor: theme.palette.Gold.light,
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography sx={{ mb: 1, fontWeight: "normal", color: "white" }}>
                Account Name
              </Typography>
              <TextField
                fullWidth
                name="account_name"
                value={profileData.account_name}
                onChange={(e) => validateAccountName(e.target.value)}
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
                      paddingLeft: 0,
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
            <Grid item xs={12}>
              <Typography sx={{ mb: 1, fontWeight: "normal", color: "white" }}>
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
                      paddingLeft: 0,
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
              sx={{ display: "flex", mt: 2, justifyContent: "space-between" }}
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
                disabled={!isEditable || saving}
              >
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </Grid>
          </Grid>

          <Snackbar
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity={snackbarSeverity}
              sx={{ width: "100%" }}
            >
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </Box>
      )}
    </Layout>
  );
};

export default ProfilePage;
