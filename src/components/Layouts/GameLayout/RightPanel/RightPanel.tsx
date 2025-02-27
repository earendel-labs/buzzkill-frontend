"use client";

import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const RightPanel: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Expand/Collapse Button */}
      <IconButton
        onClick={() => setOpen(!open)}
        sx={{
          position: "absolute",
          top: "80px", // Align with Left Panel
          right: open ? 250 : 0,
          zIndex: 1000,
          background: "rgba(0, 0, 0, 0.5)",
          color: "white",
          borderRadius: "8px 0 0 8px",
        }}
      >
        {open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
      </IconButton>

      {/* Right Panel Drawer */}
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        variant="persistent"
        sx={{
          "& .MuiDrawer-paper": {
            width: "250px",
            background: "rgba(0, 0, 0, 0.7)",
            color: "white",
            padding: "16px",
            borderLeft: "2px solid rgba(255, 255, 255, 0.2)",
          },
        }}
      >
        <Typography variant="h6" gutterBottom>
          Leaderboard & Events
        </Typography>

        {/* Example Content */}
        <Box mt={2}>
          <Typography variant="body2">1️⃣ Player1 - 500pts</Typography>
          <Typography variant="body2">2️⃣ Player2 - 420pts</Typography>
          <Typography variant="body2">3️⃣ Player3 - 390pts</Typography>
        </Box>

        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={() => console.log("View Full Leaderboard")}
        >
          View Full Leaderboard
        </Button>
      </Drawer>
    </>
  );
};

export default RightPanel;
