"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { useAccount } from "wagmi";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  RainbowKitSiweNextAuthProvider,
  GetSiweMessageOptions,
} from "@rainbow-me/rainbowkit-siwe-next-auth";
import {
  RainbowKitProvider,
  DisclaimerComponent,
} from "@rainbow-me/rainbowkit";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ThemeProvider, Box, Modal } from "@mui/material";
import CustomAvatar from "@/components/User/CustomAvatar";
import { GlobalStyles } from "@mui/material";
import getTheme from "../theme/theme";
import "@rainbow-me/rainbowkit/styles.css";
import { createWalletTheme } from "@/theme/walletTheme";
import { useRouter } from "next/navigation";
import HCaptchaComponent from "@/components/Verification/HCaptchaComponent";
import { useOneID } from "@/context/OneIDContext";
import { logger } from "@/utils/logger";

const getSiweMessageOptions: GetSiweMessageOptions = () => ({
  statement: "Sign in to the Buzzkill World",
});

const Disclaimer: DisclaimerComponent = ({ Text, Link }) => (
  <Text>
    By connecting your wallet, you agree to the{" "}
    <Link href="/TermsOfService">Terms of Service</Link> and acknowledge you
    have read and understand Buzzkill's{" "}
    <Link href="/PrivacyPolicy">Privacy Policy</Link>
  </Text>
);

function WalletConnection({ children }: { children: React.ReactNode }) {
  const theme = useMemo(() => getTheme(), []);
  const queryClient = useMemo(() => new QueryClient(), []);
  const walletTheme = useMemo(() => createWalletTheme(theme), [theme]);

  const { address, isConnected } = useAccount();
  const { data: session, status } = useSession();

  const [isSiweEnabled, setIsSiweEnabled] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const [previousAddress, setPreviousAddress] = useState<string | null>(null);

  // We use these to control captcha flow for new addresses
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [didSolveCaptchaForAddress, setDidSolveCaptchaForAddress] =
    useState(false);

  const hCaptchaRef = useRef<{ handleExecute: () => void }>(null);
  const oneid = useOneID();

  // Whenever address changes, reset captcha so it can be solved again for the new wallet
  useEffect(() => {
    if (previousAddress && address && previousAddress !== address) {
      setDidSolveCaptchaForAddress(false);
    }
  }, [address, previousAddress]);

  // Core effect that triggers on wallet connect or address change
  useEffect(() => {
    logger.log(
      "WalletConnection effect triggered: address=",
      address,
      "isConnected=",
      isConnected
    );

    // If not connected, reset everything and skip
    if (!isConnected) {
      setPreviousAddress(null);
      setIsSiweEnabled(null);
      setLoading(false);
      setCaptchaToken(null);
      logger.log("Wallet disconnected, skipping checks");
      return;
    }

    // If we already processed the same address, do nothing
    if (previousAddress === address) {
      logger.log("Same address as before, skipping checks");
      return;
    }

    // Start the new address flow
    setPreviousAddress(address || null);
    setIsSiweEnabled(true);

    // Check if the user is already authenticated with NextAuth for this same address
    // If yes, skip re-signing in
    if (
      session?.address &&
      session.address.toLowerCase() === address?.toLowerCase()
    ) {
      logger.log(
        "User is already signed in with the same address, no further checks needed"
      );
      setIsSiweEnabled(false);
      return;
    }

    // Otherwise, call your Supabase check
    const checkAccountInSupabase = async () => {
      try {
        logger.log("Checking Supabase for wallet address:", address);
        setLoading(true);

        const checkUserResponse = await fetch("/api/user/checkUser", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ address }),
        });

        const { exists, user } = await checkUserResponse.json();
        if (exists) {
          logger.log(
            "User exists in Supabase. SIWE disabled for known user:",
            user
          );
          setIsSiweEnabled(false);

          // If not authenticated, sign them in via credentials
          if (!session?.address) {
            const result = await signIn("credentials", {
              address,
              redirect: false,
            });

            if (result?.error) {
              logger.error(
                "Failed to sign in via NextAuth credentials:",
                result.error
              );
            } else {
              logger.log("Successfully signed in via NextAuth credentials");
              if (result?.ok && result.url) {
                router.push(result.url);
              }
            }
          }
        } else {
          // If user does not exist, enable SIWE and trigger captcha for new user
          logger.log(
            "User does not exist in Supabase -> SIWE enabled, showing hCaptcha"
          );
          setIsSiweEnabled(true);

          // Only trigger the captcha if we haven't solved it for this address
          if (!didSolveCaptchaForAddress) {
            hCaptchaRef.current?.handleExecute();
          }
        }
      } catch (err) {
        logger.error("Error during Supabase check:", err);
        setIsSiweEnabled(true);
      } finally {
        setLoading(false);
      }
    };

    void checkAccountInSupabase();
  }, [isConnected, address, session?.address, previousAddress]);

  // Handle the actual captcha verification
  const handleCaptchaVerify = async (token: string) => {
    setCaptchaToken(token);

    if (token && address) {
      try {
        logger.log("Verifying captcha token with server...");
        const verifyResponse = await fetch("/api/auth/verify-captcha", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ captchaToken: token }),
        });

        if (!verifyResponse.ok) {
          throw new Error("Captcha verification failed");
        }

        // Mark that we solved captcha for this address
        setDidSolveCaptchaForAddress(true);
        setCaptchaToken(null);

        // Now call signIn with the SIWE flow (RainbowKit will do the signature, etc.)
        // Or if you want to do a "credentials" approach with an address:
        // If NextAuth still sees user as unauthenticated, sign them in
        if (!session?.address) {
          const signInResult = await signIn("credentials", {
            address,
          });

          if (signInResult?.error) {
            logger.error("SIWE sign-in failed:", signInResult.error);
          } else {
            logger.log("SIWE sign-in successful, redirecting if needed...");
          }
        }
      } catch (err) {
        logger.error("Error during captcha verification or SIWE sign-in:", err);
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
        <RainbowKitProvider
          modalSize="compact"
          appInfo={{
            disclaimer: Disclaimer,
          }}
          theme={walletTheme}
          avatar={CustomAvatar}
        >
          <ThemeProvider theme={theme}>
            <GlobalStyles
              styles={{
                // Hide "What is a Wallet?" section
                ".iekbcc0.ju367v7e.ju367v7z.ju367v4.ju367va.ju367v15.ju367v1z":
                  {
                    display: "none !important",
                  },
                // Hide "Get a Wallet" and "Learn More" row
                ".iekbcc0.ju367v7b.ju367v7w.ju367v8k": {
                  display: "none !important",
                },

                // For vertical Mobile
                "@media (max-width: 630px) and (orientation: portrait)": {
                  ".iekbcc0.ju367va[style='margin: 0px auto;']": {
                    display: "flex !important",
                    flexWrap: "wrap !important",
                    justifyContent: "center !important",
                    gap: "12px !important",
                  },
                  ".iekbcc0.ju367va[style='margin: 0px auto;'] > .iekbcc0.ju367v7b.ju367v7w":
                    {
                      minWidth: "120px !important",
                      margin: "0 auto !important",
                    },
                  "#rk_connect_title": {
                    content: '""',
                    position: "relative",
                    color: "transparent",
                  },
                  "#rk_connect_title::before": {
                    content: '""',
                    display: "inline-block",
                    width: "48px",
                    height: "48px",
                    verticalAlign: "middle",
                    background: "url('/favicon.ico') no-repeat center center",
                    backgroundSize: "contain",
                    marginRight: "48px",
                  },
                  "#rk_connect_title::after": {
                    content: '"Connect to Buzzkill"',
                    display: "inline-block",
                    verticalAlign: "middle",
                    position: "absolute",
                    top: "28%",
                    left: "28%",
                    color: "#fff", // light blue
                    whiteSpace: "nowrap",
                  },
                },

                // For horziontal Mobile
                "@media (max-width: 630px) and (orientation: landscape)": {
                  ".iekbcc0.ju367va[style='margin: 0px auto;']": {
                    display: "flex !important",
                    flexWrap: "wrap !important",
                    justifyContent: "center !important",
                    gap: "12px !important",
                  },
                  ".iekbcc0.ju367va[style='margin: 0px auto;'] > .iekbcc0.ju367v7b.ju367v7w":
                    {
                      minWidth: "120px !important",
                      margin: "0 auto !important",
                    },
                  "#rk_connect_title": {
                    content: '""',
                    position: "relative",
                    color: "transparent",
                  },
                  "#rk_connect_title::before": {
                    content: '""',
                    display: "inline-block",
                    width: "48px",
                    height: "48px",
                    verticalAlign: "middle",
                    background: "url('/favicon.ico') no-repeat center center",
                    backgroundSize: "contain",
                    marginRight: "48px",
                  },
                  "#rk_connect_title::after": {
                    content: '"Connect to Buzzkill"',
                    display: "inline-block",
                    verticalAlign: "middle",
                    position: "absolute",
                    top: "28%",
                    left: "32%",
                    color: "#fff", // dark blue
                    whiteSpace: "nowrap",
                  },
                },

                // Devices with max-width 960px in landscape mode
                "@media (max-width: 960px) and (orientation: landscape)": {
                  ".iekbcc0._1ckjpok2._1ckjpok1.ju367vb6.ju367vdr.ju367vp.ju367vt.ju367vv.ju367vel.ju367va.ju367v15.ju367v6c.ju367v8r._1ckjpok6.ju367vq._1ckjpok7":
                    {
                      width: "100vw !important",
                      maxWidth: "none !important",
                    },
                  "#rk_connect_title": {
                    content: '""',
                    position: "relative",
                    color: "transparent",
                  },
                  "#rk_connect_title::before": {
                    content: '""',
                    display: "inline-block",
                    width: "48px",
                    height: "48px",
                    verticalAlign: "middle",
                    background: "url('/favicon.ico') no-repeat center center",
                    backgroundSize: "contain",
                    marginRight: "36px",
                  },
                  "#rk_connect_title::after": {
                    content: '"Connect to Buzzkill"',
                    display: "inline-block",
                    verticalAlign: "middle",
                    position: "absolute",
                    top: "28%",
                    left: "42%",
                    color: "#fff", // light orange
                    whiteSpace: "nowrap",
                  },
                },

                // Devices with max-width 960px in portrait mode
                "@media (min-width: 630px) and (max-width: 960px) and (orientation: portrait)":
                  {
                    ".iekbcc0._1ckjpok2._1ckjpok1.ju367vb6.ju367vdr.ju367vp.ju367vt.ju367vv.ju367vel.ju367va.ju367v15.ju367v6c.ju367v8r._1ckjpok6.ju367vq._1ckjpok7":
                      {
                        width: "100vw !important", // Update with portrait-specific values if needed
                        maxWidth: "none !important", // Update with portrait-specific values if needed
                      },
                    "#rk_connect_title": {
                      content: '""',
                      position: "relative",
                      color: "transparent", // Update if needed for portrait
                    },
                    "#rk_connect_title::before": {
                      content: '""',
                      display: "inline-block",
                      width: "48px",
                      height: "48px",
                      verticalAlign: "middle",
                      background: "url('/favicon.ico') no-repeat center center",
                      backgroundSize: "contain",
                      marginRight: "36px", // Update if needed for portrait
                    },
                    "#rk_connect_title::after": {
                      content: '"Connect to Buzzkill"',
                      display: "inline-block",
                      verticalAlign: "middle",
                      position: "absolute",
                      top: "28%", // Update if needed for portrait
                      left: "26%", // Update if needed for portrait
                      color: "#fff", // light green
                      whiteSpace: "nowrap",
                    },
                  },

                // For screens between 961px and 1100px
                "@media (min-width: 961px) and (max-width: 1100px) and (orientation: portrait)":
                  {
                    ".iekbcc0._1ckjpok2._1ckjpok1.ju367vb6.ju367vdr.ju367vp.ju367vt.ju367vv.ju367vel.ju367va.ju367v15.ju367v6c.ju367v8r._1ckjpok6.ju367vq._1ckjpok7":
                      {
                        width: "100vw !important",
                        maxWidth: "none !important",
                      },
                    "#rk_connect_title": {
                      content: '""',
                      position: "relative",
                      color: "transparent",
                    },
                    "#rk_connect_title::before": {
                      content: '""',
                      display: "inline-block",
                      width: "48px",
                      height: "48px",
                      verticalAlign: "middle",
                      background: "url('/favicon.ico') no-repeat center center",
                      backgroundSize: "contain",
                      marginRight: "36px",
                    },
                    "#rk_connect_title::after": {
                      content: '"Connect to Buzzkill"',
                      display: "inline-block",
                      verticalAlign: "middle",
                      position: "absolute",
                      top: "28%",
                      left: "42%",
                      color: "#fff", // pink
                      whiteSpace: "nowrap",
                    },
                  },

                // For screens between 961px and 1100px
                "@media (min-width: 961px) and (max-width: 1100px) and (orientation: landscape)":
                  {
                    ".iekbcc0._1ckjpok2._1ckjpok1.ju367vb6.ju367vdr.ju367vp.ju367vt.ju367vv.ju367vel.ju367va.ju367v15.ju367v6c.ju367v8r._1ckjpok6.ju367vq._1ckjpok7":
                      {
                        width: "100vw !important",
                        maxWidth: "none !important",
                      },
                    "#rk_connect_title": {
                      content: '""',
                      position: "relative",
                      color: "transparent",
                    },
                    "#rk_connect_title::before": {
                      content: '""',
                      display: "inline-block",
                      width: "48px",
                      height: "48px",
                      verticalAlign: "middle",
                      background: "url('/favicon.ico') no-repeat center center",
                      backgroundSize: "contain",
                      marginRight: "36px",
                    },
                    "#rk_connect_title::after": {
                      content: '"Connect to Buzzkill"',
                      display: "inline-block",
                      verticalAlign: "middle",
                      position: "absolute",
                      top: "28%",
                      left: "43%",
                      color: "#fff", // purple
                      whiteSpace: "nowrap",
                    },
                  },
                // For screens larger than 1100px and portrait
                "@media (min-width: 1101px) and (orientation: portrait)": {
                  ".iekbcc0._1ckjpok2._1ckjpok1.ju367vb6.ju367vdr.ju367vp.ju367vt.ju367vv.ju367vel.ju367va.ju367v15.ju367v6c.ju367v8r._1ckjpok6.ju367vq._1ckjpok7":
                    {
                      width: "100vw !important",
                      maxWidth: "none !important",
                    },
                  "#rk_connect_title": {
                    content: '""',
                    position: "relative",
                    color: "transparent",
                  },
                  "#rk_connect_title::before": {
                    content: '""',
                    display: "inline-block",
                    width: "48px",
                    height: "48px",
                    verticalAlign: "middle",
                    background: "url('/favicon.ico') no-repeat center center",
                    backgroundSize: "contain",
                    marginRight: "36px",
                  },
                  "#rk_connect_title::after": {
                    content: '"Connect to Buzzkill"',
                    display: "inline-block",
                    verticalAlign: "middle",
                    position: "absolute",
                    top: "28%",
                    left: "26%",
                    color: "#fff", // light yellow
                    whiteSpace: "nowrap",
                  },
                },

                // For screens larger than 1100px
                "@media (min-width: 1101px) and (orientation: landscape)": {
                  ".iekbcc0._1ckjpok2._1ckjpok1.ju367vb6.ju367vdr.ju367vp.ju367vt.ju367vv.ju367vel.ju367va.ju367v15.ju367v6c.ju367v8r._1ckjpok6.ju367vq._1ckjpok7":
                    {
                      width: "100vw !important",
                      maxWidth: "none !important",
                    },
                  "#rk_connect_title": {
                    content: '""',
                    position: "relative",
                    color: "transparent",
                  },
                  "#rk_connect_title::before": {
                    content: '""',
                    display: "inline-block",
                    width: "48px",
                    height: "48px",
                    verticalAlign: "middle",
                    background: "url('/favicon.ico') no-repeat center center",
                    backgroundSize: "contain",
                    marginRight: "36px",
                  },
                  "#rk_connect_title::after": {
                    content: '"Connect to Buzzkill"',
                    display: "inline-block",
                    verticalAlign: "middle",
                    position: "absolute",
                    top: "28%",
                    left: "26%",
                    color: "#fff", // light yellow
                    whiteSpace: "nowrap",
                  },
                },

                // Layout for the row with info button, title, and close button
                ".iekbcc0.ju367v2r": {
                  display: "grid !important",
                  gridTemplateColumns: "auto 1fr auto",
                  alignItems: "center !important",
                  width: "100%",
                },
                ".iekbcc0.ju367v7a.ju367v7v.ju367v3h.ju367v6k.ju367v86": {
                  textAlign: "center !important",
                },
                ".iekbcc0.ju367v3s.ju367v94": {
                  justifySelf: "start",
                },
                ".iekbcc0.ju367v4d": {
                  justifySelf: "end",
                },
              }}
            />

            {children}

            {/* hCaptcha Modal for new or unverified addresses */}
            <Modal
              open={
                isSiweEnabled === true &&
                !didSolveCaptchaForAddress &&
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

export default React.memo(WalletConnection);
