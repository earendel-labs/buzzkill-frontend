// src/utils/environmentColours.ts
import { Environment } from "@/types/Environment";
import { lighten } from "@mui/material/styles"; // Import MUI's lighten function

export const getEnvironmentColor = (environment: Environment): string => {
  switch (environment.environmentType) {
    case "Coastal":
      return "#1E90FF"; // DodgerBlue
    case "Arid":
      return "#FFD700"; // Gold
    case "Forest":
      return "#228B22"; // ForestGreen
    case "Aquatic":
      return "#00CED1"; // DarkTurquoise
    case "Tundra":
      return "#ADD8E6"; // LightBlue
    case "Mountainous":
      return "#A9A9A9"; // DarkGray
    case "Volcanic":
      return "#FF4500"; // OrangeRed
    default:
      return "#808080"; // Gray
  }
};

// Utility function to get a lighter version of the environment color
export const getEnvironmentColorLighter = (
  environment: Environment,
  amount: number = 0.2
): string => {
  const color = getEnvironmentColor(environment);
  return lighten(color, amount);
};
