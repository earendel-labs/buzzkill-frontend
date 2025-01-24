import React, { useMemo } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  useMediaQuery,
  useTheme,
  Fade,
} from "@mui/material";
import { SyntheticEvent } from "react";
import BeeCardHive from "@/components/Card/BeeCardHive/BeeCardHive";
import PrimaryButton from "@/components/Buttons/PrimaryButton/PrimaryButton";
import { Hatchling } from "@/types/Hatchling";
import { useUserContext } from "@/context/UserContext";
import HexagonSpinner from "@/components/Loaders/HexagonSpinner/HexagonSpinner";
import BeeCardHiveSkeleton from "@/components/Loaders/BeeCardHiveSkeleton";
const beeCategories = [
  { label: "All Hatchlings", filter: "all" },
  { label: "Your Hatchlings", filter: "you" },
];

interface BeeGridProps {
  bees: Hatchling[];
  variant?: "default" | "myBees";
  loading?: boolean;
}

const BeeGrid: React.FC<BeeGridProps> = ({
  bees,
  variant = "default",
  loading = false,
}) => {
  const { address } = useUserContext();
  const [selectedTab, setSelectedTab] = React.useState<string>(
    variant === "default" ? "all" : "you"
  );

  const theme = useTheme();
  const is1440pxOrLower = useMediaQuery("(max-width: 1440px)");

  const handleTabChange = (event: SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
  };

  const handleMintClick = () => {
    window.open("https://dagora.xyz/launchpad/buzzkill", "_blank");
  };

  const handleBuyClick = () => {
    window.open("/mint", "_blank");
  };

  const filteredBees = useMemo(() => {
    return selectedTab === "all"
      ? bees
      : bees.filter(
          (bee) => bee.ownerAddress.toLowerCase() === address?.toLowerCase()
        );
  }, [bees, selectedTab, address]);

  const hasBees = filteredBees.length > 0;

  return (
    <Box
      sx={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        borderRadius: "8px",
        padding: "20px",
        height: "80%",
        overflowY: "auto",
        boxSizing: "border-box",
        margin: "0 auto",
        display: "flex",
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
        [theme.breakpoints.up("lg")]: {
          maxWidth: "90%",
        },
        "&::-webkit-scrollbar": {
          width: "10px",
        },
        "&::-webkit-scrollbar-track": {
          background: "#68341B",
          borderRadius: "4px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#E9B743",
          borderRadius: "4px",
        },
      }}
    >
      {variant === "default" && (
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          centered
          sx={{
            mb: 3,
            borderRadius: "2px",
            width: "100%",
          }}
        >
          {beeCategories.map((category) => (
            <Tab
              key={category.filter}
              label={category.label}
              value={category.filter}
              sx={{
                color: "#E9B743",
                "&.Mui-selected": { color: "#915E28", fontWeight: "bold" },
                fontSize: "1.25rem",
              }}
            />
          ))}
        </Tabs>
      )}

      <Fade in={!loading} timeout={200}>
        {loading ? (
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            width="100%"
            height="100%"
          >
            <HexagonSpinner />
            <Typography className="body1" padding="24px 0px">
              Loading Bees...
            </Typography>
          </Box>
        ) : hasBees ? (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(1, 1fr)",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(3, 1fr)",
                xl: "repeat(3, 1fr)",
              },
              justifyItems: "center",
              gap: "1.5em",
              padding: "0 1em",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            {filteredBees.map((bee) => (
              <BeeCardHive
                key={bee.id}
                bee={bee}
                isOwnedByUser={
                  bee.ownerAddress.toLowerCase() === address?.toLowerCase()
                }
                variant={selectedTab === "myBees" ? "myBees" : "default"}
              />
            ))}
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              textAlign: "center",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: "#D4AF37",
                mb: 4,
                fontSize: 24,
                maxWidth: "100%",
                width: "100%",
              }}
            >
              {variant === "default"
                ? "No bees found in this category."
                : "You don't own any bees. Please mint or buy a bee from a secondary market."}
            </Typography>
            {variant === "default" && (
              <Box sx={{ display: "flex", justifyContent: "center", gap: 4 }}>
                <PrimaryButton text="Mint" onClick={handleMintClick} />
                <PrimaryButton text="Buy" onClick={handleBuyClick} />
              </Box>
            )}
          </Box>
        )}
      </Fade>
    </Box>
  );
};

export default BeeGrid;
