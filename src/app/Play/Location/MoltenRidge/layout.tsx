// src/app/Play/Location/WhisperwoodValleys/layout.tsx

"use client";

import React from "react";
import { HivesProvider } from "../../../../context/HivesContext"; // Adjust the path if necessary

interface LayoutProps {
  children: React.ReactNode;
}

const MoltenRidgeLayout: React.FC<LayoutProps> = ({ children }) => {
  return <HivesProvider environmentId={6}>{children}</HivesProvider>;
};

export default MoltenRidgeLayout;
