import React, { useState } from "react";
import { Box, ClickAwayListener } from "@mui/material";
import SmallToolTip from "@/components/ToolTips/Small/SmallToolTip";
import HiveHoverOver from "@/components/ToolTips/HiveHoverOver/HiveHoverOver";
import ResourceMarker from "@/components/MapNavigation/ResourceMarker/ResourceMarker";
import ResourcePressed from "@/components/ToolTips/ResourcePressed/ResourcePressed";
import HivePressed from "@/components/ToolTips/HivePressed/HivePressed";
import { ResourceType } from "@/types/ResourceType";

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
  secondaryButtonClick?: () => void; // Callback for secondary button click, optional
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
  secondaryButtonClick = () => {}, // Default function if not provided
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

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

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box position="absolute" left={left} top={top}>
        {isHovered && !isClicked && (
          <Box
            sx={{
              position: "absolute",
              top: isHive ? "-165px" : "-125px", // Adjust this value as needed to move the tooltip higher
              left: isHive ? "-115px" : "-100px", // Adjust this value as needed to move the tooltip left
              zIndex: 1000, // High z-index to ensure tooltip appears on top
              pointerEvents: "none", // Prevent the tooltip from interfering with hover events
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
              top: isHive ? "-195px" : "-195px", // Adjust this value as needed to move the tooltip higher
              left: isHive ? "-115px" : "-115px", // Adjust this value as needed to move the tooltip left
              zIndex: 1000,
            }}
          >
            {isHive ? (
              <HivePressed
                hiveName={hiveName}
                hiveDefence={parseInt(HiveDefenceValue)}
                queenBees={QueenBeesValue}
                workerBees={WorkerBeesValue}
                onRaidClick={primaryButtonClick}
                onEnterClick={secondaryButtonClick}
              />
            ) : (
              <ResourcePressed
                resourceType={getResourceTitle()}
                resourceAvailable={contentValue || "0"}
                onForageClick={primaryButtonClick}
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
