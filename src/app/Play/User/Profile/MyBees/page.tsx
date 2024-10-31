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

  // Get context values for both unstaked and staked bees
  const {
    bees: myBees,
    stakedBees,
    loadingBees,
    fetchError,
    checkAndPromptApproval,
    setActiveBee,
  } = useUserContext();

  // Handle 'Play' button click for each bee
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

      {/* Display Unstaked Bees */}
      <Typography variant="h6" color="white" sx={{ mb: 2 }}>
        Unstaked Bees
      </Typography>
      <Grid container spacing={3}>
        {!loadingBees && myBees.length === 0 && !fetchError ? (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            height="60vh"
          >
            <Typography marginTop="24px" marginBottom="24px">
              No Bees Found. Mint yours here
            </Typography>
            <PrimaryButton text="Mint" onClick={() => router.push("/Mint")} />
          </Box>
        ) : (
          myBees.map((bee) => (
            <Grid item xs={6} sm={4} md={3} key={`bee-${bee.id}`}>
              <BeeCard bee={bee} onPlayClick={handlePlayClick} />
            </Grid>
          ))
        )}
      </Grid>

      {/* Display Staked Bees */}
      <Typography variant="h6" color="white" sx={{ mt: 4, mb: 2 }}>
        Staked Bees
      </Typography>
      <Grid container spacing={3} marginBottom="5rem">
        {!loadingBees && stakedBees.length === 0 && !fetchError ? (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            height="40vh"
          >
            <Typography>No Staked Bees Found</Typography>
          </Box>
        ) : (
          stakedBees.map((bee) => (
            <Grid item xs={6} sm={4} md={3} key={`staked-bee-${bee.id}`}>
              <BeeCard bee={bee} onPlayClick={handlePlayClick} />
            </Grid>
          ))
        )}
      </Grid>

      {loadingBees && <HexagonSpinner />}
      {fetchError && (
        <Typography variant="h6" color="error">
          Failed to load hatchlings, please try again later.
        </Typography>
      )}
    </ProfileLayout>
  );
};

export default MyBeesTab;
