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
  getDefaultConfig,
  RainbowKitProvider,
  Theme as RainbowKitTheme,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
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

const walletConnectProjectId: string | undefined =
  process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID;

const infuraApiKey: string | undefined = process.env.NEXT_PUBLIC_INFURA_API_KEY;

const config = getDefaultConfig({
  appName: "Buzzkill - Honeycomb Hustle",
  projectId: `${walletConnectProjectId}`,
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
        </WagmiProvider>
      </body>
    </html>
  );
}
