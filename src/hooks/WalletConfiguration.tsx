"use client";

import { useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react"; // Removed as SessionProvider is now in layout.tsx
import { WagmiProvider } from "wagmi";
import { getDefaultConfig, DisclaimerComponent } from "@rainbow-me/rainbowkit";
import { vicMainnet } from "@/app/libs/chains";
import WalletConnection from "@/hooks/WalletConnection";
import {
  injectedWallet,
  rainbowWallet,
  walletConnectWallet,
  metaMaskWallet,
  ledgerWallet,
  coin98Wallet,
  trustWallet,
  ramperWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { logger } from "@/app/utils/logger";

// Removed session prop as it's no longer needed
function WalletConfiguration({ children }: { children: React.ReactNode }) {
  const [isProviderReady, setIsProviderReady] = useState(false);

  // Ensure WagmiProvider is mounted
  useEffect(() => {
    logger.log("WalletConfiguration mounted, WagmiProvider active");
    // Simulate provider readiness (you can add real async logic here if needed)
    setIsProviderReady(true);
  }, []);

  // Load environment variables
  const walletConnectProjectId: string =
    process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID ??
    (() => {
      throw new Error("NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID is not defined");
    })();

  // Wagmi and RainbowKit configuration
  const config = getDefaultConfig({
    appName: "Buzzkill - Honeycomb Hustle",
    projectId: walletConnectProjectId,
    chains: [vicMainnet],
    wallets: [
      {
        groupName: "Recommended",
        wallets: [coin98Wallet, metaMaskWallet, ramperWallet, ledgerWallet],
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
    ssr: true, // Support SSR if required
  });

  return (
    <>
      {/* Render the wallet provider setup once ready */}
      {isProviderReady && (
        <WagmiProvider config={config}>
          <WalletConnection>{children}</WalletConnection>
        </WagmiProvider>
      )}
    </>
  );
}

export default WalletConfiguration;
