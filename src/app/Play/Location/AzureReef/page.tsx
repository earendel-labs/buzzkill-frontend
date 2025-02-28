// src/components/Forest.tsx

"use client";

import React, { useEffect, useMemo } from "react";
import GameLayout from "@/components/Layouts/GameLayout/GameLayout";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import { useSound } from "@/context/SoundContext";
import TopBar from "@/components/Layouts/GameLayout/TopBar/TopBar";
import CombinedHatchlingMarker from "@/components/MapNavigation/CombinedHatchlingMarker/CombinedHatchlingMarker";
import CombinedResourceMarker from "@/components/MapNavigation/CombinedResourceMarker/CombinedResourceMarker"; // Import CombinedResourceMarker
import { ResourceType } from "@/types/ResourceType";
import BottomBar from "@/components/Layouts/GameLayout/BottomBar/BottomBar";
import HexagonSpinner from "@/components/Loaders/HexagonSpinner/HexagonSpinner";
import Image from "next/image";
import { Typography } from "@mui/material";
import { useHives } from "@/context/HivesContext"; // Ensure correct import path
import { HiveHatchlingInfo } from "@/types/Environment";
import { logger } from "@/utils/logger";
import { useEnvironment } from "@/context/EnvironmentContext";
import LeftPanel from "@/components/Layouts/GameLayout/LeftPanel/LeftPanel";

const AzureReef: React.FC = () => {
  const { isMuted, isMusicMuted } = useSound();
  const [music, setMusic] = React.useState<HTMLAudioElement | null>(null);
  const router = useRouter();
  const [isImageLoaded, setIsImageLoaded] = React.useState(false);
  const { currentEnvironment } = useEnvironment();
  const {
    environments,
    hivesMap,
    resources,
    filteredStakedNFTs,
    maxBeesMap,
    getHiveById,
    getStakedNFTsByHiveId,
    getMaxBeesByHiveId,
  } = useHives();

  const handleClick = () => {
    logger.log("Button clicked");
  };

  useEffect(() => {
    const audio = new Audio();
    audio.src = currentEnvironment?.audioFile || "/audioFile"; // TO DO put a defualt audio file
    audio.preload = "auto";
    audio.loop = true;
    audio.volume = 0.8;
    audio.oncanplaythrough = () => setMusic(audio);
  }, []);
  useEffect(() => {
    if (music) {
      if (isMusicMuted || isMuted) {
        music.pause();
      } else {
        music.play();
      }
    }
  }, [isMusicMuted, isMuted, music]);

  const navigate = (link: string) => {
    router.push(link);
  };

  // Compute bee counts per hive using useMemo for performance optimization
  const beeCountsPerHive = useMemo(() => {
    const countsMap = new Map<
      number,
      { common: number; rare: number; ultrarare: number; Total: number }
    >();

    filteredStakedNFTs.forEach((nft) => {
      const hiveId = Number(nft.hiveId.hiveId);
      if (!countsMap.has(hiveId)) {
        countsMap.set(hiveId, { common: 0, rare: 0, ultrarare: 0, Total: 0 });
      }
      const counts = countsMap.get(hiveId)!;
      const rarity = nft.tokenId.rarity.toLowerCase();
      if (rarity === "common") counts.common += 1;
      else if (rarity === "rare") counts.rare += 1;
      else if (rarity === "ultrarare") counts.ultrarare += 1;
      counts.Total += 1;
    });

    return countsMap;
  }, [filteredStakedNFTs]);

  // Compute hive hatchling info combining bee counts and max bees
  const hiveHatchlingData = useMemo(() => {
    const hatchlingMap = new Map<number, HiveHatchlingInfo>();

    hivesMap.forEach((hive, hiveId) => {
      const counts = beeCountsPerHive.get(hiveId) || {
        common: 0,
        rare: 0,
        ultrarare: 0,
        Total: 0,
      };
      const maxBees = getMaxBeesByHiveId(hiveId) || 0;

      const status = counts.Total >= maxBees ? "Full" : "Active";
      const totalBeesString = `${counts.Total} / ${maxBees}`;

      hatchlingMap.set(hiveId, {
        productivityValue: hive.productivityValue,
        CommonBees: counts.common,
        RareBees: counts.rare,
        UltraRareBees: counts.ultrarare,
        TotalBees: totalBeesString, // Set as string
        status,
        location: hive.name,
        environment:
          environments.find((env) => env.id === 3)?.name || "Unknown",
      });
    });

    return hatchlingMap;
  }, [hivesMap, beeCountsPerHive, getMaxBeesByHiveId, environments]);

  // Handle non-Hive resources
  const nonHiveResources = useMemo(() => {
    return resources.filter((resource) => resource.resourceType !== "Hive");
  }, [resources]);

  return (
    <GameLayout>
      <LeftPanel />
      {/* Conditionally render loading spinner */}
      {!isImageLoaded && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
          flexDirection="column"
          position="fixed"
          width="100vw"
          zIndex={1300}
          sx={{
            backgroundImage: (theme) =>
              theme.palette.customBackgrounds.boxGradient,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <HexagonSpinner />
          <Typography className="body1" padding="24px 0px">
            Loading World...
          </Typography>
        </Box>
      )}

      {/* Background Image with Image Loading */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          overflow: "hidden",
          zIndex: -1,
        }}
      >
        <Image
          src={currentEnvironment?.backgroundImage || "/Maps/BuzzkillMap.jpg"}
          alt="Forest map background"
          fill
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
          onLoad={() => setIsImageLoaded(true)}
          priority
        />
      </Box>

      <TopBar mapHeaderLabel={currentEnvironment?.name || "Default"} />

      {/* Dynamically Render CombinedHatchlingMarker Components */}
      {Array.from(hivesMap.values()).map((hive) => {
        const hiveId = hive.hiveId;
        const hatchlingInfo = hiveHatchlingData.get(hiveId);

        if (!hatchlingInfo) {
          // Optionally, render a placeholder or loading state
          return null;
        }

        return (
          <CombinedHatchlingMarker
            key={hiveId}
            left={hive.position.left}
            top={hive.position.top}
            link={hive.resourceLink}
            resourceType={ResourceType.Hive}
            hiveName={hive.name}
            HiveProductionValue={hatchlingInfo.productivityValue.toString()}
            RareBeesValue={hatchlingInfo.RareBees.toString()}
            TotalBeesValue={hatchlingInfo.TotalBees}
            status={hatchlingInfo.status} // Pass status prop
            primaryButtonClick={handleClick}
            secondaryButtonClick={() => navigate(hive.resourceLink)}
          />
        );
      })}

      {/* Dynamically Render CombinedResourceMarker Components */}
      {nonHiveResources.map((resource) => {
        const {
          resourceType: resType,
          id,
          position,
          resourceLink,
          contentValue,
        } = resource;
        const left = position.left;
        const top = position.top;
        const castedResourceType = resType as ResourceType; // renamed to avoid duplicate

        // Validate fields
        if (!resourceLink || !contentValue) {
          logger.warn(`Resource ID: ${id} is missing link or contentValue.`);
          return null;
        }

        return (
          <CombinedResourceMarker
            key={id}
            left={left}
            top={top}
            link={resourceLink}
            resourceType={castedResourceType}
            contentValue={contentValue}
          />
        );
      })}
      <BottomBar isRestrictedEnvironment={true} />
    </GameLayout>
  );
};

export default AzureReef;
