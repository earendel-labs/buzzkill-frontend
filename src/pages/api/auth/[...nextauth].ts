// Import necessary types and libraries
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
      // Updated credentials parameter type to allow undefined
      async authorize(credentials: Record<"message" | "signature", string> | undefined) {
        console.log("Starting the authorize function...");

        // If credentials or required fields are missing, log the issue and return null
        if (!credentials || !credentials.message || !credentials.signature) {
          console.log("Credentials are missing or incomplete:", credentials);
          return null;
        }

        try {
          console.log("Received credentials:", credentials);

          // Parse the SIWE message
          const siwe = new SiweMessage(JSON.parse(credentials.message));
          const address = siwe.address; // Extract the user's Ethereum address
          console.log("Extracted address:", address);

          // Check if the user already exists in Supabase
          let { data: userData, error } = await supabase
            .from("users")
            .select("*")
            .eq("address", address)
            .maybeSingle();

          if (error) {
            console.error("Error fetching user from Supabase:", error);
            return null;
          }

          if (userData) {
            // User already exists, no need to verify the signature again
            console.log("User exists in Supabase, skipping signature verification:", userData);
            return {
              id: address, // Return the address as user ID
            };
          }

          // If the user does not exist, verify the SIWE signature
          console.log("User does not exist, verifying signature");

          const nextAuthUrl =
            process.env.NEXTAUTH_URL ||
            (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null);

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
          const csrfToken = await getCsrfToken({ req: { headers: req.headers } });
          console.log("CSRF token:", csrfToken);

          if (siwe.nonce !== csrfToken) {
            console.log("Nonce mismatch");
            return null;
          }

          // Verify the signature
          await siwe.verify({ signature: credentials.signature });
          console.log("Signature verified successfully");

          // Now that the signature is verified, create a new user in Supabase
          const { data: newUser, error: insertError } = await supabase
            .from("users")
            .insert({
              address: address,
              nonce: siwe.nonce,
              signature: credentials.signature,
              created_at: new Date().toISOString(),
            })
            .single();

          if (insertError) {
            console.error("Error inserting new user into Supabase:", insertError);
            return null;
          }

          // Return the new user's address
          return {
            id: address,
          };
        } catch (e) {
          console.error("Error in authorize:", e);
          return null;
        }
      },
      credentials: {
        message: { label: "Message", placeholder: "0x0", type: "text" },
        signature: { label: "Signature", placeholder: "0x0", type: "text" },
      },
      name: "Ethereum",
    }),
  ];

  return {
    callbacks: {
      async jwt({ token, user }: { token: any; user?: any }) {
        // Persist the Ethereum address in the token
        if (user) {
          token.sub = user.id;
        }
        return token;
      },
      async session({ session, token }: { session: any; token: any }) {
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
