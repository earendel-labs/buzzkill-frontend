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
import { getSupabaseClientWithAuth } from "@/app/libs/supabaseClient";
import Layout from "@/components/Layouts/Layout/Layout";

// Import theme for styling
import { useTheme } from "@mui/material/styles";

const ProfilePage = () => {
  const { data: session, status } = useSession(); // Access session to get user's wallet address
  const theme = useTheme(); // Use theme to access colors
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

  // Fetch user data from Supabase based on the session address
  useEffect(() => {
    if (session?.address) {
      const fetchUserData = async () => {
        // Get Supabase client with JWT token
        const supabaseWithAuth = getSupabaseClientWithAuth(
          session?.address ?? null
        );

        const { data, error } = await supabaseWithAuth
          .from("users")
          .select("*")
          .eq("address", session.address)
          .maybeSingle();

        if (error) {
          console.error("Error fetching user data from Supabase:", error);
        } else if (data) {
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
        }
        setLoading(false);
      };

      fetchUserData();
    }
  }, [session]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    // Check if session has the address and log it
    if (!session?.address) {
      console.error("No session or address found");
      setSnackbarMessage("No session or wallet address found");
      setSnackbarSeverity("error");
      setSaving(false);
      setSnackbarOpen(true);
      return;
    }

    // Debugging: Log profileData and session before sending the update
    console.log("Session Address: ", session.address);
    console.log("Updating profile with data: ", profileData);

    if (profileData.address !== session.address) {
      console.error("Wallet address mismatch");
      setSnackbarMessage("Wallet address mismatch. Update not allowed.");
      setSnackbarSeverity("error");
      setSaving(false);
      setSnackbarOpen(true);
      return;
    }

    try {
      // Get Supabase client with JWT token
      const supabaseWithAuth = getSupabaseClientWithAuth(
        session?.address ?? null
      );

      // Update user data in Supabase
      const { data, error } = await supabaseWithAuth
        .from("users")
        .update({
          account_name: profileData.account_name,
          email_address: profileData.email_address,
        })
        .eq("address", session.address);

      // Check if there's any error
      if (error) {
        console.error("Error updating user data in Supabase:", error);
        setSnackbarMessage("Error updating account details. Please try again.");
        setSnackbarSeverity("error");
      } else {
        console.log("Successfully updated user data: ", data);
        setSnackbarMessage("Account details updated successfully.");
        setSnackbarSeverity("success");
        setIsEditable(false);
        setOriginalData({ ...profileData });
      }
    } catch (err) {
      // Catch any unexpected errors
      console.error("Unexpected error during update operation:", err);
      setSnackbarMessage("An unexpected error occurred. Please try again.");
      setSnackbarSeverity("error");
    }

    setSaving(false);
    setSnackbarOpen(true);
  };

  const handleCancelEdit = () => {
    setProfileData({ ...originalData });
    setIsEditable(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
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
              <Typography sx={{ mb: 1 }}>Wallet Address</Typography>
              <Typography variant="h6"> {profileData.address} </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography sx={{ mb: 1 }}>Account Name</Typography>
              <TextField
                fullWidth
                name="account_name"
                value={profileData.account_name}
                onChange={handleInputChange}
                placeholder="Enter your account name"
                InputProps={{
                  readOnly: !isEditable,
                  style: {
                    backgroundColor: theme.palette.DarkBlue.main,
                    color: theme.palette.DarkBlue.main,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography sx={{ mb: 1 }}>Email Address</Typography>
              <TextField
                fullWidth
                name="email_address"
                value={profileData.email_address}
                onChange={handleInputChange}
                type="email"
                placeholder="Enter your email address"
                InputProps={{
                  readOnly: !isEditable,
                  style: {
                    backgroundColor: theme.palette.DarkBlue.main,
                    color: theme.palette.DarkBlue.main,
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
