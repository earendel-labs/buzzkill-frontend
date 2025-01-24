// src/app/Play/Location/WhisperwoodValleys/BlackForestHive/components/EnvironmentBackground.tsx

"use client";

import React, { FC, useState } from "react";
import Box from "@mui/material/Box";
import Image from "next/image";

interface EnvironmentBackgroundProps {
  backgroundImage: string;
}

const EnvironmentBackground: FC<EnvironmentBackgroundProps> = ({
  backgroundImage,
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <>
      {/* Background Layer */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: -1,
          overflow: "hidden",
          background:
            "radial-gradient(73.87% 73.87% at 50% 50%, rgba(52, 119, 142, 0.2) 0%, rgba(36, 46, 78, 0.2) 100%), radial-gradient(130.26% 136.63% at 50.05% 47.94%, rgba(36, 46, 78, 0.85) 30%, rgba(18, 23, 39, 0.85) 57.5%, rgba(32, 41, 70, 0.85) 76.5%, rgba(33, 42, 72, 0.85) 85.81%)",
          opacity: 0.2,
          border: "1px solid #000000",
        }}
      >
        <Image
          src={backgroundImage}
          alt="Environment background"
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          onLoad={() => setIsImageLoaded(true)}
          priority
        />
      </Box>
    </>
  );
};

export default EnvironmentBackground;
