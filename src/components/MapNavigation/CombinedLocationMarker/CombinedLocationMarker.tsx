import React, { useState } from "react";
import LocationHeader from "../LocationHeader/LocationHeader";
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

  return (
    <>
      {isHovered && (
        <LocationHeader
          left={`calc(${left} + 30px)`} // Center the header above the marker
          top={`calc(${top} + 10px)`} // Adjust the top position to be closer to the marker
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
