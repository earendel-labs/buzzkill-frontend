"use client";
import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
  Grid,
  Snackbar,
  Alert,
} from "@mui/material";
import { useSession } from "next-auth/react";
import Layout from "@/components/Layouts/Layout/Layout";
import { useTheme } from "@mui/material/styles";

const ProfilePage = () => {
  const { data: session, status } = useSession();
  const theme = useTheme();
  const [profileData, setProfileData] = useState({
    account_name: "",
    email_address: "",
    address: "",
  });
  const [originalData, setOriginalData] = useState({
    account_name: "",
    email_address: "",
    address: "",
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
          });
          setOriginalData({
            account_name: data.account_name || "",
            email_address: data.email_address || "",
            address: data.address || "",
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

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
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
          <CircularProgress />
          <Typography marginTop="16px">Fetching data...</Typography>
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