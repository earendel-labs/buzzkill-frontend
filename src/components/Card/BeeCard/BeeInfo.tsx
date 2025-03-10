import React from "react";
import { Box, Typography, useTheme, Stack } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HiveIcon from "@mui/icons-material/Hive";
import PersonIcon from "@mui/icons-material/Person"; // Icon for owner
import { useRouter } from "next/navigation";
import StarIcon from "@mui/icons-material/Star";
import FactoryIcon from "@mui/icons-material/Factory";
import { RARITY_VALUES } from "@/constants/rarity";

interface BeeInfoProps {
  environmentName?: string;
  hiveName?: string;
  rarity?: string;
  environmentLink?: string;
  hiveLink?: string;
  ownerAddress?: string; // New prop for owner information
}

const BeeInfo: React.FC<BeeInfoProps> = ({
  environmentName,
  hiveName,
  rarity,
  environmentLink,
  hiveLink,
  ownerAddress,
}) => {
  const router = useRouter();
  const theme = useTheme(); // Access the theme

  const shortenAddress = (ownerAddress: string) => {
    if (!ownerAddress) return "";
    return `${ownerAddress.slice(0, 6)}...${ownerAddress.slice(-4)}`;
  };
  const rarityValue = RARITY_VALUES[rarity ?? "Commonn"];

  return (
    <>
      {/* Bee Production */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginTop: 1,
          marginLeft: 1,
        }}
      >
        {/* Rarity Value Typography */}
        <Stack alignItems="center" direction="row" gap={0.5}>
          <Typography
            variant="h6"
            fontSize="26px"
            sx={{
              color: theme.palette.Gold.main,
            }}
          >
            {rarityValue}
          </Typography>
        </Stack>
        {/* Honey / Day Typography */}
        <Typography
          variant="body2"
          fontSize="22px"
          sx={{
            color: theme.palette.Gold.main,
            marginLeft: 1, // Add spacing between rarity and text
          }}
        >
          Honey Drops / Day
        </Typography>
      </Box>

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
            sx={{
              color:
                ownerAddress === "You"
                  ? theme.palette.DarkOrange.main // Highlight color when the owner is you
                  : theme.palette.LightBlue.main, // Lighter color for other owners
              display: "flex",
              alignItems: "center",
              fontWeight: ownerAddress === "You" ? "bold" : "normal", // Bold text if owner is you
            }}
          >
            <PersonIcon
              sx={{
                marginRight: 0.5,
                color:
                  ownerAddress === "You"
                    ? theme.palette.DarkOrange.main
                    : theme.palette.LightBlue.main, // Match icon color to text
              }}
            />
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
