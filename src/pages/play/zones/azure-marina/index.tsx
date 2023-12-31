import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import MapTriangle from "Components/MapTriangle/MapTriangle";
import { Box, Heading } from "@chakra-ui/react";
import GameLayout from "Components/Layout/GameLayout/GameLayout";
import useMeasureHeight from "../../../../hooks/useMeasureHeight";
import { useLoading } from "../../../../contexts/LoadingContext";
import MapNavigation from "Components/NavigationMap/NavigationMap";
import SemiTransparentBackground from "Components/SemiTransparentBackground";

export default function FrostwingGlacier() {
  const router = useRouter();
  const { ref, headerHeight } = useMeasureHeight();

  const { isLoading } = useLoading();

  const handleClick = (hiveName: string) => {
    switch (hiveName) {
      case "Coral Hive":
        router.push(`/play/zones/azure-marina/coral-hive`);
        break;
      case "Watercrest Hive":
        router.push(`/play/zones/azure-marina/watercrest-hive`);
        break;
      case "Verdant Canopy":
        router.push(`/play/zones/verdant-canopy`);
        break;
      case "Azure Marina":
        router.push(`/play/zones/azure-marina`);
        break;
      case "Frostwing Glacier":
        router.push(`/play/zones/frostwing-glacier`);
        break;
      default:
        console.log("Triangle clicked!");
        break;
    }
  };

  return (
    <GameLayout>
      {(headerHeight: number) => (
        <>
          <Head>
            <title>Buzzkill Azure Marina</title>
          </Head>
          <Box
            cursor={isLoading ? "none" : "auto"}
            w="full" // Full width relative to the parent element
            h={`calc(100vh - ${headerHeight}px)`}
            position="relative"
            sx={{ boxSizing: "border-box" }} // Ensures padding and borders are included in the width/height
          >
            {/* Main Image */}
            <video
              autoPlay
              loop
              muted
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
                position: "absolute", // Position it absolutely to cover the whole container
                top: 0,
                left: 0,
              }}
            >
              <source src="/animations/water.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <Box
              position="absolute"
              top="6%"
              left="50%"
              transform="translateX(-50%)"
              width="100%"
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              {" "}
              {/* Adjust the width as needed */}
              <SemiTransparentBackground>
                <Heading color="white" padding="2rem 10rem 2rem 10rem">
                  Azure Marina{" "}
                </Heading>
              </SemiTransparentBackground>
            </Box>
            <MapNavigation
              top="12%"
              left={{ base: "60%", md: "72%" }}
              href="/play"
              imageSrc="/NavigationIcons/small-map.svg"
              navigationLabel="Back to Map"
            />
            {/* Overlay triangles */}
            <MapTriangle
              top="50%"
              left="25%"
              label="Coral Hive"
              onClick={() => handleClick("Coral Hive")}
              bgColor="#BC8E2D"
              textColor="white"
            />

            <MapTriangle
              top="45%"
              left="74%"
              label="Watercrest Hive"
              onClick={() => handleClick("Watercrest Hive")}
              bgColor="#BC8E2D"
              textColor="white"
            />
          </Box>
        </>
      )}
    </GameLayout>
  );
}
