import { Box, BoxProps } from "@mui/material";
import React from "react";

interface GradientCardProps extends BoxProps {
  borderWidth?: string | number;
}

const UserResourcesBackground: React.FC<GradientCardProps> = ({
  children,
  sx,
  borderWidth = "2px",
  ...rest
}) => {
  return (
    <Box
      sx={{
        position: "relative",
        background: "linear-gradient(to right, rgba(36, 46, 78, 0.9), rgba(18, 23, 39, 0.9))",
        borderRadius: "10px",
        padding: "10px 4px",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          padding: borderWidth,
          background: "linear-gradient(135deg, #E9B743 4%, #E9B743 12%, #8a4829 33%, #a86c2c 44%, #E9B743 77%, #E9B743 98%)",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          zIndex: 0,
        },
        "&::after": {
          content: '""',
          position: "absolute",
          inset: "2px",
          borderRadius: "8px",
          background: "linear-gradient(180deg, rgba(36, 46, 78, 0.9) 11.54%, rgba(18, 23, 39, 0.9) 49.51%, rgba(32, 41, 70, 0.9) 80.36%, rgba(23, 29, 50, 0.9) 91.43%)",
          zIndex: 1,
        },
        ...sx,
      }}
      {...rest}
    >
      <Box sx={{ position: "relative", zIndex: 2 }}>{children}</Box>
    </Box>
  );
};

export default UserResourcesBackground;

