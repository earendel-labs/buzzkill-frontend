"use client";

import { useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";
import { WagmiProvider } from "wagmi";
import { getDefaultConfig, DisclaimerComponent } from "@rainbow-me/rainbowkit";
import { vicMainnet, vicTestNet } from "@/app/libs/chains";
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
import type { Session } from "next-auth";
import { logger } from "@/utils/logger";
const Disclaimer: DisclaimerComponent = ({ Text, Link }) => (
  <Text>
    By connecting your wallet, you agree to the{" "}
    <Link href="/TermsOfService">Terms of Service</Link> and acknowledge you
    have read and understand the protocol{" "}
    <Link href="/PrivacyPolicy">Privacy Policy</Link>
  </Text>
);

// Load environment variables
const walletConnectProjectId: string =
  process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID ??
  (() => {
    throw new Error("NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID is not defined");
  })();

const infuraApiKey: string | undefined = process.env.NEXT_PUBLIC_INFURA_API_KEY;

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

// Props type for WalletConfiguration
type WalletConfigurationProps = {
  session: Session;
  children: React.ReactNode;
};

function WalletConfiguration({ session, children }: WalletConfigurationProps) {
  const [isProviderReady, setIsProviderReady] = useState(false);

  // Ensure WagmiProvider is mounted
  useEffect(() => {
    logger.log("WalletConfiguration mounted, WagmiProvider active");
    // Simulate provider readiness (you can add real async logic here if needed)
    setIsProviderReady(true);
  }, []);

  return (
    <>
      {/* Render the wallet provider setup once ready */}
      <WagmiProvider config={config}>
        <SessionProvider session={session}>
          <WalletConnection>{children}</WalletConnection>
        </SessionProvider>
      </WagmiProvider>
    </>
  );
}

export default WalletConfiguration;
