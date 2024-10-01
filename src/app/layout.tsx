// RootLayout.tsx
import "../styles/globals.css";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import getTheme from "../theme/theme";
import { useMemo } from "react";

import type { Session } from "next-auth";
import { SoundProvider } from "@/context/SoundContext";
import { LoadingProvider } from "@/context/LoadingContext";
import GlobalScrollbarStyles from "@/theme/TextStyles/ScrollBar/scrollBarStyles";
import { SpeedInsights } from "@vercel/speed-insights/next";
import WalletConfiguration from "@/hooks/WalletConfiguration";
export default function RootLayout({
  children,
  session,
}: Readonly<{ session: Session; children: React.ReactNode }>) {
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
        <WalletConfiguration session={session}>
          <LoadingProvider>
            <SoundProvider>
              <CssBaseline />
              <GlobalScrollbarStyles />
              {children}
              <SpeedInsights />
            </SoundProvider>
          </LoadingProvider>
        </WalletConfiguration>
      </body>
    </html>
  );
}
