// src/pages/MyBeesTab.tsx

"use client";

import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import ProfileLayout from "@/components/Layouts/ProfileLayout/ProfileLayout";
import PrimaryButton from "@/components/Buttons/PrimaryButton/PrimaryButton";
import { useUserContext } from "@/context/UserContext";
import HexagonSpinner from "@/components/Loaders/HexagonSpinner/HexagonSpinner";
import { BeeCard } from "@/components/Card/BeeCard";

const MyBeesTab = () => {
  const { address } = useAccount();
  const router = useRouter();

  // Access userContext values
  const {
    bees: myBees,
    stakedBees,
    loadingBees,
    fetchError,
    checkAndPromptApproval,
    setActiveBee,
  } = useUserContext();

  const handlePlayClick = async (beeId: number): Promise<void> => {
    try {
      const isApproved = await checkAndPromptApproval();
      if (isApproved) {
        setActiveBee(beeId);
        router.push("/Play");
      }
    } catch (error) {
      console.error("Error during approval check:", error);
    }
  };

  return (
    <ProfileLayout loading={loadingBees}>
      <Typography variant="h5" color="white" sx={{ mb: 4 }}>
        My Hatchlings
      </Typography>

      {/* Unstaked Bees Section */}
      <Typography variant="h6" color="white" sx={{ mb: 2 }}>
        Unstaked Bees
      </Typography>
      <Grid container spacing={3}>
        {!loadingBees && myBees.length === 0 && !fetchError ? (
          <Grid item xs={12}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              height="20vh"
            >
              <Typography marginTop="24px" marginBottom="24px">
                No Bees Found. Mint yours here
              </Typography>
              <PrimaryButton text="Mint" onClick={() => router.push("/Mint")} />
            </Box>
          </Grid>
        ) : (
          myBees.map((bee) => (
            <Grid item xs={12} sm={6} md={4} key={`unstaked-bee-${bee.id}`}>
              <BeeCard
                bee={bee}
                onPlayClick={handlePlayClick}
                isOwnedByUser={true}
                variant="myBees"
              />
            </Grid>
          ))
        )}
      </Grid>

      {/* Staked Bees Section */}
      <Typography variant="h6" color="white" sx={{ mt: 4, mb: 2 }}>
        Staked Bees
      </Typography>
      <Grid container spacing={3} marginBottom="5rem">
        {!loadingBees && stakedBees.length === 0 && !fetchError ? (
          <Grid item xs={12}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              height="20vh"
            >
              <Typography>No Staked Bees Found</Typography>
            </Box>
          </Grid>
        ) : (
          stakedBees.map((bee) => (
            <Grid item xs={12} sm={6} md={4} key={`staked-bee-${bee.id}`}>
              <BeeCard
                bee={bee}
                onPlayClick={handlePlayClick}
                isOwnedByUser={true}
                variant="myBees"
              />
            </Grid>
          ))
        )}
      </Grid>

      {loadingBees && (
        <Box display="flex" justifyContent="center" mt={4}>
          <HexagonSpinner />
        </Box>
      )}
      {fetchError && (
        <Typography variant="h6" color="error" align="center">
          Failed to load hatchlings, please try again later.
        </Typography>
      )}
    </ProfileLayout>
  );
};

export default MyBeesTab;
