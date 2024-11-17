// Import necessary types and libraries
import { IncomingMessage } from "http";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getCsrfToken } from "next-auth/react";
import { SiweMessage } from "siwe";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT } from "next-auth/jwt";
import { parse, serialize } from "cookie";

export function getAuthOptions(
  req: IncomingMessage,
  res: NextApiResponse
): NextAuthOptions {
  const providers = [
    CredentialsProvider({
      async authorize(credentials) {
        if (!credentials) {
          console.log("Credentials are missing");
          return null;
        }

        let address;
        console.log("credentials are :", credentials);
        // Verify the SIWE message
        const nextAuthUrl =
          process.env.NEXTAUTH_URL ||
          (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null);

        if (credentials.address) {
          // Case 1: User exists and provides an address
          address = credentials.address;
          console.log("credentials.message are here", credentials.message);
          console.log("credentials.signature are here", credentials.signature);
        } else if (credentials.message && credentials.signature) {
          // Case 2: SIWE flow is initiated
          try {
            // Parse the SIWE message
            const siwe = new SiweMessage(JSON.parse(credentials.message));
            address = siwe.address;

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
          const checkUserResponse = await fetch(
            `${nextAuthUrl}/api/user/checkUser`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ address }),
            }
          );

          const { exists } = await checkUserResponse.json();

          if (exists) {
            return { id: address, address };
          } else {
            let inviteCode: string | null = null;

            const cookies = req.headers.cookie || "";
            const cookieObj = Object.fromEntries(
              cookies.split("; ").map((cookie) => cookie.split("="))
            );
            // Retrieve inviteCode from cookies
            inviteCode = cookieObj["inviteCode"];

            console.log("invitecode inside auth", inviteCode);
            // Verify the invite code using the server-side API
            if (inviteCode) {
              const validationResponse = await fetch(
                `${nextAuthUrl}/api/user/validateInviteCode?invite=${inviteCode}`
              );
              const { valid } = await validationResponse.json();
              if (!valid) {
                console.log(
                  "Invalid invite code provided, proceeding without it"
                );
                inviteCode = null; // Set inviteCode to null if invalid
              }
            }

            // Include the invite code if available
            const createUserResponse = await fetch(
              `${nextAuthUrl}/api/user/createUser?invite=${inviteCode}`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ address }),
              }
            );

            if (!createUserResponse.ok) {
              throw new Error("User creation failed");
            }
            // Clear the inviteCode cookie
            const clearInviteCookie = serialize("inviteCode", "", {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
              sameSite: "strict",
              path: "/",
              expires: new Date(0),
            });
            res.setHeader("Set-Cookie", clearInviteCookie);

            // Set isNewUser cookie
            const setNewUserCookie = serialize("isNewUser", "true", {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
              sameSite: "strict",
              maxAge: 60 * 60 * 24 * 30, // 30 days
            });
            res.setHeader("Set-Cookie", setNewUserCookie);

            return { id: address, address, isNewUser: true };
          }
        } catch (error) {
          console.error("Authorization error:", error);
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
        console.log("JWT token:", token);
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
        // Map `isNewUser` to session
        session.isNewUser = (token.isNewUser as boolean) || false;

        if (typeof token.exp === "number") {
          session.expires = new Date(token.exp * 1000).toISOString(); // Convert expiration to ISO string
        }
        console.log("session token:", token);
        return session;
      },
      async redirect({ url, baseUrl }) {
        console.log("Redirect callback triggered", { url, baseUrl });

        const urlObj = new URL(url);
        const isAuthError = urlObj.searchParams.has("error");

        // Check for the invite code in the URL
        const inviteCode = urlObj.searchParams.get("invite");

        if (inviteCode) {
          // Redirect to the baseUrl and include the invite code
          return `${baseUrl}/?invite=${inviteCode}`;
        }

        // Parse cookies from the request
        const cookies = req.headers.cookie;
        const parsedCookies = cookies ? parse(cookies) : {};

        const isNewUser = parsedCookies.isNewUser === "true";

        if (isNewUser) {
          // Redirect new users to the profile setup page
          console.log("New user detected, redirecting to profile setup...");
          return `${baseUrl}/Play/User/Profile/MyProfile`;
        }

        if (isAuthError) {
          urlObj.searchParams.delete("error");
          console.log("Redirecting due to error", urlObj.toString());
          return urlObj.toString();
        }

        // Check if the user is a new user

        if (url === baseUrl || (url === `${baseUrl}/` && !isNewUser)) {
          const playUrl = `${baseUrl}/Play`;
          console.log("Redirecting to Play:", playUrl);
          return playUrl;
        }

        if (url === "/api/auth/signout") {
          console.log("Redirecting to home after logout");
          return baseUrl;
        }

        console.log("Allowing normal redirect", url);
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

        return decoded;
      },
    },
    debug: true,
  };
}

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  const authOptions = getAuthOptions(req, res);

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
