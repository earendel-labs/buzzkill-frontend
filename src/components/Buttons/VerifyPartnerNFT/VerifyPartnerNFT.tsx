// src/components/VerifyPartnerNftButton.tsx
import React, { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import PrimaryButton from "@/components/Buttons/PrimaryButton/PrimaryButton";
import { useProfileContext } from "@/context/ProfileContext";

const VerifyPartnerNftButton: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastSeverity, setToastSeverity] = useState<"success" | "error">(
    "success"
  );

  const { profileData } = useProfileContext();

  // Check if the profile already shows that the user is verified.
  const isVerified = profileData
    ? (profileData.has_contrarians ?? false) ||
      (profileData.has_ivy ?? false) ||
      (profileData.has_starship ?? false)
    : false;

  const handleClick = async () => {
    // If already verified, do nothing.
    if (isVerified || isProcessing || isDisabled) return;

    setIsProcessing(true);
    try {
      const response = await fetch("/api/nft-snapshots/awardNftSnapshots", {
        method: "POST",
      });
      const data = await response.json();

      if (response.ok && data.updated) {
        // Successful update: the API confirms NFT ownership.
        setToastMessage(
          "NFT Ownership Confirmed. Awarded points for your NFT(s)!"
        );
        setToastSeverity("success");
        setIsDisabled(true);
      } else {
        // Failure: no NFT found or update not needed.
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

  return (
    <>
      <Tooltip
        title="Claim points and access to Azure Reef by verifying you owned Ivy, Starship and/or Contrarian NFTs at the time of our snapshot."
        arrow
      >
        <div>
          <PrimaryButton
            text={
              isVerified
                ? "NFT Ownership Confirmed"
                : isProcessing
                ? "Processing..."
                : "Verify NFT Ownership"
            }
            onClick={handleClick}
            disabled={isProcessing || isDisabled || isVerified}
            scale={1}
            sx={{ padding: "6px 10px" }}
          />
        </div>
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
