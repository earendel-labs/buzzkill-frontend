"use client";

import { useState, useEffect, useRef } from "react";
import {
  RainbowKitSiweNextAuthProvider,
  GetSiweMessageOptions,
} from "@rainbow-me/rainbowkit-siwe-next-auth";
import { useAccount } from "wagmi";
import { supabase } from "@/app/libs/supabaseClient";
import { signIn, signOut } from "next-auth/react"; // Import signIn from next-auth/react
import getTheme from "../theme/theme";
import { useMemo } from "react";
import "@rainbow-me/rainbowkit/styles.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { createWalletTheme } from "@/theme/walletTheme";
import { ThemeProvider, Box, Skeleton, Modal } from "@mui/material";
import CustomAvatar from "@/components/User/CustomAvatar";
import { useRouter } from "next/navigation"; // Import the router
import HCaptchaComponent from "@/components/Verification/HCaptchaComponent";

const getSiweMessageOptions: GetSiweMessageOptions = () => ({
  statement: "Sign in to the Buzzkill World",
});

function WalletConnection({ children }: { children: React.ReactNode }) {
  const theme = useMemo(() => getTheme(), []);
  const queryClient = new QueryClient();
  const walletTheme = useMemo(() => createWalletTheme(theme), [theme]);

  const [isSiweEnabled, setIsSiweEnabled] = useState(true); // Control SIWE flow
  const { address, isConnected } = useAccount(); // Get connected wallet address
  const [loading, setLoading] = useState(false); // State to control loading indicator
  const router = useRouter(); // Initialize router
  const [previousAddress, setPreviousAddress] = useState<string | null>(null); // Track previous address

  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const hCaptchaRef = useRef<{ handleExecute: () => void }>(null); // Using the correct type

  useEffect(() => {
    console.log("WalletConnection mounted");

    const checkAccountInSupabase = async () => {
      try {
        if (!address) {
          console.error("Address is undefined. Cannot query Supabase.");
          setIsSiweEnabled(true); // Enable SIWE by default if no address is present
          setLoading(false); // Disable loader if address is missing
          return;
        }

        console.log("Checking Supabase for wallet address:", address);
        setLoading(true); // Start loading before making the request

        const checkUserResponse = await fetch("/api/user/checkUser", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ address }),
        });

        const { exists, user } = await checkUserResponse.json();
        if (exists) {
          console.log("User exists in Supabase. SIWE disabled.", user);
          setIsSiweEnabled(false); // User exists, disable SIWE

          // Sign in to NextAuth manually using credentials provider
          const result = await signIn("credentials", {
            address: address,
            redirect: false, // Prevent full-page reload
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
              // Redirect to the URL if it exists
              router.push(result.url);
            } else {
              console.error(
                "Sign-in failed or no URL returned for redirection."
              );
            }
          }
        } else {
          console.log("User does not exist in Supabase. SIWE enabled.");
          console.log("userData", user);
          hCaptchaRef.current?.handleExecute();
          setIsSiweEnabled(true); // User does not exist, enable SIWE
        }
      } catch (err) {
        console.error("Error during Supabase check:", err);
        setIsSiweEnabled(true); // Enable SIWE on error
      } finally {
        setLoading(false); // Stop loading after request finishes
      }
    };

    // Detect wallet change
    const handleWalletChange = async () => {
      if (isConnected && address && previousAddress !== address) {
        console.log("Wallet changed from:", previousAddress, "to:", address);
        setPreviousAddress(address); // Update the previous address to the current one
        setLoading(false);
        setCaptchaToken(null);
        // Step 1: Sign out the current session to ensure no old session remains
        await signOut({ redirect: false }); // Clear the current session without full-page reload

        // Step 2: Enable SIWE by default for the new wallet
        setIsSiweEnabled(true);

        // Step 3: Check if the new wallet address exists in Supabase
        await checkAccountInSupabase(); // This should trigger the SIWE or account creation flow
      } else if (!isConnected && previousAddress) {
        console.log("Wallet disconnected");
        setPreviousAddress(null); // Clear the previous address when disconnected
      }
    };

    handleWalletChange();
  }, [isConnected, address, previousAddress]);

  const handleCaptchaVerify = async (token: string) => {
    setCaptchaToken(token);

    if (token && address) {
      await fetch("/api/auth/verify-captcha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ captchaToken: token }),
      });

      await signIn("credentials", { address });
      setCaptchaToken(null);
    }
  };

  return (
    <RainbowKitSiweNextAuthProvider
      enabled={isSiweEnabled} // Conditionally enable SIWE based on user existence
      getSiweMessageOptions={getSiweMessageOptions}
    >
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={walletTheme} avatar={CustomAvatar}>
          <ThemeProvider theme={theme}>
            {children}
            {/* hCaptcha Modal */}
            <Modal
              open={
                isSiweEnabled &&
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

export default WalletConnection;
