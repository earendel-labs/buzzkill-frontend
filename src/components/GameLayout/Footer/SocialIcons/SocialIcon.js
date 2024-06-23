// components/SocialIcon.js
import React from "react";
import SvgIcon from "@mui/material/SvgIcon";
import { styled } from "@mui/material/styles";

const CustomSvgIcon = styled(SvgIcon)(({ theme }) => ({
  "& path": {
    transition: "fill 0.3s",
    fill: theme.palette.Gold.main, // Default color
  },
  "&:hover path": {
    fill: theme.palette.Gold.main, // Hover color
  },
  "&:active path": {
    fill: theme.palette.Gold.dark, // Pressed color
  },
}));

const SocialIcon = ({ svgPath }) => {
  return (
    <CustomSvgIcon>
      <img src={svgPath} alt="icon" style={{ width: "100%", height: "auto" }} />
    </CustomSvgIcon>
  );
};

export default SocialIcon;
