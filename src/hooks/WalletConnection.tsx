"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import {
  RainbowKitSiweNextAuthProvider,
  GetSiweMessageOptions,
} from "@rainbow-me/rainbowkit-siwe-next-auth";
import { useAccount } from "wagmi";
import { signIn, signOut } from "next-auth/react";
import getTheme from "../theme/theme";
import "@rainbow-me/rainbowkit/styles.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"; // TODO: Don't think we use this anymore
import {
  RainbowKitProvider,
  DisclaimerComponent,
} from "@rainbow-me/rainbowkit";
import { createWalletTheme } from "@/theme/walletTheme";
import { ThemeProvider, Box, Modal } from "@mui/material";
import CustomAvatar from "@/components/User/CustomAvatar";
import { useRouter } from "next/navigation";
import HCaptchaComponent from "@/components/Verification/HCaptchaComponent";
import {  useOneID } from "@/context/OneIDContext";
import React from "react";
import { logger } from "@/app/utils/logger";

const getSiweMessageOptions: GetSiweMessageOptions = () => ({
  statement: "Sign in to the Buzzkill World",
});

const Disclaimer: DisclaimerComponent = ({ Text, Link }) => (
  <Text>
    By connecting your wallet, you agree to the{" "}
    <Link href="/TermsOfService">Terms of Service</Link> and acknowledge you
    have read and understand the protocol{" "}
    <Link href="/PrivacyPolicy">Privacy Policy</Link>
  </Text>
);

function WalletConnection({ children }: { children: React.ReactNode }) {
  const theme = useMemo(() => getTheme(), []);
  const queryClient = useMemo(() => new QueryClient(), []);
  const walletTheme = useMemo(() => createWalletTheme(theme), [theme]);

  const [isSiweEnabled, setIsSiweEnabled] = useState<boolean | null>(null);
  const { address, isConnected } = useAccount();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [previousAddress, setPreviousAddress] = useState<string | null>(null);

  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const hCaptchaRef = useRef<{ handleExecute: () => void }>(null);
  const oneid = useOneID();

  useEffect(() => {
    logger.log("WalletConnection mounted or dependencies changed");

    const checkAccountInSupabase = async () => {
      try {
        if (!address) {
          logger.error("Address is undefined. Cannot query Supabase.");
          setIsSiweEnabled(true);
          return;
        }

        logger.log("Checking Supabase for wallet address:", address);
        setLoading(true);

        const checkUserResponse = await fetch("/api/user/checkUser", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ address }),
        });

        const { exists, user } = await checkUserResponse.json();
        if (exists) {
          logger.log("User exists in Supabase. SIWE disabled.", user);
          setIsSiweEnabled(false);

          const result = await signIn("credentials", {
            address: address,
            redirect: false,
          });

          if (result?.error) {
            logger.error(
              "Failed to sign in via NextAuth credentials:",
              result.error
            );
          } else {
            logger.log(
              "Successfully signed in via NextAuth credentials",
              result
            );
            if (result?.ok && result.url) {
              router.push(result.url);
            } else {
              logger.error(
                "Sign-in failed or no URL returned for redirection."
              );
            }
          }
        } else {
          logger.log("User does not exist in Supabase. SIWE enabled.");
          setIsSiweEnabled(true);
          hCaptchaRef.current?.handleExecute();
        }
      } catch (err) {
        logger.error("Error during Supabase check:", err);
        setIsSiweEnabled(true);
      } finally {
        setLoading(false);
      }
    };

    const handleWalletChange = async () => {
      if (isConnected && address && previousAddress !== address) {
        logger.log("Wallet changed from:", previousAddress, "to:", address);
        setPreviousAddress(address);
        setLoading(false);
        setCaptchaToken(null);
        // await signOut({ redirect: false });
        setIsSiweEnabled(true);
        await checkAccountInSupabase();
      } else if (!isConnected && previousAddress) {
        logger.log("Wallet disconnected");
        setPreviousAddress(null);
      }
    };

    handleWalletChange();
  }, [isConnected, address]);

  const handleCaptchaVerify = async (token: string) => {
    setCaptchaToken(token);

    if (token && address) {
      try {
        logger.log("Verifying captcha and triggering SIWE...");
        const verifyResponse = await fetch("/api/auth/verify-captcha", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ captchaToken: token }),
        });

        if (!verifyResponse.ok) {
          throw new Error("Captcha verification failed");
        }

        setCaptchaToken(null);

        const signInResult = await signIn("credentials", { address });
        if (signInResult?.error) {
          logger.error("SIWE sign-in failed:", signInResult.error);
        } else {
          logger.log("SIWE sign-in successful, redirecting...");
        }
      } catch (err) {
        logger.error(
          "Error during captcha verification or SIWE sign-in:",
          err
        );
        setCaptchaToken(null);
      }
    }
  };

  return (
    <RainbowKitSiweNextAuthProvider
      enabled={isSiweEnabled === true}
      getSiweMessageOptions={getSiweMessageOptions}
    >
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          appInfo={{
            disclaimer: Disclaimer,
          }}
          theme={walletTheme}
          avatar={CustomAvatar}
        >
          <ThemeProvider theme={theme}>
            {children}
            {/* hCaptcha Modal */}
            <Modal
              open={
                isSiweEnabled === true &&
                captchaToken === null &&
                isConnected &&
                !loading
              }
            >
              <Box
                sx={{
                  p: 2,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: "100vh",
                }}
              >
                <HCaptchaComponent
                  onVerify={handleCaptchaVerify}
                  siteKey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY!}
                  ref={hCaptchaRef}
                />
              </Box>
            </Modal>
          </ThemeProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </RainbowKitSiweNextAuthProvider>
  );
}

export default React.memo(WalletConnection); // Memoize the component
