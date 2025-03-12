"use client";

import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box,
} from "@mui/material";
import Image from "next/image";
import { ArrowCircleUp as UpgradeIcon } from "@mui/icons-material";

interface UpgradeDialogProps {
  upgradeDialogOpen: boolean;
  setUpgradeDialogOpen: (open: boolean) => void;
  selectedStat: string;
  honey: number;
  upgradeStat: () => void;
}

export default function UpgradeDialog({
  upgradeDialogOpen,
  setUpgradeDialogOpen,
  selectedStat,
  honey,
  upgradeStat,
}: UpgradeDialogProps) {
  return (
    <Dialog
      open={upgradeDialogOpen}
      onClose={() => setUpgradeDialogOpen(false)}
      maxWidth="sm" // Ensures better responsiveness
      PaperProps={{
        sx: {
          bgcolor: "#0a1929",
          border: "1.5px solid #c9a227",
          borderRadius: 4,
          width: "600px",
        },
      }}
    >
      {/* Dialog Title */}
      <DialogTitle
        sx={{
          color: "#f0c850",
          fontWeight: "bold", // Ensures strong visual hierarchy
          px: 3,
          pt: 3,
          pb: 1, // Slightly more space at the bottom
        }}
      >
        Upgrade {selectedStat}
      </DialogTitle>

      {/* Dialog Content */}
      <DialogContent sx={{ px: 3, pb: 3 }}>
        <Typography sx={{ mb: 1, lineHeight: 1.4 }}>
          Spend <strong>500 $HONEY</strong> to increase your {selectedStat}{" "}
          stat.
        </Typography>

        {/* Current Balance & Cost */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            py: 2,
          }}
        >
          {/* Current Balance */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box
              sx={{
                borderRadius: "50%",
                width: 40,
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                src="/Icons/Resources/HoneyToken.png"
                alt="Honey"
                width={38}
                height={38}
              />
            </Box>
            <Box>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Current Balance
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "#f0c850", fontWeight: "bold" }}
              >
                {honey} $HONEY
              </Typography>
            </Box>
          </Box>

          {/* Cost */}
          <Box sx={{ ml: 2 }}>
            {" "}
            {/* Add a slight margin for separation */}
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Cost
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "#f0c850", fontWeight: "bold" }}
            >
              500 $HONEY
            </Typography>
          </Box>
        </Box>
      </DialogContent>

      {/* Dialog Actions - Buttons */}
      <DialogActions sx={{ px: 3, pb: 4, gap: 1.5 }}>
        {" "}
        {/* Slightly more spacing */}
        <Button
          variant="outlined"
          className="goldOutlinedButton"
          onClick={() => setUpgradeDialogOpen(false)}
          sx={{
            color: "#f0c850",
            padding: "10px 20px",
            borderColor: "#c9a227",
            fontWeight: "bold",
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={upgradeStat}
          disabled={honey < 500}
          className="goldButtonHorizontal"
          startIcon={<UpgradeIcon />}
        >
          Upgrade
        </Button>
      </DialogActions>
    </Dialog>
  );
}
