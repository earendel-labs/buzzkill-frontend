import React, { useImperativeHandle, forwardRef, Ref } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { Box, useTheme, Theme, useMediaQuery } from "@mui/material";

interface HCaptchaComponentProps {
  onVerify: (token: string) => void;
  siteKey: string;
}

const HCaptchaComponent = forwardRef(
  (props: HCaptchaComponentProps, ref: Ref<{ handleExecute: () => void }>) => {
    const theme = useTheme<Theme>();
    const hCaptchaRef = React.useRef<HCaptcha>(null);
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

    useImperativeHandle(ref, () => ({
      handleExecute: () => {
        hCaptchaRef.current?.execute();
      },
    }));

    // This Box uses breakpoints you defined (xs, sm, md, lg, xl, xxl)
    // to scale the captcha for different screen sizes and keep it centered.
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "auto",
        }}
      >
        <HCaptcha
          sitekey={props.siteKey}
          onVerify={props.onVerify}
          ref={hCaptchaRef}
          size={isSmallScreen ? "compact" : "normal"}
          theme="dark"
        />
      </Box>
    );
  }
);

export default HCaptchaComponent;
