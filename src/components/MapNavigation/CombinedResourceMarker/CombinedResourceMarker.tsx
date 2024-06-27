import React, { useState } from "react";
import { Box } from "@mui/material";
import SmallToolTip from "@/components/ToolTips/Small/SmallToolTip";
import LargeToolTip from "@/components/ToolTips/Large/LargeToolTip"; // Adjust the import path as needed
import ResourceMarker from "@/components/MapNavigation/ResourceMarker/ResourceMarker";
import { ResourceType } from "@/types/ResourceType";

interface CombinedResourceMarkerProps {
  left: string;
  top: string;
  link: string;
  resourceType: ResourceType;
  navigate: (link: string) => void;
  contentLabel?: string; // Optional content label for the tooltip
  contentValue?: string; // Optional content value for the tooltip
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
  navigate,
  contentLabel,
  contentValue,
  HiveDefenceValue = "0", // Default value to 0
  QueenBeesValue = "0", // Default value to 0
  WorkerBeesValue = "0", // Default value to 0
  primaryButtonClick,
  secondaryButtonClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const getResourceTitle = () => {
    switch (resourceType) {
      case ResourceType.Hive:
        return "Hive";
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
    <Box position="absolute" left={left} top={top}>
      {isHovered && (
        <Box
          sx={{
            position: "absolute",
            top: isHive ? "-155px" : "-95px", // Adjust this value as needed to move the tooltip higher
            left: "-100px",
            zIndex: 1000, // High z-index to ensure tooltip appears on top
            pointerEvents: "none", // Prevent the tooltip from interfering with hover events
          }}
        >
          {isHive ? (
            <LargeToolTip
              title={getResourceTitle()}
              contentLabel={getContentLabel()}
              contentValue={contentValue}
              isHive={isHive}
              additionalLabel1="Queen Bees"
              additionalValue1={QueenBeesValue}
              additionalLabel2="Worker Bees"
              additionalValue2={WorkerBeesValue}
              primaryButtonClick={primaryButtonClick}
              secondaryButtonClick={secondaryButtonClick}
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
      <Box
        sx={{
          position: "relative",
        }}
      >
        <ResourceMarker
          left="0"
          top="0"
          link={link}
          navigate={navigate}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      </Box>
    </Box>
  );
};

export default CombinedResourceMarker;
