// src/components/VerifyPartnerNftButton.tsx
import React, { useState } from "react";
import { Tooltip, Snackbar, Alert, Box, useMediaQuery } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useTheme } from "@mui/material/styles";
import PrimaryButton from "@/components/Buttons/PrimaryButton/PrimaryButton";
import { useProfileContext } from "@/context/ProfileContext";

const VerifyPartnerNftButton: React.FC = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

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

  // On desktop, show full text; on mobile, show empty text so that only the icon displays.
  const desktopText = isVerified
    ? "NFT Ownership Confirmed"
    : "Verify NFT Ownership";
  const mobileText = ""; // Empty on mobile, to reserve space for just the icon.

  const buttonIcon = (
    <CheckCircleIcon
      sx={{
        // Use gold color if verified, otherwise default.
        color: isVerified ? "gold" : "inherit",
        // On mobile, make the icon a bit larger.
        fontSize: isSmallScreen ? 30 : 24,
      }}
    />
  );

  return (
    <>
      <Tooltip
        title="Claim points and access to Azure Reef by verifying you owned Ivy, Starship and/or Contrarian NFTs at the time of our snapshot."
        arrow
      >
        <Box>
          <PrimaryButton
            text={desktopText}
            mobileText={mobileText}
            icon={buttonIcon}
            disabled={isProcessing || isDisabled || isVerified}
            onClick={handleClick}
            scale={1}
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
