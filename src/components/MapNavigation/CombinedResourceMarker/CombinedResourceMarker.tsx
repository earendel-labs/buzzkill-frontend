import React, { useState } from "react";
import { Box, ClickAwayListener } from "@mui/material";
import SmallToolTip from "@/components/ToolTips/Small/SmallToolTip";
import HiveHoverOver from "@/components/ToolTips/HiveHoverOver/HiveHoverOver";
import ResourceMarker from "@/components/MapNavigation/ResourceMarker/ResourceMarker";
import ResourcePressed from "@/components/ToolTips/ResourcePressed/ResourcePressed";
import HivePressed from "@/components/ToolTips/HivePressed/HivePressed";
import { ResourceType } from "@/types/ResourceType";
import { useRouter } from "next/navigation";

interface CombinedResourceMarkerProps {
  left: string;
  top: string;
  link: string;
  resourceType: ResourceType;
  contentValue?: string; // Optional content value for the tooltip
  hiveName?: string; // Optional Hive Name value for the tooltip
  HiveDefenceValue?: string; // Optional Hive Defence value for the tooltip
  QueenBeesValue?: string; // Optional Queen Bees value for the tooltip
  WorkerBeesValue?: string; // Optional Worker Bees value for the tooltip
  primaryButtonClick?: () => void; // Callback for primary button click, optional
  primaryButtonLink?: string; // URL for primary button click, optional
  secondaryButtonClick?: () => void; // Callback for secondary button click, optional
  secondaryButtonLink?: string; // URL for secondary button click, optional
}

const CombinedResourceMarker: React.FC<CombinedResourceMarkerProps> = ({
  left,
  top,
  link,
  resourceType,
  contentValue,
  hiveName = "Hive", // Default value for hiveName
  HiveDefenceValue = "0", // Default value to 0
  QueenBeesValue = "0", // Default value to 0
  WorkerBeesValue = "0", // Default value to 0
  primaryButtonClick = () => {}, // Default function if not provided
  primaryButtonLink, // Add primaryButtonLink prop
  secondaryButtonClick = () => {}, // Default function if not provided
  secondaryButtonLink, // Add secondaryButtonLink prop
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const router = useRouter(); // Use the useRouter hook

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleMarkerClick = () => {
    setIsClicked(true);
  };

  const handleClickAway = () => {
    setIsClicked(false);
  };

  const getResourceTitle = () => {
    switch (resourceType) {
      case ResourceType.Hive:
        return hiveName;
      case ResourceType.Sap:
        return "Sap";
      case ResourceType.Nectar:
        return "Nectar";
      case ResourceType.Pollen:
        return "Pollen";
      default:
        return "Resource";
    }
  };

  const isHive = resourceType === ResourceType.Hive;

  const getContentLabel = () => {
    return isHive ? "Hive Defence" : "Availability";
  };

  // Primary Button Handler
  const handlePrimaryButtonClick = () => {
    if (primaryButtonLink) {
      router.push(primaryButtonLink); // Navigate to the provided URL
    } else {
      primaryButtonClick(); // If no link is provided, fallback to the provided function
    }
  };

  // Secondary Button Handler
  const handleSecondaryButtonClick = () => {
    if (secondaryButtonLink) {
      router.push(secondaryButtonLink); // Navigate to the provided URL
    } else {
      secondaryButtonClick(); // If no link is provided, fallback to the provided function
    }
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box position="absolute" left={left} top={top}>
        {isHovered && !isClicked && (
          <Box
            sx={{
              position: "absolute",
              top: {
                xs: isHive ? "-168px" : "-128px",
                sm: isHive ? "-168px" : "-128px",
                md: isHive ? "-168px" : "-128px",
                lg: isHive ? "-168px" : "-128px",
                xl: isHive ? "-165px" : "-125px",
              },
              left: {
                xs: isHive ? "-125px" : "-108px",
                sm: isHive ? "-125px" : "-108px",
                md: isHive ? "-120px" : "-105px",
                lg: isHive ? "-120px" : "-105px",
                xl: isHive ? "-115px" : "-100px",
              },
              zIndex: 1000,
              pointerEvents: "none",
            }}
          >
            {isHive ? (
              <HiveHoverOver
                hiveName={hiveName}
                hiveDefence={parseInt(HiveDefenceValue)}
                queenBees={QueenBeesValue}
                workerBees={WorkerBeesValue}
              />
            ) : (
              <SmallToolTip
                title={getResourceTitle()}
                contentLabel={getContentLabel()}
                contentValue={contentValue}
              />
            )}
          </Box>
        )}
        {isClicked && (
          <Box
            sx={{
              position: "absolute",
              top: {
                xs: isHive ? "-200px" : "-120px",
                sm: isHive ? "-200px" : "-130px",
                md: isHive ? "-195px" : "-198px",
                lg: isHive ? "-195px" : "-198px",
                xl: isHive ? "-195px" : "-195px",
              },
              left: {
                xs: isHive ? "-125px" : "-125px",
                sm: isHive ? "-125px" : "-125px",
                md: isHive ? "-120px" : "-120px",
                lg: isHive ? "-120px" : "-120px",
                xl: isHive ? "-115px" : "-115px",
              },
              zIndex: 1000,
            }}
          >
            {isHive ? (
              <HivePressed
                hiveName={hiveName}
                hiveDefence={parseInt(HiveDefenceValue)}
                queenBees={QueenBeesValue}
                workerBees={WorkerBeesValue}
                onRaidClick={handlePrimaryButtonClick} // Use the new handler for the primary button
                onEnterClick={handleSecondaryButtonClick} // Use the new handler for the secondary button
              />
            ) : (
              <ResourcePressed
                resourceType={getResourceTitle()}
                resourceAvailable={contentValue || "0"}
                onForageClick={handlePrimaryButtonClick} // Use the new handler for the primary button
              />
            )}
          </Box>
        )}
        <Box
          sx={{
            position: "relative",
          }}
        >
          <ResourceMarker
            left="0"
            top="0"
            onPress={handleMarkerClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        </Box>
      </Box>
    </ClickAwayListener>
  );
};

export default CombinedResourceMarker;
