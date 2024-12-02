import React, { useState } from "react";
import { Box, ClickAwayListener } from "@mui/material";
import SmallToolTip from "@/components/ToolTips/Small/SmallToolTip";
import HiveHoverOver from "@/components/ToolTips/HiveHoverOver/HiveHoverOver";
import ResourceMarker from "@/components/MapNavigation/ResourceMarker/ResourceMarker";
import ResourcePressed from "@/components/ToolTips/ResourcePressed/ResourcePressed";
import HivePressed from "@/components/ToolTips/HivePressed/HivePressed";
import { ResourceType } from "@/types/ResourceType";
import { useRouter } from "next/navigation";

interface CombinedHatchlingMarkerProps {
  left: string;
  top: string;
  link: string;
  resourceType: ResourceType;
  contentValue?: string; // Optional content value for the tooltip
  hiveName?: string; // Optional Hive Name value for the tooltip
  HiveProductionValue?: string; // Optional Hive Defence value for the tooltip
  RareBeesValue?: string; // Optional Queen Bees value for the tooltip
  TotalBeesValue?: string; // Optional Worker Bees value for the tooltip
  status?: string;
  primaryButtonClick?: () => void; // Callback for primary button click, optional
  primaryButtonLink?: string; // URL for primary button click, optional
  secondaryButtonClick?: () => void; // Callback for secondary button click, optional
  secondaryButtonLink?: string; // URL for secondary button click, optional
}

const CombinedHatchlingMarker: React.FC<CombinedHatchlingMarkerProps> = ({
  left,
  top,
  link,
  resourceType,
  contentValue,
  hiveName = "Hive", // Default value for hiveName
  HiveProductionValue = "0", // Default value to 0
  RareBeesValue = "0", // Default value to 0
  TotalBeesValue = "0", // Default value to 0
  status = "Active",
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
                hiveDefence={parseInt(HiveProductionValue)}
                queenBees={RareBeesValue}
                workerBees={TotalBeesValue}
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
                hiveDefence={parseInt(HiveProductionValue)}
                queenBees={RareBeesValue}
                workerBees={TotalBeesValue}
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

export default CombinedHatchlingMarker;
