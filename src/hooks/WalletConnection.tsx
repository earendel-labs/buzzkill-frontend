"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { useAccount } from "wagmi";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  RainbowKitSiweNextAuthProvider,
  GetSiweMessageOptions,
} from "@rainbow-me/rainbowkit-siwe-next-auth";
import {
  RainbowKitProvider,
  DisclaimerComponent,
} from "@rainbow-me/rainbowkit";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ThemeProvider, Box, Modal } from "@mui/material";
import CustomAvatar from "@/components/User/CustomAvatar";

import getTheme from "../theme/theme";
import "@rainbow-me/rainbowkit/styles.css";
import { createWalletTheme } from "@/theme/walletTheme";
import { useRouter } from "next/navigation";
import HCaptchaComponent from "@/components/Verification/HCaptchaComponent";
import { useOneID } from "@/context/OneIDContext";
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

  const { address, isConnected } = useAccount();
  const { data: session, status } = useSession();

  const [isSiweEnabled, setIsSiweEnabled] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const [previousAddress, setPreviousAddress] = useState<string | null>(null);

  // We use these to control captcha flow for new addresses
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [didSolveCaptchaForAddress, setDidSolveCaptchaForAddress] =
    useState(false);

  const hCaptchaRef = useRef<{ handleExecute: () => void }>(null);
  const oneid = useOneID();

  // Whenever address changes, reset captcha so it can be solved again for the new wallet
  useEffect(() => {
    if (previousAddress && address && previousAddress !== address) {
      setDidSolveCaptchaForAddress(false);
    }
  }, [address, previousAddress]);

  // Core effect that triggers on wallet connect or address change
  useEffect(() => {
    logger.log(
      "WalletConnection effect triggered: address=",
      address,
      "isConnected=",
      isConnected
    );

    // If not connected, reset everything and skip
    if (!isConnected) {
      setPreviousAddress(null);
      setIsSiweEnabled(null);
      setLoading(false);
      setCaptchaToken(null);
      logger.log("Wallet disconnected, skipping checks");
      return;
    }

    // If we already processed the same address, do nothing
    if (previousAddress === address) {
      logger.log("Same address as before, skipping checks");
      return;
    }

    // Start the new address flow
    setPreviousAddress(address || null);
    setIsSiweEnabled(true);

    // Check if the user is already authenticated with NextAuth for this same address
    // If yes, skip re-signing in
    if (
      session?.address &&
      session.address.toLowerCase() === address?.toLowerCase()
    ) {
      logger.log(
        "User is already signed in with the same address, no further checks needed"
      );
      setIsSiweEnabled(false);
      return;
    }

    // Otherwise, call your Supabase check
    const checkAccountInSupabase = async () => {
      try {
        logger.log("Checking Supabase for wallet address:", address);
        setLoading(true);

        const checkUserResponse = await fetch("/api/user/checkUser", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ address }),
        });

        const { exists, user } = await checkUserResponse.json();
        if (exists) {
          logger.log(
            "User exists in Supabase. SIWE disabled for known user:",
            user
          );
          setIsSiweEnabled(false);

          // If not authenticated, sign them in via credentials
          if (!session?.address) {
            const result = await signIn("credentials", {
              address,
              redirect: false,
            });

            if (result?.error) {
              logger.error(
                "Failed to sign in via NextAuth credentials:",
                result.error
              );
            } else {
              logger.log("Successfully signed in via NextAuth credentials");
              if (result?.ok && result.url) {
                router.push(result.url);
              }
            }
          }
        } else {
          // If user does not exist, enable SIWE and trigger captcha for new user
          logger.log(
            "User does not exist in Supabase -> SIWE enabled, showing hCaptcha"
          );
          setIsSiweEnabled(true);

          // Only trigger the captcha if we haven't solved it for this address
          if (!didSolveCaptchaForAddress) {
            hCaptchaRef.current?.handleExecute();
          }
        }
      } catch (err) {
        logger.error("Error during Supabase check:", err);
        setIsSiweEnabled(true);
      } finally {
        setLoading(false);
      }
    };

    void checkAccountInSupabase();
  }, [isConnected, address, session?.address, previousAddress]);

  // Handle the actual captcha verification
  const handleCaptchaVerify = async (token: string) => {
    setCaptchaToken(token);

    if (token && address) {
      try {
        logger.log("Verifying captcha token with server...");
        const verifyResponse = await fetch("/api/auth/verify-captcha", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ captchaToken: token }),
        });

        if (!verifyResponse.ok) {
          throw new Error("Captcha verification failed");
        }

        // Mark that we solved captcha for this address
        setDidSolveCaptchaForAddress(true);
        setCaptchaToken(null);

        // Now call signIn with the SIWE flow (RainbowKit will do the signature, etc.)
        // Or if you want to do a "credentials" approach with an address:
        // If NextAuth still sees user as unauthenticated, sign them in
        if (!session?.address) {
          const signInResult = await signIn("credentials", {
            address,
          });

          if (signInResult?.error) {
            logger.error("SIWE sign-in failed:", signInResult.error);
          } else {
            logger.log("SIWE sign-in successful, redirecting if needed...");
          }
        }
      } catch (err) {
        logger.error("Error during captcha verification or SIWE sign-in:", err);
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

            {/* hCaptcha Modal for new or unverified addresses */}
            <Modal
              open={
                isSiweEnabled === true &&
                !didSolveCaptchaForAddress &&
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

export default React.memo(WalletConnection);
