// src/app/page.tsx
"use client";

import React from "react";
import Layout from "@/components/Layout/Layout";
import Typography from "@mui/material/Typography";

const HomePage: React.FC = () => {
  return (
    <Layout>
      <Typography variant="h1">Buzzkill</Typography>
      <Typography variant="body1">HoneyComb Hustle</Typography>
    </Layout>
  );
};

const App: React.FC = () => {
  return <HomePage />;
};

export default App;
