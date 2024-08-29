import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";
import { useSound } from "@/context/SoundContext";

interface HiveMapButtonProps {}
//TODO: Add an input to set HiveEnvironment [Forest, Desert, Mountain, Swamp etc.]
// Then based on the environment type, update the code so that we can navigate to the approriate page.
// for example, if the HiveEnvironment is set to "Desert", then set navigation to /Desert map + update the SVG components to reflect the correct files
const HiveMapButton: React.FC<HiveMapButtonProps> = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const router = useRouter();
  const { isMuted } = useSound();
  const [hoverSound, setHoverSound] = useState<HTMLAudioElement | null>(null);
  const [pressedSound, setPressedSound] = useState<HTMLAudioElement | null>(
    null
  );

  useEffect(() => {
    setHoverSound(new Audio("/Audio/MapNavigation/MapNavigationHover.mp3"));
    setPressedSound(new Audio("/Audio/MapNavigation/MapNavigationPressed.mp3"));
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (!isMuted && hoverSound) {
      hoverSound.currentTime = 0;
      hoverSound.play();
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsPressed(false);
  };

  const handleMouseDown = () => {
    setIsPressed(true);
    if (!isMuted && pressedSound) {
      pressedSound.currentTime = 0;
      pressedSound.play();
    }
  };

  const handleMouseUp = () => {
    setIsPressed(false);
    router.push("/Location/Forest");
  };

  return (
    <Box
      sx={{
        width: {
          xs: "20px", // height for extra-small screens
          sm: "80px", // height for small screens
          md: "90px", // height for medium screens
          lg: "100px", // height for large screens
          xl: "150px", // height for extra-large screens
        },
        height: {
          xs: "20px", // height for extra-small screens
          sm: "80px", // height for small screens
          md: "90px", // height for medium screens
          lg: "100px", // height for large screens
          xl: "150px", // height for extra-large screens
        },
        backgroundImage: isPressed
          ? `url('/MapNavigation/Forest/ForestMapMarkerPressed.svg')`
          : isHovered
          ? `url('/MapNavigation/Forest/ForestMapMarkerHovered.svg')`
          : `url('/MapNavigation/Forest/ForestMapMarker.svg')`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        cursor: "pointer",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    ></Box>
  );
};

export default HiveMapButton;
