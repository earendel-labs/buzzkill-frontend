"use client";

import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import Layout from "@/components/Layouts/Layout/Layout";
import Link from "next/link";

const PrivacyPolicy = () => {
  return (
    <Layout>
      <Box
        sx={{ maxWidth: "1000px", mx: "auto", px: 2, py: 4, color: "white" }}
      >
        <Typography variant="h4" gutterBottom>
          Privacy Policy
        </Typography>
      </Box>
    </Layout>
  );
};

export default PrivacyPolicy;
