import React, { ReactNode } from "react";
import { Box, SxProps } from "@mui/material";

type GoldBorderCardProps = {
  children?: ReactNode;
  sx?: SxProps;
};

const GoldBorderCard: React.FC<GoldBorderCardProps> = ({ children, sx }) => {
  return (
    <Box
      sx={{
        width: "480px",
        padding: "28px 32px",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "rgba(34, 46, 80, 0.8)",
        borderRadius: "8px",
        overflow: "hidden",
        zIndex: 1,
        backdropFilter: "blur(2px)",
        boxShadow: `
          inset 4px 4px 4px rgba(0, 0, 0, 0.25),
          inset 0px 4px 4px rgba(0, 0, 0, 0.12)
        `,
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          borderRadius: "inherit",
          background:
            "linear-gradient(135deg,  #E9B743 4%, #E9B743 12%, #8a4829 33%, #a86c2c 44%, #E9B743 77%, #E9B743 98%)",
          padding: "3px",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          zIndex: -1,
        },
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

export default GoldBorderCard;
