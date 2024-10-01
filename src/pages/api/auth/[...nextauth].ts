// src/pages/api/auth/[...nextauth].ts

import { IncomingMessage } from "http";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getCsrfToken } from "next-auth/react";
import { SiweMessage } from "siwe";

// Import the Supabase client
import { supabase } from "@/app/libs/supabaseClient";

export function getAuthOptions(req: IncomingMessage): NextAuthOptions {
  const providers = [
    CredentialsProvider({
      async authorize(credentials) {
        console.log("authorize: credentials", credentials);

        try {
          const siwe = new SiweMessage(
            JSON.parse(credentials?.message || "{}")
          );
          console.log("siwe message parsed", siwe);

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

          const csrfToken = await getCsrfToken({
            req: { headers: req.headers },
          });
          console.log("csrfToken:", csrfToken);

          if (siwe.nonce !== csrfToken) {
            console.log("Nonce mismatch");
            return null;
          }

          await siwe.verify({ signature: credentials?.signature || "" });
          console.log("Signature verified");

          const address = siwe.address; // The user's Ethereum address

          // Check if the user exists in Supabase
          let { data: userData, error } = await supabase
            .from("users")
            .select("*")
            .eq("address", address)
            .maybeSingle();

          if (error) {
            console.error("Error fetching user from Supabase:", error);
            return null;
          }

          if (!userData) {
            // User does not exist, create a new record
            const { data: newUser, error: insertError } = await supabase
              .from("users")
              .insert({
                address: address,
                nonce: siwe.nonce,
                signature: credentials?.signature || "",
                created_at: new Date().toISOString(),
              })
              .single();

            if (insertError) {
              console.error("Error inserting new user into Supabase:", insertError);
              return null;
            }

            userData = newUser;
          }

          // Return minimal user object
          return {
            id: address,
          };
        } catch (e) {
          console.error("Error in authorize:", e);
          return null;
        }
      },
      credentials: {
        message: {
          label: "Message",
          placeholder: "0x0",
          type: "text",
        },
        signature: {
          label: "Signature",
          placeholder: "0x0",
          type: "text",
        },
      },
      name: "Ethereum",
    }),
  ];

  return {
    callbacks: {
      async jwt({ token, user }) {
        // Persist the Ethereum address in the token
        if (user) {
          token.sub = user.id;
        }
        return token;
      },
      async session({ session, token }) {
        session.address = token.sub;
        session.user = {
          name: token.sub,
        };

        // Fetch user data from Supabase
        let { data: userData, error } = await supabase
          .from("users")
          .select("*")
          .eq("address", token.sub)
          .maybeSingle();

        if (!error && userData) {
          session.user = {
            ...session.user,
            ...userData,
          };
        }

        return session;
      },
    },
    providers,
    secret: process.env.NEXTAUTH_SECRET,
    session: {
      strategy: "jwt",
    },
    // Enable verbose logging
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
