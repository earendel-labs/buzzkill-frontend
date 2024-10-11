"use client";

import { useState, useEffect } from "react";
import {
  RainbowKitSiweNextAuthProvider,
  GetSiweMessageOptions,
} from "@rainbow-me/rainbowkit-siwe-next-auth";
import { useAccount } from "wagmi";
import { supabase } from "@/app/libs/supabaseClient";
import { signIn } from "next-auth/react"; // Import signIn from next-auth/react
import getTheme from "../theme/theme";
import { useMemo } from "react";
import "@rainbow-me/rainbowkit/styles.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { createWalletTheme } from "@/theme/walletTheme";
import { ThemeProvider, Box, Skeleton } from "@mui/material";
import CustomAvatar from "@/components/User/CustomAvatar";
import { useRouter } from "next/navigation"; // Import the router

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
 
        const { data: userData, error } = await supabase
          .from("users")
          .select("*")
          .eq("address", address)
          .maybeSingle();

        if (error) {
          console.error("Supabase query error:", error);
          setIsSiweEnabled(true); // Fail-safe: enable SIWE if there's an error
        } else if (userData) {
          console.log("User exists in Supabase. SIWE disabled.", userData);
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
          console.log("userData", userData);
          setIsSiweEnabled(true); // User does not exist, enable SIWE
        }
      } catch (err) {
        console.error("Error during Supabase check:", err);
        setIsSiweEnabled(true); // Enable SIWE on error
      } finally {
        setLoading(false); // Stop loading after request finishes
      }
    };

    if (isConnected) {
      console.log("Wallet is connected with address:", address);

      // Check if the wallet address exists in Supabase
      checkAccountInSupabase();
    } else {
      console.log("Wallet is not connected");
    }
  }, [isConnected, address]);

  return (
    <RainbowKitSiweNextAuthProvider
      enabled={isSiweEnabled} // Conditionally enable SIWE based on user existence
      getSiweMessageOptions={getSiweMessageOptions}
    >
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={walletTheme} avatar={CustomAvatar}>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </RainbowKitSiweNextAuthProvider>
  );
}

export default WalletConnection;
