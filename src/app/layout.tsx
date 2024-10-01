"use client";

import "../styles/globals.css";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import getTheme from "../theme/theme";
import { useMemo } from "react";
import { SoundProvider } from "@/context/SoundContext";
import { LoadingProvider } from "@/context/LoadingContext";
import GlobalScrollbarStyles from "@/theme/TextStyles/ScrollBar/scrollBarStyles";
import { SpeedInsights } from "@vercel/speed-insights/next";

import "@rainbow-me/rainbowkit/styles.css";
import {
  RainbowKitSiweNextAuthProvider,
  GetSiweMessageOptions,
} from "@rainbow-me/rainbowkit-siwe-next-auth";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";

import {
  getDefaultConfig,
  RainbowKitProvider,
  Theme,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi"; // Updated to WagmiConfig in wagmi v1
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { vicMainnet, vicTestNet } from "./libs/chains";
import {
  injectedWallet,
  rainbowWallet,
  walletConnectWallet,
  metaMaskWallet,
  ledgerWallet,
  coin98Wallet,
  trustWallet,
} from "@rainbow-me/rainbowkit/wallets";

import { createWalletTheme } from "@/theme/walletTheme"; // Custom wallet theme

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
  ssr: true, // If your dApp uses server side rendering (SSR)
});

const getSiweMessageOptions: GetSiweMessageOptions = () => ({
  statement: "Sign in to the Buzzkill World",
});

export default function RootLayout({
  children,
  session,
}: Readonly<{ session: Session; children: React.ReactNode }>) {
  const theme = useMemo(() => getTheme(), []);
  const queryClient = new QueryClient();

  // Create the wallet theme based on your Material UI theme
  const walletTheme = useMemo(() => createWalletTheme(theme), [theme]);

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <meta
          name="description"
          content="Buzzkill - HoneyComb Hustle created by the Earendal Labs Team"
        />
        <meta name="keywords" content="Buzzkill Web3 Gaming" />
        <meta property="og:title" content="Buzzkill - Honeycomb Hustle" />
        <meta
          property="og:description"
          content="Buzzkill - HoneyComb Hustle created by the Earendal Labs Team"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://buzzkill.world/" />
        <meta
          property="og:image"
          content="https://buzzkill.world/images/og-image.jpg"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://buzzkill.world/" />
        <title>Buzzkill - Play Game</title>
      </head>
      <body>
        <WagmiProvider config={config}>
          <SessionProvider refetchInterval={0} session={session}>
            <RainbowKitSiweNextAuthProvider
              getSiweMessageOptions={getSiweMessageOptions}
            >
              <QueryClientProvider client={queryClient}>
                <RainbowKitProvider theme={walletTheme}>
                  <LoadingProvider>
                    <SoundProvider>
                      <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <GlobalScrollbarStyles />
                        {children}
                        <SpeedInsights />
                      </ThemeProvider>
                    </SoundProvider>
                  </LoadingProvider>
                </RainbowKitProvider>
              </QueryClientProvider>
            </RainbowKitSiweNextAuthProvider>
          </SessionProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}