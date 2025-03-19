// src/components/VerifyPartnerNftButton.tsx
import React, { useState } from "react";
import { Tooltip, Snackbar, Alert, Box, useMediaQuery } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import ColorLensIcon from "@mui/icons-material/ColorLens";
import { useTheme } from "@mui/material/styles";
import PrimaryButton from "@/components/Buttons/PrimaryButton/PrimaryButton";
import { useProfileContext } from "@/context/ProfileContext";

const VerifyPartnerNftButton: React.FC = () => {
  const theme = useTheme();
  // Use the "md" breakpoint for mobile devices.
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [isProcessing, setIsProcessing] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastSeverity, setToastSeverity] = useState<"success" | "error">(
    "success"
  );

  const { profileData } = useProfileContext();
  const isVerified = profileData
    ? (profileData.has_contrarians ?? false) ||
      (profileData.has_ivy ?? false) ||
      (profileData.has_starship ?? false)
    : false;

  const handleClick = async () => {
    if (isVerified || isProcessing || isDisabled) return;

    setIsProcessing(true);
    try {
      const response = await fetch("/api/nft-snapshots/awardNftSnapshots", {
        method: "POST",
      });
      const data = await response.json();

      if (response.ok && data.updated) {
        setToastMessage(
          "NFT Ownership Confirmed. Awarded points for your NFT(s)!"
        );
        setToastSeverity("success");
        setIsDisabled(true);
      } else {
        setToastMessage(
          data.error || data.message || "You do not own the required NFT."
        );
        setToastSeverity("error");
        setIsDisabled(true);
        setTimeout(() => {
          setIsDisabled(false);
        }, 5000);
      }
    } catch (err) {
      console.error("Error calling awardNftSnapshots:", err);
      setToastMessage("An error occurred. Please try again.");
      setToastSeverity("error");
      setIsDisabled(true);
      setTimeout(() => {
        setIsDisabled(false);
      }, 5000);
    } finally {
      setIsProcessing(false);
      setToastOpen(true);
    }
  };

  // Update tooltip text based on mobile mode and NFT verification status.
  const tooltipText =
    isMobile && isVerified
      ? "NFT Ownership for Contrarian, Ivy & Starship confirmed"
      : "Claim points and access to Azure Reef by verifying you owned Ivy, Starship and/or Contrarian NFTs at the time of our snapshot.";

  // Determine which icon to use based on viewport.
  const buttonIcon = isMobile ? (
    <ColorLensIcon
      sx={{
        fontSize: 32,
        color: isVerified ? theme.palette.DarkBlue.main : "inherit",
      }}
    />
  ) : (
    <CheckCircleIcon
      sx={{
        color: isVerified ? theme.palette.DarkBlue.main : "inherit",
        fontSize: 24,
      }}
    />
  );

  // For desktop, show text; on mobile, display only the icon.
  const desktopText = isVerified
    ? "NFT Ownership Confirmed"
    : "Verify NFT Ownership";
  const buttonText = isMobile ? "" : desktopText;
  const mobileText = ""; // Always empty on mobile.

  return (
    <>
      <Tooltip title={tooltipText} arrow>
        <Box>
          <PrimaryButton
            text={buttonText}
            mobileText={mobileText}
            icon={buttonIcon}
            disabled={isProcessing || isDisabled || isVerified}
            onClick={handleClick}
            scale={1}
            sx={{
              padding: {
                sm: "4px 4px",
                md: "8px 20px",
              },
            }}
          />
        </Box>
      </Tooltip>

      <Snackbar
        open={toastOpen}
        autoHideDuration={6000}
        onClose={() => setToastOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setToastOpen(false)}
          severity={toastSeverity}
          sx={{ width: "100%" }}
          variant="filled"
        >
          {toastMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default VerifyPartnerNftButton;
