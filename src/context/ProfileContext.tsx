// src/context/ProfileContext.tsx

"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import useSWR, { mutate } from "swr";
import { useSession } from "next-auth/react";
import { AlertColor } from "@mui/material";
import { Snackbar, Alert } from "@mui/material";
import { ProfileData } from "@/types/ProfileData";
import { useOneID } from "@/context/OneIDContext";
import { fetcher } from "@/utils/fetcher";

interface ProfileContextType {
  profileData: ProfileData | null;
  loadingProfile: boolean;
  savingProfile: boolean;
  syncDelay: boolean;
  isEditable: boolean;
  setIsEditable: (editable: boolean) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleCancelEdit: () => void;
  copyInviteLink: () => void;
  handleSyncOneID: () => Promise<void>;
  error: boolean;
  helperText: string;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { data: session, status } = useSession();
  const oneid = useOneID(); // Access OneID context

  // Use SWR for profile data
  const {
    data,
    error: fetchError,
    isValidating,
  } = useSWR<ProfileData>(
    status === "authenticated" ? "/api/user/getProfile" : null,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000, // 1 minute
    }
  );
  const [syncDelay, setSyncDelay] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");

  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] =
    useState<AlertColor>("success");

  const [isNewUser, setIsNewUser] = useState(false);

  // Fetch isNewUser status when authenticated
  useEffect(() => {
    if (status === "authenticated") {
      const fetchIsNewUser = async () => {
        try {
          const response = await fetch("/api/user/getIsNewUser", {
            credentials: "include",
          });
          if (!response.ok) {
            console.error("Failed to fetch isNewUser status");
            setIsNewUser(false);
            return;
          }
          const data = await response.json();
          setIsNewUser(data.isNewUser);
        } catch (error) {
          console.error("Error fetching isNewUser status:", error);
          setIsNewUser(false);
        }
      };
      fetchIsNewUser();
    } else {
      setIsNewUser(false);
    }
  }, [status]);

  // Effect to handle new user synchronization
  useEffect(() => {
    const synchronizeOneID = async () => {
      if (isNewUser && oneid && data?.address) {
        try {
          const primaryName = await oneid.getPrimaryName(data.address);

          if (primaryName) {
            const has_oneid = true;

            // Call the syncOneID endpoint
            const response = await fetch("/api/user/syncOneID", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                address: data.address,
                account_name: primaryName,
                oneid_name: primaryName,
                has_oneid: has_oneid,
              }),
              credentials: "include",
            });
            // Clear the isNewUser status by calling an API route
            await fetch("/api/user/clearIsNewUser", {
              method: "POST",
              credentials: "include",
            });

            if (!response.ok) {
              const errorData = await response.json(); 
              return;
            }

            showSnackbar("OneID synced successfully!", "success");

            // Revalidate SWR cache
            mutate("/api/user/getProfile");

            // Update local isNewUser state
            setIsNewUser(false);
          } else {
            // Clear the isNewUser status by calling an API route
            await fetch("/api/user/clearIsNewUser", {
              method: "POST",
              credentials: "include",
            });
          }
        } catch (error) {
          showSnackbar(
            "An unexpected error occurred during OneID sync.",
            "error"
          );
        }
      }
    };

    synchronizeOneID();
  }, [isNewUser, oneid, data]);

  // Handle fetch errors
  useEffect(() => {
    if (fetchError) {
      console.error("Error fetching profile:", fetchError);
      showSnackbar(
        fetchError.error || "Failed to fetch profile data.",
        "error"
      );
    }
  }, [fetchError]);

  const showSnackbar = (message: string, severity: AlertColor) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const copyInviteLink = () => {
    if (!data?.invite_code) return; // Prevent copying if invite_code is missing

    const inviteLink = `${window.location.origin}/?invite=${data.invite_code}`;
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
    // Optimistically update the profile data in SWR
    mutate(
      "/api/user/getProfile",
      (currentData: ProfileData | undefined) =>
        currentData ? { ...currentData, [name]: value } : currentData,
      false
    );
  };

  const validateAccountName = (value: string) => {
    const sanitizedValue = value.replace(/[^A-Za-z0-9_-]/g, "");
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

    // Optimistically update the account name
    mutate(
      "/api/user/getProfile",
      (currentData: ProfileData | undefined) =>
        currentData
          ? { ...currentData, account_name: sanitizedValue }
          : currentData,
      false
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProfile(true);

    try {
      const requestBody: any = {
        account_name: data?.account_name,
      };

      if (data?.email_address) {
        requestBody.email_address = data.email_address;
      }

      const response = await fetch("/api/user/updateProfile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        showSnackbar(
          errorData.error || "Error updating profile data.",
          "error"
        );
        return;
      }

      showSnackbar("Account details updated successfully.", "success");

      // Revalidate SWR cache
      mutate("/api/user/getProfile");
    } catch (error) {
      console.error("Error updating profile:", error);
      showSnackbar("An unexpected error occurred.", "error");
    } finally {
      setSavingProfile(false);
    }
  };

  const handleCancelEdit = () => {
    // Revalidate SWR cache to reset any optimistic updates
    mutate("/api/user/getProfile");
    setIsEditable(false);
  };

  const handleSyncOneID = async () => {
    if (!oneid || !data?.address || syncDelay) {
      showSnackbar("OneID is not initialized or address is missing.", "error");
      return;
    }

    setSyncDelay(true); // Disable the button
    setSavingProfile(true);

    try {
      const primaryName = await oneid.getPrimaryName(data.address);
      if (primaryName) {
        const response = await fetch("/api/user/syncOneID", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            address: data.address,
            account_name: data.account_name,
            oneid_name: primaryName,
            has_oneid: true,
          }),
          credentials: "include",
        });

        if (!response.ok) {
          const errorData = await response.json();
          showSnackbar(errorData.error || "Error syncing OneID.", "error");
          return;
        }

        showSnackbar("OneID synced successfully!", "success");
        mutate("/api/user/getProfile");

        await fetch("/api/user/clearIsNewUser", {
          method: "POST",
          credentials: "include",
        });

        setIsNewUser(false);
      } else {
        showSnackbar("Primary name not found in OneID.", "error");
      }
    } catch (error) {
      console.error("Error syncing OneID:", error);
      showSnackbar("An unexpected error occurred.", "error");
    } finally {
      setSavingProfile(false);

      // Delay reset to allow the button to be clicked again after 3 seconds
      setTimeout(() => setSyncDelay(false), 3000);
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        profileData: data || null,
        loadingProfile: isValidating && !data,
        savingProfile,
        syncDelay,
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
        handleSyncOneID,
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
