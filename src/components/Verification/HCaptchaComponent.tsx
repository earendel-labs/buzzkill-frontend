import React, { useImperativeHandle, forwardRef, Ref } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";

interface HCaptchaComponentProps {
  onVerify: (token: string) => void;
  siteKey: string;
}

// Define the component with forwardRef
const HCaptchaComponent = forwardRef(
  (props: HCaptchaComponentProps, ref: Ref<{ handleExecute: () => void }>) => {
    const hCaptchaRef = React.useRef<HCaptcha>(null);

    // Expose handleExecute to the parent component
    useImperativeHandle(ref, () => ({
      handleExecute: () => {
        hCaptchaRef.current?.execute();
      },
    }));

    return (
      <HCaptcha
        sitekey={props.siteKey}
        onVerify={props.onVerify}
        ref={hCaptchaRef}
      />
    );
  }
);

export default HCaptchaComponent;
