import React from "react";
import { Box, Skeleton } from "@mui/material";
import { styled } from "@mui/system";

const StyledBeeCardSkeleton = styled(Box)(({ theme }) => ({
  position: "relative",
  borderRadius: "12px",
  width: "100%", // Matches BeeCardHive width
  maxWidth: "320px", // Matches BeeCardHive max width
  overflow: "hidden",
  [theme.breakpoints.down("sm")]: {
    maxWidth: "280px", // Matches BeeCardHive behavior for small screens
  },
}));

const BeeCardHiveSkeleton: React.FC = () => {
  return (
    <StyledBeeCardSkeleton>
      <Skeleton
        variant="rectangular"
        width="100%"
        height="100%"
        sx={{ aspectRatio: "1 / 1", borderRadius: "12px" }}
      />
      <Box sx={{ padding: "16px" }}>
        <Skeleton width="60%" height={28} />
        <Skeleton width="40%" height={20} sx={{ mt: 1 }} />
      </Box>
    </StyledBeeCardSkeleton>
  );
};

export default BeeCardHiveSkeleton;
