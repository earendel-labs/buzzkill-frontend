import "../styles/globals.css";

import CssBaseline from "@mui/material/CssBaseline";
import type { Session } from "next-auth";
import { SoundProvider } from "@/context/SoundContext";
import { LoadingProvider, useLoading } from "@/context/LoadingContext";
import GlobalScrollbarStyles from "@/theme/TextStyles/ScrollBar/scrollBarStyles";
import { SpeedInsights } from "@vercel/speed-insights/next";
import WalletConfiguration from "@/hooks/WalletConfiguration";
import { UserProvider } from "@/context/UserContext";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import { EnvironmentProvider } from "@/context/EnvironmentContext";

// Load Google Poppins font using next/font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Load custom "Vera Humana 95" font from src/fonts/
const veraHumana = localFont({
  src: [
    {
      path: "../../public/fonts/verahumana95-regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/verahumana95-bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
});

export default function RootLayout({
  children,
  session,
}: Readonly<{ session: Session; children: React.ReactNode }>) {
  return (
    <html lang="en" className={veraHumana.className}>
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
              <UserProvider>
                <CssBaseline />
                <GlobalScrollbarStyles />
                <EnvironmentProvider>
                  {children}

                  <SpeedInsights />
                </EnvironmentProvider>
              </UserProvider>
            </SoundProvider>
          </LoadingProvider>
        </WalletConfiguration>
      </body>
    </html>
  );
}
