import React from "react";
import GoldBorderCard from "@/components/Card/GoldBorderCard/GoldBorderCard";
import { Typography } from "@mui/material";

const HiveRestrictionsInfo: React.FC = () => {
  return (
    <GoldBorderCard>
      <Typography variant="body1" sx={{ textAlign: "left" }}>
        To stake in Azure Reef you need to own a Contrarian, Ivy or Starship
        NFTs at the date of Snapshot.
      </Typography>
    </GoldBorderCard>
  );
};

export default HiveRestrictionsInfo;
