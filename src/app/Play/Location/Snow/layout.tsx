// src/app/Play/Location/WhisperwoodValleys/layout.tsx

"use client";

import React from "react";
import { HivesProvider } from "../../../../context/HivesContext"; // Adjust the path if necessary

interface LayoutProps {
  children: React.ReactNode;
}

const WhisperwoodValleysLayout: React.FC<LayoutProps> = ({ children }) => {
  return <HivesProvider environmentId={4}>{children}</HivesProvider>;
};

export default WhisperwoodValleysLayout;
