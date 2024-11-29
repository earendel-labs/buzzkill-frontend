// src/components/Card/BeeInfo.tsx

import React from "react";
import { Box, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HiveIcon from "@mui/icons-material/Hive";
import PersonIcon from "@mui/icons-material/Person"; // Icon for owner
import { useRouter } from "next/navigation";

interface BeeInfoProps {
  environmentName?: string;
  hiveName?: string;
  environmentLink?: string;
  hiveLink?: string;
  ownerAddress?: string; // New prop for owner information
}

const BeeInfo: React.FC<BeeInfoProps> = ({
  environmentName,
  hiveName,
  environmentLink,
  hiveLink,
  ownerAddress,
}) => {
  const router = useRouter();

  const shortenAddress = (ownerAddress: string) => {
    if (!ownerAddress) return "";
    return `${ownerAddress.slice(0, 6)}...${ownerAddress.slice(-4)}`;
  };

  return (
    <>
      {environmentName && environmentLink && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginTop: 1,
            marginLeft: 1,
          }}
        >
          <Typography
            variant="body1"
            fontSize="16px"
            color="lightgreen"
            onClick={() => router.push(environmentLink)}
            sx={{
              cursor: "pointer",
              marginRight: 1,
              display: "flex",
              alignItems: "center",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            <LocationOnIcon sx={{ marginRight: 0.5 }} />
            {environmentName}
          </Typography>
        </Box>
      )}
      {hiveName && hiveLink && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginTop: 1.5,
            marginLeft: 1,
          }}
        >
          <Typography
            variant="body1"
            fontSize="16px"
            color="lightblue"
            onClick={() => router.push(hiveLink)}
            sx={{
              cursor: "pointer",
              marginLeft: 0.25,
              display: "flex",
              alignItems: "center",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            <HiveIcon sx={{ marginRight: 0.5 }} />
            {hiveName}
          </Typography>
        </Box>
      )}
      {ownerAddress && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginTop: 1.5,
            marginLeft: 1,
          }}
        >
          <Typography
            variant="body1"
            fontSize="16px"
            color="lightcoral"
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <PersonIcon sx={{ marginRight: 0.5 }} />
            {ownerAddress === "You"
              ? ownerAddress
              : shortenAddress(ownerAddress)}
          </Typography>
        </Box>
      )}
    </>
  );
};

export default BeeInfo;
