import React from "react";
import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";

const CustomSvgIcon = styled(SvgIcon)({
  width: "35px",
  height: "35px",
  transition: "fill 0.3s, transform 0.1s",

  "&:hover path": {
    fill: "#0091AC", // Hover color
  },
  "&:active path": {
    transform: "scale(0.95)",
    transformOrigin: "center",
  },
});

interface SocialIconProps extends SvgIconProps {
  Component: React.ElementType;
  href: string;
  target?: string;
  rel?: string;
}

const SocialIcon: React.FC<SocialIconProps> = ({
  Component,
  href,
  target = "_blank", // Defaults to opening in a new tab
  rel = "noopener noreferrer", // Security feature
  ...props
}) => {
  const theme = useTheme();

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      style={{ display: "inline-block" }}
    >
      <CustomSvgIcon {...props} viewBox="0 0 35 35">
        <Component />
      </CustomSvgIcon>
    </a>
  );
};

export default SocialIcon;
