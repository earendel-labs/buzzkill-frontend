import React, { useState } from "react";
import LocationHeader from "@/components/Decorators/LocationHeader/LocationHeader";
import MapMarker from "@/components/MapNavigation/MapMarker/MapMarker";

interface CombinedLocationMarkerProps {
  left: string;
  top: string;
  link: string;
  text: string;
  navigate: (link: string) => void;
}

const CombinedLocationMarker: React.FC<CombinedLocationMarkerProps> = ({
  left,
  top,
  link,
  text,
  navigate,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Calculate new position to ensure the header doesn't go off the page
  const adjustedLeft = parseFloat(left) > 75 ? "75%" : left;
  const adjustedTop = parseFloat(top) > 75 ? "75%" : top;

  return (
    <>
      {isHovered && (
        <LocationHeader
          left={`calc(${adjustedLeft} - 12%)`} // Center the header above the marker
          top={`calc(${top} - 7%)`} // Adjust the top position to be above the marker
          text={text}
        />
      )}
      <MapMarker
        left={left}
        top={top}
        link={link}
        navigate={navigate}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
    </>
  );
};

export default CombinedLocationMarker;
