// Import necessary types and libraries
import { IncomingMessage } from "http";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getCsrfToken } from "next-auth/react";
import { SiweMessage } from "siwe";
import jwt, { JwtPayload } from "jsonwebtoken";
import { getToken } from "next-auth/jwt";
import { JWT } from "next-auth/jwt";

// Import the Supabase client
import { supabase, getSupabaseClientWithAuth } from "@/app/libs/supabaseClient";

export function getAuthOptions(req: IncomingMessage): NextAuthOptions {
  const providers = [
    CredentialsProvider({
      async authorize(credentials) {
        console.log("Starting the authorize function...");

        if (!credentials) {
          console.log("Credentials are missing");
          return null;
        }

        let address;

        if (credentials.address) {
          // Case 1: User exists and provides an address
          address = credentials.address;
        } else if (credentials.message && credentials.signature) {
          // Case 2: SIWE flow is initiated
          try {
            console.log("Received credentials:", credentials);

            // Parse the SIWE message
            const siwe = new SiweMessage(JSON.parse(credentials.message));
            address = siwe.address;
            console.log("Extracted address:", address);

            // Verify the SIWE message
            const nextAuthUrl =
              process.env.NEXTAUTH_URL ||
              (process.env.VERCEL_URL
                ? `https://${process.env.VERCEL_URL}`
                : null);

            if (!nextAuthUrl) {
              console.log("Missing nextAuthUrl");
              return null;
            }

            const nextAuthHost = new URL(nextAuthUrl).host;
            if (siwe.domain !== nextAuthHost) {
              console.log("Domain mismatch");
              return null;
            }

            // Verify the CSRF token
            const csrfToken = await getCsrfToken({
              req: { headers: req.headers },
            });
            console.log("CSRF token:", csrfToken);

            if (siwe.nonce !== csrfToken) {
              console.log("Nonce mismatch");
              return null;
            }

            // Verify the signature
            await siwe.verify({ signature: credentials.signature });
            console.log("Signature verified successfully");
          } catch (e) {
            console.error("Error in authorize:", e);
            return null;
          }
        } else {
          console.log(
            "Credentials do not include address or SIWE message/signature"
          );
          return null;
        }

        // At this point, we have an address
        try {
          const normalizedAddress = address.toLowerCase();
          const { data: userData, error } = await supabase
            .from("users")
            .select("*")
            .eq("address", normalizedAddress)
            .maybeSingle();
          if (error) {
            console.error("Error fetching user from Supabase:", error);
            return null;
          }

          if (userData) {
            // User already exists
            console.log("User exists in Supabase", userData);
            return {
              id: address,
              address,
            };
          } else {
            // User does not exist, create user in Supabase
            console.log("User does not exist, creating new user");
            const { data: newUser, error: insertError } = await supabase
              .from("users")
              .insert({
                address: normalizedAddress,
                role: "authenticated",
                created_at: new Date().toISOString(),
              })
              .single();

            if (insertError) {
              console.error(
                "Error inserting new user into Supabase:",
                insertError
              );
              return null;
            }

            // Return the new user's address
            return {
              id: address,
              address,
            };
          }
        } catch (e) {
          console.error("Error during authorization:", e);
          return null;
        }
      },
      credentials: {
        address: { label: "Address", type: "text", placeholder: "0x0" },
        message: {
          label: "Message",
          type: "text",
          placeholder: "SIWE message",
        },
        signature: {
          label: "Signature",
          type: "text",
          placeholder: "Signature",
        },
      },
    }),
  ];

  return {
    callbacks: {
      async jwt({ token, user }) {
        const currentTime = Math.floor(Date.now() / 1000);

        if (user) {
          // When the user signs in for the first time
          token.sub = user.address;
          token.role = "authenticated"; // Ensure role is included
          token.exp = currentTime + 60 * 60; // 1-hour expiration
        }

        // Ensure that `exp` is defined before performing arithmetic
        if (
          typeof token.exp === "number" &&
          currentTime > token.exp - 60 * 10
        ) {
          token.iat = currentTime;
          token.exp = currentTime + 60 * 60; // Refresh expiration by another hour
        }

        return token;
      },

      async session({ session, token }) {
        session.address = token.address as string;
        session.user = {
          name: token.address as string,
        };
        if (typeof token.exp === "number") {
          session.expires = new Date(token.exp * 1000).toISOString(); // Convert expiration to ISO string
        }
        return session;
      },

      async redirect({ url, baseUrl }) {
        console.log("Redirect callback triggered");

        // If user is logging in and on the home page or root, redirect to /Play
        if (url === baseUrl || url === `${baseUrl}/`) {
          console.log("Redirecting to /Play after login");
          return `${baseUrl}/Play`;
        }

        // For any API routes or if already on Play, return the original URL
        if (url.includes("/api/") || url === `${baseUrl}/Play`) {
          console.log("Returning original URL:", url);
          return url;
        }

        // Default to returning original URL, handling other cases gracefully
        console.log("Returning original URL:", url);
        return url;
      },
    },

    providers,
    secret: process.env.NEXTAUTH_SECRET, // Use the Supabase JWT secret
    session: {
      strategy: "jwt",
    },
    jwt: {
      secret: process.env.NEXTAUTH_SECRET, // Use the same secret for JWT signing
      maxAge: 60 * 60, // 1-hour expiration
      encode: async ({ token }) => {
        if (!token || !token.sub) {
          throw new Error("Token or address is missing");
        }
        if (!process.env.NEXTAUTH_SECRET) {
          throw new Error("Next Auth Secret is missing");
        }
        const jwtToken = jwt.sign(
          {
            sub: token.sub,
            role: token.role,
            exp: token.exp,
          },
          process.env.NEXTAUTH_SECRET
        );

        console.log("Generated JWT:", jwtToken); // Log JWT for debugging

        return jwtToken;
      },

      decode: async ({ token }) => {
        if (!token) {
          throw new Error("Token is missing");
        }
        const decoded = jwt.verify(
          token,
          process.env.NEXTAUTH_SECRET!
        ) as JwtPayload & JWT;
        console.log("Decoded JWT:", decoded); // Log decoded JWT for debugging
        return decoded;
      },
    },
    debug: true,
  };
}

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  const authOptions = getAuthOptions(req);

  if (!Array.isArray(req.query.nextauth)) {
    res.status(400).send("Bad request");
    return;
  }

  const isDefaultSigninPage =
    req.method === "GET" &&
    req.query.nextauth.find((value) => value === "signin");

  // Hide Sign-In with Ethereum from default sign page
  if (isDefaultSigninPage) {
    authOptions.providers.pop();
  }

  return await NextAuth(req, res, authOptions);
}
