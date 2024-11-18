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
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { createWalletTheme } from "@/theme/walletTheme";
import { ThemeProvider, Box, Modal } from "@mui/material";
import CustomAvatar from "@/components/User/CustomAvatar";
import { useRouter } from "next/navigation";
import HCaptchaComponent from "@/components/Verification/HCaptchaComponent";
import { OneIDProvider, useOneID } from "@/context/OneIDContext";
import React from "react";

const getSiweMessageOptions: GetSiweMessageOptions = () => ({
  statement: "Sign in to the Buzzkill World",
});

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
    console.log("WalletConnection mounted or dependencies changed");

    const checkAccountInSupabase = async () => {
      try {
        if (!address) {
          console.error("Address is undefined. Cannot query Supabase.");
          setIsSiweEnabled(true);
          return;
        }

        console.log("Checking Supabase for wallet address:", address);
        setLoading(true);

        const checkUserResponse = await fetch("/api/user/checkUser", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ address }),
        });

        const { exists, user } = await checkUserResponse.json();
        if (exists) {
          console.log("User exists in Supabase. SIWE disabled.", user);
          setIsSiweEnabled(false);

          const result = await signIn("credentials", {
            address: address,
            redirect: false,
          });

          if (result?.error) {
            console.error(
              "Failed to sign in via NextAuth credentials:",
              result.error
            );
          } else {
            console.log(
              "Successfully signed in via NextAuth credentials",
              result
            );
            if (result?.ok && result.url) {
              router.push(result.url);
            } else {
              console.error(
                "Sign-in failed or no URL returned for redirection."
              );
            }
          }
        } else {
          console.log("User does not exist in Supabase. SIWE enabled.");
          setIsSiweEnabled(true);
          hCaptchaRef.current?.handleExecute();
        }
      } catch (err) {
        console.error("Error during Supabase check:", err);
        setIsSiweEnabled(true);
      } finally {
        setLoading(false);
      }
    };

    const handleWalletChange = async () => {
      if (isConnected && address && previousAddress !== address) {
        console.log("Wallet changed from:", previousAddress, "to:", address);
        setPreviousAddress(address);
        setLoading(false);
        setCaptchaToken(null);
        await signOut({ redirect: false });
        setIsSiweEnabled(true);
        await checkAccountInSupabase();
      } else if (!isConnected && previousAddress) {
        console.log("Wallet disconnected");
        setPreviousAddress(null);
      }
    };

    handleWalletChange();
  }, [isConnected, address]); // Removed previousAddress from dependencies

  const handleCaptchaVerify = async (token: string) => {
    setCaptchaToken(token);

    if (token && address) {
      try {
        console.log("Verifying captcha and triggering SIWE...");
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
          console.error("SIWE sign-in failed:", signInResult.error);
        } else {
          console.log("SIWE sign-in successful, redirecting...");
        }
      } catch (err) {
        console.error(
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
        <RainbowKitProvider theme={walletTheme} avatar={CustomAvatar}>
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
