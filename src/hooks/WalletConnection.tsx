"use client";

import { useState, useEffect } from "react";
import {
  RainbowKitSiweNextAuthProvider,
  GetSiweMessageOptions,
} from "@rainbow-me/rainbowkit-siwe-next-auth";
import { useAccount } from "wagmi";
import { supabase } from "@/app/libs/supabaseClient";
import getTheme from "../theme/theme";
import { useMemo } from "react";
import "@rainbow-me/rainbowkit/styles.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { RainbowKitProvider, getDefaultConfig } from "@rainbow-me/rainbowkit";
import { vicMainnet, vicTestNet } from "@/app/libs/chains";
import {
  injectedWallet,
  rainbowWallet,
  walletConnectWallet,
  metaMaskWallet,
  ledgerWallet,
  coin98Wallet,
  trustWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { createWalletTheme } from "@/theme/walletTheme";
import {
  ThemeProvider,
  CircularProgress,
  Backdrop,
  Box,
  Skeleton,
} from "@mui/material"; // Import CircularProgress for loader

const walletConnectProjectId: string =
  process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID ??
  (() => {
    throw new Error("NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID is not defined");
  })();

const infuraApiKey: string | undefined = process.env.NEXT_PUBLIC_INFURA_API_KEY;

const config = getDefaultConfig({
  appName: "Buzzkill - Honeycomb Hustle",
  projectId: walletConnectProjectId,
  chains: [vicTestNet, vicMainnet],
  wallets: [
    {
      groupName: "Recommended",
      wallets: [coin98Wallet, metaMaskWallet, ledgerWallet],
    },
    {
      groupName: "Popular Wallets",
      wallets: [
        trustWallet,
        rainbowWallet,
        injectedWallet,
        walletConnectWallet,
      ],
    },
  ],
  ssr: false, // If your dApp uses server side rendering (SSR)
});

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
          .ilike("address", address) // Case-insensitive
          .maybeSingle();

        if (error) {
          console.error("Supabase query error:", error);
          setIsSiweEnabled(true); // Fail-safe: enable SIWE if there's an error
        } else if (userData) {
          console.log("User exists in Supabase. SIWE disabled.", userData);
          setIsSiweEnabled(false); // User exists, disable SIWE
        } else {
          console.log("User does not exist in Supabase. SIWE enabled.");
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
        <RainbowKitProvider theme={walletTheme}>
          <ThemeProvider theme={theme}>
            {/* Show loader if loading is true */}
            {loading ? (
              <Box display="flex" justifyContent="center" alignItems="center">
                <Skeleton variant="rectangular" width={180} height={50} />
              </Box>
            ) : (
              children
            )}
          </ThemeProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </RainbowKitSiweNextAuthProvider>
  );
}

export default WalletConnection;
