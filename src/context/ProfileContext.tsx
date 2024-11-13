// src/context/ProfileContext.tsx

"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useSession } from "next-auth/react";
import { AlertColor } from "@mui/material";
import { Snackbar, Alert } from "@mui/material";
import { ProfileData } from "@/types/ProfileData";

interface ProfileContextType {
  profileData: ProfileData | null;
  loadingProfile: boolean;
  savingProfile: boolean;
  isEditable: boolean;
  setIsEditable: (editable: boolean) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleCancelEdit: () => void;
  copyInviteLink: () => void;
  error: boolean;
  helperText: string;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { data: session, status } = useSession();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [originalData, setOriginalData] = useState<ProfileData | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");

  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] =
    useState<AlertColor>("success");

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
            invite_code: data.invite_code || "",
            invited_count: data.invited_count || 0,
            total_rewards: data.total_rewards || 0,
          });
          setOriginalData({
            account_name: data.account_name || "",
            email_address: data.email_address || "",
            address: data.address || "",
            invite_code: data.invite_code || "",
            invited_count: data.invited_count || 0,
            total_rewards: data.total_rewards || 0,
          });
        } catch (error) {
          console.error("Error fetching profile:", error);
          showSnackbar("Failed to fetch profile data.", "error");
          setProfileData(null); // Ensure profileData is null on error
        } finally {
          setLoadingProfile(false);
        }
      };

      fetchProfile();
    } else {
      setProfileData(null); // User not authenticated
      setLoadingProfile(false);
    }
  }, [status]);

  const showSnackbar = (message: string, severity: AlertColor) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const copyInviteLink = () => {
    if (!profileData?.invite_code) return; // Prevent copying if invite_code is missing

    const inviteLink = `${window.location.origin}/?invite=${profileData.invite_code}`;
    navigator.clipboard
      .writeText(inviteLink)
      .then(() => {
        showSnackbar("Invite link copied to clipboard.", "success");
      })
      .catch((error) => {
        console.error("Error copying invite link:", error);
        showSnackbar("Failed to copy invite link.", "error");
      });
  };

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => (prev ? { ...prev, [name]: value } : prev));
  };

  const validateAccountName = (value: string) => {
    const sanitizedValue = value.replace(/[^A-Za-z0-9_-]/g, "");
    setProfileData((prev) =>
      prev ? { ...prev, account_name: sanitizedValue } : prev
    );
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProfile(true);

    try {
      const response = await fetch("/api/user/updateProfile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          account_name: profileData?.account_name,
          email_address: profileData?.email_address,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        showSnackbar(
          errorData.error || "Error updating profile data.",
          "error"
        );
        return; // Exit the function early since there's an error
      }

      const successData = await response.json();
      showSnackbar("Account details updated successfully.", "success");

      if (profileData) {
        setIsEditable(false);
        setOriginalData({ ...profileData });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      showSnackbar("An unexpected error occurred.", "error");
    } finally {
      setSavingProfile(false);
    }
  };

  const handleCancelEdit = () => {
    setProfileData(originalData);
    setIsEditable(false);
  };

  return (
    <ProfileContext.Provider
      value={{
        profileData,
        loadingProfile,
        savingProfile,
        isEditable,
        setIsEditable,
        handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => {
          if (e.target.name === "account_name") {
            validateAccountName(e.target.value);
          } else {
            handleInputChange(e);
          }
        },
        handleSubmit,
        handleCancelEdit,
        copyInviteLink,
        error,
        helperText,
      }}
    >
      {children}
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
    </ProfileContext.Provider>
  );
};

export const useProfileContext = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfileContext must be used within a ProfileProvider");
  }
  return context;
};
