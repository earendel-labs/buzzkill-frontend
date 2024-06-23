"use client";

import React from "react";
import GameLayout from "@/components/GameLayout/GameLayout";
import Typography from "@mui/material/Typography";

const Play: React.FC = () => {
  return (
    <GameLayout>
      <Typography variant="h1">Buzzkill</Typography>
      <Typography variant="body1">HoneyComb Hustle</Typography>
    </GameLayout>
  );
};

const App: React.FC = () => {
  return <Play />;
};

export default App;
